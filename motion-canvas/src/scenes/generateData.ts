export const generateData = (n: number, m: number, names?: string[]) => {
  const result: any = {};

  const startDate = new Date('2025-01-01');
  const endDate = new Date('2025-12-31');
  const totalDays = Math.floor((endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000));
  
  for (let i = 0; i < n; i++) {
    const dataArray: any = [];
    
    for (let j = 0; j < m; j++) {
      const dayOffset = Math.floor((j / (m - 1)) * totalDays);
      const currentDate = new Date(startDate.getTime() + dayOffset * 24 * 60 * 60 * 1000);
      const value = Math.floor(Math.random() * 15000);
      dataArray.push({t: currentDate.toLocaleDateString('de-DE'), value});
    }
    
    result[names[i]] = { values: dataArray };
  }
  
  return result;
}