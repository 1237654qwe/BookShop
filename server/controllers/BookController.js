const { Op } = require('@sequelize/core');
const _ = require('lodash');

const { Book } = require('../models/book');
const { Comment } = require('../models/comment');

class BookController {
  static async createBook(req, res) {
    try {
      const {
        id,
        title,
        author,
        description,
        genre,
        price,
        rating,
        coverUrl,
      } = req.body;

      const book = await Book.create({
        id,
        title,
        author,
        description,
        genre,
        price,
        rating,
        coverUrl,
      });

      res.json(book);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  static async getBooks(req, res) {
    try {
      const {
        page,
        limit,
        author,
        genre,
        price,
      } = req.query;
      const newPage = page || 1;
      const newLimit = limit || 9;
      const offset = newPage * newLimit - newLimit;

      const { count, rows } = await Book.findAndCountAll({
        where: {
          [Op.and]: {
            ...(author ? {
              author: {
                [Op.like]: `%${author}%`,
              },
            } : {}),
            ...(genre ? {
              genre,
            } : {}),
            ...(price ? {
              price: {
                [Op.between]: [price[0], price[1]],
              },
            } : {}),
          },
        },
        offset,
        limit: newLimit,
      });

      res.json({ count, books: rows });
    } catch (e) {
      res.status(500).json(e);
    }
  }

  static async getOneBook(req, res) {
    try {
      const book = await Book.findOne({ id: req.body.id });
      res.json(book);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  static async createComment(req, res) {
    try {
      const { user, text } = req.body;

      const comment = await Comment.create({
        user,
        text,
      });

      res.json(comment);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  static async updateRating(req, res) {
    try {
      const { rating } = req.body;

      const ratingBook = await Book.update(
        {
          rating,
        },
        {
          where: {
            id: req.params.id,
          },
        },
      );

      res.json(ratingBook);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  static async getFilters(req, res) {
    try {
      const books = await Book.findAll();
      const bookAuthor = books.map((item) => item.author);
      const bookGenre = books.map((item) => item.genre);
      const filtredAuthor = _.uniq(bookAuthor);
      const filtredGenre = _.uniq(bookGenre);

      res.json({
        filtredAuthor,
        filtredGenre,
      });
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

module.exports = {
  BookController,
};
