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
import { Skeleton } from "./Skeleton";

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
    totalPages,
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
    <>
    <div className="card border-t border-b border-accent mb-5 lg:mb-24 mt-5 w-11/12 flex flex-col shadow-xl bg-primary">
      {!auth.isLoading ? (
        <>
          <div className="flex mt-1 mb-2 justify-between">
            <div className="w-auto self-center ml-1 lg:ml-5 lg:mb-2 flex items-center ">
              <img
                className="rounded-full w-6 h-6 lg:w-10 lg:h-10"
                src={userData.profileImg}
                alt="PFP"
              />
              <p className="lg:ml-2 ml-1 text-sm lg:text-xl underline">{userData.userName}</p>
            </div>
            <div className="flex items-center justify-end">
              <p className="text-xs lg:text-lg ">QsnId : {id}</p>
            </div>
            <div
              onClick={() => setReport(!report)}
              className=" flex items-center justify-center"
            >
              <MdOutlineReportProblem className="lg:text-2xl text-md items-center self-center mr-1 lg:mr-5 flex cursor-pointer text-red-600 hover:text-red-800" />
            </div>
          </div>

          <figure>{img && <img src={img} alt="Question Image" />}</figure>

          <div className="card-body lg:mb-4 mt-2 p-0 block">
            <p className="lg:text-xl text-sm justify-end lg:mt-2 ml-4">{text}</p>
          </div>
          <div className="card-actions self-end justify-end mr-2 lg:mt-2 lg:mr-4">
            <div className="badge h-full border bg-accent text-black border-black text-xs lg:text-sm items-center justify-center">
              {difficulty}
            </div>
            <div className="badge h-full border bg-accent text-black border-black text-xs lg:text-sm items-center justify-center">
              {subject}
            </div>

            <div className="badge h-full border  bg-accent text-black border-black text-xs lg:text-sm items-center justify-center">
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
                } rounded-xl text-xs h-[1.2rem] lg:h-[3rem] lg:text-lg focus:outline-none focus-within:outline-none  border-white`}
              />
            )}
            {type === "MCQ" ? (
              <div className="flex justify-center items-center">
                <div className="w-9/12 grid grid-cols-2 gap-2">
                  {options.map((option) => (
                    <div className={`lg:my-1 mx-2 w-11/12 bg-white rounded-xl  `}>
                      <button
                        value={option}
                        onClick={(e) => setUserAns(e.target.value)}
                        className={`${
                          userAns === option ? `bg-blue-600` : ``
                        } ${
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
                    
                    focus:border-black h-[2rem] text-black flex cursor-pointer text-start items-center justify-start w-full bg-base-100 mr-2 rounded-xl ps-4 border-2 border-secondary  dark:border-gray-700`}
                      >
                        <label
                          for="bordered-radio-1"
                          className="py-2 text-sm h-fit w-fit lg:text-xl font-medium text-gray-900 dark:text-gray-300"
                        >
                          {option}
                        </label>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>

          {showSoln && (
            <div className="flex mb-5 flex-col justify-center items-center">
              <h1 className="self-start mx-4 text-sm lg:text-xl text-white">
                Answer: {answer}
              </h1>
              <p className="lg:text-2xl text-md font-bold underline justify-start lg:mt-2">
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
        </>
      ) : (
        <div className="text-3xl w-full font-bold justify-center mt-10 items-center text-center">
          <div className="flex  w-full flex-col ">
            <div className="flex border border-gray-800 rounded-2xl w-full flex-col gap-4">
              <div className="skeleton h-64 w-full"></div>
              <div className="skeleton h-4 w-28"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
            </div>
            
          </div>
        </div>
      )}

      
    </div>
    <div className="h-12 w-11/12 flex justify-center lg:bottom-10 lg:fixed mb-10 lg:mb-0">
    <div className="bg-primary h-16 items-center rounded-xl border  border-accent w-4/5 lg:w-3/5 p-4 bottom-8 self-center  flex  justify-between">
      <div>
        <button
          disabled={currPage === 1}
          onClick={() => setCurrPage(currPage - 1)}
          className="btn text-black font-bold bg-accent hover:bg-info self-start"
        >
          <GrPrevious />
        </button>
      </div>
      <div
        onClick={checkAnswer}
        className="bg-accent text-black hover:bg-info btn text-center  border w-3/5 lg:w-1/5 h-full rounded-xlitems-center  justify-center"
      >
        <p>Check Answer</p>
      </div>
      <div>
        <button
          disabled={currPage === totalPages}
          onClick={() => setCurrPage(currPage + 1)}
          className="btn text-black  bg-accent hover:bg-info self-end"
        >
          <GrNext />
        </button>
      </div>
    </div>
  </div>
  </>
  );
};
