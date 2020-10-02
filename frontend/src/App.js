import React from 'react';
import BookList from './component/BookList';
import Book from './component/Book';
import "./App.css"
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="">
        <Route exact path="/">
          <BookList />
        </Route>
        <Route exact path="/create/books" render={() => <Book new={true} />} />
        <Route exact path="/books/:id" render={() => <Book new={false} />} />
        <Route exact path="/books">
          <BookList />
        </Route>
      </div>
    </Router>

  );
}

export default App;
