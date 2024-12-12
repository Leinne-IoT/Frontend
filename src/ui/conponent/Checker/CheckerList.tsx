import Checker from "./Checker.tsx";
import {useData} from "../../../feature/provider/DataProvider.tsx";
import {Table} from "react-bootstrap";
import Container from "../../common/Container.tsx";
import React from "react";

const CheckerList = () => {
    const {state: {checkerList}} = useData();
    const list: any[] = checkerList || [];
    return <>
        <Container title="문/창문 상태" editable>
            <Table className="checker-table" hover>
                <thead className="text-primary">
                    <tr>
                        <th className="text-center">장소</th>
                        <th className="text-center">상태</th>
                        <th className="text-center">배터리</th>
                        <th className="text-center">시각</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((device, index) => <Checker key={index} device={device}/>)}
                </tbody>
            </Table>
        </Container>
    </>;
};
export default CheckerList;