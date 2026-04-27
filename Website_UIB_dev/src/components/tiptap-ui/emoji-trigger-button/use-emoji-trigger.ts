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


import { SmilePlusIcon } from "@/components/tiptap-icons/smile-plus-icon"

export const EMOJI_TRIGGER_SHORTCUT_KEY = "mod+shift+e"


export interface UseEmojiTriggerConfig {
  editor?: Editor | null
  node?: Node | null
  nodePos?: number | null
  trigger?: string
  hideWhenUnavailable?: boolean
  onTriggerApplied?: (trigger: string) => void
}


export function canAddEmojiTrigger(editor: Editor | null): boolean {
  if (!editor || !editor.isEditable) return false
  if (isNodeTypeSelected(editor, ["image"])) return false

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
    const posAndNodeSize = foundPos.pos + foundPos.node.nodeSize

    return editor
      .chain()
      .insertContentAt(isEmpty ? foundPos.pos : posAndNodeSize, {
        type: "paragraph",
        content: [{ type: "text", text: trigger }],
      })
      .focus(isEmpty ? foundPos.pos + 2 : posAndNodeSize + trigger.length + 1)
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
    const posAndNodeSize = foundPos.pos + foundPos.node.nodeSize

    editor.view.dispatch(
      editor.view.state.tr
        .scrollIntoView()
        .insertText(
          trigger,
          isEmpty ? foundPos.pos : posAndNodeSize,
          isEmpty ? foundPos.pos : posAndNodeSize
        )
    )

    editor.commands.focus(
      isEmpty ? foundPos.pos + 2 : posAndNodeSize + trigger.length + 1
    )

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


export function addEmojiTrigger(
  editor: Editor | null,
  trigger: string = ":",
  node?: Node | null,
  nodePos?: number | null
): boolean {
  if (!editor || !editor.isEditable) return false
  if (!canAddEmojiTrigger(editor)) return false

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
}): boolean {
  const { editor, hideWhenUnavailable } = props

  if (!editor || !editor.isEditable) return false

  if (hideWhenUnavailable && !editor.isActive("code")) {
    return canAddEmojiTrigger(editor)
  }

  return true
}


export function useEmojiTrigger(config?: UseEmojiTriggerConfig) {
  const {
    editor: providedEditor,
    node,
    nodePos,
    trigger = ":",
    hideWhenUnavailable = false,
    onTriggerApplied,
  } = config || {}

  const { editor } = useTiptapEditor(providedEditor)
  const isMobile = useIsBreakpoint()
  const [isVisible, setIsVisible] = useState<boolean>(true)
  const canAddTrigger = canAddEmojiTrigger(editor)

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

  const handleAddTrigger = useCallback(() => {
    if (!editor) return false

    const success = addEmojiTrigger(editor, trigger, node, nodePos)
    if (success) {
      onTriggerApplied?.(trigger)
    }
    return success
  }, [editor, trigger, node, nodePos, onTriggerApplied])

  useHotkeys(
    EMOJI_TRIGGER_SHORTCUT_KEY,
    (event) => {
      event.preventDefault()
      handleAddTrigger()
    },
    {
      enabled: isVisible && canAddTrigger,
      enableOnContentEditable: !isMobile,
      enableOnFormTags: true,
    }
  )

  return {
    isVisible,
    handleAddTrigger,
    canAddTrigger,
    label: "Add emoji",
    shortcutKeys: EMOJI_TRIGGER_SHORTCUT_KEY,
    trigger,
    Icon: SmilePlusIcon,
  }
}