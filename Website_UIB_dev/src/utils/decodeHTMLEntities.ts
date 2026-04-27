export const decodeHtmlEntities = (str: string): string => {
  if (typeof window === "undefined") {
    return str
      .replace(/&quot;/g, '"')
      .replace(/&#34;/g, '"')
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
  }

  const txt = document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
};