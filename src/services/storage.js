export function getItemFromStorage(key) {
  return localStorage.getItem(key);
}

export function setItemToStorage(key, value) {
  localStorage.setItem(key, value);
}
