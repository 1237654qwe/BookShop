const { BookController } = require('../controllers/BookController');

const bookRoute = (router) => {
  router.post('/book', (req, res) => BookController.createBook(req, res));
  router.get('/book-filters', (req, res) => BookController.getFilters(req, res));

  router.get('/books', (req, res) => BookController.getBooks(req, res));
  router.get('/book/:id', (req, res) => BookController.getOneBook(req, res));
  router.post('/comment', (req, res) => BookController.createComment(req, res));
  router.post('/updateRating', (req, res) => BookController.updateRating(req, res));
};

module.exports = {
  bookRoute,
};
