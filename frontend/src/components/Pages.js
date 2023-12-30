import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./Navbar";
import BookList from "./addbooks/BookList";
import CreateBook from "./addbooks/CreateBook";
import EditBook from "./addbooks/EditBook";
import Login from "./Login"


const Pages = () => {
  return(
    <>
    <Header/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/booklist" element={<BookList />} />
      <Route path="/createbook" element={<CreateBook />} />
      <Route path="/editbooks/:id" element={<EditBook />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </>
  );
};

export default Pages;
