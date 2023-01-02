import { PulseLoader } from "react-spinners/";
import { IoSend } from "react-icons/io5";

const CreateComment = ({ submitComment, text, setText, commentLoading }) => {
  return (
    <div className="create_comment_wrap">
      <div className="create_comment">
        <textarea
          type="text"
          onChange={(e) => setText(e.target.value)}
          value={text}
          placeholder="Write a comment"
          className="w-full rounded-md px-3"
          rows={2}
        ></textarea>
        <div className="spin_loader">
          {!commentLoading ? (
            <div className=" " onClick={submitComment}>
              <IoSend size={36} color="green" />
            </div>
          ) : (
            <PulseLoader color="#af9af1" loading={commentLoading} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateComment;
