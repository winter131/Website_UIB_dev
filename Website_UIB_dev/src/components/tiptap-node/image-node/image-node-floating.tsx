import type { Editor } from "@tiptap/react"


import { useTiptapEditor } from "@/hooks/use-tiptap-editor"


import { isNodeTypeSelected } from "@/lib/tiptap-utils"


import { DeleteNodeButton } from "@/components/tiptap-ui/delete-node-button"
import { ImageDownloadButton } from "@/components/tiptap-ui/image-download-button"
import { ImageAlignButton } from "@/components/tiptap-ui/image-align-button"


import { Separator } from "@/components/tiptap-ui-primitive/separator"
import { ImageCaptionButton } from "@/components/tiptap-ui/image-caption-button"
import { ImageUploadButton } from "@/components/tiptap-ui/image-upload-button"
import { RefreshCcwIcon } from "@/components/tiptap-icons/refresh-ccw-icon"

export function ImageNodeFloating({
  editor: providedEditor,
}: {
  editor?: Editor | null
}) {
  const { editor } = useTiptapEditor(providedEditor)
  const visible = isNodeTypeSelected(editor, ["image"])

  if (!editor || !visible) {
    return null
  }

  return (
    <>
      <ImageAlignButton align="left" />
      <ImageAlignButton align="center" />
      <ImageAlignButton align="right" />
      <Separator />
      <ImageCaptionButton />
      <Separator />
      <ImageDownloadButton />
      <ImageUploadButton icon={RefreshCcwIcon} tooltip="Replace" />
      <Separator />
      <DeleteNodeButton />
    </>
  )
}