import SwitchBot, {SwitchBotDevice} from "./SwitchBot.tsx";
import {useData} from "../../../feature/provider/DataProvider.tsx";
import React from "react";
import Container from "../../common/Container.tsx";

const SwitchBotList: React.FC = () => {
    const {state} = useData();
    const switchBotList: SwitchBotDevice[] = state.switchBotList || [];
    return <>
        <Container title="방 전등" editable>
            <div className="switch-bot-list">
                {switchBotList.map((sw: any, i: number) => <SwitchBot key={i} device={sw}/>)}
            </div>
        </Container>
    </>;
}
export default SwitchBotList;