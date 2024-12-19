import React from "react";
import Container from "../../common/Container.tsx";
import ContainerHeader from "../../common/ContainerHeader.tsx";
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