export function csvToJson(csvString) {
  const lines = csvString.trim().split('\n');
  const headers = lines[0].split(',');
  const result = lines.slice(1).map(line => {
    const values = line.split(',');
    const obj = headers.reduce((acc, header, index) => {
      acc[header] = values[index];
      return acc;
    }, {});
    return obj;
  });

  return result;
}
