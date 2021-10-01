function getMinMax(str) {
  let numberArr = str.split(' ')
                    .filter((item) => isFinite(item))
                    .sort((a, b) => a - b);
  return {
    min: +numberArr[0],
    max: +numberArr[numberArr.length - 1],
  }
}
