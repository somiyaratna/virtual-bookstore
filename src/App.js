import React, { useState, useEffect } from "react";
import NavBar from "./Components/NavBar";
import Books from "./Components/Books";
import MoreBooks from "./Components/MoreBooks";
import BookDetails from "./Components/BookDetails";
import axios from "axios";

const App = () => {
  const [books, setBooks] = useState(undefined);
  const [query, setQuery] = useState(null);

  const [bookClicked, setBookClicked] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${
          query ? query : "HarryPotter"
        }&maxResults=30`
      )
      .then((res) => setBooks(res.data.items))
      .catch((err) => console.log(err));
    console.log(books);
  }, [query]);

  return (
    <div>
      <NavBar setQuery={setQuery} setBookClicked={setBookClicked} />
      {console.log(bookClicked)}
      {bookClicked ? (
        <BookDetails bookClicked={bookClicked} />
      ) : books != undefined ? (
        <Books booksDetail={books} setBookClicked={setBookClicked} />
      ) : (
        ""
      )}

      {books != undefined ? (
        <MoreBooks booksDetail={books} setBookClicked={setBookClicked} />
      ) : (
        ""
      )}
    </div>
  );
};

export default App;
