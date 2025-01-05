import React from "react";
import Container from "../base/Container.tsx";
import ContainerHeader from "../base/ContainerHeader.tsx";
import AirConditioner from "./AirConditioner/AirConditioner.tsx";
import {useData} from "../../feature/provider/DataProvider.tsx";
import {DeviceType, RemoteBotDevice} from "../../feature/component/device.ts";

const RemoteList: React.FC = () => {
    const {state} = useData();
    const remoteBotList = state.deviceList.filter(device => device.model === DeviceType.REMOTE_BOT) as RemoteBotDevice[];
    return <>
        <Container>
            <ContainerHeader title="리모컨"/>
            {remoteBotList.map((device, index) => (<AirConditioner key={index} device={device}/>))}
        </Container>
    </>;
}
export default RemoteList;