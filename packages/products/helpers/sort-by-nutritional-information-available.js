module.exports = (products) => products.sort((a, b) => {
  if (!a.calcNutrition && b.calcNutrition) {
    return -1;
  }

  if (a.calcNutrition && !b.calcNutrition) {
    return 1;
  }

  return 0;
});
