import SwitchBot, {SwitchBotDevice} from "./SwitchBot.tsx";
import {useData} from "../../../feature/provider/DataProvider.tsx";
import React from "react";
import Container from "../../common/Container.tsx";
import ContainerHeader from "../../common/ContainerHeader.tsx";
import {BsPencilSquare} from "react-icons/bs";
import {toastInfo} from "../../../feature/utils/toast.tsx";

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
            <div className="switch-bot-list">
                {switchBotList.map((sw: any, i: number) => <SwitchBot key={i} device={sw}/>)}
            </div>
        </Container>
    </>;
}
export default SwitchBotList;