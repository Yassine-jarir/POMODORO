import { useEffect, useState } from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
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
      }, 50);
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
  }, [minutes, seconds]);
  console.log(progressValue);
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

export default Pomodoro;
