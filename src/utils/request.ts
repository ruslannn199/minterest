export const request = async (url: string, options?: RequestInit) => {
  return fetch(`http://localhost:8000/${url}`, options);
};
