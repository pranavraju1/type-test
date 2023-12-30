import React, { useEffect } from "react";
import Graph from "./Graph";
import { auth, db } from "../firebaseConfig";
import { toast } from "react-toastify";

const Stats = ({
  wpm,
  accuracy,
  correctChars,
  incorrectChars,
  missedChars,
  extraChars,
  graphData,
}) => {

  let timeSet = new Set();
  const newGraph = graphData.filter(i=>{      //removing the repreating vlaues in graph
    if(!timeSet.has(i[0])){
      timeSet.add(i[0]);
      return i;
    }
  })

  const pushDataToDB = () => {

    if(isNaN(accuracy)){  //if you dont type even a single word the accuracy willl be NAN
      toast.error('invalid test', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
        return;
    }
    

    const resultsRef = db.collection('Results');
    const {uid} = auth.currentUser;
    resultsRef.add({
      wpm:wpm,
      accuracy:accuracy,
      timeStamp:new Date(),
      charecters:`${correctChars}/${incorrectChars}/${missedChars}/${extraChars}`,
      userId: uid
    }).then((res)=>{
      toast.success('Data saved in db ', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }).catch((error)=>{
      toast.error('not able to save result', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    })
  }

  useEffect(()=>{
    if(auth.currentUser){ // if user exist only then push the data
      pushDataToDB();
    }else{
      toast.warning('Login to save results', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
  },[]);


  return (
    <div className="stats-box">
      <div className="left-stats">{/* stats */}
        <div className="title">WPM</div>
        <div className="subtitle">{wpm}</div>
        <div className="title">Accuracy</div>
        <div className="subtitle">{accuracy}</div>
        <div className="title">Charecters</div>
        <div className="subtitle">
          {correctChars}/{incorrectChars}/{missedChars}/{extraChars}
        </div>
      </div>
      <div className="right-stats">{/* graphs */}
        <Graph graphData={newGraph}/>
      </div>
    </div>
  );
};

export default Stats;
