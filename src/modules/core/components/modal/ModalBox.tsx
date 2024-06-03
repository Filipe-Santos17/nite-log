import React, {MouseEventHandler, PropsWithChildren} from "react";

import './ModalBox.css';

type ModalBoxProps = {
    onClick: MouseEventHandler<HTMLDivElement>;
}

const ModalBox = ({onClick, children}: PropsWithChildren<ModalBoxProps>) => {
    return (
        <div className="modal-box" onClick={onClick}>
            <div className="modal-content">
                {children}
            </div>
        </div>
    );
};

export default ModalBox;