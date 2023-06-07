const express = require("express");
const router = express.Router();

// const nanoid  = require("nanoid");

const idLength = 8;

let books = [
  {
    id: 1,
    title: "Book Title 1",
    author: "Author 1",
    publicationDate: "2022-01-15",
    genre: "Fiction",
    available: true,
  },
  {
    id: 2,
    title: "Book Title 2",
    author: "Author 2",
    publicationDate: "2021-06-30",
    genre: "Mystery",
    available: false,
  },
  {
    id: 3,
    title: "Book Title 3",
    author: "Author 3",
    publicationDate: "2020-11-05",
    genre: "Science Fiction",
    available: true,
  },
];


//Defining Book Schema for Swagger
/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author 
 *       properties:
 *         id:
 *           type: number
 *           description: Auto-generated ID of the book
 *         title:
 *           type: string
 *           description: The Book title
 *         author:
 *           type: string
 *         publicationDate:
 *           type: string
 *         genre:
 *           type: string
 *         available:
 *           type: boolean
 *       example:
 *         id: 1
 *         title: Book Title
 *         author: Author Name
 *         publicationDate: 2022-01-15
 *         genre: Fiction
 *         available: true
 */

 
// Routes for Swagger

/**
 * @swagger
 * /books:
 *  get:
 *    summary: Returns the list of all books
 *    tags: [Books]
 *    responses:
 *      200:
 *        description: It will gives all list of books
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Book'
 */

/**
 * @swagger
 * tags:
 *  name: Books
 *  description: The Books managing api
 * 
 */





router.get("/", (req, res) => {
  res.send(books);
});

/**
 * @swagger
 * /books/{id}: 
 *   get:
 *     summary: Get the Book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *     responses:
 *       200:
 *         description: Book found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Book not found
 */


router.get("/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    const book = books.find((book) => book.id === id);
    if(book){
        res.send(book)
    }else{
        res.status(400).send("Book not Found")
    }
  } catch (error) {
    res.status(500).send(error);
  }
});


/**
 * @swagger
 * /books:
 *   post:
 *     summary: Add a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: The book was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       500:
 *         description: Some server error
 */


router.post("/", (req, res) => {
  try {
    const {id, title, author, publicationDate, genre, available } = req.body;
    const book = {id, title, author, publicationDate, genre, available };
    books.push(book);
    return res.send(book);
  } catch (error) {
    res.status(500).send(error);
  }
});


/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update the book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Book was updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Book was not found
 *       500:
 *         description: Some server error
 */

router.put("/:id",(req,res)=>{
    try {
        const id = Number(req.params.id)
        const { title, author, publicationDate, genre, available } = req.body;
        let book = books.find(book=>book.id===id)
        if(book){
            book = { title, author, publicationDate, genre, available };
            console.log(book)
            res.send(book)
        }else{
            res.status(404).send("Book not Found")
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports =  router;