//Prefix for Book API - /book

//Initializing Express Router
const Router = require("express").Router();

//Database Models
const BookModel = require("../../database/book");




/*  Books API 1
Route             /
Description       get all books
Access            public (no password entered)
Parameter         none
Methods           GET    
*/
    Router.get("/", async (req, res) => {
        try {
            const getAllBooks = await BookModel.find();
            return res.json({books: getAllBooks});

        } catch (error) {
            return res.json({ error: error.message });
        }
    });



/*  Books API 2
Route             /is
Description       get specific books
Access            public (no password entered)
Parameter         isbn
Methods           GET    
*/
Router.get("/is/:isbn", async (req, res) => {
    try {
        const getSpecificBook = await BookModel.findOne({ISBN: req.params.isbn})
    
    
    if(!getSpecificBook){
        return res.json({
            error: `No book found for the isbn of ${req.params.isbn}`,
        });
    }
    return res.json({book: getSpecificBook});
    
    } catch (error) {
        return res.json({ error: error.message });
    }
    
        
    });


/*  Books API 3
Route             /c
Description       get books based on category
Access            public (no password entered)
Parameter         category
Methods           GET    
*/
    Router.get("/c/:category", async (req,res) => {
        try {
            const getSpecificBook = await BookModel.findOne({
                category: req.params.category,
            });  
            if (getSpecificBook.length === 0){
                return res.json({
                    error: `No book found for the given category of ${req.params.category}`,
        
                });
            }
            return res.json({book: getSpecificBook});
        } catch (error) {
            return res.json({ error: error.message });
        }
    });



/*  Books API 4
Route             /lang
Description       get list of books based on languages
Access            public (no password entered)
Parameter         language
Methods           GET    
*/
    Router.get("/lang/:language", async (req,res) => {
        try {
            const getSpecificBook = await BookModel.findOne({
                language: req.params.language,
            });  
            if (getSpecificBook.length === 0){
                return res.json({
                    error: `No book found in the given language ${req.params.language}`,
        
                });
            }
            return res.json({books: getSpecificBook});
        } catch (error) {
            return res.json({ error: error.message });
        }
        
    });





 /*  Books API 5
Route             /book/new
Description       add new book
Access            public (no password entered)
Parameter         none
Methods           POST 
*/
    Router.post("/new", async (req, res) =>{
        try {
            const { newBook } = req.body;
        
            await BookModel.create(newBook);
    
            return res.json({books: addNewBook});
        } catch (error) {
            return res.json({ error: error.message });
        }
    });





 /*  Books API 6
Route             /book/update/title
Description       update  book title
Access            public (no password entered)
Parameter         isbn
Methods           PUT  
*/
    Router.put("/update/title/:isbn", async (req, res) => {
        try {
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
        
        } catch (error) {
            return res.json({ error: error.message });
        }
    }); 
    



/*  Books API 7
Route              
Description       update/add new author
Access            public (no password entered)
Parameter         isbn authorId
Methods           PUT  
*/
    Router.put("/author/update/:isbn/:authorId", async (req,res) => {
        try {
            //update book database 
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
            //update author database
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
        } catch (error) {
            return res.json({ error: error.message });
        }
});






/*  Books API 8
Route             /book/delete
Description       delete a book
Access            public (no password entered)
Parameter         isbn
Methods           DELETE  
*/
    Router.delete("/delete/:isbn", async (req,res) => {
        try {
    
            const updatedBookDatabase = await BookModel.findOneAndDelete({
                ISBN: req.params.isbn,
            });
        
                database.books = updatedBookDatabase; 
                return res.json({books: database.books});
        } catch (error) {
            return res.json({ error: error.message });
        }
    });


/*  Books API 9
Route             /book/delete/author
Description       delete an author from a book
Access            public (no password entered)
Parameter         isbn
Methods           DELETE  
*/
    Router.delete("/delete/author/:isbn/:authorId", async (req,res) =>{
        try {
            //update book database
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
            //update author database
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
        } catch (error) {
            return res.json({ error: error.message });
        }
     });








module.exports = Router;
//Router.listen(3000, () => console.log("Hey! The server is Running!"));
