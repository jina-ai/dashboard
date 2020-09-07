import { useMemo } from "react";
import { Index } from "lunr";

type Store<T> = Record<string | number | symbol, T>;

function useLunr<T = unknown>(
  query?: string,
  rawIndex?: Index | object | string,
  rawStore?: Store<T> | string
) {
  const index = useMemo(() => {
    if (rawIndex === undefined || rawIndex === null) {
      return;
    }
    if (rawIndex instanceof Index) return rawIndex;
    if (typeof rawIndex === "string") return Index.load(JSON.parse(rawIndex));
    if (typeof rawIndex === "object") return Index.load(rawIndex);
  }, [rawIndex]);

  const store = useMemo(() => {
    if (typeof rawStore === "string") return JSON.parse(rawStore) as Store<T>;

    return rawStore;
  }, [rawStore]);

  return useMemo(() => {
    if (!query || !index) return [];

    const results = index.search(query);

    if (store) {
      return results.map(({ ref }) => store[ref]);
    }

    return results;
  }, [query, index, store]);
}

export { useLunr };
