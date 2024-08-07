import { set } from "mongoose";
import { Navbar } from "../components/Navbar.jsx";
import { useContext, useState } from "react";
import { AllContext } from "../../context/contex.jsx";
import { SideBarFilters } from "../components/sideBarFilters.jsx";
import { Post } from "../components/Post.jsx";

export const Home = () => {
  const authContext = useContext(AllContext);
  const status = "Unsolved";
  const [diffFilters, setDiffFilters] = useState([
    "Neet",
    "JeeMains",
    "JeeAdvanced",
    "olympiad",
  ]);
  const [subFilters, setSubFilters] = useState([
    "Biology",
    "Chemistry",
    "Physics",
    "Maths",
  ]);
  const [typeFilters, setTypeFilters] = useState([
    "MCQ",
    "Numerical",
    "Subjective",
  ]);

  return (
    <>
      <div className="flex flex-1 flex-col">
        <div className="h-20 w-full">
          
        </div>
        <div className="flex">
        {/* <div className="w-1/5 block items-center justify-center">
          <SideBarFilters
            diffFilters={diffFilters}
            subFilters={subFilters}
            typeFilters={typeFilters}
            setDiffFilters={setDiffFilters}
            setSubFilters={setSubFilters}
            setTypeFilters={setTypeFilters}
          />
        </div> */}
        <div className="w-full flex justify-center">
          <Post
            diffFilters={diffFilters}
            subFilters={subFilters}
            typeFilters={typeFilters}
            status={status}
            limit={10}
          />
        </div>
        </div>
      </div>
    </>
  );
};
