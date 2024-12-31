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
    return <>
        {!device.number && <CheckerInfoModal visibility={modal} setVisibility={setModal} device={device}/>}
        <tr className={device.number ? "" : "checker"} onClick={device.number ? undefined : () => setModal(true)}>
            {device.number && <td className="text-center">{device.number}</td>}
            <td className="text-center">{device.name}</td>
            <td className="text-center">{device.open ? '열림' : '닫힘'}</td>
            <td className="text-center">{device.battery == null ? '전원' : `${device.battery}%`}</td>
            <td className="text-center">{dateToString(device.recordDate || new Date(), true)}</td>
        </tr>
    </>;
}
export default Checker;