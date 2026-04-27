"use client"

import type { Action } from "@/components/tiptap-ui-primitive/menu/menu-types"


export function filterMenuItems(
  { items = [], ...group }: Action,
  searchValue: string
): Action[] {
  if (!searchValue.trim()) return items

  const normalizedSearchValue = searchValue.toLowerCase().trim()

  const groupKeywords = [group.label, ...(group.keywords || [])]
    .filter(Boolean)
    .join(" ")
    .toLowerCase()

  if (groupKeywords.includes(normalizedSearchValue)) {
    return items
  }

  return items.filter((item) => {
    if (item.filterItems) return true

    const itemKeywords = [item.label, item.value, ...(item.keywords || [])]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()

    return itemKeywords.includes(normalizedSearchValue)
  })
}


export function filterMenuGroups(
  menuGroups: Action[],
  searchValue: string
): Action[] {
  if (!searchValue.trim()) return menuGroups

  return menuGroups.reduce<Action[]>((acc, group) => {
    const filteredItems = filterMenuItems(group, searchValue)

    if (filteredItems.length > 0) {
      acc.push({
        ...group,
        items: filteredItems,
      })
    }

    return acc
  }, [])
}