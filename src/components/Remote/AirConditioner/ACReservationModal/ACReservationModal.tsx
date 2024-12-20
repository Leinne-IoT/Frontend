import './ACReservationModal.css';

import React, {useEffect, useState} from 'react';
import {Modal, Form, Button, ToggleButton} from "react-bootstrap";
import {toastInfo} from "../../../../feature/utils/toast.tsx";

const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

interface Props{
    visibility: boolean;
    setVisibility: (visibility: boolean) => any;
}

export const ACReservationModal: React.FC<Props> = ({visibility, setVisibility}) => {
    const [selectedDayList, setSelectedDayList] = useState<string[]>([]);
    const [time, setTime] = useState('');

    const handleDayClick = (day: string) => {
        setSelectedDayList(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]);
    };

    useEffect(() => {
        if(!visibility){
            setTime('');
            setSelectedDayList([])
        }
    }, [visibility]);

    return (
        <Modal show={visibility} onHide={() => setVisibility(false)} backdrop="static">
            <Modal.Header>
                <Modal.Title>에어컨 예약</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="reservation-time">
                    <Form.Label>시간</Form.Label>
                    <Form.Control
                        className="mt-1 mb-2"
                        type="time"
                        step="300"
                        value={time}
                        onChange={event => setTime(event.target.value)}/>
                </Form.Group>
                <Form.Label>요일</Form.Label>
                <div className='day-button-container gap-2'>
                    {daysOfWeek.map((day) => (
                        <ToggleButton
                            id={day}
                            key={day}
                            value={day}
                            type="checkbox"
                            className="day-button"
                            variant={day === '일' ? 'outline-danger' : "outline-primary"}
                            onClick={() => handleDayClick(day)}
                            checked={selectedDayList.includes(day)}
                        >
                            {day}
                        </ToggleButton>
                    ))}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => toastInfo('아직 준비중인 기능입니다.')}>추가</Button>
                <Button onClick={() => setVisibility(false)}>취소</Button>
            </Modal.Footer>
        </Modal>
    );
};