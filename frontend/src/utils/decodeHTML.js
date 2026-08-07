export const decodeHtml = (str) => {
  if (!str || typeof str !== "string") return str;
  
  const textarea = document.createElement("textarea");
  textarea.innerHTML = str;
  return textarea.value;
};