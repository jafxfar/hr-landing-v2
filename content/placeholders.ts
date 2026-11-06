export function isPlaceholder<T extends { placeholder?: boolean }>(
  item: T,
): boolean {
  return item.placeholder === true;
}

export function withoutPlaceholders<T extends { placeholder?: boolean }>(
  items: readonly T[],
): T[] {
  if (process.env.NODE_ENV === "production") {
    return items.filter((item) => !item.placeholder);
  }
  return [...items];
}

export function omitIfPlaceholder<T extends { placeholder?: boolean }>(
  block: T,
): T | null {
  if (process.env.NODE_ENV === "production" && block.placeholder) {
    return null;
  }
  return block;
}
