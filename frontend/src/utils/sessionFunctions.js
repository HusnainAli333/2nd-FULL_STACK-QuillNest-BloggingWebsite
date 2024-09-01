function storeSession(key, value) {
  return sessionStorage.setItem(key, value);
}

function getSession(key) {
  return sessionStorage.getItem(key);
}
function removeSession(key) {
  return sessionStorage.removeItem(key);
}

export { storeSession, getSession, removeSession };
