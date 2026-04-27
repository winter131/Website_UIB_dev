"use client"

import { useMemo } from "react"
import { useTiptapEditor } from "@/hooks/use-tiptap-editor"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/tiptap-ui-primitive/dropdown-menu"
import { Button } from "@/components/tiptap-ui-primitive/button"
import { TypeIcon } from "lucide-react"

const FONTS = [
  { label: "Default", value: "" },
  { label: "Inter", value: "Inter" },
  { label: "Serif", value: "serif" },
  { label: "Monospace", value: "monospace" },
  { label: "Courier New", value: "Courier New" },
  { label: "Georgia", value: "Georgia" },
  { label: "Verdana", value: "Verdana" },
]

export function FontFamilyDropdown() {
  const { editor } = useTiptapEditor()

  const currentFont = useMemo(() => {
    if (!editor) return "Default"
    const font = FONTS.find(f => editor.isActive("textStyle", { fontFamily: f.value }))
    return font?.label || "Default"
  }, [editor?.state.selection])

  const setFont = (value: string) => {
    if (!editor) return
    if (value === "") {
      editor.chain().focus().unsetFontFamily().run()
    } else {
      editor.chain().focus().setFontFamily(value).run()
    }
  }

  if (!editor) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          data-style="ghost"
          className="tiptap-font-family-trigger h-8 px-2 gap-1"
          tooltip="Font Family"
        >
          <TypeIcon className="tiptap-button-icon" />
          <span className="text-[10px] font-medium hidden sm:inline">{currentFont}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-40 z-[9999]">
        {FONTS.map((font) => (
          <DropdownMenuItem
            key={font.label}
            onClick={() => setFont(font.value)}
            className="flex items-center justify-between"
            style={{ fontFamily: font.value || 'inherit' }}
          >
            {font.label}
            {editor.isActive("textStyle", { fontFamily: font.value }) && (
               <span className="bx bx-check text-blue-600"></span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}