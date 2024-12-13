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
}

interface Props{
    data: PC;
    checked?: boolean;
}

const WakeOnLan: React.FC<Props> = ({data}) => {
    const {jwtFetch} = useAuth();
    //const [editMode, setEditMode] = useState(false);

    const name = data.name
    const address = data.address

    const wakeUp = async () => {
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
            <td><Form.Check/></td>
            <td onClick={wakeUp}>{name}</td>
            <td onClick={wakeUp}>{address}</td>
            <td>
                <Button size="sm" color="info" onClick={wakeUp} style={{padding: "10px 18px"}}></Button>
            </td>
            <td>
                <EditButton/>
            </td>
        </tr>
    );
}
export default WakeOnLan;