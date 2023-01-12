import { Route, Routes } from "react-router";
import { Home } from "./pages/Home";
import { Posts } from "./pages/posts/Posts";
import LoginPage from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { PrivateRoute } from "./private_route/PrivateRoute";
import { AppHeader } from "./components/appBar/AppHeader";
import { useState } from "react";
import { AddPost } from "./pages/posts/AddPost";
import { SinglePost } from "./pages/posts/singlePage/SinglePost";
import { StoriesPerCategory } from "./pages/categories/StoriesPerCategory";
import { EditPost } from "./pages/posts/EditPost";
import { Country } from "./pages/countries/Country";
import { AppFooter } from "./components/footer/AppFooter";
import { ToastContainer } from "react-toast";

function App() {
  const [visible, setVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      {(visible || isVisible) && (
        <div className="top-0 bottom-0 left-0 right-0 bg-black opacity-75 h-full flex justify-center items-center fixed z-[60]"></div>
      )}

      <AppHeader
        visible={visible}
        setVisible={setVisible}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />

      <div>
        <ToastContainer position="bottom-right" delay={1} />
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/create-post/" element={<AddPost />} />
            <Route path="/edit-post/:id" element={<EditPost />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          {/* <Route path="/about" element={<About />} /> */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/post/:slug" element={<SinglePost />} />
          <Route path="/category/:link" element={<StoriesPerCategory />} />
          <Route path="/country/:country" element={<Country />} />
          {/* <Route path="/contact" element={<Contact />} />  */}
          {/* 
         
          
         
          <Route path="/create-post/:slug" element={<AddPost />} /> */}
        </Routes>
      </div>
      <AppFooter />
    </>
  );
}

export default App;
