import React from "react";
import Container from "../base/Container.tsx";
import ContainerHeader from "../base/ContainerHeader.tsx";
import AirConditioner from "./AirConditioner/AirConditioner.tsx";

const RemoteList: React.FC = () => {
    return <>
        <Container>
            <ContainerHeader title="리모컨"/>
            <AirConditioner/>
        </Container>
    </>;
}
export default RemoteList;