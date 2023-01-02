import { getAuth } from "firebase/auth";
import { useState } from "react";
import { PulseLoader } from "react-spinners/";
import { create_reply } from "../../firebase_api/replyApi";
import { v4 as uuidv4 } from "uuid";
import { IoSend } from "react-icons/io5";

const CreateReply = ({ commentId, setReplies, replies }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser } = getAuth();

  const submitReply = async (e) => {
    try {
      const reply = {
        id: uuidv4(),
        text,
        commentId,
        userId: currentUser.uid,
        username: currentUser.displayName,
      };
      setLoading(true);
      await create_reply(commentId, reply);
      setReplies([...replies, reply]);
      setLoading(false);
      setText("");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="create_comment_wrap">
      <div className="create_comment">
        <div className="comment_input_wrap">
          <input
            type="text"
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder="Write a reply"
          />
          <div className="spin_loader">
            {!loading ? (
              <div className=" " onClick={submitReply}>
                <IoSend size={36} color="green" />
              </div>
            ) : (
              <PulseLoader color="#af9af1" loading={loading} />
            )}
          </div>
          <div className="comment_circle_icon circle hover2">
            <i className="gif_icon"></i>
          </div>
          <div className="comment_circle_icon circle hover2">
            <i className="sticker_icon"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateReply;
