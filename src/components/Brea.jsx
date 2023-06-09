import { useEffect, useRef, useState } from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Clocksound } from "./assests/port";

import { useOutletContext } from "react-router-dom";

function Break() {
  const { brechange } = useOutletContext();
  const getlocalpomo = parseInt(localStorage.getItem("localbreak"));

  let initialMinutes = getlocalpomo && getlocalpomo > 0 ? getlocalpomo : 10;
  useEffect(() => {
    if (getlocalpomo) {
      setminutes(getlocalpomo);
    }
    console.log(getlocalpomo);
  }, [brechange, getlocalpomo]);

  const initialSeconds = 0;
  const [minutes, setminutes] = useState(initialMinutes);
  const [seconds, setseconds] = useState(initialSeconds);
  const [pamo, setActive] = useState(false);
  const [startorpause, setstartorpause] = useState(true);
  const [progressValue, setProgressValue] = useState(100);
  useEffect(() => {
    setminutes(initialMinutes);
  }, [brechange, initialMinutes]);

  const circularProgressStyles = {
    path: {
      stroke: "#ff4c4c",
    },
  };

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
      }, 1000);
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
  };

  useEffect(() => {
    if (progressValue) {
      setProgressValue(
        ((minutes * 60 + seconds) / (initialMinutes * 60 + initialSeconds)) *
          100
      );
    }
  }, [minutes, seconds, initialMinutes, progressValue]);

  const playClockSound = () => {
    const audio = new Audio(Clocksound);
    audio.play();
    audio.volume = 0.2;
  };

  if (progressValue === 0) {
    playClockSound();
    // notif();
  }

  return (
    <div className="container" style={{ width: 300, height: 300 }}>
      <CircularProgressbarWithChildren
        value={progressValue}
        strokeWidth={3}
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

export default Break;
