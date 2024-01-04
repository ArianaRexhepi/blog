import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./Navbar";
import BookList from "./addbooks/BookList";
import CreateBook from "./addbooks/CreateBook";
import EditBook from "./addbooks/EditBook";
import Login from "./Login"
import { ProtectedRouteNotLoggedIn } from "./authguard/ProtectedRouteNotLoggedIn";
import { AdminProtectedRoute } from "./authguard/AdminProtectedRoute";
import Books from "./Books";
import BookDetail from "./BookDetail";
import CreateMovie from "./addmovies/CreateMovie";
import EditMovie from "./addmovies/EditMovie";
import MovieList from "./addmovies/MovieList";
import Movies from "./Movies";
import MovieDetail from './MovieDetail';


const Pages = () => {
  return(
    <>
    <Header/>
    <Routes>
      <Route path="/books" element={<Books />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/movies/:id" element={<MovieDetail />} />
      <Route path="/books/:id" element={<BookDetail />} />
      {/* <Route element={<AdminProtectedRoute redirectPath="/" />}> */}
      <Route path="/booklist" element={<BookList />} />
      <Route path="/movielist" element={<MovieList />} />
      {/* </Route> */}
      <Route path="/createbook" element={<CreateBook />} />
      <Route path="/editbooks/:id" element={<EditBook />} />
      <Route path="/createmovie" element={<CreateMovie />} />
      <Route path="/editmovies/:id" element={<EditMovie />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </>
  );
};

export default Pages;
