export const GetNamaFileDariLinkBucket = (url: string) => {
  try {
    return new URL(url).pathname.split("/").pop() || "";
  } catch {
    return "";
  }
};
