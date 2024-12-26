import './SwitchBot.scss';
import React, {useState} from "react";
import {Button, ButtonGroup, ToggleButton} from "react-bootstrap";
import {toastError} from "../../feature/utils/toast.tsx";
import {SwitchBotDevice} from "../../feature/component/device.ts";
import {SwitchBotInfoModal} from "./SwitchBotInfoModal.tsx";

interface Props {
    device: SwitchBotDevice
}

const SwitchBot: React.FC<Props> = ({device}) => {
    const [modal, setModal] = useState(false);

    const onClick = (channel: number) => {
        fetch('/api/switch', {
            method: 'POST',
            body: JSON.stringify({
                id: device.id,
                state: {[channel]: !device.switch[channel]}
            }),
            credentials: 'include',
            headers: {"Content-Type": "application/json"},
        })
            .then(async (res) => {
                if(res.status !== 200){
                    const json = await res.json();
                    toastError(<>스위치 조작에 실패했습니다.<br/>이유: {json.message}</>)
                }
            })
            .catch((error) => {
                console.error(error)
                toastError(<>스위치 조작에 실패했습니다.</>)
            });
    };

    const switchButtonList = [];
    for(const channel in device.switch){
        switchButtonList.push(
            <div className="switch-bot-button-container" key={channel}>
                <span className="switch-bot-button-name">{device.switchName?.[channel] || ''}</span>
                <ButtonGroup>
                    <ToggleButton
                        id={`${device.id}_${channel}`}
                        value={channel}
                        type="radio"
                        onClick={() => onClick(+channel)}
                        variant={device.switch[channel] ? "primary" : "outline-primary"}
                    >
                        켜기
                    </ToggleButton>
                    <ToggleButton
                        id={`${device.id}_${channel}`}
                        value={channel}
                        type="radio"
                        onClick={() => onClick(+channel)}
                        variant={!device.switch[channel] ? "danger" : "outline-danger"}
                    >
                        끄기
                    </ToggleButton>
                </ButtonGroup>
            </div>
        );
    }
    return <>
        <SwitchBotInfoModal visibility={modal} setVisibility={setModal} device={device}/>
        <div className="switch-bot" >
            <div className='switch-bot-name'>
                <span style={{color: 'red'}}>{device.connected ? '' : '!'}</span>
                {device.name}
                <Button size="sm" onClick={() => setModal(true)} variant="secondary">H</Button>
            </div>
            <div className="align-items-center ms-auto">
                {switchButtonList}
            </div>
        </div>
    </>;
};
export default SwitchBot;