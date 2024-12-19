import './WakeOnLan.css';
import React from "react";
import {useAuth} from "../../../feature/provider/AuthProvider.tsx";
import {toastError, toastInfo} from "../../../feature/utils/toast.tsx";
import {Button, Form} from "react-bootstrap";
import {BsPencilSquare} from "react-icons/bs";

interface PC{
    id: number;
    name: string;
    address: string;
    connected: boolean;
}

interface Props{
    pcData: PC;
    checked: boolean;
    onChange: () => any;
}

const WakeOnLan: React.FC<Props> = ({pcData, checked, onChange}) => {
    const {jwtFetch} = useAuth();

    const name = pcData.name || '';
    const address = pcData.address || '';
    const connected = pcData.connected || false;

    const wakeUpPC = async () => {
        try{
            await jwtFetch('/api/wol', {
                method: 'POST',
                body: JSON.stringify({address}),
                headers: {"Content-Type": "application/json"}
            });
        }catch(error: any){
            toastError(error);
        }
    };

    return (
        <tr>
            <td>
                <Form.Check checked={checked} onChange={onChange}/>
            </td>
            <td>{name}</td>
            <td>{address}</td>
            <td className="p-2">
                <Button
                    size="sm"
                    className="wol-power-button"
                    variant={connected ? undefined : "danger"}
                    onClick={wakeUpPC}
                />
            </td>
            <td>
                <BsPencilSquare style={{cursor: "pointer", fontSize: '1.5em'}} onClick={() => toastInfo('준비중인 기능입니다.')}/>
            </td>
        </tr>
    );
}
export default WakeOnLan;