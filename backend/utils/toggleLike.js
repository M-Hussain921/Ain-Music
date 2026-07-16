export const toggleLike = (arr=[], id) => {
  const exists = arr.includes(id);
  return {
    updatedArray: exists ? arr.filter((item) => item !== id) : [...arr, id],
    exists,
  };
};
