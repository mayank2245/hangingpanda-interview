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
      console.log(optionsArray, "-------------------")
      obj.options = {
        a: optionsArray[0],
        b: optionsArray[1],
        c: optionsArray[2],
        d: optionsArray[3],
      };
      if (values[4] !== "Don't fill") {
        Object.entries(obj.options).forEach(([key, value]) => {
          if (value == values[4]) {
            console.log(value, "value")
            console.log(key, "-key-")
            obj.correctOption = key;
          }

        });
      } else {
        obj.correctOption = null;
      }
    } else {
      obj.answer = values[3];
    }
    console.log(obj, "-----obje")
    return obj;
  });

  return result;
}


export function csvToJsonStudent(csvString) {
  const lines = csvString.trim().split('\n');
  const headers = lines[0].split(',').map(header => header.trim());
  const result = lines.slice(2).map(line => {
    const values = line.split(',').map(value => value.trim());
    const obj = {
      sn: parseInt(values[0], 10),
      name: values[1],
      email: values[2],
      paperType: values[3],
      interviewDate: values[4],
      interviewTime: values[5]
    };
    return obj;
  });
  return result;
}