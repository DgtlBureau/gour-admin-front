export const getFoundStringPosition = (searchQuery: string, value: string): number => {
  const query = searchQuery.toLowerCase();
  const pos = value.toLowerCase().search(query);

  return pos;
};
