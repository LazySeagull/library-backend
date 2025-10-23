
let reviews = [];
let nextId = 1;

async function addReview({ userId, bookId, rating, comment }) {
  const review = {
    id: nextId++,
    userId,
    bookId,
    rating,
    comment,
    createdAt: new Date(),
  };
  reviews.push(review);
  return review;
}

async function getReviewsByBook(bookId) {
  return reviews.filter(r => r.bookId === bookId);
}

async function deleteReview(id) {
  const index = reviews.findIndex(r => r.id === id);
  if (index === -1) return false;
  reviews.splice(index, 1);
  return true;
}

async function getAllReviews() {
  return reviews;
}

module.exports = { addReview, getReviewsByBook, deleteReview, getAllReviews };
