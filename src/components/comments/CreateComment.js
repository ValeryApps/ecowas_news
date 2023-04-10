import { PulseLoader } from "react-spinners/";
import { IoSend } from "react-icons/io5";

const CreateComment = ({ submitComment, text, setText, commentLoading }) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <textarea
          type="text"
          onChange={(e) => setText(e.target.value)}
          value={text}
          placeholder="Write a comment"
          className="w-full rounded-md px-3 max-w-[80%] pt-1 text-md bg-gray-300 focus:bg-white mt-3"
          rows={3}
        ></textarea>
        {text.trim() && (
          <div className="spin_loader">
            {!commentLoading ? (
              <div className=" cursor-pointer " onClick={submitComment}>
                <IoSend size={20} color="green" />
              </div>
            ) : (
              <PulseLoader color="#af9af1" loading={commentLoading} size={10} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateComment;
