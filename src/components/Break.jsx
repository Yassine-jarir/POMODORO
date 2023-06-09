import { useEffect, useState } from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function Break() {
  let initialMinutes = 10;
  const initialSeconds = 0;
  const [minutes, setminutes] = useState(10);
  const [seconds, setseconds] = useState(0);
  const [pamo, setActive] = useState(false);
  const [startorpause, setstartorpause] = useState(true);
  const [progressValue, setProgressValue] = useState(100);
  const circularProgressStyles = {
    path: {
      stroke: "#ff4c4c", // Change this to the desired border color
    },
  };
  let timeinterval = null;

  useEffect(() => {
    if (pamo) {
      timeinterval = setInterval(() => {
        if (seconds > 0) {
          setseconds((pre) => pre - 1);
        } else if (minutes > 0) {
          setminutes((pre) => pre - 1);
          setseconds(59);
        } else setActive(false);
      }, 100);
    }
    return () => clearInterval(timeinterval);
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
  console.log(startorpause);
  useEffect(() => {
    if (progressValue) {
      setProgressValue(
        ((minutes * 60 + seconds) / (initialMinutes * 60 + initialSeconds)) *
          100
      );
    }
  }, [minutes, seconds]);
  return (
    <div className="container" style={{ width: 300, height: 300 }}>
      <CircularProgressbarWithChildren
        value={progressValue}
        strokeWidth={5}
        styles={circularProgressStyles}
      >
        <h1>
          {minutes < 10 ? "0" : null}
          {minutes} : {seconds < 10 ? "0" : null}
          {seconds}
        </h1>
        <div>
          {startorpause ? (
            <div>
              <button onClick={start}>start</button>
            </div>
          ) : (
            <div>
              <button onClick={pause}>pause</button>
            </div>
          )}

          <button onClick={reset}>
            <i className="fa-solid fa-repeat"></i>
          </button>
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
}

export default Break;
