import { useEffect, useState } from "react";
import { getUserById } from "../../utils/getUserById";

export const PracticePostSoln = (props) => {
  const { img, text, postedBy } = props;
  const [userData, setUserData] = useState({});

  useEffect(() => {
    getUserById(postedBy).then((data) => {
      setUserData(JSON.parse(data));
    });
  }, [postedBy]);
  return (
    <div className="flex bg-base-100 p-1 lg:p-2 rounded-xl w-11/12 mt-4 flex-col ">
      <div className=" self-start flex items-center">
        <img className="lg:w-8 lg:h-8 w-6 h-6 rounded-full" src={userData.profileImg} />
        <p className="lg:ml-2 ml-1 text-xs lg:text-sm underline">{userData.userName}</p>
      </div>
      <div className="flex mt-2 flex-col justify-center items-center">
        <img src={img} className="w-full" />
        <p className=" self-start text-lg ">{text}</p>
      </div>
    </div>
  );
};
