export const getStorage = (key: string, defaultValue: string): string => {
  const storage = window.localStorage;

  try {
    const storedValue = storage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  } catch (e) {
    console.error(e);
    return defaultValue;
  }
};

export const updateStorage = (key: string, value: string): void => {
  const storage = window.localStorage;
  storage.setItem(key, JSON.stringify(value));
};
