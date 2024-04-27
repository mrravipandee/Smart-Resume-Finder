import React, { useState } from "react";
import axios from "axios";

const Upload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [jobDes, setJobDes] = useState("");
  const candidates = [
    {
      name: 'Yash',
      resume: 'yash.pdf'
    },
    {
      name: 'Ravi Pandey',
      resume: 'ravi.pdf'
    }
  ];
  

  const upload = () => {
    // Display the content of the textarea in an alert
    alert("Job Description: " + jobDes);

    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("selectedFiles", selectedFiles[i]);
    }
    formData.append("jobDes", jobDes); // Add job description to form data
    axios
      .post("http://localhost:3001/upload", formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center h-screen">
      <div className="lg:mr-5 mb-8 lg:mb-0">
        <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg border flex flex-col items-center w-full lg:w-[25rem]">
          <h5 className="text-lg font-semibold mb-4">Upload PDF:</h5>
          <input
            type="file"
            className="mb-4"
            multiple
            onChange={(e) => setSelectedFiles(e.target.files)}
          />
          <textarea
            className="border border-gray-300 rounded px-4 py-2 w-full h-40 mb-4"
            placeholder="Job Description"
            value={jobDes}
            onChange={(e) => setJobDes(e.target.value)}
          ></textarea>
          <button
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            onClick={upload}
          >
            Upload
          </button>
        </div>
      </div>
      <div className="lg:ml-5">
        <div className="mt-8 bg-white p-6 rounded-xl">
          <p className="mb-4 font-bold">Short list resume's</p>
          <table className="w-full lg:w-[35rem] border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">No.</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Resume</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">{candidate.name}</td>
                  <td className="border border-gray-300 px-4 py-2"><a href="" className="hover:text-purple-500">{candidate.resume}</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Upload;
