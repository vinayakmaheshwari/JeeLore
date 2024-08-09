import { useContext, useEffect, useState } from "react";
import { AllContext } from "../../context/contex.jsx";
import { PostCard } from "./PostCard.jsx";
import { Skeleton } from "./Skeleton.jsx";
import { mathsTopics, physicsTopics, chemistryTopics } from "../assets/Topic.jsx";

export const Post = (props) => {
  const Context = useContext(AllContext);
  const [currPage, setCurrPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [numberOfQsn, setNumberOfQsn] = useState(0);
  const {diffFilters, subFilters, typeFilters,status,limit} = props;
  const [totalPages, setTotalPages] = useState(Math.ceil(numberOfQsn/limit +1));
  const [reloadPost, setReloadPost] = useState(false);
  const topicFilters = mathsTopics.concat(physicsTopics, chemistryTopics);

  const getQsnNumber = async () => {
    const res = await fetch(`https://backend.jeelore.site/api/qsn/countQsns`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({subject:subFilters, difficulty:diffFilters, type:typeFilters, status:status}),
    });
    const data = await res.json();
    setNumberOfQsn(data);
  
  };


  useEffect(() => {
    const res = Context.getPosts((currPage - 1) * limit, limit, subFilters, diffFilters, typeFilters,status, topicFilters).then((data) =>
      setPosts(data)
    );
    getQsnNumber(subFilters, diffFilters, typeFilters);
  }, [currPage, subFilters, diffFilters, typeFilters, reloadPost]);

  return (
    <div className=" w-11/12 z-0 container flex  flex-col h-full overflow-y-auto items-center  ">
      {!Context.isLoading && !posts.error ? (
         posts.map((post, index) => (
          <PostCard
            id={post._id}
            key={post._id}
            img={post.image}
            text={post.text}
            comments={post.comments}
            postedBy={post.postedBy}
            subject={post.subject}
            difficulty={post.difficulty}
            topic={post.topic}
            type={post.type}
            status={post.status}
            answer={post.answer}
            setReloadPost={setReloadPost}
          />
        ))
      ) : (
        <div className="text-3xl w-full font-bold justify-center mt-10 items-center text-center">
          <Skeleton  /> 
        </div>
      )}
      <div className="w-full mt-10 flex bottom-0 justify-center">
        <div className="w-1/5 flex justify-end">
          <button
            disabled={currPage === 1}
            onClick={() => setCurrPage(currPage - 1)}
            className="btn disabled:bgprimary border-0 border-t border-l border-b w-2/5 border-black btn-accent self-end"
          >
            Previous
          </button>
        </div>
        <div className="w-1/12 flex justify-center">
          <button className="h-full rounded-xl cursor-text border w-full border-accent btn-primary self-start">{currPage}</button>
        </div>
        <div className="w-1/5">
          <button
            disabled={currPage === totalPages}
            onClick={() => setCurrPage(currPage + 1)}
            className="btn border-0 border-t border-l border-b w-2/5 border-black btn-accent self-start"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
