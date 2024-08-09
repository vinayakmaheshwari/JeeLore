import { useEffect, useState } from "react";
import { mathsTopics, physicsTopics, chemistryTopics } from "../assets/Topic";

export const PracticeFilters = (props) => {
  const {
    diffFilters,
    setDiffFilters,
    subFilters,
    setSubFilters,
    typeFilters,
    setTypeFilters,
    topicFilters,
    setTopicFilters,
  } = props;
  const difficultyList = ["Neet", "JeeMains", "JeeAdvanced", "olympiad"];
  const subjectList = ["Biology", "Chemistry", "Physics", "Maths"];
  const [userSubject, setUserSubject] = useState("ALL");
  let topicList = [];
  
  useEffect(() => {
    if (userSubject === "ALL") {
      setSubFilters(subjectList);
    }
    else {
      setSubFilters(userSubject);
    }
  }, [userSubject]);
  

  if (subFilters === "Maths") {
    topicList = mathsTopics;
    if (topicFilters === "ALL") setTopicFilters(mathsTopics);
  } else if (subFilters === "Physics") {
    topicList = physicsTopics;
    if (topicFilters === "ALL") setTopicFilters(physicsTopics);
  } else if (subFilters === "Chemistry") {
    topicList = chemistryTopics;
    if (topicFilters === "ALL") setTopicFilters(chemistryTopics);
  }
  
  return (
    <div className="flex w-full justify-center items-center">
      <div className="w-11/12 rounded-xl block items-center justify-start">
        <select
          onChange={(e) => setUserSubject(e.target.value)}
          className="mx-5 text-xl bg-primary text-white select border-2 border-accent"
        >
          <option disabled selected>
            Subject
          </option>
          <option value="ALL">ALL</option>
          {subjectList.map((subject) => (
            <option value={subject}>{subject}</option>
          ))}
        </select>
        <select
          onChange={(e) => setDiffFilters(e.target.value)}
          className="mx-5 text-xl bg-primary text-white select border-2 border-accent"
        >
          <option disabled selected>
            Difficulty
          </option>
          {difficultyList.map((difficulty) => (
            <option value={difficulty}>{difficulty}</option>
          ))}
        </select>
        <select
          onChange={(e) => setTopicFilters(e.target.value)}
          className="mx-5 text-xl bg-primary text-white select border-2 border-accent"
        >
          <option disabled >
            Topic
          </option>
          <option selected value="ALL">ALL</option>
          {topicList.map((topic) => (
            <option value={topic}>{topic}</option>
          ))}
        </select>
      </div>
    </div>
  );
};
