import { createMarkup } from "../../helpers/parseHTML";

export default function Comment({ comment }) {
  return (
    <div className="flex items-center gap-2 ">
      <div className="w-16 h-16 rounded-full flex justify-center items-center bg-green-900">
        <span className="text-4xl text-white font-bold">
          {" "}
          {comment?.username?.charAt(0)}
        </span>
      </div>
      <div className="comment_col">
        <div className="">
          <span className="font-semibold">{comment?.username}</span>
          <div className="text-neutral-700 bg-slate-200 p-4 rounded-md">
            <div dangerouslySetInnerHTML={createMarkup(comment?.text)}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
