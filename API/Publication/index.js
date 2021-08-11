//Prefix for Book API - /publication

//Initializing Express Router
const Router = require("express").Router();

//Database Models
const PublicationModel = require("../../database/publication");






/*  Publication API 1
Route             /publications
Description       get all publications
Access            public (no password entered)
Parameter         none
Methods           GET    
*/
    Router.get("/", async (req, res) => {
        try {
            const getAllBooks = await BookModel.find();
            return res.json(getAllBooks);
        } catch (error) {
            return res.json({ error: error.message });
        }
    });



/*  Publication API 2
Route             /publications/name
Description       get specific publications
Access            public (no password entered)
Parameter         name
Methods           GET    
*/
    Router.get("/name/:name", async (req, res) => {
        try {
            const getSpecificPublication = await PublicationModel.findOne({name: req.params.name})
        
            if(!getSpecificPublication){
                return res.json({
                    error: `No publication found for the name of ${req.params.name}`,
                });
            }
            return res.json({publication: getSpecificPublication});
        } catch (error) {
            return res.json({ error: error.message });
        }
    });



  /*  Publication API 3
Route             /publications/book
Description       get list of publications based on books
Access            public (no password entered)
Parameter         isbn
Methods           GET    
*/
    Router.get("/book/:isbn", async (req,res) => {
        try {
            const getSpecificPublication = await PublicationModel.findOne({
                ISBN: req.params.isbn,
            });  
            if (getSpecificPublication.length === 0){
                return res.json({
                    error: `No publication found for the given book ${req.params.isbn}`,
        
                });
            }
            return res.json({publications: getSpecificPublication});
        } catch (error) {
            return res.json({ error: error.message });
        }
    });





/*  Publication API 4
Route             /publication/new
Description       add new publication
Access            public (no password entered)
Parameter         none
Methods           POST  
*/
    Router.post("/new", async (req,res) =>{
        try {
            const {newPublication} = req.body;
            
            PublicationModel.create(newPublication);
        
            return res.json({message: "publication was added :)"});
        } catch (error) {
            return res.json({ error: error.message });
        }
    });





/*  Publication API 5
Route             /publications/update/name
Description       update publication name
Access            public (no password entered)
Parameter         name
Methods           PUT   
*/
    Router.put("/update/name/:name", async (req, res) => {
        try {
    
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
        
        } catch (error) {
            return res.json({ error: error.message });
        }
    }); 



/*  Publication API 6
Route             /publication/update/book
Description       update/add new book to a publication
Access            public (no password entered)
Parameter         name isbn
Methods           PUT   
*/
    Router.put("/update/book/:name/:isbn", async (req,res) => {
        try {
            //update publication database 
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
            //update book database
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
        } catch (error) {
            return res.json({ error: error.message });
        }
    });





/*  Publication API 7
Route             /publication/delete/
Description       delete the publication
Access            public (no password entered)
Parameter         name
Methods           DELETE   
*/
    Router.delete("/delete/:name", async (req,res) => {
        try {
    
            const updatedPublicationDatabase = await PublicationModel.findOneAndDelete({
                name: req.params.name,
            });
        
                database.publications = updatedPublicationDatabase; 
                return res.json({publications: database.publications});
        } catch (error) {
            return res.json({ error: error.message });
        }
    });



/*  Publication API 8
Route             /publication/delete/book
Description       delete a book from publications
Access            public (no password entered)
Parameter         isbn, name
Methods           DELETE   
*/
    Router.delete("/delete/book/:name/:isbn", async (req,res) =>{
        try {
            //update publication database
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
            //update book database
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
        } catch (error) {
            return res.json({ error: error.message });
        }
     });






module.exports = Router;