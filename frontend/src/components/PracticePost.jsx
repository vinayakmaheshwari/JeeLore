import { useContext, useEffect, useState } from "react";
import { AllContext } from "../../context/contex.jsx";
import { PostCard } from "./PostCard.jsx";
import { Skeleton } from "./Skeleton.jsx";
import { PracticePostCard } from "./Practice.jsx";

export const PracticePost = (props) => {
  const Context = useContext(AllContext);
  const [currPage, setCurrPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const {diffFilters, subFilters, typeFilters,status,limit} = props;

  useEffect(() => {
    const res = Context.getPosts((currPage - 1) * limit, limit, subFilters, diffFilters, typeFilters,status).then((data) =>
      setPosts(data)
    );
  }, [currPage, subFilters, diffFilters, typeFilters]);

  return (
    <div className=" w-full z-0 container flex  flex-col h-full overflow-y-auto items-center  ">
      {!Context.isLoading && !posts.error ? (
         posts.map((post) => (
          <PracticePostCard
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
            currPage={currPage}
            answer={post.answer}
            solution={post.solution}
            setCurrPage={setCurrPage}
          />
        ))
      ) : (
        <div className="text-3xl w-full font-bold justify-center mt-10 items-center text-center">
          <Skeleton  /> 
        </div>
      )}
      
    </div>
  );
};
