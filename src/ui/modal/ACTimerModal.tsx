import React, {useEffect, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {toastInfo} from "../../feature/utils/toast.tsx";

interface Props{
    visibility: boolean;
    setVisibility: (visibility: boolean) => any;
}

const ACTimerModal: React.FC<Props> = ({visibility, setVisibility}) => {
    const [time, setTime] = useState('');
    const handleTimeChange = (event: any) => {
        setTime(event.target.value);
    };

    useEffect(() => {
        if(!visibility){
            setTime('');
        }
    }, [visibility]);

    return (
        <Modal show={visibility} onHide={() => setVisibility(false)} backdrop={time ? "static" : true}>
            <Modal.Header>
                <Modal.Title>에어컨 타이머</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="finish-time">
                    <Form.Label>종료 시간</Form.Label>
                    <Form.Control
                        type="time"
                        step="300"
                        value={time}
                        onChange={handleTimeChange}/>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => toastInfo('아직 준비중인 기능입니다.')}>추가</Button>
                <Button onClick={() => setVisibility(false)}>취소</Button>
            </Modal.Footer>
        </Modal>
    );
};
export default ACTimerModal;