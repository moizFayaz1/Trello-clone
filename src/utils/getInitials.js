export const getInitials = (name) => {
  if (!name) return "";
  const words = name.trim().split(" ");
  const first = words[0]?.[0] || "";
  const second = words[1]?.[0] || words[0]?.[1] || "";
  return (first + second).toUpperCase();
};
