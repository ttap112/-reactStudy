import React, { useState } from "react";
import "./App.css";
import homeIcon from "./assets/mdi-home-icon.png";
import { ExampleDescriptionModal, QuestionModal, SubmitProposalModal } from "./Modal";
import LoadingScreen from './Loading/LoadingScreen';

export default function WordPuzzle() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && <LoadingScreen onLoaded={() => setIsLoaded(true)} />}
      {isLoaded && <PuzzleView />}
    </>
  );
}

function PuzzleView() {
  const [wordList, setWordList] = useState('');
  const [wordResult, setWordResult] = useState('');

  return (
    <>
      <header>
        <button className="homeButton">
          <img src={homeIcon} alt="Home Icon" />
          <p>메인으로 돌아가기</p>
        </button>
      </header>
      <section>
        <div className="Box">
          <div className="mainHeader">
            <h1>단어 퍼즐 계산기</h1>
          </div>
          <div className="mainSection">
            <HumanInput setWordList={setWordList} setWordResult={setWordResult} wordList={wordList} wordResult={wordResult} />
            <div className="resultSet">
              <Result wordList={wordList} wordResult={wordResult} setWordList={setWordList} setWordResult={setWordResult} />
            </div>
          </div>
        </div>
      </section>
      <BottomButton/>
    </>
  );
}

function HumanInput({ wordList, wordResult, setWordList, setWordResult }) {
  const handleWordListChange = (e) => {
    setWordList(e.target.value);
  };

  const handleWordChange = (e) => {
    setWordResult(e.target.value);
  };

  return (
    <>
      <div className="inputStyle">
        <h3>사용할 단어 조각 입력 ( 쉼표로 구분 )</h3>
        <input type="text" placeholder="예 : ba, na, n, a" value={wordList} onChange={handleWordListChange} />
      </div>
      <div>
        <h3>완성할 문자열</h3>
        <input type="text" placeholder="예 : banana" value={wordResult} onChange={handleWordChange} />
      </div>
    </>
  );
}

function Result({ wordList, wordResult, setWordList, setWordResult }) {
  const [error, setError] = useState(false);
  const [buttonError, setButtonError] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isReturning, setIsReturning] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

  const handleResultClick = () => {
    if (isLoading || isSuccess || error) return; // 실행 중이거나 성공/에러 상태이면 아무 동작 안 함
  
    if (!wordList || !wordResult) {
      setError(true);
      setButtonError(true);
      setIsShaking(true);
      setTimeout(() => {
        setError(false);
        setButtonError(false);
        setIsShaking(false);
      }, 1000);
    } else {
      setError(false);
      setButtonError(false);
      setIsSuccess(false);
      setIsReturning(false);
      setIsLoading(true);
  
      setTimeout(() => {
        setIsSuccess(true);
        setIsLoading(false);
  
        setTimeout(() => {
          setIsReturning(true);
        }, 3000);
      }, 3000);
    }
  };
  
  const handleReset = () => {
    // 🔹 모든 상태를 완전히 초기화
    setWordList('');
    setWordResult('');
    setError(false);
    setButtonError(false);
    setIsShaking(false);
    setIsSuccess(false);
    setIsLoading(false);
    
    // 🔹 isReturning을 false로 변경하여 "결과보기" 버튼으로 복귀
    setTimeout(() => {
      setIsReturning(false);
    }, 0);
  };

  return (
    <div>
  <button
    onClick={isReturning ? handleReset : handleResultClick}
    className={`resultButton 
      ${buttonError ? 'errorButton' : ''} 
      ${isShaking ? 'shake' : ''} 
      ${isSuccess ? 'successButton' : ''}`}
    disabled={error || isLoading || (isSuccess && !isReturning)} // 성공 후 3초 동안 클릭 방지
  >
    {isReturning ? '돌아가기' : isLoading ? LoadingScreen : isSuccess ? '성공' : '결과보기'}
  </button>
      <div className={`ResultView ${error ? 'error' : ''} ${isSuccess ? 'success' : ''}`}>
        {error ? '❗ 문자가 입력되지 않았습니다.' : 
          isSuccess ? calculate(wordList,wordResult): '❓결과가 여기에 표시됩니다.'}
      </div>
    </div>
  );
}


function calculate(wordList, wordResult) {
  const inf = 20001;
  const wordArr = wordList.split(',').map(word => word.trim());
  const  wordLen = wordResult.length;
  const dp = new Array(wordLen + 1).fill(inf);
  dp[0] = 0;

  for (var i = 1; i <= wordLen; i++) { 
    for (var word of wordArr) {
      if (i >= word.length && wordResult.startsWith(word, i - word.length)) { 
        dp[i] = Math.min(dp[i], dp[i - word.length] + 1);
      }
    }
  }
  return dp[wordLen] === inf ? "문자를 만들 수 없습니다. : "-1 : wordResult+"를 만들기 위해 총"+dp[wordLen]+"개가 사용됐습니다."
}

function BottomButton() {
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isExampleModalOpen, setIsExampleModalOpen] = useState(false);

  return(
    <footer>
      <div className="buttonSet">
        <div className="buttonOne">
          <button className="QuestionView" onClick={() => setIsQuestionModalOpen(true)}>
            문제 보기
          </button>
          <QuestionModal isOpen={isQuestionModalOpen} onClose={() => setIsQuestionModalOpen(false)} />
        </div>
        <div className="buttonTwo">
          <button className="submitProposal" onClick={() => setIsSubmitModalOpen(true)}>
            제한 사항
          </button>
          <SubmitProposalModal isOpen={isSubmitModalOpen} onClose={() => setIsSubmitModalOpen(false)} />
        </div>
        <div className="buttonThree">
          <button className="exampleDescription" onClick={() => setIsExampleModalOpen(true)}>
            예시 설명
          </button>
          <ExampleDescriptionModal isOpen={isExampleModalOpen} onClose={() => setIsExampleModalOpen(false)} />
        </div>
      </div>
    </footer>
  );
}