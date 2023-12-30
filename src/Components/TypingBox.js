import React, { createRef, useEffect, useMemo, useRef, useState } from "react";
import { generate } from "random-words";
import UpperMenu from "./UpperMenu";
import { useTestMode } from "../Context/TestmodeContext";
import Stats from "./Stats";
var randomWords = generate;
// thus is another way of importing

const TypingBox = () => {
  const inputRef = useRef(null);
  const {testTime} = useTestMode();
  const [currWordIndex, setCurrWordIndex] = useState(0);
  const [currCharIndex, setCurrCharIndex] = useState(0);
  const [intervalId,setIntervalId] = useState(null);
  const [countDown, setCountDown] = useState(testTime);
  const [testStart, setTestStart] = useState(false);
  const [testEnd, setTestEnd] = useState(false);

  const[correctChars,setCorrectChars] = useState(0);
  const[incorrectChars,setIncorrectChars] = useState(0);
  const[missedChars,setMissedChars] = useState(0);
  const[extraChars,setExtraChars] = useState(0);
  const[correctWords,setCorrectWords] = useState(0);
  const[graphData,setGraphData] = useState([]);

  const [wordsArray, setWordsArray] = useState(() => {
    return randomWords(50);
  });

  // useMemo is used to optimizes when doing heavy operations
  // wordsSpanRef is a big array hence we initialize it with useMemo
  // useMemo will not run unless the wordsArray changes
  const wordsSpanRef = useMemo(() => {
    return Array(wordsArray.length)
      .fill(0)
      .map((i) => createRef(null));
  }, [wordsArray]);
  // we have to fill it wwith 0 otherwise we cannot run map it
  // we replace the 0 with the ref
  // we cannot use uerRef bc hooks cannot be used inside a call back

  const startTimer = () => {
    const intervalId = setInterval(timer, 1000);
    setIntervalId(intervalId);
    function timer() {
      setCountDown((latestCountDown) => {//you need callback here as timer may be removed from the callstack

        setCorrectChars((correctChars)=>{
          setGraphData((graphData)=>{
            return [...graphData, [testTime-latestCountDown+1,(correctChars/5)/((testTime-latestCountDown+1)/60)]];
            // [graphData, [time,wpm]]
            
          })
          return correctChars;
        })

        if (latestCountDown === 1) {
          setTestEnd(true);
          clearInterval(intervalId);
          removeFocus();
          return 0;
        }
        return latestCountDown - 1;
      });
    }
  };


  const resetTest = () => {
    clearInterval(intervalId);
    setCountDown(testTime);
    setCurrWordIndex(0);
    setCurrCharIndex(0);
    setTestStart(false);
    setTestEnd(false);
    setWordsArray(randomWords(50));
    resetWordsSpanRefClassname();
    focusInput();
  }
  const resetWordsSpanRefClassname = () => {  //resetting all the refrences
    wordsSpanRef.map(i=>{
      // using Array bc map can only be done on Arrays
      Array.from(i.current.childNodes).map(j=>{
        j.className = '';
      })
    });
    wordsSpanRef[0].current.childNodes[0].className = 'current';//cursor at start
  }




  // checking i/p and char (red and green)
  const handleUserInput = (e) => {
    if (!testStart) {   //to start the timer only when i start typing
      startTimer();
      setTestStart(true);
      // return;
    }

    const allCurrChars = wordsSpanRef[currWordIndex].current.childNodes;
    if (e.keyCode === 32) {   //logic for space

      let correctCharsInWord = wordsSpanRef[currWordIndex].current.querySelectorAll('.correct'); //getting the span length
      if(correctCharsInWord.length === allCurrChars.length){ //i have typed the whole word correctly
        setCorrectWords(correctWords+1);
      }



      if (allCurrChars.length <= currCharIndex) {// remove cursor from last place in a word
        allCurrChars[currCharIndex - 1].classList.remove("current-right");
      } else {
        // remove cursor from in between of the word
        allCurrChars[currCharIndex].classList.remove("current");
        setMissedChars(missedChars + (allCurrChars.length-currCharIndex))
      }
      wordsSpanRef[currWordIndex + 1].current.childNodes[0].className =
        "current"; //cursor to next word

      setCurrWordIndex(currWordIndex + 1);
      setCurrCharIndex(0);
      return;
    }

    if (e.keyCode === 8) {    //logic for backSpace
      if (currCharIndex !== 0) {//stops backspace if in 1st char
        if (allCurrChars.length === currCharIndex) {//edge case for the last char of the word

          if (allCurrChars[currCharIndex - 1].className.includes("extra")) {//for extra chars
            allCurrChars[currCharIndex - 1].remove();
            allCurrChars[currCharIndex - 2].className += " current-right";
          } else {
            allCurrChars[currCharIndex - 1].className = "current";
          }

          setCurrCharIndex(currCharIndex - 1); //char shift
          return;
        }

        allCurrChars[currCharIndex].className = ""; //removing color
        allCurrChars[currCharIndex - 1].className = "current"; //cursor shift
        setCurrCharIndex(currCharIndex - 1); //char shift
      }

      return;
    }

    if (currCharIndex === allCurrChars.length) {//I/p at the last index
      let newSpan = document.createElement("span");
      newSpan.innerText = e.key;
      newSpan.className = "incorrect extra current-right";
      allCurrChars[currCharIndex - 1].classList.remove("current-right");
      wordsSpanRef[currWordIndex].current.append(newSpan);
      setCurrCharIndex(currCharIndex + 1);
      setExtraChars(extraChars+1);
      return;
    }

    if (e.key === allCurrChars[currCharIndex].innerText) {//checking I/P
      console.log("correct user input");
      allCurrChars[currCharIndex].className = "correct";
      setCorrectChars(correctChars+1);
    } else {
      console.log("wrong input");
      allCurrChars[currCharIndex].className = "incorrect";
      setIncorrectChars(incorrectChars+1)
    }

    if (currCharIndex + 1 === allCurrChars.length) {   //last char cursor
      allCurrChars[currCharIndex].className += " current-right"; // adding class current-right
    } else {
      allCurrChars[currCharIndex + 1].className = "current"; //cursor movement (genral)
    }

    setCurrCharIndex(currCharIndex + 1); //letter movement
  };

  const removeFocus = () =>{
    inputRef.current.blur();
  }


  const focusInput = () => {
    inputRef.current.focus();
    // this will focus on the input w/o clicking it as soon as the page is loaded
    // hence there is no use of showing the input component
  };

  useEffect(()=>{
    resetTest();
  },[testTime])

  useEffect(() => { 
    focusInput();
    wordsSpanRef[0].current.childNodes[0].className = "current";
    // assigning cursor to the first letter when the page loads
  }, []);


  const calculateWPM = () => {
    return Math.round((correctChars/5)/(testTime/60));
  }
  const clculateAccuracy = () =>{
    return Math.round((correctWords/currWordIndex)*100)
    // currWordIndex here gives the total words typed
  }





  return (
    <div>
      <UpperMenu countDown={countDown} />
      {(testEnd) ? (<Stats wpm={calculateWPM()}
       accuracy={clculateAccuracy()}
       correctChars={correctChars}
       incorrectChars={incorrectChars}
       missedChars={missedChars}
       extraChars={extraChars}
       graphData={graphData}
       />) :
       
       (<div className="type-box" onClick={focusInput}>
          <div className="words">
            {wordsArray.map((word, index) => (
              <span className="word" ref={wordsSpanRef[index]}>
                {word.split("").map((char) => (
                  <span>{char}</span>
                  // breacking the array into words then bring the words into charecters
                ))}
              </span>
            ))}
          </div>
        </div>
      )}
      <input
        type="text"
        className="hidden-input"
        onKeyDown={handleUserInput}
        ref={inputRef}
      />
    </div>
  );
};

export default TypingBox;
