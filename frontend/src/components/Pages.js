import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./Navbar";
import BookList from "./addbooks/BookList";
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
import Gifts from './Gifts';
import GiftDetail from './GiftDetail';
import GiftList from './addgifts/GiftList';
import CreateGift from './addgifts/CreateGift';
import EditGifts from './addgifts/EditGifts';
import Tech from './Tech';
import TechDetail from './TechDetail';
import TechList from './addtechnology/TechList';
import CreateTech from './addtechnology/CreateTech';
import EditTech from './addtechnology/EditTech';
import CreateBook from './addbooks/CreateBook';
import Drinks from './Drinks';
import DrinksDetail from './DrinksDetail';
import DrinksList from './adddrinks/DrinksList';
import CreateDrink from './adddrinks/CreateDrink';
import EditDrink from './adddrinks/EditDrink';
import Beauty from './Beauty';
import BeautyDetail from './BeautyDetail';
import BeautyList from './addbeauty/BeautyList';
import CreateBeauty from './addbeauty/CreateBeauty';
import EditBeauty from './addbeauty/EditBeauty';


const Pages = () => {
  return(
    <>
    <Header/>
    <Routes>
      <Route path="/books" element={<Books />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/giftideas" element={<Gifts />} />
      <Route path="/technology" element={<Tech />} />
      <Route path="/drinks" element={<Drinks />} />
      <Route path="/beauty" element={<Beauty />} />
      <Route path="/movies/:id" element={<MovieDetail />} />
      <Route path="/giftideas/:id" element={<GiftDetail />} />
      <Route path="/books/:id" element={<BookDetail />} />
      <Route path="/technology/:id" element={<TechDetail />} />
      <Route path="/drinks/:id" element={<DrinksDetail />} />
      <Route path="/beauty/:id" element={<BeautyDetail />} />
      {/* <Route element={<AdminProtectedRoute redirectPath="/" />}> */}
      <Route path="/booklist" element={<BookList />} />
      <Route path="/giftlist" element={<GiftList />} />
      <Route path="/movielist" element={<MovieList />} />
      <Route path="/techlist" element={<TechList />} />
      <Route path="/drinkslist" element={<DrinksList />} />
      <Route path="/beautylist" element={<BeautyList />} />
      {/* </Route> */}
      <Route path="/createbook" element={<CreateBook />} />
      <Route path="/editbook/:id" element={<EditBook />} />
      <Route path="/createtech" element={<CreateTech />} />
      <Route path="/editech/:id" element={<EditTech />} />
      <Route path="/createmovie" element={<CreateMovie />} />
      <Route path="/editmovies/:id" element={<EditMovie />} />
      <Route path="/creategifts" element={<CreateGift />} />
      <Route path="/editgifts/:id" element={<EditGifts />} />
      <Route path="/createdrink" element={<CreateDrink />} />
      <Route path="/editdrink/:id" element={<EditDrink />} />
      <Route path="/createbeauty" element={<CreateBeauty />} />
      <Route path="/editbeauty/:id" element={<EditBeauty />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </>
  );
};

export default Pages;
