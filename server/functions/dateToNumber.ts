
export const dateToNumber = (input: string) => {
  const [day, month, year] = input.split('.').map(Number);
  return new Date(year, month - 1, day).getTime();
};
