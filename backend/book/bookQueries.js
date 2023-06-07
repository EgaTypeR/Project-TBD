const getbook  = `SELECT book.book_id, 
book.book_title, 
book.isbn_13, 
book.release_year, 
book.num_pages, 
publisher.publisher_name, 
languages.language_name, 
book.last_update
FROM ((book
	INNER JOIN Publisher ON book.publisher_id = Publisher.publisher_id)
	INNER JOIN Languages ON book.language_id = Languages.language_id);`
const getbookbyID = "SELECT * FROM book WHERE book_id = $1"
const addBook = `INSERT INTO book(book_title, isbn_13, release_year, num_pages, publisher_id, language_id)	
									VALUES ($1, $2, $3, $4,(SELECT publisher_id FROM publisher p WHERE p.publisher_name = $5), 
									(SELECT language_id FROM languages l WHERE l.language_name = $6))`
const checkBookExist = "SELECT l FROM book l WHERE l.book_title = $1"
const deleteBook = "DELETE FROM book WHERE book_id = $1"
const updateBook = "UPDATE book SET book_title = $1 WHERE book_id = $2"

const checkPublisherExist = "SELECT p FROM publisher p WHERE p.publisher_name = $1"
const checkLanguageExist = "SELECT l FROM languages l WHERE l.language_name = $1"
const addPublisher = "INSERT INTO publisher (publisher_name) VALUES ($1)"
const addLanguage = "INSERT INTO languages (language_name) VALUES ($1)"


module.exports = {
  getbook, 
	getbookbyID,  
	addBook, 
	checkBookExist, 
	deleteBook, 
	updateBook,
	checkPublisherExist,
	checkLanguageExist,
	addPublisher,
	addLanguage
}