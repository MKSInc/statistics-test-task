export default function getDataByField(data, fieldFilter) {
  const { field } = fieldFilter;

  if (field === 'clear') return data;

  const from = fieldFilter.from === '' ? 0 : fieldFilter.from;
  const to = fieldFilter.to === '' ? Infinity : fieldFilter.to;

  return data.filter((record) => ((record[field]) >= from) && (record[field] <= to));
}
