const createNoopStorage = () => ({
  getItem: async () => null,
  setItem: async (_key, value) => value,
  removeItem: async () => undefined,
});

const createBrowserStorage = () => {
  if (typeof window === 'undefined' || !window.localStorage) {
    return createNoopStorage();
  }

  return {
    getItem: async (key) => window.localStorage.getItem(key),
    setItem: async (key, value) => {
      window.localStorage.setItem(key, value);
      return value;
    },
    removeItem: async (key) => {
      window.localStorage.removeItem(key);
    },
  };
};

const persistStorage = createBrowserStorage();

export default persistStorage;
