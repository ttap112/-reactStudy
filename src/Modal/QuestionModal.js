import './modalStyle.css';

export const QuestionModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null; // 모달이 열려있을 때만 렌더링

    return (
        <div className='Overlay' onClick={onClose}>
            <div className='ModalChang' onClick={(e) => e.stopPropagation()}>
                <span className='wordHeader'>문제 보기</span>
                <span className='wordContents'>
                    조각된 문자와 문장을 입력하여 해당 조각들이 문장을 만들게 됩니다.<br/>
                    이때 사용된 조각들이 몇 개인지 보여주며, 만약 문장을 못 만들면 -1로 반환합니다.
                </span>
                <button className='cancel' type='button' onClick={onClose}>닫기</button>
            </div>
        </div>
    );
};
