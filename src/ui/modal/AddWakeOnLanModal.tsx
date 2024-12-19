import React, {useEffect, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {toastError} from "../../feature/utils/toast.tsx";
import {validateMacAddress} from "../../utils/utils.ts";

interface Props{
    visibility: boolean;
    setVisibility: (visibility: boolean) => any;
    onSubmit: (name: string, address: string) => any;
}

const AddWakeOnLanModal: React.FC<Props> = ({visibility, setVisibility, onSubmit}) => {
    const [pcName, setPcName] = useState('');
    const [macAddress, setMacAddress] = useState('');

    useEffect(() => {
        if(!visibility){
            setPcName('');
            setMacAddress('');
        }
    }, [visibility]);

    const addWakeOnLanPC = () => {
        if(pcName.length < 2){
            toastError('PC 이름은 두글자 이상이어야 합니다.');
            return;
        }
        if(!validateMacAddress(macAddress)){
            toastError('MAC 주소가 잘못되었습니다');
            return;
        }
        onSubmit(pcName, macAddress);
    }

    return (
        <Modal show={visibility} onHide={() => setVisibility(false)} backdrop={pcName || macAddress ? "static" : true}>
            <Modal.Header>
                <Modal.Title>WOL 추가</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="pc-name">
                    <Form.Label>PC 이름</Form.Label>
                    <Form.Control
                        placeholder="PC 이름"
                        value={pcName}
                        onChange={(e) => setPcName((e.target as any).value)}/>
                </Form.Group>
                <Form.Group controlId="mac-address">
                    <Form.Label>MAC 주소</Form.Label>
                    <Form.Control
                        placeholder="MAC 주소"
                        value={macAddress}
                        onChange={(e) => setMacAddress((e.target as any).value)}/>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button color='info' onClick={() => addWakeOnLanPC()}>추가</Button>
                <Button onClick={() => setVisibility(false)}>취소</Button>
            </Modal.Footer>
        </Modal>
    );
};
export default AddWakeOnLanModal;