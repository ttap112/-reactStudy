import './modalStyle.css';

export const ExampleDescriptionModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null; // 모달이 열려있을 때만 렌더링

    return (
        <div className='Overlay' onClick={onClose}>
            <div className='ModalChang' onClick={(e) => e.stopPropagation()}>
                <span className='wordHeader'>예시설명</span>
                <span className='wordContents'>
                    사용할 단어 조각 입력에는 | ba, na, n, a 와 같이 입력하고<br/>
                    완성할 문자열에는 | banana를 입력하시면 됩니다.
                </span>
                <button className='cancel' type='button' onClick={onClose}>닫기</button>
            </div>
        </div>
    );
};
