module.exports = (products, sortBy) => products.sort((a, b) => {
  if (!a.calcNutrition.calcNutrients) {
    return 1;
  }

  if (!b.calcNutrition.calcNutrients) {
    return 1;
  }

  if (!a.calcNutrition.calcNutrients && !b.calcNutrition.calcNutrients) {
    return 0;
  }

  const aItem = a.calcNutrition.calcNutrients.find(item => item.name.toLowerCase().includes(sortBy));
  const bItem = b.calcNutrition.calcNutrients.find(item => item.name.toLowerCase().includes(sortBy));

  console.log(aItem);
  console.log(bItem);

  if (!aItem || !aItem.valuePer100) {
    return 1;
  }

  if (!bItem || !bItem.valuePer100) {
    return -1;
  }

  if ((!aItem && !bItem) || (!aItem.valuePer100 || !bItem.valuePer100)) {
    return 0;
  }

  const aVal = parseFloat(aItem.valuePer100, 10);
  const bVal = parseFloat(bItem.valuePer100, 10);

  return bVal < aVal;
});
