export const searchImages = async (query: string) => {
  const result = await fetch('http://localhost:3009/search-images', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query,
    }),
  });

  return result.json();
};
