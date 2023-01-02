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
    <div className="w-full bg-white md:h-[250px] mb-3 pb-3">
      <img
        src={story.images[0]}
        alt=""
        className="lg:h-[150px] w-full h:[100px]"
      />
      <div className="px-2 flex flex-col justify-between overflow-hidden  h-[100px]">
        <Link to={`/post/${story.slug}`}>
          <h5
            className="font-semibold text-md line-clamp-3"
            title={story.title}
          >
            {story.title}
          </h5>
        </Link>
        <div className="flex gap-2 max-w-sm  overflow-hidden ">
          {story.country}
          <img
            src={item?.flag}
            alt=""
            className="w-[30px] max-h-5 object-cover"
          />
        </div>
      </div>
    </div>
  );
};
