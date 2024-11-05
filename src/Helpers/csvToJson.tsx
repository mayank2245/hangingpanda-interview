import moment from "moment";

export function csvToJson(csvString) {
  const lines = csvString.trim().split('\n');
  const headers = lines[0].split(',').map(header => header.trim());

  const result = lines.slice(2).map(line => {
    const values = line.split(',').map(value => value.trim());

    const obj = {
      sn: parseInt(values[0], 10),
      question: values[1],
      type: values[2] === 'MCQ' ? 'MCQ' : 'Input',
      correctoption: null
    };

    if (obj.type === 'MCQ') {
      const optionsArray = values[3].split('^').map(option => option.trim());
      obj.options = {
        a: optionsArray[0],
        b: optionsArray[1],
        c: optionsArray[2],
        d: optionsArray[3],
      };
      if (values[4] !== "Don't fill") {
        Object.entries(obj.options).forEach(([key, value]) => {
          if (value == values[4]) {
            obj.correctOption = key;
          }

        });
      } else {
        obj.correctOption = null;
      }
    } else {
      obj.answer = values[3];
    }
    return obj;
  });

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
