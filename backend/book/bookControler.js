const { error } = require('console')
const pool = require('../db')
const queries = require('./bookQueries')

const getBook = (req, res) =>{
  pool.query(queries.getbook, (error, result) => {
    if (error) throw error
    res.status(200).json(result.rows)
  })
}

const getbookbyID = (req, res) =>{
  const id = parseInt(req.params.id)
  pool.query(queries.getbookbyID, [id], (error, result) => {
    if (error) throw error
    res.status(200).json(result.rows)
  })
}

const addBook = (req, res) => {
  const title = req.body["book_title"], 
  isbn = req.body["isbn_13"], 
  release = req.body["release_year"], 
  pages = req.body["num_pages"], 
  publisher = req.body["publisher_name"], 
  language = req.body["language_name"]

  // const {title, isbn, release, pages, publisher, language} = req.body

  pool.query(queries.checkBookExist, [title], (error, result)=>{
    if(result.rows.length){
      res.send(`${title} already exist`)
    }
    else{
      pool.query(queries.checkLanguageExist, [language], (error, result) =>{
        
        if(!result.rows.length){         
          pool.query(queries.addLanguage, [language], (error, result) =>{
            if(error) throw error
            res.status(201).send("Lang Successfully")
          })
        }
      })
      pool.query(queries.checkPublisherExist, [publisher], (error, res) =>{
        if(!res.rows.length){  
          pool.query(queries.addPublisher, [publisher], (error, result) =>{
            if(error) throw error
            res.status(201).send("Pub Successfully")
          })
        }
      })
      pool.query(queries.addBook, [title, isbn, release, pages, publisher, language], (error, result) =>{
        if (error) throw error
        res.status(201).send("Add Successfully")
      })
  }
  if(error) throw error
  })
  
}

const deleteBook = (req, res) =>{
  const id = parseInt(req.params.id)

  pool.query(queries.getbookbyID, [id], (error, result) =>{
    const noLangFound = !result.rows.length
    if(noLangFound){
      res.send("No Lang in the database")
    }
    else{
      pool.query(queries.deleteBook, [id], (error, result) =>{
        if (error) throw error
        res.send("deleted successfully")
      })
    }
    
  })
}

const updateBook = (req, res) =>{
  const id = parseInt(req.params.id)
  const name = Object.values(req.body)[0]

  console.log(id)
  console.log(name)

  pool.query(queries.getbookbyID, [id], (error, results) =>{
    const noLangFound = !results.rows.length
    if(noLangFound){
      res.send("Language not Found")
    }
    else{
      pool.query(queries.updateBook, [name, id], (error, results) =>{
        if (error) throw error
        res.status(200).send("Update Successfully")
      })
    }

  })
}

module.exports = {
  getBook, getbookbyID, addBook, deleteBook, updateBook
}