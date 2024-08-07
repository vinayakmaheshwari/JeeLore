import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { mathsTopics, physicsTopics, chemistryTopics } from "../assets/Topic";

export const Upload = () => {
  const difficultyList = ["Neet", "JeeMains", "JeeAdvanced", "olympiad"];
  const subjectList = ["Biology", "Chemistry", "Physics", "Maths"];
  const typeList = ["MCQ", "Numerical", "Subjective"];
  const statusList = ["Solved", "Unsolved"];
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const qsnImg = useRef();
  const solImg = useRef();
  const [error, setError] = useState("");
  const [text, setText] = useState("");
  const [qsnImage, setQsnImage] = useState(null);
  const [solnImage, setSolnImage] = useState(null);
  const [difficulty, setDifficulty] = useState("");
  const [subject, setSubject] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [topic, setTopic] = useState("");
  const [answer, setAnswer] = useState("");
  const [solnText, setSolnText] = useState("");
  var topicList = [];

  if (subject === "Maths") {
    topicList = mathsTopics;
  } else if (subject === "Physics") {
    topicList = physicsTopics;
  } else if (subject === "Chemistry") {
    topicList = chemistryTopics;
  }

  const pasteQsn = async () => {
    try {
      const clipboardItems = await navigator.clipboard.read();
      const img = await clipboardItems[0].getType("image/png");
      if (img) {
        const reader = new FileReader();
        reader.onload = () => {
          setQsnImage(reader.result);
        };
        reader.readAsDataURL(img);
      }
    } catch (error) {}
  };

  const pasteSoln = async () => {
    try {
      const clipboardItems = await navigator.clipboard.read();
      const img = await clipboardItems[0].getType("image/png");
      if (img) {
        const reader = new FileReader();
        reader.onload = () => {
          setSolnImage(reader.result);
        };
        reader.readAsDataURL(img);
      }
    } catch (error) {}
  };

 
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const res = await fetch("http://localhost:8000/api/qsn/post", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,

      body: JSON.stringify({
        text: text,
        image: qsnImage,
        answer: answer,
        status: status,
        difficulty: difficulty,
        subject: subject,
        topic: topic,
        type: type,
        solutionText: solnText,
        solutionImage: solnImage,
      }),
    });

    if (res.ok) {
      setIsLoading(false);
      navigate("/");
      toast("Question uploaded successfully");
    }

    const data = await res.json();
    setError(data.error);
    setIsLoading(false);
    if (data.msg) {
      toast(data.msg);
    }
  };

  const handleQsnImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setQsnImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSolnImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSolnImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className=" mx-auto flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 items-center align-middle w-full">
        <div className="bg-primary rounded-lg mt-16 mx-auto flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 items-center align-middle w-11/12">
          <h1 className="text-3xl font-bold text-secondary">Upload Question</h1>
          <div className="flex mt-5">
            <select
              onChange={(e) => setDifficulty(e.target.value)}
              className="mx-5 text-xl bg-secondary text-black select border-2 border-black"
            >
              <option disabled selected>
                Difficulty
              </option>
              {difficultyList.map((diff) => (
                <option value={diff}>{diff}</option>
              ))}
            </select>
            <select
              onChange={(e) => {
                setSubject(e.target.value);
                setTopic("");
              }}
              className="mx-5 text-xl bg-secondary text-black select border-2 border-black"
            >
              <option disabled selected>
                Subject
              </option>
              {subjectList.map((sub) => (
                <option value={sub}>{sub}</option>
              ))}
            </select>
            <select
              onChange={(e) => {
                setType(e.target.value);
                setAnswer("");
              }}
              className="mx-5 text-xl bg-secondary text-black select  border-2 border-black"
            >
              <option disabled selected>
                Type
              </option>
              {typeList.map((type) => (
                <option value={type}>{type}</option>
              ))}
            </select>
            <select
              onChange={(e) => setStatus(e.target.value)}
              className="mx-5 text-xl bg-secondary text-black select  border-2 border-black"
            >
              <option disabled selected>
                Status
              </option>
              {statusList.map((stat) => (
                <option value={stat}>{stat}</option>
              ))}
            </select>
            <select
              onChange={(e) => setTopic(e.target.value)}
              className="mx-5 text-xl bg-secondary text-black select  border-2 border-black"
            >
              <option value="" disabled selected>
                Topic
              </option>
              {topicList.map((top) => (
                <option value={top}>{top}</option>
              ))}
            </select>
          </div>
          <div className="mt-5 w-5/6">
            <textarea
              className="textarea  border-2 border-black bg-secondary text-black placeholder:text-black h-20 w-full text-xl "
              placeholder="Description (optional)"
              onChange={(e) => setText(e.target.value)}
            ></textarea>
          </div>
          <div className="mt-5 flex items-center">
            <input
              type="file"
              ref={qsnImg}
              onChange={handleQsnImgChange}
              className="file-input bg-primary text-secondary file-input-bordered file-input-secondary w-full max-w-xs"
            />
            <button className="btn mx-4 btn-secondary" onClick={pasteQsn}>
              Paste
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setQsnImage(null);
                qsnImg.current.value = "";
              }}
            >
              Clear
            </button>
          </div>
          <div className="mt-5 flex justify-center items-center w-2/4">
            <img src={qsnImage} alt="" />
          </div>
          <div className="mt-5 flex items-center">
            {type === "MCQ" && (
              <>
                <h1 className="text-xl">Answer:</h1>
                <select
                  onChange={(e) => setAnswer(e.target.value)}
                  className="mx-5 text-sm  select select-bordered"
                >
                  <option disabled selected>
                    Select
                  </option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>
              </>
            )}
            {type === "Numerical" && (
              <>
                <h1 className="text-xl">Answer:</h1>
                <input
                  type="text"
                  placeholder="Answer"
                  onChange={(e) => setAnswer(e.target.value)}
                  className="mx-4 input input-bordered w-full max-w-xs text-xl"
                />
              </>
            )}
          </div>
          {status === "Solved" && (
            <>
              <div className="mt-5">
                <h1 className="text-3xl font-bold text-secondary">
                  Upload Solution
                </h1>
              </div>
              <div className="mt-5 w-5/6">
                <textarea
                  className="textarea  border-2 border-black bg-secondary text-black placeholder:text-black h-20 w-full text-xl"
                  placeholder="Description (optional)"
                  onChange={(e) => setSolnText(e.target.value)}
                ></textarea>
              </div>
              <div className="mt-5 flex items-center">
                <input
                  type="file"
                  ref={solImg}
                  onChange={handleSolnImgChange}
                  className="file-input bg-primary text-secondary file-input-bordered file-input-secondary w-full max-w-xs"
                />
                <button className="btn mx-4 btn-secondary" onClick={pasteSoln}>
                  Paste
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setSolnImage(null);
                    solImg.current.value = "";
                  }}
                >
                  Clear
                </button>
              </div>
              <div className="mt-5 w-2/4">
                <img src={solnImage} alt="" />
              </div>
            </>
          )}
          <div>{error && <p className="text-red-500">{error}</p>}</div>
          <div>
            <button
              className="btn bg-info hover:bg-cyan-800 text-black mt-5"
              disabled={isLoading}
              onClick={handleSubmit}
            >
              {isLoading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
