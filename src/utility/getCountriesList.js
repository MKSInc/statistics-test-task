export default function getCountriesList(data) {
  const list = [];
  data.forEach((record) => {
    if (!list.find((item) => item.name === record.country)) list.push({
      name: record.country,
      text: record.country,
    });
  })

  return list.reverse();
}
