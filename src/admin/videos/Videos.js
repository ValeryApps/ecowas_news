import { AiFillDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

export const Videos = () => {
  const { videos } = useSelector((state) => ({ ...state.videos }));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteVideo = async (id) => {
    window.confirm("Are you sure you want to delete?");
    // await delete_post(id);
    dispatch(removePost(id));
  };
  return (
    <div className="px-20 py-10">
      <div className="bg-white py-5 rounded-md shadow-md">
        <div className="font-bold pl-10 text-teal-600">
          Number of Videos: {videos?.length}
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
                  {videos.map((video, index) => (
                    <tr className="border-b cursor-pointer" key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {index}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <img
                          src={video?.images[0]}
                          alt=""
                          className="w-10 object-cover"
                          onClick={() => navigate(`/videos/${video?.slug}`)}
                        />
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <span
                          onClick={() => navigate(`/videos/${video?.slug}`)}
                        >
                          {video?.title}
                        </span>
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {video?.commentsCount}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {video?.likesCount}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <div className="flex ml-auto gap-4">
                          <FaRegEdit
                            className="text-green-700"
                            onClick={() => navigate(`/edit-video/${video?.id}`)}
                          />
                          <AiFillDelete
                            className="text-red-900"
                            onClick={() => deleteVideo(video?.id)}
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
