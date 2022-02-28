const { Book } = require('../models/book')
const { Comment } = require('../models/comment')
const { Op } = require('@sequelize/core');

class BookController {
  static async createBook(req, res) {
    try {
      const { id, title, author, description, genre, price, rating, coverUrl } = req.body

      const book = await Book.create({
        id: id,
        title: title,
        author: author,
        description: description,
        genre: genre,
        price: price,
        rating: rating,
        coverUrl: coverUrl,
      })

      res.json(book);
    } catch (e) {
      return e;
    }
  };

  static async getBooks(req, res) {
    try {

      const { page, limit, author, genre, price } = req.query
      const newPage = page || 1
      const newLimit = limit || 9
      const offset = newPage * newLimit - newLimit


      const { count, rows } = await Book.findAndCountAll({
        where: {
          [Op.and]: {
            ...(author ? {
              author: {
                [Op.like]: `%${author}%`
              }
            } : {}),
            ...(genre ? {
              genre: genre
            } : {}),
            ...(price ? {
              price: {
                [Op.between]: [price[0], price[1]]
              }
            } : {}),
          }
        },
        offset: offset,
        limit: newLimit
      });

      res.json({ count, books: rows });
    } catch (e) {
      res.status(500).json(e);
      console.log(e)
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
      const { user, text } = req.body

      const comment = await Comment.create({
        user: user,
        text: text,
      })

      res.json(comment);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  static async updateRating(req, res) {
    try {
      const { rating } = req.body

      const ratingBook = await Book.update({
        rating: rating,
      },
        {
          where: {
            id: req.params.id
          }
        }
      )

      res.json(ratingBook)
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

module.exports = {
  BookController,
};