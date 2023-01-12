import Moment from "react-moment";
import { Link } from "react-router-dom";
import { countries } from "../../data/countries";
export const PostCard = ({ story }) => {
  // let mx_title = "";
  // if (story?.title?.length > 30) {
  //   mx_title = `${story?.title?.substring(0, 30)}...`;
  // } else {
  //   mx_title = story?.title;
  // }
  const item = countries.find((x) => x.name === story?.country);
  return (
    <div className="w-full bg-white  mb-3 pb-5 ">
      <img
        src={story.images[0]}
        alt=""
        className="lg:h-[150px] w-full h:[100px]"
      />
      <img
        src={item?.flag}
        alt="flag"
        className="w-[20px] max-h-5 absolute top-0"
      />
      <div className="px-2 flex flex-col justify-between overflow-hidden">
        <Link to={`/post/${story.slug}`}>
          <h5
            className="font-semibold text-md line-clamp-3"
            title={story.title}
          >
            {story.title}
          </h5>
        </Link>

        <div className="flex gap-2 max-w-sm mb-2 overflow-hidden items-center">
          By:<span className="text-gray-500 font-bold">{story.author}</span>
        </div>
        <span className="text-sm text-teal-700">
          <Moment fromNow date={new Date(story.createdAt * 1)}></Moment>
        </span>
      </div>
    </div>
  );
};
