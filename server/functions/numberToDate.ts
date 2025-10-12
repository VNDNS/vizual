export const numberToDate = (input: number) => {
  return new Date(input).toLocaleDateString('de-DE')
}
