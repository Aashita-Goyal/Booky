//Prefix for Book API - /author

//Initializing Express Router
const Router = require("express").Router();

//Database Models
const AuthorModel = require("../../database/author");


 

/*  Author API 1
Route             /authors
Description       get all authors
Access            public (no password entered)
Parameter         none
Methods           GET    
*/
    Router.get("/", async (req, res) => {
        try {
            const getAllAuthors = await AuthorModel.find();
            return res.json({authors: getAllAuthors});
        } catch (error) {
            return res.json({ error: error.message });
        }
    });



/*  Author API 2
Route             /author/name
Description       get specific authors
Access            public (no password entered)
Parameter         id
Methods           GET    
*/
    Router.get("/name/:name", async (req, res) => {
        try {
            const getSpecificAuthor = await AuthorModel.findOne({name: req.params.name})
        
            if(!getSpecificAuthor){
                return res.json({
                    error: `No author found for the name of ${req.params.name}`,
                });
            }
            return res.json({author: getSpecificAuthor});
        } catch (error) {
            return res.json({ error: error.message });
        }
    });



/*  Author API 3
Route             /author/book
Description       get list of authors based on books
Access            public (no password entered)
Parameter         isbn
Methods           GET    
*/
    Router.get("/book/:isbn", async (req,res) => {
        try {
            const getSpecificAuthor = await AuthorModel.findOne({
                ISBN: req.params.isbn,
            });  
            if (getSpecificAuthor.length === 0){
                return res.json({
                    error: `No author found for the given book ${req.params.isbn}`,
        
                });
            }
            return res.json({authors: getSpecificAuthor});
        } catch (error) {
            return res.json({ error: error.message });
        }
    });






/*  Author API 4
Route             /author/new
Description       add new author
Access            public (no password entered)
Parameter         none
Methods           POST 
*/
    Router.post("/new", async (req,res) =>{
        try {
            const {newAuthor} = req.body;
        
            AuthorModel.create(newAuthor);
        
            return res.json({message: "author was added :)"});
        } catch (error) {
            return res.json({ error: error.message });
        }
    });





/*  Author API 5
Route             /author/update/name
Description       update author name
Access            public (no password entered)
Parameter         name
Methods           PUT 
*/
    Router.put("/update/name/:name", async (req, res) => {
        try {
    
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
        } catch (error) {
            return res.json({ error: error.message });
        }
    }); 





/*  Author API 6
Route             /author/delete/
Description       delete an author 
Access            public (no password entered)
Parameter         name
Methods           DELETE
*/
    Router.delete("/delete/:name", async (req,res) => {
        try {
    
            const updatedAuthorDatabase = await AuthorModel.findOneAndDelete({
                name: req.params.name,
            });
        
                database.authors = updatedAuthorDatabase; 
                return res.json({authors: database.authors});
        } catch (error) {
            return res.json({ error: error.message });
        }
    }); 





module.exports = Router;