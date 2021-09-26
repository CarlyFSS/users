export default function AddressesCacheKeysFactory() {
  function createKey(key: string, offset = 0, limit = 5) {
    let base = '';

    if (offset || limit) {
      base = `all-addresses-${key}-offset${offset}-limit${limit}`;

      return base;
    }

    return `${key}-address`;
  }

  return { createKey };
}
