import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./Navbar";
import BookList from "./addbooks/BookList";

const Pages = () => {
  return(
    <>
    <Header/>
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/booklist" element={<BookList />} />
    </Routes>
  </Router>
  </>
  );
};

export default Pages;
