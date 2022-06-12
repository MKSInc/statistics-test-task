export function getMinValue(data, field) {
  let minValue = Infinity;
  data.forEach((record) => {
    const recordMinValue = record[field];
    if (recordMinValue < minValue) minValue = recordMinValue;
  })
  return minValue;
};

export function getMaxValue(data, field) {
  let maxValue = -Infinity;
  data.forEach((record) => {
    const recordMaxValue = record[field];
    if (recordMaxValue > maxValue) maxValue = recordMaxValue;
  })
  return maxValue;
};

/**
 *  Рекурсивная функция. В зависимости от переданного колбэка вычисляет минимальную или максимальную дату.
 * 
 * @param {function} cb getMinValue или getMaxValue
 * @param {array} data - массив записей
 * @param {number} i - индекс для массива fields, определяющий по какому полю фильтровать.
 * @param {object} date - объект, в котором собираются найденные значения (year, month, day).
 * @returns вычисленная дата.
 */

export default function getMinMaxDate(cb, data, i = 0, date) {
  const fields = ['year', 'month', 'day'];
  if (i === fields.length) return new Date(date.year, date.month - 1, date.day);

  const field = fields[i];
  const value = cb(data, field);
  const newData = data.filter((records) => records[field] === value);

  date = {
    ...date,
    [field]: value,
  };

  return getMinMaxDate(cb, newData, i + 1, date);
}
