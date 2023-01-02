const Reply = ({ reply }) => {
  // const [reply, setReply] = useState(null);

  // useEffect(() => {
  //   const get_replies = async () => {
  //     const data = await getReplies(commentId, token);
  //     const singleReply = data.find((x) => x._id === replyId);
  //     console.log(data);
  //     // setReply(singleReply);
  //   };
  //   get_replies();
  // }, [replyId]);
  // console.log(replyId);
  return (
    <div className="comment">
      <div>{reply?.username.indexAt(0)}</div>

      <div className="comment_col">
        <div className="comment_wrap">
          <span className="comment_name">{reply?.username}</span>
          <div className="comment_text">{reply?.text}</div>
        </div>

        <div className="comment_actions">
          <span>Like</span>
          <span>
            {/* <Moment fromNow interval={30}> */}
            {/* {reply?.repliedAt} */}
            {/* </Moment> */}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Reply;
