import React, { useEffect, useState } from "react";

const LoadingBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 1500; // 5 seconds
    const intervalTime = 50; // update every 50ms
    const increment = 100 / (duration / intervalTime);

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(interval);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
        padding: 20,
      }}
    >
      <p style={{ fontWeight: "600", fontSize: "1.2rem" }}>
        Generating templates...
      </p>
      <div
        style={{
          height: 20,
          width: "80%",
          maxWidth: 400,
          backgroundColor: "#e0e0e0",
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            backgroundColor: "#4f46e5", // Indigo-600
            borderRadius: 10,
            transition: "width 50ms linear",
          }}
        />
      </div>
    </div>
  );
};

export default LoadingBar;
