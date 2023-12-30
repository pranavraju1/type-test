import React, { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import TableUserData from "../Components/TableUserData";
import Graph from "../Components/Graph";
import Userinfo from "../Components/Userinfo";

const UserPage = () => {
  const [data, setData] = useState([]);

  const [graphData, setGraphData] = useState([]); // this is  will be used in profile page when you nee graph

  const [dataLoading,setDataLoading] = useState(true); //this state is to manage the small delay in loading the graph

  const [user, loading] = useAuthState(auth); //here loading will be true if firebase is loading and false if firebase is not loading
  const navigate = useNavigate();

  const fetchUserData = () => {
    const resultsRef = db.collection("Results");
    const { uid } = auth.currentUser;
    let tempData = [];
    let tempGraphData = [];
    resultsRef
      .where("userId", "==", uid)
      .orderBy('timeStamp','desc')//oredering the data
      .get()
      .then((snapshot) => {
        // using where to only get the info of the user i need
        snapshot.docs.forEach((doc) => {
          tempData.push({ ...doc.data() });
          tempGraphData.push([
            doc.data().timeStamp.toDate().toLocaleString().split(",")[0],
            doc.data().wpm,
          ]);
        });
        setData(tempData);
        setGraphData(tempGraphData.reverse());
        setDataLoading(false);
      });
  };
  useEffect(() => {
    if (!loading) {
      fetchUserData();
    }
    if (!loading && !user) {
      navigate("/");
    }
  }, [loading]);

  if (loading || dataLoading) {
    return(
      <div className="center-of-screen">
        <CircularProgress size={300}/>
      </div>
    ) 
  }

  return (
    <div className="canvass">
      <Userinfo totalTestTaken = {data.length}/>
      <div className="graph-user-page">
        <Graph graphData={graphData} />
      </div>
      <TableUserData data={data} />
    </div>
  );
};

export default UserPage;
