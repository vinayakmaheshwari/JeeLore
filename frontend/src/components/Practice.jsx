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
import { PracticePostSoln } from "./PracticePostSoln";
import { GrPrevious, GrNext } from "react-icons/gr";

export const PracticePostCard = (props) => {
  const {
    id,
    img,
    text,
    comments,
    postedBy,
    subject,
    difficulty,
    topic,
    type,
    status,
    currPage,
    setCurrPage,
    answer,
    solution,
  } = props;
  const auth = useContext(AllContext);
  const [report, setReport] = useState(false);
  const userId = auth.auth._id;
  const [userData, setUserData] = useState({});
  const [userAns, setUserAns] = useState("");
  const [showSoln, setShowSoln] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState();
  const options = ["A", "B", "C", "D"];

  useEffect(() => {
    const data = getUserById(postedBy).then((data) => {
      setUserData(JSON.parse(data));
    });
  }, [id, userId]);

  const checkAnswer = () => {
    setShowSoln(true);
    setIsAnswered(true);
    if (userAns === answer) {
      toast("Correct Answer", { type: "success" });
      setIsCorrect(true);
    } else {
      toast("Wrong Answer", { type: "error" });
      setIsCorrect(false);
    }
  };

  return (
    <div className="card border-t border-b border-accent mb-24 mt-10 w-11/12 flex flex-col shadow-xl bg-primary">
      <div className=" flex justify-between">
        <div className="w-auto mt-2 ml-5 mb-2 flex items-center ">
          <img
            className="rounded-full w-10 h-10"
            src={userData.profileImg}
            alt="PFP"
          />
          <p className="ml-2 text-xl underline">{userData.userName}</p>
        </div>
        <div className=" flex items-center justify-end">
          <p className="text-lg ">QsnId : {id}</p>
        </div>
        <div
          onClick={() => setReport(!report)}
          className=" flex items-center justify-center"
        >
          <MdOutlineReportProblem className="text-2xl items-center self-center mr-5 flex cursor-pointer text-red-600 hover:text-red-800" />
        </div>
      </div>

      <figure>{img && <img src={img} alt="Question Image" />}</figure>

      <div className="card-body mb-4 p-0 block">
        <p className="text-xl justify-end mt-2 ml-4">{text}</p>
      </div>
      <div className="card-actions self-end justify-end mt-2 mr-4">
        <div className="badge h-full border bg-accent text-black border-black  text-sm items-center justify-center">
          {difficulty}
        </div>
        <div className="badge h-full border bg-accent text-black border-black text-sm items-center justify-center">
          {subject}
        </div>

        <div className="badge h-full border  bg-accent text-black border-black text-sm items-center justify-center">
          {topic}
        </div>
      </div>
      <div className="p-2">
        {type === "Numerical" && (
          <input
            type="number"
            onChange={(e) => setUserAns(e.target.value)}
            placeholder="Enter your answer"
            className={`input w-full bg-base-100 ${
              isAnswered
                ? answer === userAns
                  ? "bg-green-600"
                  : "bg-red-600"
                : ""
            } rounded-xl text-lg focus:outline-none focus-within:outline-none  border-white`}
          />
        )}
        {type === "MCQ" && (
          <div className="flex justify-center items-center">
            <div className="w-9/12 grid grid-cols-2 gap-2">
              {options.map((option) => (
                <div className={`my-1 mx-2 w-11/12 bg-white rounded-xl  `}>
                  <button
                    value={option}
                    onClick={(e) => setUserAns(e.target.value)}
                    className={`${userAns === option ? `bg-blue-600` : ``} ${
                      isAnswered
                        ? answer === option
                          ? "bg-green-600"
                          : ""
                        : ""
                    } ${
                      isAnswered
                        ? answer !== option && userAns === option
                          ? "bg-red-600"
                          : ""
                        : ""
                    }
                    
                    focus:border-black text-black flex cursor-pointer text-start items-center justify-start w-full bg-base-100 mr-2 rounded-xl ps-4 border-2 border-secondary  dark:border-gray-700`}
                  >
                    <label
                      for="bordered-radio-1"
                      className="py-2 text-xl font-medium text-gray-900 dark:text-gray-300"
                    >
                      {option}
                    </label>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {showSoln && (
        <div className="flex mb-5 flex-col justify-center items-center">
          <h1 className="self-start mx-4 text-xl text-white">
            Answer: {answer}
          </h1>
          <p className="text-2xl font-bold underline justify-start mt-2">
            Solutions
          </p>
          {solution.map((s) => (
            <>
              <PracticePostSoln
                text={s.text}
                img={s.image}
                postedBy={s.postedBy}
              />
            </>
          ))}
        </div>
      )}

      <div className="h-10  w-11/12 flex justify-center bottom-10  fixed">
        <div className="bg-primary h-16 items-center rounded-xl border  border-accent w-3/5 p-4 bottom-8 self-center  flex  justify-between">
          <div>
            <button
              onClick={() => setCurrPage(currPage - 1)}
              className="btn text-black font-bold bg-accent hover:bg-info self-start"
            >
              <GrPrevious />
            </button>
          </div>
          <div
            onClick={checkAnswer}
            className="bg-accent text-black hover:bg-info btn text-center  border w-1/5 h-full rounded-xlitems-center  justify-center"
          >
            <p>Check Answer</p>
          </div>
          <div>
            <button
              onClick={() => setCurrPage(currPage + 1)}
              className="btn text-black  bg-accent hover:bg-info self-end"
            >
              <GrNext />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
