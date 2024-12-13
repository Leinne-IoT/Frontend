import React, {useState, useEffect} from 'react';
import {isArray, JSONData} from "../../../utils/utils.ts";
import {useData} from "../../../feature/provider/DataProvider.tsx";
import {useAuth} from "../../../feature/provider/AuthProvider.tsx";
import {toastError} from "../../../feature/utils/toast.tsx";
import Container from "../../common/Container.tsx";
import {Table, Form} from "react-bootstrap";
import WakeOnLan from "./WakeOnLan.tsx";
import ContainerHeader from "../../common/ContainerHeader.tsx";

const WakeOnLanList: React.FC = () => {
    const {jwtFetch} = useAuth();
    const {state, dispatch} = useData();
    const [modal, setModal] = useState(false);

    const setWolList = (value: JSONData) => dispatch({key: 'wolList', value});

    useEffect(() => {
        if(!isArray(state.wolList)){
            jwtFetch(`/data/wol`, {method: 'POST'})
                .then(async res => setWolList(await res.json()))
                .catch(error => console.error(error));
        }
    }, []);

    const addWakeOnLanData = (name: string, address: string) => {
        jwtFetch('/api/wol', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name, address}),
        })
            .then(async res => {
                if(res.ok){
                    const list = [...state.wolList];
                    list.push(await res.json());
                    setWolList(list);
                }
            })
            .then(() => setModal(false))
            .catch((error) => toastError(error));
    }

    const removeWakeOnLanData = async () => {
        // TODO: input[check] 구해와서 해당 내용 제거
    }

    const wolList: any[] = state.wolList || [];
    return <>
        {/*<AddWakeOnLanModal visibility={modal} setVisibility={setModal} onSubmit={addWakeOnLanData}/>*/}
        <Container>
            <ContainerHeader title="LAN으로 깨우기"/>
            <Table className="wol" hover>
                <thead className="text-primary">
                <tr>
                    <th><Form.Check/></th>
                    <th className="text-center">이름</th>
                    <th className="text-center">MAC</th>
                    <th className="text-center">전원</th>
                    <th className="text-center">편집</th>
                </tr>
                </thead>
                <tbody>
                    {
                        wolList.map(data => <WakeOnLan key={data.id} data={data}/>) ||
                        <tr>
                            <td colSpan={5} style={{paddingTop: '20px'}}>등록된 PC가 없습니다.</td>
                        </tr>
                    }
                </tbody>
            </Table>
        </Container>
    </>;
}
export default WakeOnLanList;