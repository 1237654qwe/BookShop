const { BookController } = require('../controllers/BookController');
const authMiddleware = require('../middleware/authMiddleware');

const bookRoute = (router) => {
  router.post('/book', BookController.createBook);
  router.get('/book-filters', BookController.getFilters);

  router.get('/books', BookController.getBooks);
  router.get('/book/:id', BookController.getOneBook);
  router.get('/book/:id/comments', BookController.getComments);
  router.post('/book/:id/new-comment', authMiddleware, BookController.createComment);
  router.post('/book/:id/update-rating', authMiddleware, BookController.updateRating);
  router.get('/book/:id/user-rating', authMiddleware, BookController.getUserRaiting);
};

module.exports = {
  bookRoute,
};
