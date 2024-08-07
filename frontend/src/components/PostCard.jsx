import { MdOutlineReportProblem } from "react-icons/md";
import { BiUpvote, BiSolidUpvote } from "react-icons/bi";
import { FaRegComments, FaCommentAlt } from "react-icons/fa";
import { FaRegCommentAlt, FaComments } from "react-icons/fa";
import { UploadSoluton } from "./UploadSoluton";
import { useContext, useEffect, useState } from "react";
import { PostComments } from "./PostComments";
import { getUserById } from "../../utils/getUserById";
import { AllContext } from "../../context/contex";
import { isUpvotedByUser, upvote } from "./Upvote";
import { Report } from "./Report";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { NoOfUpvotes } from "../../utils/NoOfUpvotes";

export const PostCard = (props) => {
  const {
    id,
    img,
    text,
    comments,
    answer,
    postedBy,
    subject,
    difficulty,
    topic,
    type,
    status,
    setReloadPost
  } = props;
  const auth = useContext(AllContext);
  const [report, setReport] = useState(false);
  const userId = auth.auth._id;
  const [showSoln, setShowSoln] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [isUpvote, setIsUpvoted] = useState(false);
  const [userData, setUserData] = useState({});
  const [commText, setCommText] = useState("");
  const [comment, setComment] = useState([{}]);
  const [noOfUpvotes, setNoOfUpvotes] = useState(0);
  const canDel = postedBy === userId;

  const handleDelete = async () => {
    const res = await fetch(`https://backend.jeelore.site/api/qsn/deleteQsn`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ qsnId: id }),
    });
    const data = await res.json();
    if (data.error) {
      toast(data.error);
    }
    if (data.msg) {
      toast(data.msg);
      setReloadPost(true);
    }
  };
  useEffect(() => {
    const data = getUserById(postedBy).then((data) => {
      setUserData(JSON.parse(data));
    });
    isUpvotedByUser(userId, id).then((data) => {
      setIsUpvoted(data);
    });
    NoOfUpvotes(id).then((data) => {
      setNoOfUpvotes(data);
    });
  }, [id, userId]);

  return (
    <div className="card  mt-10 w-full border-b border-t border-accent bg-primary">
      <div className=" flex justify-between">
        <div className="w-auto mt-2 ml-5 mb-2 flex items-center ">
          <img
            className="rounded-full w-10 h-10"
            src={userData.profileImg}
            alt="PFP"
          />
          <p className="ml-2 text-xl text-white">{userData.userName}</p>
        </div>
        <div className=" flex items-center justify-end">
          <p className="text-lg text-white">QsnId : {id}</p>
        </div>
        <div
          className=" flex items-center justify-center"
        >
          {canDel && (
            <MdDelete
              onClick={handleDelete}
              className="text-4xl items-center self-center mr-2 flex cursor-pointer text-red-600 hover:text-red-800"
            />
          )}

          {/* <div className="dropdown w-full dropdown-end justify-center items-center">
            <div
              tabIndex={0}
              role="button"
              className="flex m-2 justify-center items-center"
            >
              <MdOutlineReportProblem className="text-2xl text-red-600" />
            </div>
            <div tabIndex={0}
              className="flex flex-1 flex-col text-center dropdown-content menu bg-base-100 rounded-xl border border-gray-400 z-[1] p-2 shadow">
                <Report id={id}/>
              </div>
          </div> */}
        </div>
      </div>

      <figure>{img && <img src={img} alt="Question Image" />}</figure>

      <div className="card-body mb-4 p-0 block">
        <p className="text-xl justify-end mt-2 ml-4 text-white">{text}</p>

        <div className="flex justify-between mt-4">
          <div className="ml-4 flex mt-2 items-center border border-accent rounded-xl">
            <div
              onClick={() => {
                if(auth.isLoggedIn){
                  setIsUpvoted(!isUpvote);
                  upvote(id);
                  setNoOfUpvotes(isUpvote?noOfUpvotes-1:noOfUpvotes+1);
                }
                else if(!auth.isLoggedIn){
                  toast("Login to upvote");
                  
                }
              }}
              className={` flex items-center justify-center border-r border-accent cursor-pointer rounded-l-xl hover:bg-base-200`}
            >
              {isUpvote ? (
                <BiSolidUpvote className={`text-lg ml-2 mr-1 text-accent`} />
              ) : (
                <BiUpvote className="text-lg ml-2 mr-1 text-info" />
              )}
              <div className="mr-2 text-center text-accent text-lg">{noOfUpvotes}</div>
            </div>
            {/* <div
              onClick={() => {
                setShowComments(!showComments);
                setShowSoln(false);
              }}
              className="border-r border-white cursor-pointer hover:bg-base-200"
            >
              {showComments ? (
                <FaComments className="text-xl m-2" />
              ) : (
                <FaRegComments className="text-xl m-2" />
              )}
            </div> */}
            <div
              onClick={() => {
                setShowSoln(!showSoln);
                setShowComments(false);
              }}
              className="cursor-pointer hover:bg-base-200 rounded-r-xl"
            >
              {showSoln ? (
                <FaCommentAlt className="text-md m-2 text-accent" />
              ) : (
                <FaRegCommentAlt className="text-md m-2 text-info" />
              )}
            </div>
          </div>
          <div className="justify-end mr-4">
            <div className="card-actions self-end justify-end mt-4 ml-4">
              <div className="badge h-full border bg-accent text-black border-black  text-sm items-center justify-center">
                {difficulty}
              </div>
              <div className="badge h-full border bg-accent text-black border-black text-sm items-center justify-center">
                {subject}
              </div>
              <div className="badge h-full border  bg-accent text-black border-black text-sm items-center justify-center">
                {type}
              </div>
              <div className="badge h-full border  bg-accent text-black border-black text-sm items-center justify-center">
                {topic}
              </div>
              <div className="badge h-full border  bg-accent text-black border-black text-sm items-center justify-center">
                {status}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showSoln && <UploadSoluton id={id} type={type} answer={answer}/>}
      {/* {showComments && (
        <>
          <div className="flex justify-center items-center">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
              Discussion
            </h2>
          </div>

          <div className="py-2 flex px-4 mb-4  rounded-lg rounded-t-lg ">
            <textarea
              onChange={(e) => setCommText(e.target.value)}
              value={commText}
              className=" max-h-full w-full input bg-primary border-0 rounded-none text-lg focus:outline-none focus-within:outline-none focus-within:border-b border-b border-white"
              placeholder="Add a comment"
            ></textarea>
            <button
              type="none"
              className="ml-2 btn bg-blue-700 hover:bg-blue-950 rounded-xl text-white font-bold py-2 px-4 "
              onClick={() => {
                setComment([
                  ...comment,
                  {
                    pfp: authContext.auth.profileImg,
                    userName: authContext.auth.userName,
                    text: commText,
                  },
                ]);
                setCommText("");
              }}
            >
              Post
            </button>
          </div>
          {comment.map((comm) => (
            <PostComments
              qsnId="92347892374"
              CommentBy="66938d174dd546741af35c7c"
              commentText="the text"
            />
          ))}
        </>
      )} */}
    </div>
  );
};
