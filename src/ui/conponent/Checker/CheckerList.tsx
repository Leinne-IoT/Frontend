import Checker from "./Checker.tsx";
import {useData} from "../../../feature/provider/DataProvider.tsx";
import {Table} from "react-bootstrap";
import Container from "../../common/Container.tsx";
import React from "react";

const CheckerList = () => {
    const {state: {checkerList}} = useData();
    const list: any[] = checkerList || [];
    return <>
        <Container>
            <div className="item-title">
                <span>문/창문 상태</span>
                <span style={{
                    cursor: 'pointer',
                    marginLeft: 'auto'
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                         className="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path
                            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fillRule="evenodd"
                              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                    </svg>
                </span>
            </div>
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