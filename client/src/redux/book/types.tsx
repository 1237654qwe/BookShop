export type BookInfo = {
  id: number,
  title: string,
  img: string,
  author: string,
  discription: string,
  price: number,
  comment: string,
  rating: number,
  genre: string
};


export enum BookActionTypes {
  BOOK_LOADING = "BOOK_LOADING",
  BOOK_FAILED = "BOOK_FAILED",
  BOOK_SUCCESS = "BOOK_SUCCESS",
  BOOK_RATING = "BOOK_RATING",
  BOOK_COMMENTING = "BOOK_COMMENTING",
  BOOK_BUYING = "BOOK_BUYING"
};

interface IBookLoading {
  type: BookActionTypes.BOOK_LOADING
};

interface IBookFailed {
  type: BookActionTypes.BOOK_FAILED,
  payload: string
};

interface IBookSuccess {
  type: BookActionTypes.BOOK_SUCCESS,
  payload: BookInfo
};

interface IBookRating {
  type: BookActionTypes.BOOK_RATING
  payload: number
};

interface IBookCommenting {
  type: BookActionTypes.BOOK_RATING
  payload: number
};

interface IBookBuying {
  type: BookActionTypes.BOOK_RATING
  payload: number
};

export type BookActions =
  IBookLoading |
  IBookFailed |
  IBookSuccess |
  IBookRating |
  IBookCommenting |
  IBookBuying 