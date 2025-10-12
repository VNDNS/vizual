export const processAudio = async (clips: any) => {
  const result = await fetch('http://localhost:3009/process-audio', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ clips }),
  });

  return result.json();
};
