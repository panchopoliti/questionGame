module.exports.getRandomInt = (max) => {
  const random = Math.random();
  if (random === 1) {
    return max;
  } else {
    return Math.floor(random * (max+1));
  }
}

module.exports.isDuplicate = (arr, elem) => {
  const checkArr = arr.slice();

  if (checkArr.indexOf(elem) === -1) {
    return false;
  } else {
    checkArr.splice(checkArr.indexOf(elem), 1);
    return (checkArr.indexOf(elem) !== -1);
  }
};

module.exports.getKeyOfValue = (obj, value) => {
  if (!Object.values(obj).includes(value)) {
    return -1;
  }
  return Object.keys(obj)[Object.values(obj).indexOf(value)];
};

module.exports.closestEmptyNumber = (playersPlayingArr) => {
  let num = 1;
  while (playersPlayingArr.includes(num)) {
    ++num;
  }
  return num;
};

module.exports.isNumber = (str) => str !== null && isFinite(parseInt(str));
