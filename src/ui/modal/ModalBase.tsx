import {Modal, ModalBody, ModalHeader, ModalTitle} from "react-bootstrap";
import React, {ReactNode} from "react";

interface Props{
    visibility: boolean;
    setVisibility: (visibility: boolean) => void;
    title: string;
    children: ReactNode;
}

const ModalBase: React.FC<Props> = ({visibility, setVisibility, title, children}) => {
    const handleClose = () => setVisibility(false);
    const handleShow = () => setVisibility(true);
    return (
        <Modal show={visibility} onHide={handleClose}>
            <ModalHeader>
                <ModalTitle>{title}</ModalTitle>
            </ModalHeader>
            <ModalBody>
                {children}
            </ModalBody>
        </Modal>
    );
}
export default ModalBase;