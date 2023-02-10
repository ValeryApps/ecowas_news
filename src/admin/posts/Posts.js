import { AiFillDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { delete_post } from "../../firebase_api/postApi";
import { removePost } from "../../store/reducers/post";

export const Posts = () => {
  const { posts } = useSelector((state) => ({ ...state.posts }));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deletePost = async (id) => {
    await delete_post(id);
    dispatch(removePost(id));
  };
  return (
    <div className=" px-20 py-10">
      <div className="bg-white py-5 rounded-md shadow-md">
        <div className="font-bold pl-10 text-teal-600">
          Number of Posts: {posts?.length}
        </div>
        <div className="overflow-x-auto">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Main Image
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      comments
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Likes
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post, index) => (
                    <tr className="border-b cursor-pointer" key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {index}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <img
                          src={post?.images[0]}
                          alt=""
                          className="w-10 object-cover"
                          onClick={() => navigate(`/post/${post?.slug}`)}
                        />
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <span onClick={() => navigate(`/post/${post?.slug}`)}>
                          {post?.title}
                        </span>
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {post?.commentsCount}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {post?.likesCount}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <div className="flex ml-auto gap-4">
                          <FaRegEdit
                            className="text-green-700"
                            onClick={() => navigate(`/edit-post/${post?.id}`)}
                          />
                          <AiFillDelete
                            className="text-red-900"
                            onClick={() => deletePost(post?.id)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
