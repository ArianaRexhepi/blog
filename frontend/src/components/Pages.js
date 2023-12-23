import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./Navbar";
import BookList from "./addbooks/BookList";
import CreateBook from "./addbooks/CreateBook";

const Pages = () => {
  return(
    <>
    <Header/>
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/booklist" element={<BookList />} />
      <Route path="/createbook" element={<CreateBook />} />
    </Routes>
  </Router>
  </>
  );
};

export default Pages;
