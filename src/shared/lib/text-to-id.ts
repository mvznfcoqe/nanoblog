export const textToId = (text: string) => {
  return text.replaceAll(" ", "_").toLowerCase();
};
