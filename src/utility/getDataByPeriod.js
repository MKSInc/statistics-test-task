export default function getDataByPeriod(data, date) {
  const dataByPeriod = data.filter((record) => {
    const recordDate = new Date(record.year, record.month - 1, record.day);
    if (recordDate >= date.start && recordDate <= date.end) {
      return true;
    }
    return false;
  });

  return dataByPeriod;
}
