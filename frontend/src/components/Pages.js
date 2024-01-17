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
import Fashion from './Fashion';
import FashionDetail from './FashionDetail';
import FashionList from './addfashion/FashionList';
import CreateFashion from './addfashion/CreateFashion';
import EditFashion from './addfashion/EditFashion';
import DatingDetail from './DatingDetail';
import Dating from './Dating';
import DatingList from './adddating/DatingList';
import CreateDating from './adddating/CreateDating';
import EditDating from './adddating/EditDating';
import Packing from './Packing';
import PackingDetail from './PackingDetail';
import PackingList from './addpacking/PackingList';
import CreatePacking from './addpacking/CreatePacking';
import EditPacking from './addpacking/EditPacking';
import Recepies from './Recepies';
import RecepiesDetail from './RecepiesDetail';
import RecepiesList from './addrecepies/RecepiesList';
import CreateRecepie from './addrecepies/CreateRecepie';
import EditRecepie from './addrecepies/EditRecepie';
import Friendships from './Friendships';
import FriendshipsDetail from './FriendshipsDetail';
import FriendshipsList from './addfriendships/FriendshipsList';
import CreateFriendship from './addfriendships/CreateFriendship';
import EditFriendship from './addfriendships/EditFriendship';
import Vacations from './Vacations';
import VacationDetail from './VacationsDetail';
import VacationsList from './addvacations/VacationsList';
import CreateVacation from './addvacations/CreateVacation';
import EditVacation from './addvacations/EditVacation';
import PersonalProfile from './PersonalProfile';
import { ProtectedRoute } from './authguard/ProtectedRoute';
import UserList from './UserList';


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
      <Route path="/fashion" element={<Fashion />} />
      <Route path="/dating" element={<Dating />} />
      <Route path="/packing" element={<Packing />} />
      <Route path="/recepies" element={<Recepies />} />
      <Route path="/vacations" element={<Vacations />} />
      <Route path="/friendships" element={<Friendships />} />
      <Route path="/movies/:id" element={<MovieDetail />} />
      <Route path="/giftideas/:id" element={<GiftDetail />} />
      <Route path="/books/:id" element={<BookDetail />} />
      <Route path="/technology/:id" element={<TechDetail />} />
      <Route path="/drinks/:id" element={<DrinksDetail />} />
      <Route path="/beauty/:id" element={<BeautyDetail />} />
      <Route path="/fashion/:id" element={<FashionDetail />} />
      <Route path="/dating/:id" element={<DatingDetail />} />
      <Route path="/packing/:id" element={<PackingDetail />} />
      <Route path="/recepies/:id" element={<RecepiesDetail />} />
      <Route path="/friendships/:id" element={<FriendshipsDetail />} />
      <Route path="/vacations/:id" element={<VacationDetail />} />

      <Route element={<AdminProtectedRoute redirectPath="/" />}>
      <Route path="/booklist" element={<BookList />} />
      <Route path="/giftlist" element={<GiftList />} />
      <Route path="/movielist" element={<MovieList />} />
      <Route path="/techlist" element={<TechList />} />
      <Route path="/drinkslist" element={<DrinksList />} />
      <Route path="/beautylist" element={<BeautyList />} />
      <Route path="/fashionlist" element={<FashionList />} />
      <Route path="/datinglist" element={<DatingList />} />
      <Route path="/packinglist" element={<PackingList />} />
      <Route path="/recepielist" element={<RecepiesList />} />
      <Route path="/friendshiplist" element={<FriendshipsList />} />
      <Route path="/vacationslist" element={<VacationsList />} />
      <Route path="/userlist" element={<UserList />} />

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
      <Route path="/createfashion" element={<CreateFashion />} />
      <Route path="/editfashion/:id" element={<EditFashion />} />
      <Route path="/createdating" element={<CreateDating />} />
      <Route path="/editdating/:id" element={<EditDating />} />
      <Route path="/createpacking" element={<CreatePacking />} />
      <Route path="/editpacking/:id" element={<EditPacking />} />
      <Route path="/createrecepie" element={<CreateRecepie />} />
      <Route path="/editrecepie/:id" element={<EditRecepie />} />
      <Route path="/createfriendship" element={<CreateFriendship />} />
      <Route path="/editfriendship/:id" element={<EditFriendship />} />
      <Route path="/createvacation" element={<CreateVacation />} />
      <Route path="/editvacation/:id" element={<EditVacation />} />
      </Route>


      <Route element={<ProtectedRoute redirectPath="/" />}>
      <Route path="/myprofile" element={<PersonalProfile />} />
      </Route>

      <Route element={<ProtectedRouteNotLoggedIn redirectPath="/books" />}>
          <Route path="/login" element={<Login />} />
        </Route>
    </Routes>
  </>
  );
};

export default Pages;
