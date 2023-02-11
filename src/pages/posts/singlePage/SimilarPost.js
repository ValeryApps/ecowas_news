import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetch_Posts_per_category } from "../../../firebase_api/postApi";
import { createMarkup } from "../../../helpers/parseHTML";

export const SimilarPosts = ({ category, language, slug }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  // console.log(language);
  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      const data = await fetch_Posts_per_category(category, language);
      setLoading(false);
      setPosts(data.filter((x) => x.slug !== slug));
    };
    getPosts();
  }, [category, setPosts, language, slug]);

  return (
    <>
      {posts?.map((post) => (
        <div className="px-2 mb-4  border-b-2" key={post.slug}>
          {loading ? (
            <>Loading...</>
          ) : (
            <Link to={`/post/${post.slug}`}>
              <div className="">
                <img src={post.images[0]} alt="" className="w-full h-full" />
              </div>

              <h3 className=" font-bold">{post?.title.substring(0, 50)}...</h3>

              <div className="text-sm">
                <div
                  dangerouslySetInnerHTML={createMarkup(
                    `${post?.description?.substring(0, 100)}...`
                  )}
                ></div>
              </div>
            </Link>
          )}
        </div>
      ))}
    </>
  );
};
