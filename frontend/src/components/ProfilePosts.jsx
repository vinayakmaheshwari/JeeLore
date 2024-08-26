import { useContext, useEffect, useState } from "react";
import { AllContext } from "../../context/contex";
import { NavLink } from "react-router-dom";

export const ProfilePosts = (props) => {
  const auth = useContext(AllContext);
  const [posts, setPosts] = useState([]);
  const [whatToShow, setWhatToShow] = useState("Solved");

  const getPosts = async () => {
    try {
      const res = await fetch(`https://backend.jeelore.site/api/qsn/getUserPost`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: auth.auth._id,
          status: whatToShow==="Solved" ? "Solved" : "Unsolved"
        })
      });
      const data = await res.json();
      setPosts(data)
      console.log(posts)
    } catch (error) {
      console.log(error, "error in profile Posts component");
    }
  };

  useEffect(() => {
    getPosts();
  }, [auth.auth._id, whatToShow]);

  return(
    <div className="flex flex-col justify-start ">
      <div className="flex self-start">
      <div className="flex self-start">
        <p onClick={() => setWhatToShow("Solved")} className={`mx-2 text-xl font-bold cursor-pointer ${whatToShow==="Solved" ? "underline" : ""}`}>Solved</p>
        <p onClick={() => setWhatToShow("Unsolved")} className={`mx-2 text-xl font-bold cursor-pointer ${whatToShow==="Unsolved" ? "underline" : ""}`}>Unsolved</p>
      </div>
      
      </div>
    </div>
  )
};
