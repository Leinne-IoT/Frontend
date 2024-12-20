import './SwitchBot.scss';
import React from "react";
import {ButtonGroup, ToggleButton} from "react-bootstrap";
import {toastError} from "../../feature/utils/toast.tsx";

export interface SwitchBotDevice{
    id: string; // 기기 ID
    name: string; // 기기 이름
    connected: boolean; // 기기 연결 상태
    switch: {[channel: number]: boolean}; // 채널별 on/off 상태
    switchName?: {[channel: number]: string}; // 채널별 스위치 이름
}

interface Props {
    device: SwitchBotDevice
}

const SwitchBot: React.FC<Props> = ({device}) => {
    const onClick = (channel: number) => {
        fetch('/api/switch', {
            method: 'POST',
            body: JSON.stringify({
                id: device.id,
                channel,
                state: !device.switch[channel]
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
                toastError(<>스위치 조작에 실패했습니다.</>)
                console.error(error)
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
    return (
        <div className="switch-bot">
            <div className='switch-bot-name'>
                <span style={{color: 'red'}}>{device.connected ? '' : '!'}</span>
                {device.name}
            </div>
            <div className="align-items-center ms-auto">
                {switchButtonList}
            </div>
        </div>
    );
};
export default SwitchBot;