export const rotateArray = (array: any[], k: number) => {
  const rotated = [...array]
  for (let i = 0; i < k; i++) {
    rotated.push(rotated.shift())
  }
  return rotated
}