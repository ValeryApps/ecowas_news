import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { SlideShow } from "../components/slide/SlideShow";
import Typewriter from "typewriter-effect";
import { PostCategory } from "../components/posts/PostCategory";
import { CategoryPill } from "../components/posts/CategoryPill";
import { GiPublicSpeaker, GiOpenBook } from "react-icons/gi";
import { FaRunning } from "react-icons/fa";
import { BsGraphUp } from "react-icons/bs";
import { MdComputer } from "react-icons/md";
import { HiUsers } from "react-icons/hi2";
import { RightSide } from "../components/rightSide/RightSide";
import { SpinnerComponent } from "../components/loader/SpinnerComponent";
import { fetch_Posts } from "../firebase_api/postApi";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [storyTitles, setStoryTitles] = useState([]);
  const userLanguage = navigator.language;
  console.log(userLanguage);
  const { language, changeLang } = useSelector((state) => ({ ...state.lang }));

  const { t } = useTranslation();

  useEffect(() => {
    setStoryTitles(posts?.map((post) => post.title));
  }, [posts]);

  useEffect(() => {
    setLoading(true);
    const getPosts = async () => {
      if (!changeLang) {
        if (userLanguage === "en-US" || userLanguage === "en-GB") {
          const data = await fetch_Posts("en");
          setLoading(false);
          setPosts(data);
        } else {
          const data = await fetch_Posts("fr");
          setLoading(false);
          setPosts(data);
        }
      } else {
        const data = await fetch_Posts(language);
        setLoading(false);
        setPosts(data);
      }
    };
    getPosts();
  }, [setPosts, language, userLanguage, changeLang]);
  if (loading) {
    return <SpinnerComponent />;
  }
  return (
    <>
      <Helmet>
        <title>Home - E24 news</title>
      </Helmet>
      <div className="lg:px-5">
        <div className="bg-white shadow-md w-full md:w-[75%] px-3 line-clamp-1 my-2 rounded-xl">
          {posts.length > 0 ? (
            <Typewriter
              options={{
                strings: storyTitles,
                autoStart: true,
                deleteSpeed: 1,
                delay: 10,
                loop: true,
                pauseFor: 3000,
              }}
            />
          ) : (
            <h2>Loading titles...</h2>
          )}
        </div>
        <SlideShow posts={posts} />
        <div className="flex justify-between">
          <div className=" w-full lg:max-w-[75%] ">
            <div>
              <CategoryPill category={"Politics"} t={t}>
                <GiPublicSpeaker />
              </CategoryPill>
              <PostCategory category={"politics"} />
            </div>
            <div>
              <CategoryPill category={"Sports"} t={t}>
                <FaRunning />
              </CategoryPill>
              <PostCategory category={"sports"} />
            </div>
            <div>
              <CategoryPill category={"Economy"} t={t}>
                <BsGraphUp />
              </CategoryPill>
              <PostCategory category={"economy"} />
            </div>
            <div>
              <CategoryPill category={"Technology"} t={t}>
                <MdComputer />
              </CategoryPill>
              <PostCategory category={"technology"} />
            </div>
            <div>
              <CategoryPill category={"Education"} t={t}>
                <GiOpenBook />
              </CategoryPill>
              <PostCategory category={"education"} />
            </div>
            <div>
              <CategoryPill category={"Society"} t={t}>
                <HiUsers />
              </CategoryPill>
              <PostCategory category={"society"} />
            </div>
          </div>
          <div className="hidden lg:block w-[24%] mt-8">
            <RightSide posts={posts} />
          </div>
        </div>
      </div>
    </>
  );
};
