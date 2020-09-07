const applyFilters = <T extends object>(
  item: T,
  filters: { [key in keyof T]: any[] }
) =>
  Object.entries(filters).reduce((acc, curr) => {
    const [key, value] = curr;
    return acc && Array.isArray(value)
      ? value.length === 0
        ? true
        : value.includes(item[key as keyof T])
      : value === item[key as keyof T];
  }, true);

export { applyFilters };
