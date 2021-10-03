function filterRange(arr, a, b) {
  return arr.slice()
            .filter((item) => item >= a && item <= b);
}
