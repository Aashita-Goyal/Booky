require("dotenv").config();


//framework
const express = require("express");
const mongoose = require("mongoose");

//Database
const database = require("./database");

//Models
const BookModel = require("./book");
const AuthorModel = require("./author");
const PublicationModel = require("./publication");

//Initialization
const booky = express();

//configuration
booky.use(express.json());

//console.log


//Establish Database connection
mongoose
.connect(
    process.env.MONGO_URL , {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true

    }
)
.then(() => console.log("Connection Established!"));





/*  Books API 1
Route             /
Description       get all books
Access            public (no password entered)
Parameter         none
Methods           GET    
*/
booky.get("/", async (req, res) => {
    const getAllBooks = await BookModel.find();
    return res.json({books: getAllBooks});
});



/*  Books API 2
Route             /is
Description       get specific books
Access            public (no password entered)
Parameter         isbn
Methods           GET    
*/
booky.get("/is/:isbn", async (req, res) => {
    const getSpecificBook = await BookModel.findOne({ISBN: req.params.isbn})


   /* const getSpecificBook = database.books.filter(
        (book) => book.ISBN === req.params.isbn
    ); */

    if(!getSpecificBook){
        return res.json({
            error: `No book found for the isbn of ${req.params.isbn}`,
        });
    }
    return res.json({book: getSpecificBook});
});


/*  Books API 3
Route             /c
Description       get books based on category
Access            public (no password entered)
Parameter         category
Methods           GET    
*/
booky.get("/c/:category", (req,res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.category.includes(req.params.category)
    );

    if (getSpecificBook.length === 0){
        return res.json({
            error: `No book found for the given category of ${req.params.category}`,

        });
    }
    return res.json({book: getSpecificBook});
});


/*  Books API 4
Route             /lang
Description       get list of books based on languages
Access            public (no password entered)
Parameter         language
Methods           GET    
*/
booky.get("/lang/:language", (req, res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.language === req.params.language
    );

    if(getSpecificBook.length === 0){
        return res.json({
            error: `No book found in the language ${req.params.language}`,
        });
    }
    return res.json({book: getSpecificBook});
});



/*  Author API 1
Route             /authors
Description       get all authors
Access            public (no password entered)
Parameter         none
Methods           GET    
*/
booky.get("/authors", (req, res) => {

    return res.json({authors: database.author});
});


/*  Author API 2
Route             /author/name
Description       get specific authors
Access            public (no password entered)
Parameter         id
Methods           GET    
*/
booky.get("/author/name/:name", (req, res) => {
    const getSpecificAuthor = database.author.filter((author) =>
      author.name.includes(req.params.name)
    );

    if(getSpecificAuthor.length === 0){
        return res.json({
            error: `No author found for the id ${req.params.id}`,
        });
    }
    return res.json({authors: getSpecificAuthor});
});


/*  Author API 3
Route             /author/book
Description       get authors based on books
Access            public (no password entered)
Parameter         isbn
Methods           GET    
*/
booky.get("/author/book/:isbn", (req, res) => {
  const getSpecificAuthor = database.author.filter((author) =>
    author.books.includes(req.params.isbn)
  );

  if (getSpecificAuthor.length === 0) {
    return res.json({
      error: `No Author found for the book of ${req.params.isbn}`,
    });
  }

  return res.json({ authors: getSpecificAuthor });
});




/*  Publication API 1
Route             /publications
Description       get all publications
Access            public (no password entered)
Parameter         none
Methods           GET    
*/
booky.get("/publications", (req, res) => {

    return res.json({publications: database.publication});
});


/*  Publication API 2
Route             /publications/name
Description       get specific publications
Access            public (no password entered)
Parameter         name
Methods           GET    
*/
booky.get("/publications/name/:name", (req, res) => {
    const getSpecificPublication = database.publication.filter((publication) =>
      publication.name.includes(req.params.name)
    );
  
    if (getSpecificPublication.length === 0) {
      return res.json({
        error: `No Publication found with the name  ${req.params.name}`,
      });
    }
  
    return res.json({ authors: getSpecificPublication });
  });


  /*  Publication API 3
Route             /publications/book
Description       get specific publications based on books
Access            public (no password entered)
Parameter         books
Methods           GET    
*/
booky.get("/publications/book/:books", (req, res) => {
    const getSpecificPublication = database.publication.filter((publication) =>
      publication.books.includes(req.params.books)
    );
  
    if (getSpecificPublication.length === 0) {
      return res.json({
        error: `No Publication found with the name  ${req.params.books}`,
      });
    }
  
    return res.json({ authors: getSpecificPublication });
  });






  




  /*  Books API 5
Route             /book/add
Description       add new book
Access            public (no password entered)
Parameter         none
Methods           POST 
*/
booky.post("/book/add", (req,res) => {
    console.log(req.body);
    const {newBook} = req.body;
    database.books.push(newBook);
    return res.json({books: database.books});
});


/*  Author API 4
Route             /author/add
Description       add new author
Access            public (no password entered)
Parameter         none
Methods           POST 
*/
booky.post("/author/add", (req,res) => {
    const {newAuthor} = req.body;
    database.author.push(newAuthor);
    return res.json({authors: database.author});

});



/*  Publication API 4
Route             /publication/add
Description       add new publication
Access            public (no password entered)
Parameter         none
Methods           POST  
*/
booky.post("/publication/add", (req,res) => {
    const {newPublication} = req.body;
    database.publication.push(newPublication);
    return res.json({publications: database.publication});

});












/*  Books API 6
Route             /book/update
Description       update  book title
Access            public (no password entered)
Parameter         isbn
Methods           PUT  
*/
booky.put("/book/update/:isbn", async (req, res) => {

    const updateBook = await BookModel.findOneAndUpdate({
        ISBN: req.params.isbn,
    },
    {
        title:req.body.BookTitle,
    },
    {
        new:true,
    }
);



  /*  //Two approaches - forEach or Map
    //using forEach
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn){
            book.title = req.body.newBookTitle;
            return;
        }
    }); */
    return res.json({books: updateBook}); 
});




/*  Books API 7
Route             /book/update/author
Description       update/add new author
Access            public (no password entered)
Parameter         isbn
Methods           PUT  
*/
booky.put("/book/update/author/:isbn/:authorId", (req,res) => {
    //update book database 
       //we check with isbn and push authorId
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn) {
           return book.author.push(parseInt(req.params.authorId));
        }
    }); 

    //update author database
       //we check with authorId and push isbn
    database.author.forEach((author) => {
        if(author.id === parseInt(req.params.authorId)) {
           return author.books.push(req.params.isbn);
        }
    });
    return res.json({
        books: database.books,
        author: database.author,
    });
});



/*  Author API 5
Route             /author/update/name
Description       update author name
Access            public (no password entered)
Parameter         id
Methods           PUT 
*/
/*booky.put("/author/update/authorId/:id", (req, res) => {
    database.author.forEach((author) => {
        if(author.id === req.params.authorId) {
            author.name = req.body.newAuthorName;
            return;
        }
    });
    return res.json({
        author: database.author,
    });

}); */



/*  Publication API 5
Route             /publication/update/name
Description       update publication name
Access            public (no password entered)
Parameter         
Methods           PUT   
*/
/* booky.put("/publication/update/name/:name", (req, res) => {
    database.publication.forEach((publication) => {
        if(publication.name === req.params.name){
            publication.name = req.body.newAuthorName;
            return;
        }
    });
    return res.json({publication: database.authors});

}); */


/*  Publication API 6
Route             /publication/update/book
Description       update/add new book to a publication
Access            public (no password entered)
Parameter         isbn
Methods           PUT   
*/
booky.put("/publication/update/book/:isbn", (req,res) =>{
    //update the publication database
    database.publications.forEach((publication) => {
        if(publication.id === req.body.pubId){
            return publication.books.push(req.params.isbn);
        }
      });
  
    //update the book database
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn){
            book.publication = req.body.pubId;
            return;
        }
    });
    return res.json({
        books: database.books, 
        publications: database.publications,
        message: "Successfully updates publication",
      });
  }); 













/*  Books API 8
Route             /book/delete
Description       delete a book
Access            public (no password entered)
Parameter         isbn
Methods           DELETE  
*/
booky.delete("/book/delete/:isbn", (req,res) => {
    const updatedBookDatabase = database.books.filter(
        (book) => book.ISBN !== req.params.isbn
        );

        database.books = updatedBookDatabase;
        return res.json({books: database.books});
});




/*  Books API 9
Route             /book/delete/author
Description       delete an author from a book
Access            public (no password entered)
Parameter         isbn
Methods           DELETE  
*/
booky.delete("/book/delete/author/:isbn/:authorId", (req,res) =>{
    //update the book database
    database.books.forEach((book) =>{
        if(book.ISBN === req.params.isbn){
            const newAuthorList = book.authors.filter(
                (author) => author !== parseInt(req.params.authorId)
            );
            book.authors = newAuthorList;
            return;
        }
    });
    // update the author database
    database.authors.forEach((author) => {
        if(author.id === parseInt(req.params.authorId)){
            const newBooksList = author.books.filter(
                (book) => book.ISBN !== req.params.isbn
            );
            author.books = newBooksList;
            return;
        }
    });
    return res.json({
        book: database.books,
        author: database.authors,
        message: "Author was deleted!",
    });
}); 




/*  Author API 6
Route             
Description       
Access            public (no password entered)
Parameter         
Methods           DELETE
*/



/*  Publication API 7
Route             
Description       
Access            public (no password entered)
Parameter         
Methods           DELETE   
*/



/*  Publication API 8
Route             /publication/delete/book
Description       delete a book from publications
Access            public (no password entered)
Parameter         isbn, publication Id
Methods           DELETE   
*/
booky.delete("/publication/delete/book/:isbn/:pubId", (req,res) =>{
    //update publication database
    database.publications.forEach((publication) => {
        if(publication.id === parseInt(req.params.pubId)){
            const newBooksList = database.publication.books.filter(
                (book)  => book !== req.params.isbn
                );
                database.publication.books = newBooksList;
                return;
        }
    });
    //update book database
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn){
            book.publication = 0;  //no publication available
            return;
        }
    });
    return res.json({
        books: database.books,
        publications: database.publication,
    });
}); 












//Server Running
booky.listen(3000, () => console.log("Hey! The server is running!! 😁"));





/* we need an agent which can talk to a database (monoDB)
as well as talk to us

mongoDB understands - *******
we understand - javascript


This agent will be mongoose*/





/*
Why schema?

# mongoDB is schemaless
# mongoose helps us with validation 
and relationship with other data
*/




/*Mongoose model
this is document model of mongoDb
*/
