import React from 'react'
import './App.css'

export default function wordPuzzle() {
  return (
    <PuzzleView/>
  )
  function PuzzleView() {
    let wordList = [];
    let Word = "";
    let ResultView = false;

    return(
      <>
        <header>
          <button className='homeButton'>
            <img src='./assets/mdi-home-icon.png' alt='Home Icon'/>메인으로 돌아가기
          </button>
        </header>
        <section>
          <div className='Box'>
              <h1>단어 퍼즐 계산기</h1>
              <div>
                <h3>사용할 단어 조각 입력 ( 쉼표로 구분 )</h3>
                <input type="text"/>
              </div>
              <div>
                <h3>완성할 문자열열</h3>
                <input type="text" />
              </div>
              <div>
                <button>결과 보기</button>
                <div className='ResultView'>

                </div>
              </div>
          </div>
        </section>
        <footer>
          <div><button className="QuestionView">문제 보기</button></div>
          <div><button className="submitProposal">제한 사항</button></div>
          <div><button className="exampleDescription">예시 설명명</button></div>
        </footer>
      </>
    );
  }
}
