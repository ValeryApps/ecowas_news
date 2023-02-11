import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Layout } from "../../components/layout/Layout";
import { SpinnerComponent } from "../../components/loader/SpinnerComponent";
import { PostCard } from "../../components/posts/PostCard";
import { fetch_Posts_per_country } from "../../firebase_api/postApi";

export const PostsPerCountry = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { country } = useParams();
  const { language } = useSelector((state) => ({ ...state.lang }));

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      const data = await fetch_Posts_per_country(country, language);
      setLoading(false);
      setPosts(data);
    };
    getPosts();
  }, [country, setPosts, language]);
  if (loading) {
    return <SpinnerComponent />;
  }
  return (
    <Layout>
      <Helmet>
        <title>{country.toUpperCase()}</title>
      </Helmet>
      <div className="flex flex-wrap">
        {posts?.map((story, index) => (
          <div
            key={index}
            className="w-full md:w-[47%] lg:w-[31%] xl:w-[23%] mr-3"
          >
            <PostCard post={story} />
          </div>
        ))}
      </div>
    </Layout>
  );
};
