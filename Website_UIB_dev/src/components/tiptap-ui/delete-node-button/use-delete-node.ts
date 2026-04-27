"use client"

import { useCallback, useEffect, useState } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import { type Editor } from "@tiptap/react"
import { NodeSelection } from "@tiptap/pm/state"


import { useTiptapEditor } from "@/hooks/use-tiptap-editor"
import { useIsBreakpoint } from "@/hooks/use-is-breakpoint"


import { TrashIcon } from "@/components/tiptap-icons/trash-icon"

export const DELETE_NODE_SHORTCUT_KEY = "backspace"


export interface UseDeleteNodeConfig {
  editor?: Editor | null
  hideWhenUnavailable?: boolean
  onDeleted?: () => void
}


export function canDeleteNode(editor: Editor | null): boolean {
  if (!editor || !editor.isEditable) return false

  const { state } = editor
  const { selection } = state

  if (selection instanceof NodeSelection) {
    return true
  }

  const $pos = selection.$anchor

  for (let depth = $pos.depth; depth > 0; depth--) {
    const node = $pos.node(depth)
    const pos = $pos.before(depth)

    const tr = state.tr.delete(pos, pos + node.nodeSize)
    if (tr.doc !== state.doc) {
      return true
    }
  }

  return false
}


export function deleteNodeAtPosition(
  editor: Editor,
  pos: number,
  nodeSize: number
): boolean {
  const chain = editor.chain().focus()
  const success = chain.deleteRange({ from: pos, to: pos + nodeSize }).run()

  if (success) return true

  return chain.setNodeSelection(pos).deleteSelection().run()
}


export function deleteNode(editor: Editor | null): boolean {
  if (!editor || !editor.isEditable) return false

  try {
    const { state } = editor
    const { selection } = state

    if (selection instanceof NodeSelection) {
      const pos = selection.from
      const selectedNode = selection.node

      if (!selectedNode) return false

      return deleteNodeAtPosition(editor, pos, selectedNode.nodeSize)
    }

    const $pos = selection.$from

    for (let depth = $pos.depth; depth > 0; depth--) {
      const node = selection.$from.node(depth)
      const pos = selection.$from.before(depth)

      if (
        node &&
        node.isBlock &&
        node.type.name !== "tableRow" &&
        node.type.name !== "tableHeader" &&
        node.type.name !== "tableCell"
      ) {
        return deleteNodeAtPosition(editor, pos, node.nodeSize)
      }
    }

    return false
  } catch {
    return false
  }
}


export function shouldShowButton(props: {
  editor: Editor | null
  hideWhenUnavailable: boolean
}): boolean {
  const { editor, hideWhenUnavailable } = props

  if (!editor || !editor.isEditable) return false

  if (hideWhenUnavailable && !editor.isActive("code")) {
    return canDeleteNode(editor)
  }

  return true
}


export function useDeleteNode(config?: UseDeleteNodeConfig) {
  const {
    editor: providedEditor,
    hideWhenUnavailable = false,
    onDeleted,
  } = config || {}

  const { editor } = useTiptapEditor(providedEditor)
  const isMobile = useIsBreakpoint()
  const [isVisible, setIsVisible] = useState<boolean>(true)
  const canDeleteNodeState = canDeleteNode(editor)

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

  const handleDeleteNode = useCallback(() => {
    if (!editor) return false

    const success = deleteNode(editor)
    if (success) {
      onDeleted?.()
    }
    return success
  }, [editor, onDeleted])

  useHotkeys(
    DELETE_NODE_SHORTCUT_KEY,
    (event) => {
      event.preventDefault()
      handleDeleteNode()
    },
    {
      enabled: isVisible && canDeleteNodeState,
      enableOnContentEditable: !isMobile,
      enableOnFormTags: true,
    }
  )

  return {
    isVisible,
    handleDeleteNode,
    canDeleteNode: canDeleteNodeState,
    label: "Delete",
    shortcutKeys: DELETE_NODE_SHORTCUT_KEY,
    Icon: TrashIcon,
  }
}