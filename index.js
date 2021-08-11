require("dotenv").config();


//framework
const express = require("express");
const mongoose = require("mongoose");

//Microservices Routes
const Books =  require("./API/Book");
const Authors =  require("./API/Author");
const Publications =  require("./API/Publication");

//Initialization
const booky = express();

//configuration
booky.use(express.json());
//console.log(process.env.MONGO_URL);



/*
    ||not needed anymore as new files have been created||
/Database
const database = require("./database");

/Models
const BookModel = require("./database/book");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publication");
*/



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


//Initializing Microservices
booky.use("/book", Books);
booky.use("/author", Authors);
booky.use("/publication", Publications);




//Server Running
booky.listen(3000, () => console.log("Hey the server is running! 😁"));






/*  Books API 1
Route             /
Description       get all books
Access            public (no password entered)
Parameter         none
Methods           GET    
*/
/* WAY 2
booky.get("/", async (req, res) => {
    const getAllBooks = await BookModel.find();
    return res.json({books: getAllBooks});
}); */

/* WAY 1
 booky.get("/", (req,res) => {
     return res.json({books: database.books});
 });
 */




/*  Books API 2
Route             /is
Description       get specific books
Access            public (no password entered)
Parameter         isbn
Methods           GET    
*/
/*WAY 2
booky.get("/is/:isbn", async (req, res) => {
    const getSpecificBook = await BookModel.findOne({ISBN: req.params.isbn})


    if(!getSpecificBook){
        return res.json({
            error: `No book found for the isbn of ${req.params.isbn}`,
        });
    }
    return res.json({book: getSpecificBook});
}); */

/*WAY 1
booky.get("/is/:isbn", async (req, res)✔ => {
    const getSpecificBook = database.books.filter(
        (book) => book.ISBN === req.params.isbn
    ); 
});*/




/*  Books API 3
Route             /c
Description       get books based on category
Access            public (no password entered)
Parameter         category
Methods           GET    
*/
/* WAY 2
booky.get("/c/:category", async (req,res) => {
    const getSpecificBook = await BookModel.findOne({
        category: req.params.category,
    });  
    if (getSpecificBook.length === 0){
        return res.json({
            error: `No book found for the given category of ${req.params.category}`,

        });
    }
    return res.json({book: getSpecificBook});
}); */

/* WAY 1
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
}); */




/*  Books API 4
Route             /lang
Description       get list of books based on languages
Access            public (no password entered)
Parameter         language
Methods           GET    
*/
/* WAY 2
booky.get("/lang/:language", async (req,res) => {
    const getSpecificBook = await BookModel.findOne({
        language: req.params.language,
    });  
    if (getSpecificBook.length === 0){
        return res.json({
            error: `No book found in the given language ${req.params.language}`,

        });
    }
    return res.json({books: getSpecificBook});
}); */

/* WAY 1
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
}); */




/*  Author API 1
Route             /authors
Description       get all authors
Access            public (no password entered)
Parameter         none
Methods           GET    
*/
/* WAY 2
booky.get("/authors", async (req, res) => {
    const getAllAuthors = await AuthorModel.find();
    return res.json({authors: getAllAuthors});
});*/

/* WAY 1
booky.get("/authors", (req, res) => {

    return res.json({authors: database.author});
}); */




/*  Author API 2
Route             /author/name
Description       get specific authors
Access            public (no password entered)
Parameter         id
Methods           GET    
*/
/* WAY 2
booky.get("/author/name/:name", async (req, res) => {
    const getSpecificAuthor = await AuthorModel.findOne({name: req.params.name})

    if(!getSpecificAuthor){
        return res.json({
            error: `No author found for the name of ${req.params.name}`,
        });
    }
    return res.json({author: getSpecificAuthor});
}); */

/* WAY 1
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
}); */




/*  Author API 3
Route             /author/book
Description       get list of authors based on books
Access            public (no password entered)
Parameter         isbn
Methods           GET    
*/
/* WAY 2
booky.get("/author/book/:isbn", async (req,res) => {
    const getSpecificAuthor = await AuthorModel.findOne({
        ISBN: req.params.isbn,
    });  
    if (getSpecificAuthor.length === 0){
        return res.json({
            error: `No author found for the given book ${req.params.isbn}`,

        });
    }
    return res.json({authors: getSpecificAuthor});
}); */

/* WAY 1
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
}); */




/*  Publication API 1
Route             /publications
Description       get all publications
Access            public (no password entered)
Parameter         none
Methods           GET    
*/
/* WAY 2
booky.get("/", async (req, res) => {
   const getAllBooks = await BookModel.find();
   return res.json(getAllBooks);
}); */

/* WAY 1
booky.get("/publications", (req, res) => {
    return res.json({publications: database.publication});
}); */



/*  Publication API 2
Route             /publications/name
Description       get specific publications
Access            public (no password entered)
Parameter         name
Methods           GET    
*/
/* WAY 2
booky.get("/publications/name/:name", async (req, res) => {
    const getSpecificPublication = await PublicationModel.findOne({name: req.params.name})

    if(!getSpecificPublication){
        return res.json({
            error: `No publication found for the name of ${req.params.name}`,
        });
    }
    return res.json({publication: getSpecificPublication});
}); */

/* WAY 1
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
  }); */




  /*  Publication API 3
Route             /publications/book
Description       get list of publications based on books
Access            public (no password entered)
Parameter         isbn
Methods           GET    
*/
/* WAY 2
booky.get("/publications/book/:isbn", async (req,res) => {
    const getSpecificPublication = await PublicationModel.findOne({
        ISBN: req.params.isbn,
    });  
    if (getSpecificPublication.length === 0){
        return res.json({
            error: `No publication found for the given book ${req.params.isbn}`,

        });
    }
    return res.json({publications: getSpecificPublication});
}); */

/* WAY 1
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
  }); */
  
  
  
  






 /*  Books API 5
Route             /book/new
Description       add new book
Access            public (no password entered)
Parameter         none
Methods           POST 
*/
/* WAY 2
booky.post("/book/new", async (req, res) =>{
    const {newBook} = req.body;

    BookModel.create(newBook);
    return res.json({books: addNewBook});
}); */

/* WAY 1 
booky.post("/book/new", (req,res) => {
    console.log(req.body);
    const {newBook} = req.body;
    database.books.push(newBook);
    return res.json({books: database.books});
}); */



/*  Author API 4
Route             /author/new
Description       add new author
Access            public (no password entered)
Parameter         none
Methods           POST 
*/
/* WAY 2
booky.post("/author/new", async (req,res) =>{
    const {newAuthor} = req.body;

    AuthorModel.create(newAuthor);

    return res.json({message: "author was added :)"});
}); */

/* WAY 1
booky.post("/author/new", (req,res) => {
    const {newAuthor} = req.body;
    database.author.push(newAuthor);
    return res.json({author: database.author});
}); */



/*  Publication API 4
Route             /publication/new
Description       add new publication
Access            public (no password entered)
Parameter         none
Methods           POST  
*/
/* WAY 2
booky.post("/publication/new", async (req,res) =>{
    const {newPublication} = req.body;
    
    PublicationModel.create(newPublication);

    return res.json({message: "publication was added :)"});
}); */

/* WAY 1
booky.post("/publication/new", (req,res) => {
    const {newPublication} = req.body;
    database.publication.push(newPublication);
    return res.json({publications: database.publication});
}); */

 







 


 /*  Books API 6
Route             /book/update/title
Description       update  book title
Access            public (no password entered)
Parameter         isbn
Methods           PUT  
*/
/* WAY 2
booky.put("/book/update/title/:isbn", async (req, res) => {

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
return res.json({books: updateBook}); 
}); */

/*   WAY 1
booky.put("/book/update/title/:isbn", (req,res) => {

      /Two approaches - forEach or Map
     /using forEach

    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn){
            book.title = req.body.newBookTitle;
            return;
        }
    }); 
    return res.json({books: database.books}); 
});  */
  



/*  Books API 7
Route              
Description       update/add new author
Access            public (no password entered)
Parameter         isbn authorId
Methods           PUT  
*/
/* WAY 2
booky.put("/book/author/update/:isbn/:authorId", async (req,res) => {
     /update book database 
    const updateBook = await BookModel.findOneAndUpdate(
        {
            ISBN: req.params.isbn,
        },
        {
            $addToSet: {
                authors: req.body.newAuthor,
            },
        },
        {
            new:true,
        }
    );
     /update author database
    const updateAuthor = await AuthorModel.findOneAndUpdate(
        {
            id: req.body.newAuthor,
        },
        {
            $push: {
                books: req.params.isbn,
            },
        },
        {
            new: true
        }
    );
    return res.json({
        books: updateBook,
        authors: updateAuthor,
        message: "New author was added",
    }); 
}); */
       //we check with isbn and push 
       

  /*  WAY 1
    booky.put("/book/update/author/:isbn/:authorId",(req,res) => {
        /update book database
     database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn) {
           return book.author.push(parseInt(req.params.authorId));
        }
    }); 

      /update author database
      /we check with authorId and push isbn
    database.author.forEach((author) => {
        if(author.id === parseInt(req.params.authorId)) {
           return author.books.push(req.params.isbn);
        }
    });
    return res.json({
        books: database.books,
        author: database.author,
    }); 
}); */



/*  Author API 5
Route             /author/update/name
Description       update author name
Access            public (no password entered)
Parameter         name
Methods           PUT 
*/
/* WAY 2
booky.put("/author/update/name/:name", async (req, res) => {

    const updateAuthor= await AuthorModel.findOneAndUpdate({
        name: req.params.name,
    },
    {
        name:req.body.AuthorName,
    },
    {
        new:true,
    }
);
return res.json({publications: updateAuthor}); 
}); */

/* WAY 1
booky.put("/author/update/name/:name", (req, res) => {
    database.authors.forEach((author) => {
        if(author.name === req.params.name) {
            author.name = req.body.newAuthorName;
            return;
        }
    });
    return res.json({authors: database.authors});
}); */



/*  Publication API 5
Route             /publications/update/name
Description       update publication name
Access            public (no password entered)
Parameter         name
Methods           PUT   
*/
/* WAY 2
booky.put("/publications/update/name/:name", async (req, res) => {

    const updatePublication = await PublicationModel.findOneAndUpdate({
        name: req.params.name,
    },
    {
        name:req.body.publicationName,
    },
    {
        new:true,
    }
);
return res.json({publications: updatePublication}); 
}); */

/* WAY 1
booky.put("/publications/update/name/:name", (req, res) => {
    database.publications.forEach((publication) => {
        if(publication.name === req.params.name){
            publication.name = req.body.newPublicationName;
            return;
        }
    });
    return res.json({publications: database.publications});

}); */



/*  Publication API 6
Route             /publication/update/book
Description       update/add new book to a publication
Access            public (no password entered)
Parameter         name isbn
Methods           PUT   
*/
/* WAY 2
booky.put("/publication/update/book/:name/:isbn", async (req,res) => {
     /update publication database 
    const updatePublication = await PublicationModel.findOneAndUpdate(
        {
            name: req.params.name,
        },
        {
            $addToSet: {
                books: req.body.newBook,
            },
        },
        {
            new:true,
        }
    );
     /update book database
    const updateBook = await BookModel.findOneAndUpdate(
        {
            ISBN: req.body.newBook,
        },
        {
            $push: {
                publications: req.params.name,
            },
        },
        {
            new: true
        }
    );
    return res.json({
        books: updatePublication,
        authors: updateBook,
        message: "New book was added",
    }); 
}); */

/* WAY 1
booky.put("/publication/update/book/:isbn", (req,res) =>{
     /update the publication database
    database.publications.forEach((publication) => {
        if(publication.id === req.body.pubId){
            return publication.books.push(req.params.isbn);
        }
      });
  
     /update the book database
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
  }); */









/*  Books API 8
Route             /book/delete
Description       delete a book
Access            public (no password entered)
Parameter         isbn
Methods           DELETE  
*/
/* WAY 2
booky.delete("/book/delete/:isbn", async (req,res) => {

    const updatedBookDatabase = await BookModel.findOneAndDelete({
        ISBN: req.params.isbn,
    });

        database.books = updatedBookDatabase; 
        return res.json({books: database.books});
}); */

/*  WAY 1
 booky.delete("/book/delete/:isbn", (req,res) =>{
    const updatedBookDatabase = database.books.filter(
           (book) => book.ISBN !== req.params.isbn
       );
       database.books = updatedBookDatabase; 
       return res.json({books: database.books});
 }); */




/*  Books API 9
Route             /book/delete/author
Description       delete an author from a book
Access            public (no password entered)
Parameter         isbn
Methods           DELETE  
*/
/* WAY 2
booky.delete("/book/delete/author/:isbn/:authorId", async (req,res) =>{
    /update book database
    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN: req.params.isbn,
        },
        {
           $pull: {
              authors: parseInt(req.params.authorId),
            },
        },
        {
            new: true
        }
   ); 
    /update author database
   const updatedAuthor = await AuthorModel.findOneAndUpdate(
       {
           id: parseInt(req.params.authorId),
       },
       {
           $pull:{
               books: req.params.isbn,
            }
       },
       {
           new: true
       }
   );
   return res.json({
    book: updatedBook,
    author: updatedAuthor,
    message: "Author was deleted!",
    }); 
}); */

/*  WAY 1 
    /update the book database
   booky.delete("/book/delete/author/:isbn/:authorId", (req,res) => {
    database.books.forEach((book) =>{
        if(book.ISBN === req.params.isbn){
            const newAuthorList = book.authors.filter(
                (author) => author !== parseInt(req.params.authorId)
            );
            book.authors = newAuthorList;
            return;
        }
    });
    /update the author database
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
}); */



/*  Author API 6
Route             /author/delete/
Description       delete an author 
Access            public (no password entered)
Parameter         name
Methods           DELETE
*/
/* WAY 2
booky.delete("/author/delete/:name", async (req,res) => {

    const updatedAuthorDatabase = await AuthorModel.findOneAndDelete({
        name: req.params.name,
    });

        database.authors = updatedAuthorDatabase; 
        return res.json({authors: database.authors});
}); */

/* WAY 1
booky.delete("/author/delete/:name", (req,res) => {
    const updatedAuthorDatabase = database.authors.filter(
        (author) => author.name !== req.params.name
    );
    database.authors = updatedAuthorDatabase; 
    return res.json({authors: database.authors});
}); */



/*  Publication API 7
Route             /publication/delete/
Description       delete the publication
Access            public (no password entered)
Parameter         name
Methods           DELETE   
*/
/* WAY 2
booky.delete("/publication/delete/:name", async (req,res) => {

    const updatedPublicationDatabase = await PublicationModel.findOneAndDelete({
        name: req.params.name,
    });

        database.publications = updatedPublicationDatabase; 
        return res.json({publications: database.publications});
}); */

/* WAY 1
booky.delete("/publication/delete/:nme", (req,res) =>{
    const updatedPublicationDatabase = database.publications.filter(
           (publication) => publication.name !== req.params.name
       );
       database.publications = updatedPublicationDatabase; 
       return res.json({publications: database.publications});
 }); */



/*  Publication API 8
Route             /publication/delete/book
Description       delete a book from publications
Access            public (no password entered)
Parameter         isbn, name
Methods           DELETE   
*/
/* WAY 2
booky.delete("/publication/delete/book/:name/:isbn", async (req,res) =>{
     /update publication database
     const updatePublication = await PublicationModel.findOneAndUpdate(
         {
             name: req.params.name,
         },
         {
            $pull: {
               books: parseInt(req.params.isbn),
             },
         },
         {
             new: true
         }
    ); 
     /update book database
    const updateBook = await BookModel.findOneAndUpdate(
        {
            ISBN: parseInt(req.params.isbn),
        },
        {
            $pull:{
                publications: req.params.name,
             }
        },
        {
            new: true
        }
    );
    return res.json({
     book: updatePublication,
     author: updateBook,
     message: "Book was deleted!",
     });
 }); */

/* WAY 1
booky.delete("/publication/delete/book/:isbn/:pubId", (req,res) =>{
     /update publication database
    database.publications.forEach((publication) => {
        if(publication.id === parseInt(req.params.pubId)){
            const newBooksList = database.publication.books.filter(
                (book)  => book !== req.params.isbn
                );
                database.publication.books = newBooksList;
                return;
        }
    });
     /update book database
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
}); */
 
  


/*
try {
} catch (error) {
    throw new Error(error);
} 


try {
} catch (error) {
    return res.json({ error: error.message });
}
*/
