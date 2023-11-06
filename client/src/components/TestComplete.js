import React, { useEffect, useState } from "react";

const TestComplete = ({ show }) => {
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    if (show) {
      setAnimationClass("animate");
      // Reset the animation after a delay
      setTimeout(() => {
        setAnimationClass("");
      }, 3000); // Adjust the delay as needed
    }
  }, [show]);

  return (
    <div className={`test-completed-animation ${animationClass}`}>
      <div className="circle">
        <div className="checkmark">
          <div className="checkmark-stem"></div>
          <div className="checkmark-kick"></div>
        </div>
      </div>
      <p>Test Completed!</p>
    </div>
  );
};

export default TestComplete;
