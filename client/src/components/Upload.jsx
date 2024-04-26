import React, { useState } from "react";
import axios from "axios";

const Upload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [modal, setModal] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const placeholders = ["Skills", "Experience", "Education"];
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [education, setEducation] = useState("");

  const upload = () => {
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("selectedFiles", selectedFiles[i]);
    }
    axios
      .post("http://localhost:3001/upload", formData)
      .then((res) => {
        setModal(true);
      })
      .catch((err) => console.log(err));
  };

  const handleNext = () => {
    setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    setEducation("");
    setSkills("");
    setExperience("");
    setPlaceholderIndex((prevIndex) => {
      const newIndex = (prevIndex + 0) % placeholders.length;
      if (newIndex === 2) {
        setModal(false);
      }
      return newIndex;
    });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md mx-auto p-4 rounded-lg">
        <h5 className="text-lg font-semibold mb-4">Upload PDF:</h5>
        <input
          type="file"
          className="mb-4"
          multiple
          onChange={(e) => setSelectedFiles(e.target.files)}
        />
        <button
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 focus:outline-none focus:bg-orange-600"
          onClick={upload}
        >
          Upload
        </button>
      </div>
      {modal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white w-[50rem] rounded-lg shadow-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Upload Successful</h2>
              <button
                className="text-gray-600 hover:text-gray-800"
                onClick={() => setModal(false)}
              >
                Close
              </button>
            </div>
            <p>{placeholders[placeholderIndex]}</p>
            <div className="flex justify-center">
              <input
                type="text"
                placeholder={placeholders[placeholderIndex]}
                value={
                  placeholders[placeholderIndex] === "Skills"
                    ? skills
                    : placeholders[placeholderIndex] === "Experience"
                    ? experience
                    : education
                }
                onChange={(e) => {
                  if (placeholders[placeholderIndex] === "Skills") {
                    setSkills(e.target.value);
                  } else if (
                    placeholders[placeholderIndex] === "Experience"
                  ) {
                    setExperience(e.target.value);
                  } else {
                    setEducation(e.target.value);
                  }
                }}
                className="rounded-full w-[25rem] py-2 px-4 border border-gray-300 focus:outline-none"
              />
              <button
                className="ml-4 bg-orange-500 text-white rounded-full py-2 px-4 hover:bg-orange-600 focus:outline-none"
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Upload;
