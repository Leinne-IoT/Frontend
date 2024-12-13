import './WakeOnLan.css';
import React, {useState} from "react";
import {useAuth} from "../../../feature/provider/AuthProvider.tsx";
import {toastError} from "../../../feature/utils/toast.tsx";
import {Button, Form} from "react-bootstrap";
import EditButton from "../../common/EditButton.tsx";

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
    //const [editMode, setEditMode] = useState(false);

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
            <td><Form.Check checked={checked} onChange={onChange}/></td>
            <td>{name}</td>
            <td>{address}</td>
            <td>
                <Button
                    size="sm"
                    variant={connected ? undefined : "danger"}
                    onClick={connected ? undefined : wakeUpPC}
                    style={{padding: "10px 18px"}}
                    disabled={connected}
                />
            </td>
            <td>
                <EditButton/>
            </td>
        </tr>
    );
}
export default WakeOnLan;