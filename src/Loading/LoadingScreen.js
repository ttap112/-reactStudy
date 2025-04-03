import { useEffect, useState } from "react";
import logo from "./assets1/로고_최종파일_2_남색배경.png"; // 상대 경로 수정
import "./LoadingStyle.css"; // 스타일 적용

export default function LoadingScreen({ onLoaded }) {
  const [progress, setProgress] = useState(0); // 로딩 진행 상태
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
            onLoaded();
          }, 500); // 100% 후에 onLoaded 실행
          return 100;
        }
        return prev + 5; // 5%씩 증가
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onLoaded]);

  if (!isLoading) return null; // 로딩이 끝나면 화면에서 제거

  return (
    <div className="loading-container">
      <div className="loading-box">
        <img src={logo} alt="Logo" width={200} height={200} />
        <div className="loading-bar">
          <div className="loading-progress" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="loading-text">{progress}%</p>
      </div>
    </div>
  );
}
