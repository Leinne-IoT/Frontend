import Checker from "./Checker.tsx";
import {Table} from "react-bootstrap";
import React from "react";
import {BsPencilSquare} from "react-icons/bs";
import {useData} from "../../feature/provider/DataProvider.tsx";
import {toastInfo} from "../../feature/utils/toast.tsx";
import Container from "../base/Container.tsx";
import ContainerHeader from "../base/ContainerHeader.tsx";
import {CheckerDevice, DeviceType} from "../../feature/component/device.ts";

const CheckerList = () => {
    const {state: {deviceList}} = useData();
    const checkerList = deviceList.filter(device => device.model == DeviceType.CHECKER) as CheckerDevice[];
    return <>
        <Container>
            <ContainerHeader title="문/창문 상태">
                <BsPencilSquare
                    className="item-header-button ms-auto"
                    onClick={() => toastInfo('준비중인 기능입니다.')}
                />
            </ContainerHeader>
            <Table hover striped>
                <thead className="text-primary">
                    <tr>
                        <th className="text-center">장소</th>
                        <th className="text-center">상태</th>
                        <th className="text-center">배터리</th>
                        <th className="text-center">시각</th>
                    </tr>
                </thead>
                <tbody>
                    {checkerList.map((device, index) => <Checker key={index} device={device}/>)}
                </tbody>
            </Table>
        </Container>
    </>;
};
export default CheckerList;