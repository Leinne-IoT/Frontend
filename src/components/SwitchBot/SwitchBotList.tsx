import SwitchBot from "./SwitchBot.tsx";
import React from "react";
import {BsPencilSquare} from "react-icons/bs";
import Container from "../base/Container.tsx";
import ContainerHeader from "../base/ContainerHeader.tsx";
import {useData} from "../../feature/provider/DataProvider.tsx";
import {toastInfo} from "../../feature/utils/toast.tsx";
import {SwitchBotDevice} from "../../feature/component/device.ts";

const SwitchBotList: React.FC = () => {
    const {state} = useData();
    const switchBotList: SwitchBotDevice[] = state.switchBotList || [];
    return <>
        <Container>
            <ContainerHeader title="방 전등">
                <BsPencilSquare
                    className="item-header-button ms-auto"
                    onClick={() => toastInfo('준비중인 기능입니다.')}
                />
            </ContainerHeader>
            <div>
                {switchBotList.map((sw: any, i: number) => <SwitchBot key={i} device={sw}/>)}
            </div>
        </Container>
    </>;
}
export default SwitchBotList;