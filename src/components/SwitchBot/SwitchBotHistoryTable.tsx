import React from "react";
import {Table} from "react-bootstrap";
import {dateToString} from "../../utils/utils.ts";
import {SwitchBotHistoryRow} from "../../feature/component/device.ts";

interface SwitchBotProps{
    device: SwitchBotHistoryRow;
}

const SwitchBot: React.FC<SwitchBotProps> = ({device}) => {
    return (
        <tr>
            <td className="text-center">{device.number}</td>
            <td className="text-center">{device.name}{device.channelName ? `(${device.channelName})` : ''}</td>
            <td className="text-center">{device.state ? 'ON' : 'OFF'}</td>
            <td className="text-center">{dateToString(device.recordDate || new Date(), true)}</td>
        </tr>
    );
};

interface TableProps {
    list: SwitchBotHistoryRow[]
}

const SwitchBotHistoryTable: React.FC<TableProps> = ({list}) => {
    return (
        <Table className="m-0" responsive>
            <thead className="text-primary">
                <tr>
                    <th className="text-center">No</th>
                    <th className="text-center">장소</th>
                    <th className="text-center">상태</th>
                    <th className="text-center">시각</th>
                </tr>
            </thead>
            <tbody>
                {list.length < 1 ?
                    <tr><td colSpan={10} style={{textAlign: 'center'}}>이력이 없습니다</td></tr> :
                    list.map((device, index) => <SwitchBot key={index} device={device}/>)}
            </tbody>
        </Table>
    );
}
export default SwitchBotHistoryTable