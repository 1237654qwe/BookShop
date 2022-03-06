const { BookController } = require('../controllers/BookController');
const authMiddleware = require('../middleware/authMiddleware');

const bookRoute = (router) => {
  router.post('/book', (req, res) => BookController.createBook(req, res));
  router.get('/book-filters', (req, res) => BookController.getFilters(req, res));

  router.get('/books', (req, res) => BookController.getBooks(req, res));
  router.get('/book/:id', (req, res) => BookController.getOneBook(req, res));
  router.get('/book/:id/comments', (req, res) => BookController.getComments(req, res));
  router.post('/book/:id/new-comment', authMiddleware, (req, res) => BookController.createComment(req, res));
  router.post('/book/:id/update-rating', authMiddleware, (req, res) => BookController.updateRating(req, res));
};

module.exports = {
  bookRoute,
};
