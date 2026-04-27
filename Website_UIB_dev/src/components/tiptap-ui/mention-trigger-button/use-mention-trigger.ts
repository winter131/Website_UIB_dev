"use client"

import { useCallback, useEffect, useState } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import { type Editor } from "@tiptap/react"
import type { Node } from "@tiptap/pm/model"


import { useTiptapEditor } from "@/hooks/use-tiptap-editor"
import { useIsBreakpoint } from "@/hooks/use-is-breakpoint"


import {
  findNodePosition,
  isNodeTypeSelected,
  isValidPosition,
} from "@/lib/tiptap-utils"


import { AtSignIcon } from "@/components/tiptap-icons/at-sign-icon"

export const MENTION_TRIGGER_SHORTCUT_KEY = "mod+shift+2"


export interface UseMentionTriggerConfig {
  editor?: Editor | null
  node?: Node | null
  nodePos?: number | null
  trigger?: string
  hideWhenUnavailable?: boolean
  onTriggered?: (trigger: string) => void
}


export function canInsertMention(
  editor: Editor | null,
  node?: Node | null,
  nodePos?: number | null
): boolean {
  if (!editor || !editor.isEditable) return false
  if (isNodeTypeSelected(editor, ["image"])) return false

  if (node || isValidPosition(nodePos)) {
    if (isValidPosition(nodePos) && nodePos! >= 0) return true

    if (node) {
      const foundPos = findNodePosition({ editor, node })
      return foundPos !== null
    }
  }

  return true
}


function insertTriggerInBlockNode(
  editor: Editor,
  trigger: string,
  node?: Node | null,
  nodePos?: number | null
): boolean {
  if ((node !== undefined && node !== null) || isValidPosition(nodePos)) {
    const foundPos = findNodePosition({
      editor,
      node: node || undefined,
      nodePos: nodePos || undefined,
    })

    if (!foundPos) {
      return false
    }

    const isEmpty =
      foundPos.node.type.name === "paragraph" &&
      foundPos.node.content.size === 0
    const insertPos = isEmpty
      ? foundPos.pos
      : foundPos.pos + foundPos.node.nodeSize

    const triggerLength = trigger.length + 1 
    const focusPos = isEmpty
      ? foundPos.pos + triggerLength
      : foundPos.pos + foundPos.node.nodeSize + triggerLength

    return editor
      .chain()
      .insertContentAt(isEmpty ? foundPos.pos : insertPos, {
        type: "paragraph",
        content: [{ type: "text", text: trigger }],
      })
      .focus(focusPos)
      .run()
  }

  const { $from } = editor.state.selection

  return editor
    .chain()
    .insertContentAt($from.after(), {
      type: "paragraph",
      content: [{ type: "text", text: trigger }],
    })
    .focus()
    .run()
}


function insertTriggerInTextNode(
  editor: Editor,
  trigger: string,
  node?: Node | null,
  nodePos?: number | null
): boolean {
  if ((node !== undefined && node !== null) || isValidPosition(nodePos)) {
    const foundPos = findNodePosition({
      editor,
      node: node || undefined,
      nodePos: nodePos || undefined,
    })

    if (!foundPos) {
      return false
    }

    const isEmpty =
      foundPos.node.type.name === "paragraph" &&
      foundPos.node.content.size === 0
    const insertPos = isEmpty
      ? foundPos.pos
      : foundPos.pos + foundPos.node.nodeSize

    editor.view.dispatch(
      editor.view.state.tr
        .scrollIntoView()
        .insertText(trigger, insertPos, insertPos)
    )

    const triggerLength = trigger.length + 1 
    const focusPos = isEmpty
      ? foundPos.pos + triggerLength
      : foundPos.pos + foundPos.node.nodeSize + triggerLength
    editor.commands.focus(focusPos)

    return true
  }

  const { $from } = editor.state.selection
  const currentNode = $from.node()
  const hasContentBefore =
    $from.parentOffset > 0 &&
    currentNode.textContent[$from.parentOffset - 1] !== " "

  return editor
    .chain()
    .insertContent({
      type: "text",
      text: hasContentBefore ? ` ${trigger}` : trigger,
    })
    .focus()
    .run()
}


export function addMentionTrigger(
  editor: Editor | null,
  trigger: string = "@",
  node?: Node | null,
  nodePos?: number | null
): boolean {
  if (!editor || !editor.isEditable) return false
  if (!canInsertMention(editor, node, nodePos)) return false

  try {
    const { $from } = editor.state.selection
    const currentNode = $from.node()
    const isBlockNode = currentNode.isBlock && !currentNode.isTextblock

    if (isBlockNode) {
      return insertTriggerInBlockNode(editor, trigger, node, nodePos)
    }

    return insertTriggerInTextNode(editor, trigger, node, nodePos)
  } catch {
    return false
  }
}


export function shouldShowButton(props: {
  editor: Editor | null
  hideWhenUnavailable: boolean
  node?: Node | null
  nodePos?: number | null
}): boolean {
  const { editor, hideWhenUnavailable, node, nodePos } = props

  if (!editor || !editor.isEditable) return false

  if (hideWhenUnavailable && !editor.isActive("code")) {
    return canInsertMention(editor, node, nodePos)
  }

  return true
}


export function useMentionTrigger(config?: UseMentionTriggerConfig) {
  const {
    editor: providedEditor,
    node,
    nodePos,
    trigger = "@",
    hideWhenUnavailable = false,
    onTriggered,
  } = config || {}

  const { editor } = useTiptapEditor(providedEditor)
  const isMobile = useIsBreakpoint()
  const [isVisible, setIsVisible] = useState<boolean>(true)
  const canInsert = canInsertMention(editor, node, nodePos)

  useEffect(() => {
    if (!editor) return

    const handleSelectionUpdate = () => {
      setIsVisible(
        shouldShowButton({ editor, hideWhenUnavailable, node, nodePos })
      )
    }

    handleSelectionUpdate()

    editor.on("selectionUpdate", handleSelectionUpdate)

    return () => {
      editor.off("selectionUpdate", handleSelectionUpdate)
    }
  }, [editor, hideWhenUnavailable, node, nodePos])

  const handleMention = useCallback(() => {
    if (!editor) return false

    const success = addMentionTrigger(editor, trigger, node, nodePos)
    if (success) {
      onTriggered?.(trigger)
    }
    return success
  }, [editor, trigger, node, nodePos, onTriggered])

  useHotkeys(
    MENTION_TRIGGER_SHORTCUT_KEY,
    (event) => {
      event.preventDefault()
      handleMention()
    },
    {
      enabled: isVisible && canInsert,
      enableOnContentEditable: !isMobile,
      enableOnFormTags: true,
    }
  )

  return {
    isVisible,
    handleMention,
    canInsert,
    label: "Add mention",
    shortcutKeys: MENTION_TRIGGER_SHORTCUT_KEY,
    trigger,
    Icon: AtSignIcon,
  }
}