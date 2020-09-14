const applyFilters = <T extends Record<string, any>, K>(
  item: T,
  filters: { [key in keyof T]: any }
) =>
  Object.entries(filters).reduce((acc, curr) => {
    const [key, value] = curr;
    return acc && Array.isArray(value)
      ? value.length === 0
        ? true
        : value.includes(item[key] as any)
      : value === item[key];
  }, true as boolean);

export { applyFilters };
