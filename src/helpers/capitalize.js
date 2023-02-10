export const capitalize = (str) => {
  if (str) return `${str.charAt(0).toUpperCase()}${str.substring(1)}`;
  return "";
};
