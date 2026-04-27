"use client"

import { useCallback, useEffect, useState } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import { type Editor } from "@tiptap/react"
import type { Node } from "@tiptap/pm/model"


import { useTiptapEditor } from "@/hooks/use-tiptap-editor"
import { useIsBreakpoint } from "@/hooks/use-is-breakpoint"


import {
  getAnchorNodeAndPos,
  getEditorExtension,
} from "@/lib/tiptap-advanced-utils"


import { LinkIcon } from "@/components/tiptap-icons/link-icon"

export const COPY_ANCHOR_LINK_SHORTCUT_KEY = "mod+ctrl+l"


export interface UseCopyAnchorLinkConfig {
  editor?: Editor | null
  hideWhenUnavailable?: boolean
  onNodeIdNotFound?: (found: boolean) => void
  onExtractedNodeId?: (nodeId: string | null) => void
  onCopied?: () => void
}


function isEditorReady(editor: Editor | null): boolean {
  return !!(editor && editor.isEditable)
}


function getAttributeName(editor: Editor): string {
  const ext = getEditorExtension(editor, "uniqueID")
  return ext?.options?.attributeName || "data-id"
}


function getNodeWithId(editor: Editor | null): {
  node: Node
  nodeId: string | null
  hasNodeId: boolean
} | null {
  if (!isEditorReady(editor)) return null

  const nodeInfo = getAnchorNodeAndPos(editor!)
  if (!nodeInfo) return null

  const attributeName = getAttributeName(editor!)
  const nodeId = extractNodeId(nodeInfo.node, attributeName)

  return {
    node: nodeInfo.node,
    nodeId,
    hasNodeId: nodeId !== null,
  }
}


export function extractNodeId(
  node: Node | null,
  attributeName: string
): string | null {
  if (!node?.attrs?.[attributeName]) return null

  try {
    return node.attrs[attributeName]
  } catch {
    return null
  }
}


export function canCopyAnchorLink(editor: Editor | null): boolean {
  const nodeWithId = getNodeWithId(editor)
  return nodeWithId?.hasNodeId ?? false
}


export async function copyNodeId(
  editor: Editor | null,
  onExtractedNodeId?: (nodeId: string | null) => void,
  onNodeIdNotFound?: (found: boolean) => void
): Promise<boolean> {
  const nodeWithId = getNodeWithId(editor)

  if (!nodeWithId) return false

  const { nodeId, hasNodeId } = nodeWithId

  onExtractedNodeId?.(nodeId)
  onNodeIdNotFound?.(!hasNodeId)

  if (!hasNodeId || !nodeId) return false

  try {
    const currentUrl = new URL(window.location.href)

    currentUrl.searchParams.set("source", "copy_link")
    currentUrl.hash = nodeId

    await navigator.clipboard.writeText(currentUrl.toString())
    return true
  } catch (err) {
    console.error("Failed to copy node ID to clipboard:", err)
    return false
  }
}


export function shouldShowButton(props: {
  editor: Editor | null
  hideWhenUnavailable: boolean
}): boolean {
  const { editor, hideWhenUnavailable } = props

  if (!isEditorReady(editor)) return false

  const hasNode = !!getAnchorNodeAndPos(editor!)

  if (!hideWhenUnavailable) return hasNode

  return canCopyAnchorLink(editor)
}


export function useCopyAnchorLink(config?: UseCopyAnchorLinkConfig) {
  const {
    editor: providedEditor,
    hideWhenUnavailable = false,
    onNodeIdNotFound,
    onExtractedNodeId,
    onCopied,
  } = config || {}

  const { editor } = useTiptapEditor(providedEditor)
  const isMobile = useIsBreakpoint()
  const [isVisible, setIsVisible] = useState<boolean>(true)
  const canCopyAnchor = canCopyAnchorLink(editor)

  useEffect(() => {
    if (!editor) return

    const handleSelectionUpdate = () => {
      setIsVisible(shouldShowButton({ editor, hideWhenUnavailable }))
    }

    handleSelectionUpdate()

    editor.on("selectionUpdate", handleSelectionUpdate)

    return () => {
      editor.off("selectionUpdate", handleSelectionUpdate)
    }
  }, [editor, hideWhenUnavailable])

  const handleCopyAnchorLink = useCallback(async () => {
    const success = await copyNodeId(
      editor,
      onExtractedNodeId,
      onNodeIdNotFound
    )

    if (success) {
      onCopied?.()
    }

    return success
  }, [editor, onExtractedNodeId, onNodeIdNotFound, onCopied])

  useHotkeys(
    COPY_ANCHOR_LINK_SHORTCUT_KEY,
    (event) => {
      event.preventDefault()
      handleCopyAnchorLink()
    },
    {
      enabled: isVisible && canCopyAnchor,
      enableOnContentEditable: !isMobile,
      enableOnFormTags: true,
    }
  )

  return {
    isVisible,
    handleCopyAnchorLink,
    canCopyAnchorLink: canCopyAnchor,
    label: "Copy anchor link",
    shortcutKeys: COPY_ANCHOR_LINK_SHORTCUT_KEY,
    Icon: LinkIcon,
  }
}