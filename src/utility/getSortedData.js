export default function getSortedData(data, sort) {
  const sortedDate = [...data];
  const { field } = sort;

  const ab = {
    bigger: 1,
    lower: -1,
    toggle() {
      this.bigger = -1;
      this.lower = 1;
    }
  };

  if (sort.state === 'sort-up') ab.toggle();

  sortedDate.sort((a, b) => {
    if (a[field] > b[field]) return ab.bigger;
    if (a[field] < b[field]) return ab.lower;
    return 0;
  });

  return sortedDate;
}
