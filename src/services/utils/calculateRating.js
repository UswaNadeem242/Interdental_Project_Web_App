export const calculateRating = (product) => {
  if (!product?.ratings || product?.ratings.length === 0) {
    return 0;
  }

  const totalRating = product?.ratings.reduce(
    (sum, item) => sum + item.rating,
    0,
  );
  const averageRating = totalRating / product?.ratings?.length; // Division ensures it stays within 0-5

  return averageRating.toFixed(1);
};