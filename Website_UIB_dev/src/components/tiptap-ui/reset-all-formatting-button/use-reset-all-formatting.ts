"use client"

import { useCallback, useEffect, useState } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import { type Editor } from "@tiptap/react"
import type { Transaction } from "@tiptap/pm/state"


import { useTiptapEditor } from "@/hooks/use-tiptap-editor"
import { useIsBreakpoint } from "@/hooks/use-is-breakpoint"


import { RotateCcwIcon } from "@/components/tiptap-icons/rotate-ccw-icon"

export const RESET_ALL_FORMATTING_SHORTCUT_KEY = "mod+r"


export interface UseResetAllFormattingConfig {
  editor?: Editor | null
  hideWhenUnavailable?: boolean
  preserveMarks?: string[]
  onResetAllFormatting?: () => void
}


export function removeAllMarksExcept(tr: Transaction, skip: string[] = []) {
  const { selection } = tr
  const { empty, ranges } = selection

  if (empty) return tr

  ranges.forEach((range) => {
    const from = range.$from.pos
    const to = range.$to.pos

    tr.doc.nodesBetween(from, to, (node, pos) => {
      if (!node.isInline) return true

      node.marks.forEach((mark) => {
        if (!skip.includes(mark.type.name)) {
          tr.removeMark(pos, pos + node.nodeSize, mark.type)
        }
      })

      return true
    })
  })

  return tr
}


export function canResetMarks(tr: Transaction, skip: string[] = []): boolean {
  const { selection } = tr
  const { empty, ranges } = selection

  if (empty) return false

  for (const range of ranges) {
    const from = range.$from.pos
    const to = range.$to.pos

    let hasRemovableMarks = false

    tr.doc.nodesBetween(from, to, (node) => {
      if (!node.isInline) return true

      for (const mark of node.marks) {
        if (!skip.includes(mark.type.name)) {
          hasRemovableMarks = true
          return false
        }
      }

      return true
    })

    if (hasRemovableMarks) {
      return true
    }
  }

  return false
}


export function canResetFormatting(
  editor: Editor | null,
  preserveMarks?: string[]
): boolean {
  if (!editor || !editor.isEditable) return false

  const tr = editor.state.tr
  return canResetMarks(tr, preserveMarks)
}


export function resetFormatting(
  editor: Editor | null,
  preserveMarks?: string[]
): boolean {
  if (!editor || !editor.isEditable) return false

  try {
    const { view, state } = editor
    const { tr } = state
    const transaction = removeAllMarksExcept(tr, preserveMarks)

    view.dispatch(transaction)
    editor.commands.focus()
    return true
  } catch {
    return false
  }
}


export function shouldShowButton(props: {
  editor: Editor | null
  hideWhenUnavailable: boolean
  preserveMarks?: string[]
}): boolean {
  const { editor, hideWhenUnavailable, preserveMarks } = props

  if (!editor || !editor.isEditable) return false

  if (hideWhenUnavailable && !editor.isActive("code")) {
    return canResetFormatting(editor, preserveMarks)
  }

  return true
}


export function useResetAllFormatting(config?: UseResetAllFormattingConfig) {
  const {
    editor: providedEditor,
    preserveMarks,
    hideWhenUnavailable = false,
    onResetAllFormatting,
  } = config || {}

  const { editor } = useTiptapEditor(providedEditor)
  const isMobile = useIsBreakpoint()
  const [isVisible, setIsVisible] = useState<boolean>(true)
  const canReset = canResetFormatting(editor, preserveMarks)

  useEffect(() => {
    if (!editor) return

    const handleSelectionUpdate = () => {
      setIsVisible(
        shouldShowButton({ editor, hideWhenUnavailable, preserveMarks })
      )
    }

    handleSelectionUpdate()

    editor.on("selectionUpdate", handleSelectionUpdate)

    return () => {
      editor.off("selectionUpdate", handleSelectionUpdate)
    }
  }, [editor, hideWhenUnavailable, preserveMarks])

  const handleResetFormatting = useCallback(() => {
    if (!editor) return false

    const success = resetFormatting(editor, preserveMarks)
    if (success) {
      onResetAllFormatting?.()
    }
    return success
  }, [editor, onResetAllFormatting, preserveMarks])

  useHotkeys(
    RESET_ALL_FORMATTING_SHORTCUT_KEY,
    (event) => {
      event.preventDefault() 
      handleResetFormatting()
    },
    {
      enabled: isVisible && canReset,
      enableOnContentEditable: !isMobile,
      enableOnFormTags: true,
    }
  )

  return {
    isVisible,
    handleResetFormatting,
    canReset,
    label: "Reset formatting",
    shortcutKeys: RESET_ALL_FORMATTING_SHORTCUT_KEY,
    Icon: RotateCcwIcon,
  }
}