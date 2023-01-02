import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Layout } from "../../components/layout/Layout";
import { PostCard } from "../../components/posts/PostCard";
import { SpinnerComponent } from "../../components/SpinnerComponent";
import { fetPostsPerCategoryAsync } from "../../store/reducers/post_category";
import "../posts/post.css";

export const StoriesPerCategory = () => {
  const { posts, status } = useSelector((state) => ({
    ...state.postPerCategory,
  }));
  const dispatch = useDispatch();
  const { link } = useParams();

  const stories = posts?.filter(
    (x) => x.category.toLowerCase() === link.toLowerCase()
  );

  useEffect(() => {
    const getPosts = async () => {
      dispatch(fetPostsPerCategoryAsync(link));
    };
    getPosts();
  }, [dispatch, link]);
  if (status === "loading") {
    return <SpinnerComponent />;
  }
  return (
    <Layout>
      <Helmet>
        <title>{link.toUpperCase()}</title>
      </Helmet>
      <div>
        {stories.length > 0 ? (
          <div className="flex flex-wrap">
            {stories?.map((story, index) => (
              <div
                className="w-full md:w-[47%] lg:w-[31%] xl:w-[23%] mr-3"
                key={index}
              >
                <PostCard story={story} />
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full h-full flex justify-center">
            <img src="/nothing.gif" alt="" />
          </div>
        )}
      </div>
    </Layout>
  );
};
