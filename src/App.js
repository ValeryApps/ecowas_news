import { Route, Routes } from "react-router";
import { Home } from "./pages/Home";
import { AppHeader } from "./components/appbar/AppHeader";
import { PrivateRoute } from "./private_route/PrivateRoute";
import { AddPost } from "./pages/posts/AddPost";
import { SinglePost } from "./pages/posts/singlePage/SinglePost";
import { EditPost } from "./pages/posts/EditPost";
import { AppFooter } from "./components/footer/AppFooter";
import { ToastContainer } from "react-toastify";
import { useCycle } from "framer-motion";
import { PostsPerCountry } from "./pages/posts/PostsPerCountry";
import { PostsPerCategory } from "./pages/posts/PostsPerCategory";
import { SignIn } from "./pages/auth/SignIn";
import { SignUp } from "./pages/auth/SignUp";
import { Posts } from "./admin/posts/Posts";
import "react-toastify/dist/ReactToastify.css";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Videos } from "./pages/videos/Videos";
import { AddVideo } from "./pages/videos/AddVideo";
import { VideoDetails } from "./pages/videos/VideoDetails";

function App() {
  const [openCountries, setOpenCountries] = useCycle(false, true);
  const [openCategories, setOpenCategories] = useCycle(false, true);

  return (
    <>
      {(openCountries || openCategories) && (
        <div className="top-0 bottom-0 right-0 left-0 bg-black opacity-80 h-full flex justify-center items-center fixed z-50"></div>
      )}

      <AppHeader
        openCountries={openCountries}
        setOpenCountries={setOpenCountries}
        openCategories={openCategories}
        setOpenCategories={setOpenCategories}
      />

      <div>
        <ToastContainer position="bottom-right" delay={1} />
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/create-post/" element={<AddPost />} />
            <Route path="/edit-post/:postId" element={<EditPost />} />
            <Route path="/admin/posts" element={<Posts />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/post/:slug" element={<SinglePost />} />
          <Route path="/countries/:country" element={<PostsPerCountry />} />
          <Route path="/categories/:category" element={<PostsPerCategory />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/add-video" element={<AddVideo />} />
          <Route path="/videos/:slug" element={<VideoDetails />} />
        </Routes>
      </div>
      <AppFooter />
    </>
  );
}

export default App;
