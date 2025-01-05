import SwitchBot from "./SwitchBot.tsx";
import React from "react";
import {BsPencilSquare} from "react-icons/bs";
import Container from "../base/Container.tsx";
import ContainerHeader from "../base/ContainerHeader.tsx";
import {useData} from "../../feature/provider/DataProvider.tsx";
import {toastInfo} from "../../feature/utils/toast.tsx";
import {DeviceType, SwitchBotDevice} from "../../feature/component/device.ts";

const SwitchBotList: React.FC = () => {
    const {state: {deviceList}} = useData();
    const switchBotList = deviceList.filter(device => device.model == DeviceType.SWITCH_BOT) as SwitchBotDevice[];
    return <>
        <Container>
            <ContainerHeader title="방 전등">
                <BsPencilSquare
                    className="item-header-button ms-auto"
                    onClick={() => toastInfo('준비중인 기능입니다.')}
                />
            </ContainerHeader>
            <div>
                {switchBotList.map((sw, i) => <SwitchBot key={i} device={sw}/>)}
            </div>
        </Container>
    </>;
}
export default SwitchBotList;