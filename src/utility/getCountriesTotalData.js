export default function getCountriesTotalData(data, countriesList) {
  const result = {};

  countriesList.forEach(({ name: country }) => {
    result[country] = {
      totalCases: 0,
      totalDeaths: 0,
      casesPer1000: 0,
      deathsPer1000: 0,
      averageCasesPerDay: 0,
      averageDeathsPerDay: 0,
      maxCasesPerDay: 0,
      maxDeathPerDay: 0,
    };

    let countryPop = 0;
    let dayCount = 0;

    data
      .filter((record) => record.country === country)
      .forEach((record) => {
        dayCount += 1;
        // Для некоторых стран указано отрицательное количество случаев заболеваний.
        // Может это опечатка или способ убрать из статистики ошибочно выявленные случаи.
        // Так как причина мне не известна, то в этой ситуации я просто не учитываю отрицательные значения.
        result[country].totalCases += record.cases < 0 ? 0 : record.cases;
        result[country].totalDeaths += record.deaths;
        
        if (record.cases > result[country].maxCasesPerDay) result[country].maxCasesPerDay = record.cases;
        if (record.deaths > result[country].maxDeathPerDay) result[country].maxDeathPerDay = record.deaths;
        if (!countryPop) countryPop = record.popData2019;
      });
    
    // Для "Cases_on_an_international_conveyance_Japan" и "Wallis_and_Futuna" нет данных по населению.
    if (!countryPop) {
      result[country].casesPer1000 = 'Нет данных по населению';
      result[country].deathsPer1000 = 'Нет данных по населению';
    } else {
      result[country].casesPer1000 = +((result[country].totalCases * 1000) / countryPop).toFixed(3);
      result[country].deathsPer1000 = +((result[country].totalDeaths * 1000) / countryPop).toFixed(3);
    }
    
    result[country].averageCasesPerDay = +(result[country].totalCases / dayCount).toFixed(3);
    result[country].averageDeathsPerDay = +(result[country].totalDeaths / dayCount).toFixed(3);
  });
  
  return result;
}
