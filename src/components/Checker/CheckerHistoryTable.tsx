import React from "react";
import {Table} from "react-bootstrap";
import Checker from "./Checker.tsx";
import {CheckerDevice} from "../../feature/component/device.ts";

interface TableProps {
    list: CheckerDevice[]
}

const CheckerHistoryTable: React.FC<TableProps> = ({list}) => {
    return (
        <Table className="m-0" responsive>
            <thead className="text-primary">
                <tr>
                    <th className="text-center">No</th>
                    <th className="text-center">장소</th>
                    <th className="text-center">상태</th>
                    <th className="text-center">배터리</th>
                    <th className="text-center">시각</th>
                </tr>
            </thead>
            <tbody>
                {list.length < 1 ?
                    <tr><td colSpan={10} style={{textAlign: 'center'}}>이력이 없습니다</td></tr> :
                    list.map((device, index) => <Checker key={index} device={device}/>)}
            </tbody>
        </Table>
    );
}
export default CheckerHistoryTable