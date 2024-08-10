import { useState, useRef } from "react";
import { toast } from "react-toastify";

export const UploadSoluton = (props) => {
  const [solnText, setSolnText] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [solnImage, setSolnImage] = useState(null);
  const [ans, setAns] = useState("");
  const solImg = useRef();
  const { id, type, answer } = props;

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

  const handleUpload = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`https://backend.jeelore.site/api/qsn/postSolution`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Id: id,
          solutionText: solnText,
          solutionImage: solnImage,
          answer: ans,
        }),
      });
      if (res.ok) {
        setSolnImage(null);
        setSolnText("");
        solImg.current.value = "";
        toast("Solution uploaded successfully");
      }

      const data = await res.json();
      if (data.msg) {
        toast(data.msg);
      }
      setError(data.error);
      setIsLoading(false);
    } catch (error) {}
  };



  return (
    <div className="border-t border-accent pb-4 h-full flex flex-1 flex-col justify-center items-center w-full rounded-b-xl">
      <p className="lg:text-lg text-sm mt-2 underline font-bold">Upload Solution</p>
      <div>
        {type !== "Subjective" && !answer && (
          <div className="flex flex-col justify-center items-center mt-5">
            {type === "MCQ" && (
              <>
                <h1 className="text-xl">Answer:</h1>
                <select
                  onChange={(e) => setAns(e.target.value)}
                  className="mx-5 text-xs lg:text-sm  select select-bordered"
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
                <h1 className=" text-sm lg:text-xl">Answer:</h1>
                <input
                  type="text"
                  placeholder="Answer"
                  onChange={(e) => setAns(e.target.value)}
                  className="mx-4 input input-bordered w-full max-w-xs text-sm lg:text-xl"
                />
              </>
            )}
          </div>
        )}
      </div>
      <div className="mt-5 w-5/6">
        <textarea
          className="textarea bg-secondary text-black placeholder:text-black textarea-bordered h-12 lg:h-20 w-full text-sm lg:text-xl "
          placeholder="Description (optional)"
          onChange={(e) => setSolnText(e.target.value)}
          value={solnText}
        ></textarea>
      </div>
      <div className="mt-5 flex items-center">
        <input
          type="file"
          ref={solImg}
          onChange={handleSolnImgChange}
          className="file-input w-[12rem] text-sm file-input-sm bg-primary text-secondary file-input-bordered file-input-secondary lg:w-full max-w-xs"
        />
        <button className="lg:mx-4 mx-2 btn-sm lg:btn lg:btn-secondary rounded-lg bg-secondary text-black  h-[2rem]" onClick={pasteSoln}>
          Paste
        </button>
        <button
          className="lg:btn lg:mx-4 mx-2 btn-sm lg:btn-secondary rounded-lg bg-secondary text-black  h-[2rem]"
          onClick={() => {
            setSolnImage(null);
            solImg.current.value = "";
          }}
        >
          Clear
        </button>
      </div>
      <div className="mt-5 mb-5 flex justify-center w-2/4">
        <img src={solnImage} alt="" />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {isLoading ? (
        <button className="btn disabled bg-info hover:bg-cyan-800 h-5">
          Uploading...
        </button>
      ) : (
        <button
          className="btn bg-accent text-black hover:bg-cyan-800 h-5"
          onClick={handleUpload}
        >
          Upload
        </button>
      )}
    </div>
  );
};
