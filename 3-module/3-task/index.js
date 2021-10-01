function camelize(str) {
  return str.split('-')
            .map((item, index) => (index) ? item[0].toUpperCase() + item.slice(1) : item)
            .join('');
}
