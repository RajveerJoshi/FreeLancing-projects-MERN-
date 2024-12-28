import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const GetPost = () => {
  const token = Cookies.get("token");
  const [loader, setLoader] = useState(false); // Initialize loader state as false
  const [postList, setPostlist] = useState([]);

  const handleFormDataApi = async () => {
    try {
      setLoader(true);
      const res = await axios.get("http://localhost:4000/api/freelancer/post", {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      setLoader(false);
      setPostlist(res.data.data.data);
      console.log(res.data.data.data);
    } catch (error) {
      setLoader(false);
      console.error(error.message);
    }
  };


  const handleFormDataApi1 = async (projectId) => {
    console.log(projectId)
    const data={}
    try {
      setLoader(true);
      const res = await axios.post(`http://localhost:4000/api/freelancer/apply/${projectId}`,{data}, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      setLoader(false);
      setPostlist(res.data.data.data);
      console.log(res.data.data.data);
    } catch (error) {
      setLoader(false);
      console.error(error.message);
    }
  };

  // useEffect(() => {
  //   handleFormDataApi(); // Fetch posts when the component mounts
  // }, []); // Empty dependency array to run only on mount

  return (
    <>
      <button onClick={handleFormDataApi}>Get Post List</button>
      <button onClick={()=>setPostlist([])}>Hide Post List</button>
      {loader ? (
        <p>Loading...</p>
      ) : (
        <div style={{display:"flex"}}>
          {postList.map((ele, index) => (
            <div className="card" style={{ width: "200px" }} key={index}>
              <h5 className="card-header">{ele.projectTitle}</h5>
              <div className="card-body">
                <h5 className="card-title">{ele.projectTitle}</h5>
                <p className="card-text">{ele.projectDescription}</p>
                <a href="#" className="btn btn-primary" onClick={()=>handleFormDataApi1(ele._id)}>
  Apply                </a>
              </div>
            </div>
          ))}
        </div>

      )}
    </>
  );
};

export default GetPost;
