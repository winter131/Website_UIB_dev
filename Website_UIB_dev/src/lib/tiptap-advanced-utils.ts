import type { Attrs, Node } from "@tiptap/pm/model"
import { findNodePosition, isValidPosition } from "@/lib/tiptap-utils"
import { type Editor } from "@tiptap/react"
import { NodeSelection, TextSelection } from "@tiptap/pm/state"


export function chunkArray<T>(array: Array<T>, size: number): Array<Array<T>> {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
    array.slice(index * size, index * size + size)
  )
}


export function hasContentAbove(editor: Editor | null): {
  hasContent: boolean
  content: string
} {
  if (!editor) return { hasContent: false, content: "" }

  const { state } = editor
  const { $from } = state.selection

  for (let i = $from.index(0) - 1; i >= 0; i--) {
    const node = state.doc.child(i)
    const content = node.textContent.trim()

    if (content) {
      return { hasContent: true, content }
    }
  }

  return { hasContent: false, content: "" }
}


export function getActiveMarkAttrs(
  editor: Editor | null,
  markName: string
): Attrs | null {
  if (!editor) return null

  const { state } = editor
  const { from, to, empty, $from } = state.selection

  if (empty) {
    const mark = $from.marks().find((m) => m.type.name === markName)
    return mark?.attrs ?? null
  }

  const seen = new Set<string>()
  let foundAttrs: Attrs | null = null

  state.doc.nodesBetween(from, to, (node) => {
    if (!node.isText) return

    for (const mark of node.marks) {
      if (mark.type.name === markName && !seen.has(mark.type.name)) {
        seen.add(mark.type.name)
        foundAttrs = mark.attrs
      }
    }
  })

  return foundAttrs
}


export function findSelectionPosition(params: {
  editor: Editor
  node?: Node | null
  nodePos?: number | null
}): number | null {
  const { editor, node, nodePos } = params

  if (isValidPosition(nodePos)) return nodePos

  if (node) {
    const found = findNodePosition({ editor, node })
    if (found) return found.pos
  }

  const { selection } = editor.state
  if (!selection.empty) return null

  const resolvedPos = selection.$anchor
  const nodeDepth = 1
  const selectedNode = resolvedPos.node(nodeDepth)

  return selectedNode ? resolvedPos.before(nodeDepth) : null
}


export function getSelectedDOMElement(editor: Editor): HTMLElement | null {
  const { state, view } = editor
  const { selection } = state

  if (selection instanceof NodeSelection) {
    return view.nodeDOM(selection.from) as HTMLElement | null
  }

  if (selection instanceof TextSelection) {
    const $anchor = selection.$anchor

    if ($anchor.depth >= 1) {
      const dom = view.nodeDOM($anchor.before(1))
      if (dom instanceof HTMLElement) {
        return dom
      }
    }
  }

  return null
}


export function getClosestNode(
  editor: Editor | null,
  options?: {
    nodeName?: string
    isBlock?: boolean
    predicate?: (node: Node) => boolean
  }
) {
  if (!editor) return null

  const { selection } = editor.state
  const { $from } = selection
  const { nodeName, isBlock = true, predicate } = options || {} 

  let depth = $from.depth
  while (depth > 0) {
    const node = $from.node(depth)

    const matchesName = !nodeName || node.type.name === nodeName
    const matchesBlock = node.type.isBlock === isBlock
    const matchesPredicate = !predicate || predicate(node)

    if (matchesName && matchesBlock && matchesPredicate) {
      const pos = $from.before(depth)
      return { node, pos, depth }
    }
    depth--
  }
  return null
}


export function getClosestNodeByPos(
  editor: Editor | null,
  pos: number,
  options?: {
    nodeName?: string
    isBlock?: boolean
    predicate?: (node: Node) => boolean
  }
) {
  if (!editor) return null

  const docSize = editor.state.doc.content.size
  if (pos < 0 || pos > docSize) {
    console.warn(`Position ${pos} is out of bounds (doc size: ${docSize})`)
    return null
  }

  try {
    const $pos = editor.state.doc.resolve(pos)
    const { nodeName, isBlock = true, predicate } = options || {}

    let depth = $pos.depth
    while (depth > 0) {
      const node = $pos.node(depth)

      const matchesName = !nodeName || node.type.name === nodeName
      const matchesBlock = node.type.isBlock === isBlock
      const matchesPredicate = !predicate || predicate(node)

      if (matchesName && matchesBlock && matchesPredicate) {
        const nodePos = $pos.before(depth)
        return { node, pos: nodePos, depth }
      }
      depth--
    }
    return null
  } catch (error) {
    console.error("Error resolving position:", error)
    return null
  }
}


export function getClosestBlockNode(editor: Editor | null) {
  return getClosestNode(editor, { isBlock: true })
}


export function getClosestNodeByName(editor: Editor | null, nodeName: string) {
  return getClosestNode(editor, { nodeName })
}


export function getAllMatchingNodes(
  editor: Editor | null,
  options?: {
    nodeName?: string
    isBlock?: boolean
    predicate?: (node: Node) => boolean
  }
) {
  if (!editor) return []

  const { selection } = editor.state
  const { nodeName, isBlock = true, predicate } = options || {}
  const matches = []

  const nodeMatches = (node: Node) => {
    const matchesName = !nodeName || node.type.name === nodeName
    const matchesBlock = node.type.isBlock === isBlock
    const matchesPredicate = !predicate || predicate(node)
    return matchesName && matchesBlock && matchesPredicate
  }

  if (selection instanceof NodeSelection) {
    const selectedNode = selection.node
    if (nodeMatches(selectedNode)) {
      matches.push({
        node: selectedNode,
        pos: selection.from,
        depth: 0,
      })
    }
  }

  const { $from } = selection
  let depth = $from.depth

  while (depth > 0) {
    const node = $from.node(depth)

    if (nodeMatches(node)) {
      const pos = $from.before(depth)
      matches.push({ node, pos, depth })
    }
    depth--
  }

  return matches
}


export function getAnchorNodeAndPos(
  editor: Editor | null,
  allowEmptySelection: boolean = true
): { node: Node; pos: number } | null {
  if (!editor) return null

  const { state } = editor
  const { selection } = state

  if (selection instanceof NodeSelection) {
    const node = selection.node
    const pos = selection.from

    if (node && isValidPosition(pos)) {
      return { node, pos }
    }
  }

  if (selection.empty && !allowEmptySelection) return null

  const $anchor = selection.$anchor
  const depth = 1 
  const node = $anchor.node(depth)
  const pos = $anchor.before(depth)

  return { node, pos }
}


export function selectionHasText(editor: Editor | null): boolean {
  if (!editor) return false

  const { state } = editor
  const { selection, doc } = state

  if (selection.empty) return false

  const text = doc.textBetween(selection.from, selection.to, "\n", "\0")
  return text.trim().length > 0
}


export function getEditorExtension(
  editor: Editor | null,
  extensionName: string
) {
  if (!editor) return null

  const extension = editor.extensionManager.extensions.find(
    (ext) => ext.name === extensionName
  )

  if (!extension) {
    console.warn(
      `Extension "${extensionName}" not found in the editor schema. Ensure it is included in the editor configuration.`
    )
    return null
  }

  return extension
}