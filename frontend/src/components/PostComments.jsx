import { useContext, useState, useEffect } from "react";
import { getUserById } from "../../utils/getUserById";

export const PostComments = (props) => {
  const {qsnId, CommentBy,commentText} = props
  const [userData, setUserData] = useState({});
  const [commText, setCommText] = useState("");
  const [comment, setComment] = useState([{}]);
  // useEffect(() => {
  //   const data = getUserById(CommentBy).then((data) => {
  //     setUserData(JSON.parse(data));
  //   });
  // }, [qsnId]);

  // setComment([{pfp: userData.profileImg, userName: userData.userName, text:commentText }]);
  console.log(commentText)
  return (
    <div className=" pb-2 h-full flex flex-1 flex-col justify-center items-center w-full rounded-b-2xl">
      <section className=" w-full  antialiased">
        <article className="w-full text-base p-4 bg-primary rounded-lg">
          <footer className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                <img className="mr-2 w-8 rounded-full" src="" alt="img" />
                helllo
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <time pubdate datetime="2022-02-08" title="February 8th, 2022">
                  Feb. 8, 2022
                </time>
              </p>
            </div>
          </footer>
          <p className="text-gray-300 dark:text-gray-300">comment</p>
        </article>
      </section>
    </div>
  );
};
