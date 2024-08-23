import { useContext, useEffect } from "react";
import { AllContext } from "../../context/contex";

export const ProfilePosts = (props) => {
  const auth = useContext(AllContext);

  const getPosts = async () => {
    try {
      const res = fetch(`https://backend.jeelore.site/api/qsn/getUserPost`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: auth.auth._id,
        }),
      });

      console.log(auth.auth._id);
    //   const data = await res.json();
      console.log(res);
    } catch (error) {
      console.log(error, "error in profile Posts component");
    }
  };

  useEffect(() => {
    getPosts();
  }, [auth.auth._id]);
};
