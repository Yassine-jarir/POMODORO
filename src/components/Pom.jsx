import { useEffect, useRef, useState } from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import clockSoundd from "../assests/clockSoundd.mp3";

function Pomodoro() {
  const circularProgressStyles = {
    path: {
      stroke: "#0abf53", // Change this to the desired border color
    },
  };
  let initialMinutes = 50;
  const initialSeconds = 0;
  const [minutes, setminutes] = useState(initialMinutes);
  const [seconds, setseconds] = useState(initialSeconds);
  const [pamo, setActive] = useState(false);
  const [startorpause, setstartorpause] = useState(true);
  const [progressValue, setProgressValue] = useState(100);
  // let timeinterval = null;
  const timeintervalRef = useRef(null);
  useEffect(() => {
    if (pamo) {
      timeintervalRef.current = setInterval(() => {
        if (seconds > 0) {
          setseconds((pre) => pre - 1);
        } else if (minutes > 0) {
          setminutes((pre) => pre - 1);
          setseconds(59);
        } else setActive(false);
      }, 50);
    }
    return () => clearInterval(timeintervalRef.current);
  }, [pamo, minutes, seconds]);
  const start = () => {
    setActive(true);
    setstartorpause(false);
  };
  const pause = () => {
    setActive(false);
    setstartorpause(true);
  };
  const reset = () => {
    setActive(false);
    setminutes(initialMinutes);
    setseconds(initialSeconds);
    if (!startorpause) {
      setstartorpause(true);
    }
  };
  console.log(startorpause);
  useEffect(() => {
    if (progressValue) {
      setProgressValue(
        ((minutes * 60 + seconds) / (initialMinutes * 60 + initialSeconds)) *
          100
      );
    }
  }, [minutes, seconds, initialMinutes, progressValue]);
  const playClockSound = () => {
    const audio = new Audio(clockSoundd);
    audio.play();
    audio.volume = 0.1;
    console.log("play");
  };
  if (progressValue === 0) {
    playClockSound();
  }
  return (
    <div className="container" style={{ width: 300, height: 300 }}>
      <CircularProgressbarWithChildren
        value={progressValue}
        strokeWidth={4}
        styles={circularProgressStyles}
      >
        <h1>
          {minutes < 10 ? "0" : null}
          {minutes} : {seconds < 10 ? "0" : null}
          {seconds}
        </h1>
        <div>
          {startorpause ? (
            <button className="btn1" onClick={start}>
              <i className="fa-solid fa-play"></i>
            </button>
          ) : (
            <button className="btn1" onClick={pause}>
              {" "}
              <i className="fa-solid fa-pause"></i>
            </button>
          )}

          <button className="btn2" onClick={reset}>
            <i className="fa-solid fa-repeat"></i>
          </button>
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
}

export default Pomodoro;
