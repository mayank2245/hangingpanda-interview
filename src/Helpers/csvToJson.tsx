import moment from "moment";

export function csvToJson(csvString) {
  // A basic CSV parsing function that handles quoted fields with commas inside
  function parseCSVLine(line) {
    const regex = /(?:[^,"]|"(?:\\.|[^"])*")+/g;
    return line.match(regex).map(field => field.replace(/^"|"$/g, '').replace(/\\"/g, '"').trim());
  }

  // Split the CSV string into lines (rows).
  const lines = csvString.trim().split('\n');

  // Extract headers from the first line.
  const headers = parseCSVLine(lines[0]);

  // Initialize result array.
  const result = [];

  // Loop through the remaining lines (starting from the second line if there's data).
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line) {  // Skip empty lines.
      const values = parseCSVLine(line);

      const obj = {
        sn: parseInt(values[0], 10),
        question: values[1],
        type: values[2] === 'MCQ' ? 'MCQ' : 'Input',
        correctOption: null
      };

      if (obj.type === 'MCQ') {
        const optionsArray = values[3].split('^').map(option => option.trim());
        obj.options = {
          a: optionsArray[0],
          b: optionsArray[1],
          c: optionsArray[2],
          d: optionsArray[3],
        };
        // If there's a correct answer specified, mark it.
        if (values[4] !== "Don't fill") {
          Object.entries(obj.options).forEach(([key, value]) => {
            if (value == values[4]) {
              obj.correctOption = key;
            }
          });
        }
      } else {
        obj.answer = values[3];
      }

      // Add the constructed object to the result array.
      result.push(obj);
    }
  }

  return result;
}



export function csvToJsonStudent(csvString) {
  const lines = csvString.trim().split('\n');
  const headers = lines[0].split(',').map(header => header.trim());
  const result = lines.slice(1).map(line => {
    const values = line.split(',').map(value => value.trim());
    let dateTimeString = `${moment(values[4], 'DD/MM/YY').format('YYYY-MM-DD')} ${moment(values[5], 'HH:mm').format('HH:mm:ss')}`;
    let momentObj = moment(dateTimeString, 'YYYY-MM-DD HH:mm:ss');
    let dateTime = momentObj.format('YYYY-MM-DDTHH:mm:ss');
    const obj = {
      sn: parseInt(values[0], 10),
      name: values[1],
      email: values[2],
      questionPaperType: values[3],
      interviewDate: dateTime,
    };
    return obj;
  });
  return result;
}
