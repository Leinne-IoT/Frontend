import React, {useState, useEffect} from 'react';
import {Table, Form, OverlayTrigger, Tooltip} from "react-bootstrap";
import WakeOnLan from "./WakeOnLan.tsx";
import {BiPlus, BiTrash} from "react-icons/bi";
import {useAuth} from "../../feature/provider/AuthProvider.tsx";
import {useData} from "../../feature/provider/DataProvider.tsx";
import {isArray} from "../../utils/utils.ts";
import {toastError} from "../../feature/utils/toast.tsx";
import AddWakeOnLanModal from "./AddWakeOnLanModal.tsx";
import Container from "../base/Container.tsx";
import ContainerHeader from "../base/ContainerHeader.tsx";
import {WakeOnLanPC} from "../../feature/component/device.ts";

const WakeOnLanList: React.FC = () => {
    const {jwtFetch} = useAuth();
    const {state, dispatch} = useData();
    const [modal, showModal] = useState(false);
    const [allChecked, setAllChecked] = useState(false);
    const [checkedRows, setCheckedRows] = useState<boolean[]>([]);

    const setWakeOnLanPcList = (value: WakeOnLanPC[]) => dispatch({wakeOnLanPcList: value});

    // 전체 체크박스 상태 변경
    const handleAllCheckedChange = () => {
        const newCheckedState = !allChecked;
        setAllChecked(newCheckedState);
        setCheckedRows(new Array((state.wakeOnLanPcList ?? []).length).fill(newCheckedState));
    };

    // 개별 체크박스 상태 변경
    const handleRowCheckedChange = (index: number) => {
        const newRows = [...checkedRows];
        newRows[index] = !newRows[index];
        setCheckedRows(newRows);

        // 전체 체크박스 상태 동기화
        setAllChecked(newRows.every(Boolean));
    };

    useEffect(() => {
        if(!isArray(state.wakeOnLanPcList)){
            state.wakeOnLanPcList = [];
            jwtFetch(`/data/wol`, {method: 'POST'})
                .then(async res => setWakeOnLanPcList(await res.json()))
                .catch(error => {
                    console.error(error)
                    dispatch({wakeOnLanPcList: undefined});
                });
        }
    }, []);

    useEffect(() => {
        const wakeOnLanPcList: any[] = state.wakeOnLanPcList || [];
        if(checkedRows.length < wakeOnLanPcList.length){
            const newRows = [...checkedRows];
            for(let i = 0, limit = wakeOnLanPcList.length - checkedRows.length; i < limit; ++i){
                newRows.push(false);
            }
            setCheckedRows(newRows);
        }
    }, [checkedRows, state.wakeOnLanPcList]);

    const addWakeOnLanData = (name: string, address: string) => {
        jwtFetch('/api/wol', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name, address}),
        })
            .then(async res => {
                if(res.ok){
                    const wakeOnLanPcList = state.wakeOnLanPcList ?? [];
                    const list = [...wakeOnLanPcList];
                    list.push(await res.json());
                    setWakeOnLanPcList(list);
                }else{
                    toastError('WOL 추가에 실패했습니다.');
                }
            })
            .then(() => showModal(false))
            .catch((error) => toastError(error));
    }

    const removeWakeOnLanData = async () => {
        let wakeOnLanPcList = state.wakeOnLanPcList ?? [];
        wakeOnLanPcList = wakeOnLanPcList.filter((_, index) => checkedRows[index]);

        if(wakeOnLanPcList.length < 1){
            toastError('제거할 항목을 선택해주세요.')
            return;
        }
        if(confirm('선택한 항목을 정말로 제거하시겠습니까?')){
            jwtFetch('/api/wol', {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({idList: wakeOnLanPcList.map(v => v.id)}),
            })
                .then(async res => {
                    if(res.ok){
                        const beforeList = state.wakeOnLanPcList ?? [];
                        setWakeOnLanPcList(beforeList.filter((pc) => !wakeOnLanPcList.some((item) => item.id === pc.id)));
                    }else{
                        toastError('WOL 제거에 실패했습니다.')
                    }
                })
                .catch((error) => toastError(error));
        }
    }

    const wakeOnLanPcList = state.wakeOnLanPcList || [];
    return <>
        <AddWakeOnLanModal visibility={modal} setVisibility={showModal} onSubmit={addWakeOnLanData}/>
        <Container>
            <ContainerHeader title="LAN으로 깨우기">
                <OverlayTrigger overlay={<Tooltip>추가</Tooltip>} placement="top">
                    <span className="ms-auto" onClick={() => showModal(true)}>
                        <BiPlus className="wol-header-button"/>
                    </span>
                </OverlayTrigger>
                <OverlayTrigger overlay={<Tooltip>제거</Tooltip>} placement="top">
                    <span className="ms-2" onClick={removeWakeOnLanData}>
                        <BiTrash className="wol-header-button"/>
                    </span>
                </OverlayTrigger>
            </ContainerHeader>
            <Table className="wol" hover striped>
                <thead className="text-primary">
                <tr>
                    <th>
                        <Form.Check
                            checked={allChecked}
                            onChange={handleAllCheckedChange}/>
                    </th>
                    <th className="text-center">이름</th>
                    <th className="text-center">MAC</th>
                    <th className="text-center">전원</th>
                    <th className="text-center">편집</th>
                </tr>
                </thead>
                <tbody>
                    {wakeOnLanPcList.map((data, index) => <WakeOnLan
                        key={data.id}
                        pcData={data}
                        checked={checkedRows[index] || false}
                        onChange={() => handleRowCheckedChange(index)}
                    />) ||
                    <tr>
                        <td colSpan={5} style={{paddingTop: '20px'}}>등록된 PC가 없습니다.</td>
                    </tr>}
                </tbody>
            </Table>
        </Container>
    </>;
}
export default WakeOnLanList;