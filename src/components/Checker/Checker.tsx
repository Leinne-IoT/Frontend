import './Checker.css';
import React, {useState} from "react";
import {dateToString} from "../../utils/utils.ts";
import {CheckerInfoModal} from "./CheckerInfoModal.tsx";

export interface CheckerDevice{
    id: string; // 기기 ID
    name: string; // 기기 이름
    open: boolean; // 열림/닫힘 여부
    battery: number; // 잔여 배터리량
    date: Date; // 가장 최근 날짜
    number?: number; // history number 입니다. 없다면 대시보드 위젯입니다
}

interface Props {
    device: CheckerDevice;
}

const Checker: React.FC<Props> = ({device}) => {
    const [modal, setModal] = useState(false);

    let battery = device.battery + '';
    if(!battery){
        battery = '전원';
    }else{
        battery += '%';
    }

    const onClick = () => setModal(true);

    return <>
        {!device.number && <CheckerInfoModal visibility={modal} setVisibility={setModal} device={device}/>}
        <tr className={device.number ? "" : "checker"} onClick={device.number ? undefined : onClick}>
            {device.number && <td className="text-center">{device.number}</td>}
            <td className="text-center">{device.name}</td>
            <td className="text-center">{device.open ? '열림' : '닫힘'}</td>
            <td className="text-center">{battery}</td>
            <td className="text-center">{dateToString(device.date, true)}</td>
        </tr>
    </>;
}
export default Checker;