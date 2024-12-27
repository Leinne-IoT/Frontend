import React, {useEffect, useState} from "react";
import {Button, Modal, Pagination} from "react-bootstrap";
import {toastError} from "../../feature/utils/toast.tsx";
import {useAuth} from "../../feature/provider/AuthProvider.tsx";
import {SwitchBotDevice, SwitchBotHistoryRow} from "../../feature/component/device.ts";
import SwitchBotHistoryTable from "./SwitchBotHistoryTable.tsx";

interface Props{
    visibility: boolean;
    setVisibility: (visibility: boolean) => any;
    device: SwitchBotDevice
}

export const SwitchBotInfoModal: React.FC<Props> = ({visibility, setVisibility, device}) => {
    const {jwtFetch} = useAuth();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [switchBotHistory, setSwitchBotHistory] = useState<SwitchBotHistoryRow[]>([]);

    const updateHistory = async () => {
        try{
            // TODO: 히스토리 업데이트 방식 개선 예정
            const res = await jwtFetch(`/switch_bot/history?device_id=${device.id}&page=${page}`);
            const list = [];
            const jsonData = await res.json();
            setTotalPages(Math.min(10, jsonData.totalPages));
            for(const index in jsonData.data){
                const history = jsonData.data[index];
                history.number = +index + 1 + (page - 1) * 10;
                list.push(history);
            }
            setSwitchBotHistory(list)
        }catch(error: any){
            toastError(error)
        }
    }

    useEffect(() => {
        if(visibility){
            updateHistory().then();
        }
    }, [visibility, page]);

    return (
        <Modal show={visibility} onHide={() => setVisibility(false)}>
            <Modal.Header>
                <Modal.Title>{device.name + " 최근 이력"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <SwitchBotHistoryTable list={switchBotHistory}/>
                <Pagination className="justify-content-center mb-0 mt-2">
                    {new Array(totalPages).fill('').map((_, index) => (
                        <Pagination.Item key={index} active={index + 1 === page} onClick={() => setPage(index + 1)}>
                            {index + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => setVisibility(false)}>닫기</Button>
            </Modal.Footer>
        </Modal>
    );
};