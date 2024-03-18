export const getStorage = <T>(key: string, defaultValue: T): T => {
  const storage = window.localStorage;

  try {
    const storedValue = storage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  } catch (e) {
    console.error(e);
    return defaultValue;
  }
};

export const updateStorage = <T>(key: string, value: T): void => {
  const storage = window.localStorage;
  storage.setItem(key, JSON.stringify(value));
};
