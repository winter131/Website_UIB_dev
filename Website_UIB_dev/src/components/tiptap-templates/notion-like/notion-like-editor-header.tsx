"use client"

import { ThemeToggle } from "@/components/tiptap-templates/notion-like/notion-like-editor-theme-toggle"

// --- UI Primitives ---
import { Spacer } from "@/components/tiptap-ui-primitive/spacer"
import { Separator } from "@/components/tiptap-ui-primitive/separator"
import { ButtonGroup } from "@/components/tiptap-ui-primitive/button"

// --- Tiptap UI ---
import { FontFamilyDropdown } from "@/components/tiptap-ui/font-family-dropdown/font-family-dropdown"
import { TextAlignButton } from "@/components/tiptap-ui/text-align-button/text-align-button"
import { ColorTextPopover } from "@/components/tiptap-ui/color-text-popover"
import { MarkButton } from "@/components/tiptap-ui/mark-button"

// --- Styles ---
import "@/components/tiptap-templates/notion-like/notion-like-editor-header.scss"

import { CollaborationUsers } from "@/components/tiptap-templates/notion-like/notion-like-editor-collaboration-users"

export function NotionEditorHeader() {
  return (
    <header className="notion-like-editor-header flex items-center gap-2 px-4 py-2 border-b bg-white sticky top-0 z-10 min-h-[50px]">
      <ButtonGroup orientation="horizontal">
        <FontFamilyDropdown />
      </ButtonGroup>

      <Separator />

      <ButtonGroup orientation="horizontal">
        <MarkButton type="bold" />
        <MarkButton type="italic" />
        <MarkButton type="underline" />
        <MarkButton type="strike" />
      </ButtonGroup>

      <Separator />

      <ButtonGroup orientation="horizontal">
        <TextAlignButton align="left" />
        <TextAlignButton align="center" />
        <TextAlignButton align="right" />
        <TextAlignButton align="justify" />
      </ButtonGroup>

      <Separator />

      <ButtonGroup orientation="horizontal">
        <ColorTextPopover />
      </ButtonGroup>

      <Spacer />

      <div className="notion-like-editor-header-actions flex items-center gap-2">
        <ButtonGroup orientation="horizontal">
          <UndoRedoButton action="undo" />
          <UndoRedoButton action="redo" />
        </ButtonGroup>
        
        <ThemeToggle />

        <CollaborationUsers />
      </div>
    </header>
  )
}
