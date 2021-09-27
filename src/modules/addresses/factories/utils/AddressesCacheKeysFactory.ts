const DEFAULT_OFFSET = 0;
const DEFAULT_LIMIT = 5;

export default function addressesCacheKeysFactory() {
  function createKey(
    key: string,
    offset = DEFAULT_OFFSET,
    limit = DEFAULT_LIMIT,
  ) {
    let base = '';

    if (offset || limit) {
      base = `all-addresses-${key}-offset${offset}-limit${limit}`;

      return base;
    }

    return `${key}-address`;
  }

  return { createKey };
}
