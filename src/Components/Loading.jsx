import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Loading = () => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      if (percentage < 100) {
        setPercentage(percentage + 1);
      }
    }, 50);
  }, [percentage]);

  return (
    <div className="app">
      <h4>
        <a
          href="https://www.cluemediator.com"
          target="_blank"
          rel="noopener"
        ></a>
      </h4>
      <div
        style={{ width: 550, margin: "auto", display: "flex", color: "red" }}
      >
        <CircularProgressbar
          styles={buildStyles({
            pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
            textColor: "#212529",
            trailColor: "#212529",
            backgroundColor: "#212529",
          })}
          value={percentage}
          text={`${percentage}%`}
        />
      </div>
    </div>
  );
};

export default Loading;
