"use client"

import { useCallback, useEffect, useState } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import { type Editor } from "@tiptap/react"
import { NodeSelection } from "@tiptap/pm/state"


import { useTiptapEditor } from "@/hooks/use-tiptap-editor"
import { useIsBreakpoint } from "@/hooks/use-is-breakpoint"


import {
  isExtensionAvailable,
  isNodeTypeSelected,
  sanitizeUrl,
} from "@/lib/tiptap-utils"


import { ArrowDownToLineIcon } from "@/components/tiptap-icons/arrow-down-to-line-icon"

export const IMAGE_DOWNLOAD_SHORTCUT_KEY = "mod+shift+d"


function getFileExtension(url: string, contentType?: string): string {
  const urlMatch = url.match(/\.([a-zA-Z0-9]+)(?:\?|#|$)/)
  if (urlMatch && urlMatch[1]) {
    return `.${urlMatch[1].toLowerCase()}`
  }

  if (contentType) {
    const mimeMap: Record<string, string> = {
      "image/jpeg": ".jpg",
      "image/jpg": ".jpg",
      "image/png": ".png",
      "image/gif": ".gif",
      "image/webp": ".webp",
      "image/svg+xml": ".svg",
      "image/bmp": ".bmp",
    }
    return mimeMap[contentType.toLowerCase()] || ".jpg"
  }

  return ".jpg"
}


export interface UseImageDownloadConfig {
  editor?: Editor | null
  hideWhenUnavailable?: boolean
  onDownloaded?: (filename?: string) => void
  resolveFileUrl?: (url: string) => Promise<string>
  downloadMethod?: "download" | "open" | "auto"
}


export function canDownloadImage(editor: Editor | null): boolean {
  if (!editor || !editor.isEditable) return false
  if (!isExtensionAvailable(editor, ["image"])) return false

  return isNodeTypeSelected(editor, ["image"])
}


export function getSelectedImageData(editor: Editor | null): {
  src?: string
  alt?: string
  title?: string
} | null {
  if (!editor || !canDownloadImage(editor)) return null

  const { selection } = editor.state

  if (selection instanceof NodeSelection) {
    const node = selection.node

    if (node.type.name === "image") {
      return {
        src: node.attrs.src,
        alt: node.attrs.alt,
        title: node.attrs.title,
      }
    }
  }

  return null
}


async function tryFetchDownload(
  url: string,
  filename: string
): Promise<boolean> {
  try {
    const response = await fetch(url)
    if (!response.ok) return false

    const blob = await response.blob()
    const blobUrl = URL.createObjectURL(blob)

    const hasExtension = /\.[a-zA-Z0-9]+$/.test(filename)
    const finalFilename = hasExtension
      ? filename
      : filename +
        getFileExtension(url, response.headers.get("content-type") || undefined)

    const link = document.createElement("a")
    link.href = blobUrl
    link.download = finalFilename
    link.style.display = "none"

    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(blobUrl)
    return true
  } catch (error) {
    console.warn("Fetch download failed:", error)
    return false
  }
}


function tryDirectDownload(url: string, filename: string): boolean {
  try {
    const hasExtension = /\.[a-zA-Z0-9]+$/.test(filename)
    const finalFilename = hasExtension
      ? filename
      : filename + getFileExtension(url)

    const link = document.createElement("a")
    link.href = url
    link.download = finalFilename
    link.style.display = "none"

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    return true
  } catch (error) {
    console.warn("Direct download failed:", error)
    return false
  }
}


function openInNewTab(url: string): boolean {
  try {
    window.open(url, "_blank")
    return true
  } catch (error) {
    console.error("Failed to open image:", error)
    return false
  }
}


export async function downloadSelectedImage(
  editor: Editor | null,
  filename?: string,
  resolveFileUrl?: (url: string) => Promise<string>,
  downloadMethod: "download" | "open" | "auto" = "auto"
): Promise<boolean> {
  if (!editor || !canDownloadImage(editor)) return false

  const imageData = getSelectedImageData(editor)
  if (!imageData?.src) return false

  try {
    let resolvedUrl = imageData.src
    if (resolveFileUrl) {
      resolvedUrl = await resolveFileUrl(imageData.src)
    }

    const baseUrl = window.location.href
    const sanitizedUrl = sanitizeUrl(resolvedUrl, baseUrl)

    if (sanitizedUrl === "#") {
      console.error("Invalid or unsafe URL after sanitization")
      return false
    }

    const generatedFilename =
      filename || imageData.alt || imageData.title || `image-${Date.now()}`

    switch (downloadMethod) {
      case "open":
        return openInNewTab(sanitizedUrl)

      case "download":
        if (
          sanitizedUrl.startsWith(window.location.origin) ||
          sanitizedUrl.startsWith("data:")
        ) {
          return tryDirectDownload(sanitizedUrl, generatedFilename)
        } else {
          const success = await tryFetchDownload(
            sanitizedUrl,
            generatedFilename
          )
          return success || openInNewTab(sanitizedUrl)
        }

      case "auto":
      default:
        if (
          sanitizedUrl.startsWith("data:") ||
          sanitizedUrl.startsWith(window.location.origin)
        ) {
          return tryDirectDownload(sanitizedUrl, generatedFilename)
        } else {
          const fetchSuccess = await tryFetchDownload(
            sanitizedUrl,
            generatedFilename
          )
          if (fetchSuccess) return true

          return openInNewTab(sanitizedUrl)
        }
    }
  } catch (error) {
    console.error("Failed to download image:", error)

    try {
      const baseUrl = window.location.href
      const sanitizedUrl = sanitizeUrl(imageData.src, baseUrl)
      if (sanitizedUrl !== "#") {
        return openInNewTab(sanitizedUrl)
      }
    } catch {
    }

    return false
  }
}


export function shouldShowDownloadButton(props: {
  editor: Editor | null
  hideWhenUnavailable: boolean
}): boolean {
  const { editor, hideWhenUnavailable } = props

  if (!editor || !editor.isEditable) return false
  if (!isExtensionAvailable(editor, ["image", "imageUpload"])) return false

  if (hideWhenUnavailable) {
    return canDownloadImage(editor)
  }

  return true
}


export function useImageDownload(config?: UseImageDownloadConfig) {
  const {
    editor: providedEditor,
    hideWhenUnavailable = false,
    onDownloaded,
    resolveFileUrl,
    downloadMethod = "auto",
  } = config || {}

  const { editor } = useTiptapEditor(providedEditor)
  const isMobile = useIsBreakpoint()
  const [isVisible, setIsVisible] = useState<boolean>(true)
  const canDownload = canDownloadImage(editor)

  useEffect(() => {
    if (!editor) return

    const handleSelectionUpdate = () => {
      setIsVisible(shouldShowDownloadButton({ editor, hideWhenUnavailable }))
    }

    handleSelectionUpdate()

    editor.on("selectionUpdate", handleSelectionUpdate)

    return () => {
      editor.off("selectionUpdate", handleSelectionUpdate)
    }
  }, [editor, hideWhenUnavailable])

  const handleDownload = useCallback(async () => {
    if (!editor) return false

    const imageData = getSelectedImageData(editor)
    const filename = imageData?.alt || imageData?.title

    const success = await downloadSelectedImage(
      editor,
      filename,
      resolveFileUrl,
      downloadMethod
    )
    if (success) {
      onDownloaded?.(filename)
    }
    return success
  }, [editor, onDownloaded, resolveFileUrl, downloadMethod])

  useHotkeys(
    IMAGE_DOWNLOAD_SHORTCUT_KEY,
    (event) => {
      event.preventDefault()
      handleDownload()
    },
    {
      enabled: isVisible && canDownload,
      enableOnContentEditable: !isMobile,
      enableOnFormTags: true,
    }
  )

  return {
    isVisible,
    canDownload,
    handleDownload,
    label: "Download image",
    shortcutKeys: IMAGE_DOWNLOAD_SHORTCUT_KEY,
    Icon: ArrowDownToLineIcon,
  }
}