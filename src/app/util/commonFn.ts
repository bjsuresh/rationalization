import { AppSettings } from './appSetting';

function stringToSelectData(data: string) {
  return data.split(',').map((fieldName: string) => {
    let disObj: any = {};
    disObj['name'] = fieldName.trim().replace(/./, (c) => c.toUpperCase());
    disObj['value'] = fieldName.trim();
    return disObj;
  });
}

function stringToJson(data: string) {
  let jsonObj = JSON.parse(data);
  console.log(jsonObj);
  return jsonObj;
}

function sessionExpired() {
  localStorage.clear();
  sessionStorage.setItem(AppSettings.SS_EXPIRED, 'true');
}
function getStringBetween(str: string, start: string, end: string) {
  const result = str.match(new RegExp(start + '(.*)' + end));
  return result ? result[1] : '-';
}

// const testString = '124 photos in 22 photo albums';
// const myString = "P3M2DT17H42M56S980s364000n";
// console.log(getStringBetween(myString.split("T")[0], 'P', 'M'));

export { stringToSelectData, sessionExpired, getStringBetween};
