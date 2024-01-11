import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [milliseconds, setMilliseconds] = useState(0);
  const [second, setSecond] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [start, setStart] = useState(false);
  const [stop, setStop] = useState(true);

  useEffect(() => {
    let runTime1, runTime2, runTime3, runTime4;
    if (start) {
      runTime1 = setInterval(() => {
        setMilliseconds((i) => (i == 99 ? 0 : i + 1));
      }, 10);
      runTime2 = setInterval(() => {
        setSecond((i) => (i == 59 ? 0 : i + 1));
      }, 1000);
      runTime3 = setInterval(() => {
        setMinutes((i) => (i == 59 ? 0 : i + 1));
      }, 60000);
      runTime4 = setInterval(() => {
        setHours((i) => (i == 99 ? setStop(false) : i + 1));
      }, 3600000);
    } else {
      clearInterval(runTime1);
      clearInterval(runTime2);
      clearInterval(runTime3);
      clearInterval(runTime4);
    }
    return () => {
      clearInterval(runTime1);
      clearInterval(runTime2);
      clearInterval(runTime3);
      clearInterval(runTime4);
    };
  }, [start]);

  function startTime() {
    setStart(true);
    setStop(false)
  }

  function stopTime() {
    setStart((prevIsActive) => !prevIsActive);
  }

  function resetTime() {
    setStart(false);
    setHours(0);
    setMinutes(0);
    setSecond(0);
    setMilliseconds(0);
  }

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="h-[400px] bg-gradient-to-br from-slate-50 to-gray-50 shadow-md border border-gray-200 rounded-lg w-[300px] max-w-xs lg:max-w-sm cont">
        <div>
          <h1 className="mt-12 text-center text-5xl font-bold mb-16">
            Stop Watch
          </h1>
        </div>
        <div className="my-10 h-[100px] flex justify-center items-center">
          <div className=" text-5xl font-bold">
            {hours < 10 ? "0" + hours : hours}:
            {minutes < 10 ? "0" + minutes : minutes}:
            {second < 10 ? "0" + second : second}:
            {milliseconds < 10 ? "0" + milliseconds : milliseconds}
          </div>
        </div>
        <div className="my-5 p-2 text-center">
          <button
            className="mx-2 p-2 px-5 text-white font-bold text-center rounded-md bg-cyan-400 hover:shadow-md hover:shadow-slate-300 disabled:bg-slate-400"
            onClick={startTime}
            disabled={start}
          >
            Start
          </button>
          <button
            className="mx-2 p-2 px-5 text-white font-bold text-center rounded-md bg-cyan-400 hover:shadow-md hover:shadow-slate-300"
            onClick={stopTime}
            disabled={stop}
          >
            Stop
          </button>
          <button
            className="mx-2 p-2 px-5 text-white font-bold text-center rounded-md bg-cyan-400 hover:shadow-md hover:shadow-slate-300"
            onClick={resetTime}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
