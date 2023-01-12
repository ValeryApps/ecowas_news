import { NewsSlideShow } from "../components/slide/NewsSlideShow";
import "./home.css";
import { RightSideMenu } from "../components/rightSide/RightSideMenu";
import { CategoryPill } from "../components/category/CategoryPill";
import { PostsCategory } from "../components/posts/PostsCategory";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import Typewriter from "typewriter-effect";
import { FaRunning } from "react-icons/fa";
import { IoSchool } from "react-icons/io5";
import { GiPublicSpeaker } from "react-icons/gi";
import { BsGraphUp } from "react-icons/bs";
import { ImMusic } from "react-icons/im";
import { MdComputer } from "react-icons/md";
import { BiHealth } from "react-icons/bi";
import { SpinnerComponent } from "../components/SpinnerComponent";
import { useEffect } from "react";
import { fetch_Posts } from "../firebase_api/postApi";
// import { useMediaQuery } from "react-responsive";
import { getAuth } from "firebase/auth";

export const Home = () => {
  const { posts, status, error } = useSelector((state) => ({ ...state.posts }));
  const dispatch = useDispatch();

  const sports = posts?.filter((x) => x.category === "sports");
  const politics = posts?.filter((x) => x.category === "politics");
  const economies = posts?.filter((x) => x.category === "economy");
  const tech = posts?.filter((x) => x.category === "technology");
  const educations = posts?.filter((x) => x.category === "education");
  const healths = posts?.filter((x) => x.category === "health");
  const entertainments = posts?.filter((x) => x.category === "entertainment");
  const auth = getAuth();

  const postTitles = posts?.map((post) => {
    return post?.title;
  });
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        dispatch(await fetch_Posts());
      } catch (error) {}
    };
    fetchPosts();
  }, [dispatch, auth]);
  if (status === "loading") {
    return <SpinnerComponent />;
  }
  if (error || posts?.length === 0) {
    return (
      <div className="w-full min-h-[600px] static right-0 left-0 top-0 bottom-0 content-center ">
        <h1 className="text-5xl text-red-700 text-center">
          Sorry! Could not fetch data. Please check your connection{" "}
        </h1>
      </div>
    );
  }
  return (
    <div className="lg:px-10 mt-[20px]">
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="">
        <div className="type_writer line-clamp-1">
          <Typewriter
            options={{
              strings: postTitles,
              autoStart: true,
              deleteSpeed: 1,
              delay: 10,
              loop: true,
              pauseFor: 3000,
            }}
          />
        </div>
        <NewsSlideShow posts={posts} />
      </div>

      <div className="">
        <div className="flex lg:gap-3">
          <div className="">
            {politics?.length > 0 && (
              <CategoryPill category="Politics">
                <GiPublicSpeaker />
              </CategoryPill>
            )}
            <PostsCategory posts={politics} />
            {sports?.length > 0 && (
              <CategoryPill category="Sports">
                {" "}
                <FaRunning />
              </CategoryPill>
            )}
            <PostsCategory posts={sports} />
            {economies?.length > 0 && (
              <CategoryPill category="Economy">
                <BsGraphUp />
              </CategoryPill>
            )}
            <PostsCategory posts={economies} />
            {tech?.length > 0 && (
              <CategoryPill category="Technology">
                <MdComputer />
              </CategoryPill>
            )}
            <PostsCategory posts={tech} />
            {healths?.length > 0 && (
              <CategoryPill category="Entertainment">
                <ImMusic />
              </CategoryPill>
            )}
            <PostsCategory posts={entertainments} />
            {healths?.length > 0 && (
              <CategoryPill category="Health">
                <BiHealth />
              </CategoryPill>
            )}
            <PostsCategory posts={healths} />
            {educations?.length > 0 && (
              <CategoryPill category="Education">
                <IoSchool />
              </CategoryPill>
            )}
            <PostsCategory posts={educations} />
          </div>
          <div className="hidden lg:block lg:min-w-[25%] mt-14 bg-white shadow-md">
            <RightSideMenu />
          </div>
        </div>
      </div>
    </div>
  );
};
