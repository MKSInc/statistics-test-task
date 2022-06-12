const tableFields = [
  { name: 'country', text: 'Страна' },
  { name: 'cases', text: 'Количество случаев' },
  { name: 'deaths', text: 'Количество смертей' },
  { name: 'totalCases', text: 'Количество случаев всего' },
  { name: 'totalDeaths', text: 'Количество смертей всего' },
  { name: 'casesPer1000', text: 'Количество случаев на 1000 жителей' },
  { name: 'deathsPer1000', text: 'Количество смертей на 1000 жителей' },
  { name: 'averageCasesPerDay', text: 'Среднее количество случаев в день' },
  { name: 'averageDeathsPerDay', text: 'Среднее количество смертей в день' },
  { name: 'maxCasesPerDay', text: 'Максимальное количество случаев в день' },
  { name: 'maxDeathPerDay', text: 'Максимальное количество смертей в день' },
];

export default tableFields;

export const tableFilterFields = tableFields.filter((field) => field.name !== 'country');
tableFilterFields.unshift({ name: 'clear', text: 'Снять фильтр' });
