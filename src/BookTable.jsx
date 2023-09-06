import React, { useState } from 'react';
import './BookTable.css'

const createBook = (title, author, year, image, content) => ({
  title,
  author,
  year,
  image,
  content
});

const BookTable = () => {
  const initialBooks = [
    createBook('HTML5, JS and Jquery ', 
               'DANE CAMERON', 
               2020, 
               'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRriIsx-uj2ykgvsEaugO0anKmE0QLZ6n7f0FOu6HJ7MYRYBwaGEtVerWSMwvUy8ZWS9zg&usqp=CAU', 
               'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged'),
    createBook('Eloquent Javascript', 'MARJIN HAVERBEKE', 2021, 'https://miro.medium.com/v2/resize:fit:1400/1*zBRkcBbsjWzcPjtcxqhb3Q.jpeg','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged'),
    createBook('HTML & CSS Quickstart ', 'DAVID DUROCHER', 2019, 'https://cdn.filestackcontent.com/cMiSTj1DSwOJTojCFBop','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged'),
    createBook('HTML & CSS Quickstart ', 'DAVID DUROCHER', 2019, 'https://cdn.filestackcontent.com/cMiSTj1DSwOJTojCFBop','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged'),
    
  ];

  const [books, setBooks] = useState(initialBooks);
  const [newBook, setNewBook] = useState({ title: '', author: '', year: '', image: '', content:''});
  const [editingIndex, setEditingIndex] = useState(-1);
  const [selectedBook, setSelectedBook] = useState(null); 

  const handleAddBook = () => {
    if (newBook.title && newBook.author && newBook.year && newBook.image && newBook.content) {
      setBooks([...books, newBook]);
      setNewBook({ title: '', author: '', year: '', image: '', content:'' });
    }
  };

  const handleEditBook = (index) => {
    setEditingIndex(index);
    setNewBook(books[index]);
  };

  const handleSaveBook = () => {
    const updatedBooks = [...books];
    updatedBooks[editingIndex] = newBook;
    setBooks(updatedBooks);
    setNewBook({ title: '', author: '', year: '', image: '' ,content:''});
    setEditingIndex(-1);
  };

  const handleDeleteBook = (index) => {
    const updatedBooks = [...books];
    updatedBooks.splice(index, 1);
    setBooks(updatedBooks);
  };

  const handleBookClick = (index) => {
    setSelectedBook(books[index]); 
  };

  const clearSelectedBook = () => {
    setSelectedBook(null); 
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center', padding: '10px' }}>Book Inventory Management</h1>
      <div className="book-cards">
        {books.map((book, index) => (
          <div key={index} className="book-card">
            <img onClick={() => handleBookClick(index)} src={book.image} alt={`Cover of ${book.title}`} className="book-image" />
            <h3 onClick={() => handleBookClick(index)} className="book-title">
              {book.title}
            </h3>
            <p className="book-info">Author: {book.author}</p>
            
            <div className="button-group">
              <button className="edit-button" onClick={() => handleEditBook(index)}>
                Edit
              </button>
              <button className="delete-button" onClick={() => handleDeleteBook(index)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div>
      {editingIndex === -1 ? (
        <div>
          <h2>Add New Book</h2>
          <input
            type="text"
            placeholder="Title"
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Author"
            value={newBook.author}
            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          />
          <input
            type="text"
            placeholder="Content"
            value={newBook.content}
            onChange={(e) => setNewBook({ ...newBook, content: e.target.value })}
          />
          <input
            type="text"
            placeholder="Year"
            value={newBook.year}
            onChange={(e) => setNewBook({ ...newBook, year: e.target.value })}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newBook.image}
            onChange={(e) => setNewBook({ ...newBook, image: e.target.value })}
          />
          <button onClick={handleAddBook}>Add</button>
        </div>
      ) : (
        <div>
          <h2>Edit Book</h2>
          <input
            type="text"
            placeholder="Title"
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Author"
            value={newBook.author}
            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          />
          <input
            type="text"
            placeholder="Year"
            value={newBook.year}
            onChange={(e) => setNewBook({ ...newBook, year: e.target.value })}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newBook.image}
            onChange={(e) => setNewBook({ ...newBook, image: e.target.value })}
          />
          <input
            type="text"
            placeholder="Content"
            value={newBook.content}
            onChange={(e) => setNewBook({ ...newBook, content: e.target.value })}
          />
          <button onClick={handleSaveBook}>Save</button>
          <button onClick={() => setEditingIndex(-1)}>Cancel</button>
        </div>
      )}
      </div>
      {selectedBook && (
        <div className="selected-book">
          <h2>Selected Book</h2>
          <img src={selectedBook.image} alt={`Cover of ${selectedBook.title}`} className="book-image" />
          <p>Title: {selectedBook.title}</p>
          <p>Author: {selectedBook.author}</p>
          <p>Content: {selectedBook.content}</p>
          <p>Year: {selectedBook.year}</p>
          <button onClick={clearSelectedBook}>Clear</button>
        </div>
      )}
    </div>
  );
};

export default BookTable;
