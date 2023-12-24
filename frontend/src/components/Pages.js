import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./Navbar";
import BookList from "./addbooks/BookList";
import CreateBook from "./addbooks/CreateBook";
import EditBook from "./addbooks/EditBook";

const Pages = () => {
  return(
    <>
    <Header/>
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/booklist" element={<BookList />} />
      <Route path="/createbook" element={<CreateBook />} />
      <Route path="/editbook/:id" element={<EditBook />} />
    </Routes>
  </Router>
  </>
  );
};

export default Pages;
