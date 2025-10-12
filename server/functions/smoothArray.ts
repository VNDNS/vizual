export const smoothArray = (array: number[], smoothFactor: number = 1): number[] => {
  if (array.length === 0) return []
  if (smoothFactor === 0) return [...array]
  
  const smoothed: number[] = [...array]
  
  for (let iteration = 0; iteration < smoothFactor; iteration++) {
    for (let i = 1; i < smoothed.length - 1; i++) {
      const left = smoothed[i - 1]
      const current = smoothed[i]
      const right = smoothed[i + 1]
      
      smoothed[i] = (left + current + right) / 3
    }
  }

  return smoothed
}