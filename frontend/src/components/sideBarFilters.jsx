import { Children, useState, useContext } from "react";
import MultiSelect from "multiselect-react-dropdown";
import Select from "react-select";

export const SideBarFilters = (props) => {
  const {
    setDiffFilters,
    setSubFilters,
    setTypeFilters,
    diffFilters,
    subFilters,
    typeFilters,
  } = props;
  const handleDiffFilter = (event) => {
    if (event.target.checked) {
      setDiffFilters([...diffFilters, event.target.value]);
    } else {
      setDiffFilters(
        diffFilters.filter((filter) => filter !== event.target.value)
      );
    }
  };
  const handleSubFilter = (event) => {
    if (event.target.checked) {
      setSubFilters([...subFilters, event.target.value]);
    } else {
      setSubFilters(
        subFilters.filter((filter) => filter !== event.target.value)
      );
    }
  };
  const handleTypeFilter = (event) => {
    if (event.target.checked) {
      setTypeFilters([...typeFilters, event.target.value]);
    } else {
      setTypeFilters(
        typeFilters.filter((filter) => filter !== event.target.value)
      );
    }
  };
  const [selected, setSelected] = useState([]);
  const options = [
    { label: "JEE Mains", value: "JeeMains" },
    { label: "JEE Advance", value: "JeeAdvance" },
    { label: "JEE", value: "Jee" },
    { label: "NEET", value: "Neet" },
  ];
  return (
    <>
      <div className="self-center border-r h-full pt-5 pb-5 fixed justify-center items-center bg-primary w-1/5  border-white ">
        {/* <div className="mt-3 mx-5 w-full text-sm text-white">
          <div className="underline font-normal text-3xl">Topic:</div>
          <Select
            className="w-4/5 mt-2 text-black"
            options={options}
            onChange={setSelected}
            isMulti
          />
        </div> */}

        <div className="mt-5 mx-5  w-full text-2xl text-white">
          <div className="underline font-normal text-3xl">Difficulty:</div>
          <div className=" grid grid-cols-2 w-full text-2xl text-white">
            <div className="flex">
              <div className="form-control">
                <label className="label cursor-pointer">
                  <input
                    onChange={handleDiffFilter}
                    type="checkbox"
                    defaultChecked
                    value="Neet"
                    className="checkbox border-2 border-white"
                  />
                  <span className=" text-lg">Neet</span>
                </label>
              </div>
            </div>
            <div className="flex">
              <div className="form-control">
                <label className="label cursor-pointer">
                  <input
                    onChange={handleDiffFilter}
                    type="checkbox"
                    defaultChecked
                    value="JeeMains"
                    className="checkbox border-2 border-white"
                  />
                  <span className=" text-lg">JEE Mains</span>
                </label>
              </div>
            </div>
            <div className="flex">
              <div className="form-control">
                <label className="label cursor-pointer">
                  <input
                    onChange={handleDiffFilter}
                    type="checkbox"
                    defaultChecked
                    value="JeeAdvanced"
                    className="checkbox border-2 border-white"
                  />
                  <span className="text-lg">JEE Advanced</span>
                </label>
              </div>
            </div>
            <div className="flex">
              <div className="form-control">
                <label className="label cursor-pointer">
                  <input
                    onChange={handleDiffFilter}
                    type="checkbox"
                    defaultChecked
                    value="olympiad"
                    className="checkbox border-2 border-white"
                  />
                  <span className=" text-lg">Olympiad</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 mx-5 w-full text-2xl text-white">
          <div className="underline font-normal text-3xl">Subject:</div>
          <div className="flex">
            <div className="form-control">
              <label className="label cursor-pointer">
                <input
                  onChange={handleSubFilter}
                  type="checkbox"
                  defaultChecked
                  value="Biology"
                  className="checkbox border-2 border-white"
                />
                <span className=" text-lg">Biology</span>
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <input
                  onChange={handleSubFilter}
                  type="checkbox"
                  defaultChecked
                  value="Chemistry"
                  className="checkbox  border-2 border-white"
                />
                <span className=" text-lg">Chemistry</span>
              </label>
            </div>
          </div>
          <div className="flex">
            <div className="form-control">
              <label className="label cursor-pointer">
                <input
                  onChange={handleSubFilter}
                  type="checkbox"
                  defaultChecked
                  value="Physics"
                  className="checkbox border-2 border-white"
                />
                <span className=" text-lg">Physics</span>
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <input
                  onChange={handleSubFilter}
                  type="checkbox"
                  defaultChecked
                  value="Maths"
                  className="checkbox  border-2 border-white"
                />
                <span className="text-lg">Maths</span>
              </label>
            </div>
          </div>
        </div>
        <div className="mt-3 mx-5 w-full text-2xl text-white">
          <div className="underline font-normal text-3xl">Type:</div>
          <div className="flex">
            <div className="form-control">
              <label className="label cursor-pointer">
                <input
                  onChange={handleTypeFilter}
                  type="checkbox"
                  defaultChecked
                  value="MCQ"
                  className="checkbox border-2 border-white"
                />
                <span className=" text-lg">MCQ</span>
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <input
                  onChange={handleTypeFilter}
                  type="checkbox"
                  defaultChecked
                  value="Numerical"
                  className="checkbox  border-2 border-white"
                />
                <span className="text-lg">Numerical</span>
              </label>
            </div>
          </div>
          <div className="flex">
            <div className="form-control">
              <label className="label cursor-pointer">
                <input
                  onChange={handleTypeFilter}
                  type="checkbox"
                  defaultChecked
                  value="Subjective"
                  className="checkbox  border-2 border-white"
                />
                <span className="text-lg">Subjective</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
