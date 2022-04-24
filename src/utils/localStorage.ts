export const setLocalStorageKey = (key: string, value: any) => {
  if (window.localStorage) {
    const getExistingLocalStorageValue = window.localStorage.getItem(key);
    if (getExistingLocalStorageValue) {
      const existing = JSON.parse(getExistingLocalStorageValue);
      const combined = [...existing, ...value];
      window.localStorage.setItem(key, JSON.stringify(combined));
    } else {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
    return true;
  } else {
    return false;
  }
};

export const getLocalStorageKey = (key: string) => {
  if (window.localStorage) {
    const getLocalStorageValue = window.localStorage.getItem(key);
    if (getLocalStorageValue) return JSON.parse(getLocalStorageValue);
    return false;
  } else {
    return false;
  }
};
