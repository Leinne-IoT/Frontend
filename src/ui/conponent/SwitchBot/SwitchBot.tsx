import './SwitchBot.css';
import React from "react";
import {Button} from "react-bootstrap";
import {notifyError} from "../../../utils/noti.tsx";

export interface SwitchBotDevice{
    id: string; // 기기 ID
    name: string; // 기기 이름
    connected: boolean; // 기기 연결 상태
    switch: {[channel: number]: boolean}; // 채널별 on/off 상태
    switchName: {[channel: number]: string}; // 채널별 스위치 이름
}

interface Props {
    device: SwitchBotDevice
}

const SwitchBot: React.FC<Props> = ({device}) => {
    const onClick = (event: any) => {
        const channel = +event.target.name;
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
                    notifyError(<>스위치 조작에 실패했습니다.<br/>이유: {json.message}</>, json)
                }
            })
            .catch((error) => notifyError(<>스위치 조작에 실패했습니다.</>, error));
    };
    return (
        <div className="switch-bot m-0">
            {/*<Col xs='2' style={{display: 'flex', padding: 0, justifyContent: 'center'}}>
                <img src={SwitchIcon} className="switch-bot-icon" alt="Toggle Icon"/>
            </Col>*/}
            <div className='switch-bot-name ps-3'>
                <span style={{color: 'red'}}>{device.connected ? '' : '!'}</span>
                {device.name}
            </div>
            <div className="align-items-center ms-auto me-3">
                <div className="switch-bot-button-container">
                    <span>{device.switchName[0]}</span>
                    <Button
                        name="0"
                        color={device.switch[0] ? "info" : ""}
                        className="animation-on-hover"
                        onClick={onClick}
                        style={{transition: '0.3s'}}
                    >
                        {device.switch[0] ? "끄기" : "켜기"}
                    </Button>
                </div>
                <div className="switch-bot-button-container">
                    <span>{device.switchName[1]}</span>
                    <Button
                        name="1"
                        color={device.switch[1] ? "info" : ""}
                        className="animation-on-hover"
                        onClick={onClick}
                    >
                        {device.switch[1] ? "끄기" : "켜기"}
                    </Button>
                </div>
            </div>
        </div>
    );
};
export default SwitchBot;