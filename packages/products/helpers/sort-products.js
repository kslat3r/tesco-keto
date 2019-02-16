module.exports = products => products.sort((a, b) => {
  if (!a.calcNutrition.calcNutrients) {
    return 1;
  }

  if (!b.calcNutrition.calcNutrients) {
    return 1;
  }

  if (!a.calcNutrition.calcNutrients && !b.calcNutrition.calcNutrients) {
    return 0;
  }

  const aCarbsItem = a.calcNutrition.calcNutrients.find(item => item.name.toLowerCase().includes('Carbohydrate'));
  const bCarbsItem = b.calcNutrition.calcNutrients.find(item => item.name.toLowerCase().includes('Carbohydrate'));

  if (!aCarbsItem || !aCarbsItem.valuePer100) {
    return 1;
  }

  if (!bCarbsItem || !bCarbsItem.valuePer100) {
    return -1;
  }

  if ((!aCarbsItem && !bCarbsItem) || (!aCarbsItem.valuePer100 || !bCarbsItem.valuePer100)) {
    return 0;
  }

  if (!aCarbsItem) {
    return 1;
  }

  if (!bCarbsItem) {
    return -1;
  }

  if (!aCarbsItem && !bCarbsItem) {
    return 0;
  }

  const aCarbs = parseInt(aCarbsItem.valuePer100, 10);
  const bCarbs = parseInt(bCarbsItem.valuePer100, 10);

  return bCarbs > aCarbs;
});
