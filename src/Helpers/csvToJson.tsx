export function csvToJson(csvString) {
  // Split the CSV string into lines
  const lines = csvString.trim().split('\n');

  // Extract the headers from the first line
  const headers = lines[0].split(',');

  // Convert the remaining lines into JSON objects
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
