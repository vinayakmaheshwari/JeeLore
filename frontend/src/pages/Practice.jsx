import { Navbar } from "../components/Navbar.jsx";
import { useContext, useState } from "react";
import { AllContext } from "../../context/contex.jsx";
import { SideBarFilters } from "../components/sideBarFilters.jsx";
import { Post } from "../components/Post.jsx";
import { PracticePost } from "../components/PracticePost.jsx";
import { PracticeFilters } from "../components/PracticeFilters.jsx";
import { mathsTopics, physicsTopics, chemistryTopics, biologyTopics } from "../assets/Topic.jsx";

export const Practice = () => {
  const authContext = useContext(AllContext);
  const status = "Solved";
  const [topicFilters, setTopicFilters] = useState(mathsTopics.concat(physicsTopics, chemistryTopics, biologyTopics));
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
        <div className="h-20 w-full"></div>
        <div className="flex flex-col">
          <PracticeFilters
            diffFilters={diffFilters}
            setDiffFilters={setDiffFilters}
            subFilters={subFilters}
            setSubFilters={setSubFilters}
            typeFilters={typeFilters}
            setTypeFilters={setTypeFilters}
            status={status}
            topicFilters={topicFilters}
            setTopicFilters={setTopicFilters}
          />
          <div className="w-full flex justify-center">
            <PracticePost
              diffFilters={diffFilters}
              subFilters={subFilters}
              typeFilters={typeFilters}
              status={status}
              limit={1}
              topicFilters={topicFilters}
            />
          </div>
        </div>
      </div>
    </>
  );
};
