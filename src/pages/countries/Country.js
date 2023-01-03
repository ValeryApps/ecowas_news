import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Layout } from "../../components/layout/Layout";
import { PostCard } from "../../components/posts/PostCard";
import { fetPostsPerCountryAsync } from "../../store/reducers/post_country";

export const Country = () => {
  const { posts } = useSelector((state) => ({ ...state.postPerCountry }));
  const dispatch = useDispatch();
  const { country } = useParams();
  console.log(posts);
  // const stories = posts?.filter((x) => x.country === country);
  useEffect(() => {
    const loadPost = async () => {
      dispatch(await fetPostsPerCountryAsync(country));
    };
    loadPost();
  }, [dispatch, country]);
  return (
    <Layout>
      <Helmet>
        <title>{country}</title>
      </Helmet>

      {posts?.length > 0 ? (
        <div className="flex">
          {posts?.map((story, index) => (
            <div
              className="w-full md:w-[47%] lg:w-[31%] xl:w-[23%] mr-3"
              key={index}
            >
              <PostCard story={story} />
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full flex justify-center">
          <img src="/nothing.gif" alt="" />
        </div>
      )}
    </Layout>
  );
};
