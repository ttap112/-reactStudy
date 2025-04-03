import { useEffect, useState, useRef, useCallback } from "react";
import logo from "./assets1/로고_최종파일_2_남색배경-removebg-preview.png";
import "./LoadingStyle.css";

export default function LoadingScreen({ onLoaded }) {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  const handleLoadComplete = useCallback(() => {
    setIsLoading(false);
    onLoaded();
  }, [onLoaded]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev + 5 >= 100) {
          clearInterval(intervalRef.current);
          timeoutRef.current = setTimeout(handleLoadComplete, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 150);

    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(timeoutRef.current);
    };
  }, [handleLoadComplete]);

  if (!isLoading) return null;

  return (
    <div className="loading-container">
      <div className="loading-box">
        <img src={logo} alt="Logo" width={600} height={500} />
        <div className="loading-bar">
          <div className="loading-progress" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="loading-text">{progress}%</p>
      </div>
    </div>
  );
}
