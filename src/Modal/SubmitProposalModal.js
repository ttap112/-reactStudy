import './modalStyle.css';

export const SubmitProposalModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null; // 모달이 열려있을 때만 렌더링

    return (
        <div className='Overlay' onClick={onClose}>
            <div className='ModalChang' onClick={(e) => e.stopPropagation()}>
                <span className='wordHeader'>제한 사항</span>
                <span className='wordContents'>
                    - strs는 사용 가능한 단어 조각들이 들어있는 배열로, 길이는 1 이상 100 이하입니다.<br/>
                    - strs의 각 원소는 사용 가능한 단어 조각들이 중복 없이 들어있습니다.<br/>
                    - 사용 가능한 단어 조각들은 문자열 형태이며, 모든 단어 조각의 길이는 1 이상 5 이하입니다.<br/>
                    - t는 완성해야 하는 문자열이며 길이는 1 이상 20,000 이하입니다.<br/>
                    - 모든 문자열은 알파벳 소문자로만 이루어져 있습니다.<br/>
                </span>
                <button className='cancel' type='button' onClick={onClose}>닫기</button>
            </div>
        </div>
    );
};
