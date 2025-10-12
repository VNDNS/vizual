const generateImagePrompt = 
`recreate this object in the style of an illustration created  in Adobe Illustrator: 
vector artwork, no contours, smooth gradients, and a modern flat design.
make sure to not include any backgorund. The object itself should not have any transparent areas.
`

export const generateImage = async (image: string, p1: { x: number; y: number; }, p2: { x: number; y: number; }, name: string) => {
  
  console.log('generateImage data:', image, p1, p2, name);
  const result = await fetch('http://localhost:3009/crop-image', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      image,
      p1,
      p2,
      prompt: generateImagePrompt,
      name,
    }),
  });

  return (await result.json());
};
