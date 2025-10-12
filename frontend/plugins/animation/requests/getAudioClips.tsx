export const getAudioClips = async () => {
  const result = await fetch('http://localhost:3009/get-audio', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  return result.json();
};
