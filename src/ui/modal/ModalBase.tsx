import {Modal} from "react-bootstrap";
import React, {ReactNode} from "react";

interface Props{
    visibility: boolean;
    setVisibility: (visibility: boolean) => void;
    title: string;
    children: ReactNode;
}

const ModalBase: React.FC<Props> = ({visibility, setVisibility, title, children}) => {
    return (
        <Modal show={visibility} onHide={() => setVisibility(false)}>
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
        </Modal>
    );
}
export default ModalBase;