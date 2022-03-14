/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
const { Op } = require('@sequelize/core');
const _ = require('lodash');

const { Book } = require('../models/book');
const { Rating } = require('../models/rating');
const { User } = require('../models/user');
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
        include: Rating,
      });

      const allBookRating = rows.map((item) => {
        const rating = item.ratings.reduce((acc, cur) => acc + cur.rating, 0) / item.ratings.length;
        return { ...item.dataValues, rating };
      });
      res.json({ count, books: allBookRating });
    } catch (e) {
      res.status(500).json(e);
    }
  }

  static async getOneBook(req, res) {
    try {
      const book = await Book.findOne({
        where: {
          id: req.params.id,
        },
      });
      res.json(book);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  static async getComments(req, res) {
    try {
      const comments = await Comment.findAll({
        where: {
          bookId: req.params.id,
          parentId: null,
        },
        include: [
          { model: User }, { model: Comment, as: 'subComments', include: User },
        ],
      });
      res.json(comments);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  static async createComment(req, res) {
    try {
      const book = await Book.findByPk(req.params.id);
      const newComment = await book.createComment({
        bookId: req.params.id,
        userId: req.user.id,
        parentId: req.body.parentId,
        text: req.body.text,
      });

      res.json(newComment);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  static async updateRating(req, res) {
    try {
      const rating = await Rating.findOne({
        where: {
          bookId: req.params.id,
          userId: req.user.id,
        },
      });

      if (rating) {
        rating.rating = req.body.rating;
        await rating.save();
        res.json(rating);
      } else {
        const book = await Book.findByPk(req.params.id);

        const newRating = await book.createRating({
          rating: req.body.rating,
          bookId: req.params.id,
          userId: req.user.id,
        });
        res.json(newRating);
      }
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

  static async getUserRaiting(req, res) {
    try {
      const rating = await Rating.findOne({
        where: {
          bookId: req.params.id,
          userId: req.user.id,
        },
      });
      res.json(rating);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

module.exports = {
  BookController,
};
