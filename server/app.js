/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const mainRouter = require('./routes/index');
const { Book } = require('./models/book');
const { User } = require('./models/user');
const { Rating } = require('./models/rating');
const { Comment } = require('./models/comment');

Book.hasMany(Rating);
Book.hasMany(Comment);

User.hasMany(Rating);
User.hasMany(Comment);

Rating.belongsTo(User);
Rating.belongsTo(Book);

Comment.belongsTo(User);
Comment.belongsTo(Book);
Comment.hasMany(Comment, { foreignKey: 'parentId', as: 'subComments' });

require('dotenv').config();

const app = express();
const port = 3001;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/', mainRouter);

app.use('/static', express.static(path.join(__dirname, 'static')));

app.listen(port, () => {
  console.log(`App port ${port}`);
});
