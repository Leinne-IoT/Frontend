import SwitchBot, {SwitchBotDevice} from "./SwitchBot.tsx";
import {useData} from "../../../feature/provider/DataProvider.tsx";
import React from "react";
import Container from "../../common/Container.tsx";
import ContainerHeader from "../../common/ContainerHeader.tsx";
import EditButton from "../../common/EditButton.tsx";

const SwitchBotList: React.FC = () => {
    const {state} = useData();
    const switchBotList: SwitchBotDevice[] = state.switchBotList || [];
    return <>
        <Container>
            <ContainerHeader title="방 전등">
                <EditButton/>
            </ContainerHeader>
            <div className="switch-bot-list">
                {switchBotList.map((sw: any, i: number) => <SwitchBot key={i} device={sw}/>)}
            </div>
        </Container>
    </>;
}
export default SwitchBotList;