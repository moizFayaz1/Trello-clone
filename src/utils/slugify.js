export const slugify = (name) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-");
};
