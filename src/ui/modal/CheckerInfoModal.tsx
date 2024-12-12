import React from "react";
import ModalBase from "./ModalBase.tsx";
import {CheckerDevice} from "../conponent/Checker/Checker.tsx";
import {CheckerHistoryTable} from "../conponent/Checker/CheckerHistory.tsx";
import {Button} from "react-bootstrap";

interface Props{
    visibility: boolean;
    setVisibility: (visibility: boolean) => void;
    device: CheckerDevice
}

export const CheckerInfoModal: React.FC<Props> = ({visibility, setVisibility, device}) => {
    return (
        <ModalBase title={device.name + " 정보"} visibility={visibility} setVisibility={setVisibility}>
            <CheckerHistoryTable list={[]}/>
            <Button className='animation-on-hover' onClick={() => setVisibility(false)}>닫기</Button>
        </ModalBase>
    );
};