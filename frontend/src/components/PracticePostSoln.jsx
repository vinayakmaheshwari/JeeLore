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
    <div className="flex bg-base-100 p-2 rounded-xl w-full mt-4 flex-col ">
      <div className=" self-start flex items-center">
        <img className="w-8 h-8 rounded-full" src={userData.profileImg} />
        <p className="ml-2 text-sm">{userData.userName}</p>
      </div>
      <div className="flex mt-2 flex-col justify-center items-center">
        <img src={img} className="w-full" />
        <p className=" self-start text-lg ">{text}</p>
      </div>
    </div>
  );
};
