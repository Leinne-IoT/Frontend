import React, {useState} from "react";

import './AirConditioner.css';
import AirConditionerIcon from "../../../assets/icon/ac.png";
import {useStorageState} from "../../utils/LocalStorage.tsx";
import {JSONData} from "../../../utils/utils.ts";
import {useData} from "../../../feature/provider/DataProvider.tsx";
import {useAuth} from "../../../feature/provider/AuthProvider.tsx";
import {Button, Col, Dropdown, Row} from "react-bootstrap";


const AirConditioner: React.FC = () => {
    const {state} = useData();
    const {jwtFetch} = useAuth();

    const [timerModal, setTimerModal] = useState(false);
    const [reservationModal, setReservationModal] = useState(false);

    const [protocol, setProtocol] = useStorageState('aircon_protocol', 15);
    const [mode, setMode] = useStorageState('aircon_mode', 1);
    const [speed, setSpeed] = useStorageState('aircon_speed', 4);
    const [temperature, setTemperature] = useStorageState('aircon_temperature', 26);

    const setPowerAC = (power: boolean) => {
        const json: JSONData = {power};
        if(power){
            json.protocol = protocol;
            json.mode = mode;
            json.speed = speed;
            json.temperature = temperature;
        }
        jwtFetch('/api/remote', {
            method: 'POST',
            body: JSON.stringify(json),
            headers: {"Content-Type": "application/json"},
        });
    };

    const sensorValues = []
    if(state.temperature != null){
        sensorValues.push(state.temperature + '°C');
    }
    if(state.humidity != null){
        sensorValues.push(state.humidity + '%');
    }
    return <>
        {/*<ACTimerModal visibility={timerModal} setVisibility={setTimerModal}/>*/}
        {/*<ACReservationModal visibility={reservationModal} setVisibility={setReservationModal}/>*/}
        <Row className="remote-con m-0">
            {/*<Col xs='2' className='mt-1 d-flex p-0 justify-content-center'>
                <img src={AirConditionerIcon} className="switch-bot-icon" alt=""/>
            </Col>*/}
            <Col xs='4' className='mt-1 p-0'>
                <span className='remote-con-name'>에어컨</span>
            </Col>
            <Col className='mt-1' xs='6' style={{display: 'flex', padding: 0}}>
                <Button
                    size="sm"
                    color="info"
                    className="animation-on-hover"
                    onClick={() => setPowerAC(true)}
                    style={{marginLeft: 'auto'}}
                >
                    켜기
                </Button>
                <Button
                    size="sm"
                    className="animation-on-hover ml-1 mr-2"
                    onClick={() => setPowerAC(false)}
                >
                    끄기
                </Button>
            </Col>
            <Col xs='12' className="mt-2">
                <span style={{color: '#000', fontSize: '15px'}}>{sensorValues.join(' / ')}</span>
            </Col>
            <Col xs='12' className="ac-temp">
                {Array.from({length: 7}, (_, index) => {
                    const temp = 24 + index;
                    return (
                        <span
                            key={index}
                            className={temp === temperature ? ' selected' : ''}
                            onClick={e => setTemperature(parseInt((e.target as any).innerHTML))}
                        >
                            {temp}°C
                        </span>
                    );
                })}
            </Col>
            <Col xs='12' className="mt-2">
                <Row>
                    <Col xs='3' className='pt-2 pr-1 pb-2 pl-2'>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="modeButton" className="m-0 w-100">
                                {['자동', '냉방', '난방', '제습', '송풍'][mode]}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {['냉방', '난방', '제습', '송풍'].map((text, index) =>
                                    <Dropdown.Item
                                        key={index}
                                        className={mode === index + 1 ? 'selected' : ''}
                                        onClick={() => setMode(index + 1)}
                                    >
                                        {text}
                                    </Dropdown.Item>
                                )}
                                <Dropdown.Divider />
                                <Dropdown.Item
                                    className={mode === 0 ? 'selected' : ''}
                                    onClick={() => setMode(0)}
                                >
                                    자동
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        {/*<UncontrolledDropdown style={{width: '100%'}}>
                            <DropdownToggle
                                caret
                                className="m-0 w-100"
                                data-toggle="dropdown"
                            >
                                {['자동', '냉방', '난방', '제습', '송풍'][mode]}
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-black">
                                {['냉방', '난방', '제습', '송풍'].map((text, index) =>
                                    <DropdownItem
                                        key={index}
                                        className={mode === index + 1 ? 'selected' : ''}
                                        onClick={() => setMode(index + 1)}
                                    >
                                        {text}
                                    </DropdownItem>
                                )}
                                <DropdownItem divider></DropdownItem>
                                <DropdownItem
                                    className={mode === 0 ? 'selected' : ''}
                                    onClick={() => setMode(0)
                                }>
                                    자동
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>*/}
                    </Col>
                    <Col xs='3' className='pt-2 pr-1 pb-2 pl-1'>
                        {/*<UncontrolledDropdown style={{width: '100%'}}>
                            <DropdownToggle
                                caret
                                className="m-0 w-100"
                                data-toggle="dropdown"
                            >
                                {['강', '중', '약'][4 - speed] || '자동'}
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-black">
                                {['강', '중', '약'].map((text, index) =>
                                    <DropdownItem
                                        key={index}
                                        className={speed === 4 - index ? 'selected' : ''}
                                        onClick={() => setSpeed(4 - index)}
                                    >
                                        {text}
                                    </DropdownItem>
                                )}
                                <DropdownItem divider></DropdownItem>
                                <DropdownItem className={speed === 0 ? 'selected' : ''} onClick={() => setSpeed(0)}>자동</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>*/}
                    </Col>
                    <Col xs='3' className='pt-2 pr-1 pb-2 pl-1'>
                        <Button
                            className="text-truncate m-0 w-100"
                            style={{padding: '10px'}}
                            onClick={() => setTimerModal(!timerModal)}
                        >
                            타이머
                        </Button>
                        {/* <UncontrolledDropdown className="btn-group">
                            <DropdownToggle caret data-toggle="dropdown"></DropdownToggle>
                        </UncontrolledDropdown> */}
                    </Col>
                    <Col xs='3' className='pt-2 pr-2 pb-2 pl-1'>
                        <Button
                            className="text-truncate m-0 w-100"
                            style={{padding: '10px'}}
                            onClick={() => setReservationModal(!reservationModal)}
                        >
                            예약
                        </Button>
                        {/* <UncontrolledDropdown className="btn-group">
                            <DropdownToggle caret data-toggle="dropdown"></DropdownToggle>
                        </UncontrolledDropdown> */}
                    </Col>
                </Row>
            </Col>
        </Row>
    </>;
};
export default AirConditioner;