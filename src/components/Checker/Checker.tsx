import './Checker.css';
import React, {useState} from "react";
import {dateToString} from "../../utils/utils.ts";
import {CheckerInfoModal} from "./CheckerInfoModal.tsx";
import {CheckerDevice} from "../../feature/component/device.ts";

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
            <td className="text-center">{dateToString(device.recordDate || new Date(), true)}</td>
        </tr>
    </>;
}
export default Checker;