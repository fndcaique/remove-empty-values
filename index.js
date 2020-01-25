const person = {
  name: 'Fernando Caique Soares',
  email: null,
  age: 0,
  techs: [
    'Java',
    'JavaScript',
    null
  ],
  messages: [
    {
      from: null,
      to: 'fnd@mail.com',
      message: 'Hi little princess'
    }
  ]
}

const test = {
  a: {
    b: {
      c: null
    }
  }
}


function removeEmptyValuesRecursive(key, value) {
  if (value != null && value != undefined) {
    if (value instanceof Object) {
      let nValue = value instanceof Array ? [] : {};
      let keys = Object.keys(value);
      for (let i = 0; i < keys.length; i++) {
        if (value[keys[i]] != null && value[keys[i]] != undefined ||
          value[keys[i]] instanceof Array && value[keys[i]] && value[keys[i]].length > 0) {
          let novo2 = removeEmptyValuesRecursive(keys[i], value[keys[i]]);
          nValue[keys[i]] = novo2;
        }
      }
      return nValue;
    }
  }
  return value;
}

function isEmptyValue (value) {
  return value === null || value === undefined || value === '';
}

function removeEmptyValues(value) {
  let res = Object.assign({}, value);
  let no = res;
  const qNo = [];
  let keys;
  qNo.push(no);
  while (qNo.length > 0) {
    if (no) {
      no = qNo.shift();
      keys = Object.keys(no);
      for (let i = 0; i < keys.length; i++) {
        if (isEmptyValue(no[keys[i]])) {
          delete no[keys[i]];
        } else if (no[keys[i]] instanceof Array) {
          if (no[keys[i]].length === 0) {
            delete no[keys[i]];
          } else {
            const nArray = [];
            no[keys[i]].forEach(e => {
              if (!isEmptyValue(e)) {
                nArray.push(e);
              }
            });
            if (nArray.length === 0) {
              delete no[keys[i]];
            } else {
              no[keys[i]] = nArray;
              qNo.push(no[keys[i]]);
            }

          }
        } else if (no[keys[i]] instanceof Object) {
          qNo.push(no[keys[i]]);
        }
      }
    }
  }
  return res;
}

console.log(removeEmptyValuesRecursive(null, person));
console.log((removeEmptyValues(person)));
