import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Form from './Form';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://reactnd-books-api.udacity.com/books",
          {
            headers: {
              'Authorization': 'whatever-you-want'
            }
          }
        );
        setBooks(response.data.books);
        console.log(books);
      } catch (error) {

      }
    };

    fetchData();
  }, []);

  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <div className='header'>
        <h1>Kalvium Books📕</h1>
        <div className='search'>
          <input
            type="search"
            className='input'
            onChange={handleInput}
            placeholder='Search Book'
          />
        </div>
        <Link to="/Form">
          <button className='register'>Register</button>
        </Link>
      </div>
      <div className='details'>
        {books
          .filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
          .map((book) => (
            <div key={book.id} className='books'>
              <img src={book.imageLinks.thumbnail} alt="Book cover" />
              <div className='bookI'>
                <p className='title'><b>{book.title}</b></p>
                <p className='rating'>{book.averageRating}🌟Free</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Home;
