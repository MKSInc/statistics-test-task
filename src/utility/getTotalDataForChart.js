export default function getTotalDataForChart(data) {
  // Аккумулятор. В этом объекте суммируются все данные по всем встретившимся датам всех стран.
  const acc = {};

  data.forEach((record) => {
    const { year, month, day } = record;
    if (!(year in acc)) acc[year] = {};
    if (!(month in acc[year])) acc[year][month] = {};
    if (!(day in acc[year][month])) acc[year][month][day] = { cases: 0, deaths: 0};
    if (record.cases > 0) acc[year][month][day].cases += record.cases;
    if (record.deaths > 0) acc[year][month][day].deaths += record.deaths;
  });

  const result = [];

  // Так как целочисленные ключи в объекте перебираются в порядке возрастания, 
  // то перебирая объект, результирующий массив наполняется данными в соответствии с временным периодом.

  for (const year in acc) {
    for (const month in acc[year])
      for (const day in acc[year][month]) {
        result.push(acc[year][month][day]);
      }
  }

  return result;
}
