import React, {useEffect, useState} from "react";
import {CheckerDevice} from "./Checker.tsx";
import CheckerHistoryTable from "./CheckerHistoryTable.tsx";
import {Button, Modal, Pagination} from "react-bootstrap";
import {toastError} from "../../feature/utils/toast.tsx";
import {useAuth} from "../../feature/provider/AuthProvider.tsx";

interface Props{
    visibility: boolean;
    setVisibility: (visibility: boolean) => any;
    device: CheckerDevice
}

export const CheckerInfoModal: React.FC<Props> = ({visibility, setVisibility, device}) => {
    const {jwtFetch} = useAuth();
    const [checkerHistory, setCheckerHistory] = useState<CheckerDevice[]>([]);

    const updateHistory = async () => {
        try{
            const res = await jwtFetch(`/data/checker?history=true&device_id=${device.id}`, {method: 'POST'});
            const list = [];
            const jsonData = await res.json();
            for(const index in jsonData){
                const history = jsonData[index];
                history.number = +index + 1;
                list.push(history);
            }
            setCheckerHistory(list)
        }catch(error: any){
            toastError(error)
        }
    }

    useEffect(() => {
        if(visibility && checkerHistory.length < 1){
            updateHistory();
        }
    }, [visibility]);

    useEffect(() => { // 5분 주기로 창문 상태 갱신, 추후 개선 예정
        const interval = setInterval(updateHistory, 1000 * 60 * 5);
        return () => clearInterval(interval);
    }, []);

    return (
        <Modal show={visibility} onHide={() => setVisibility(false)}>
            <Modal.Header>
                <Modal.Title>{device.name + " 최근 이력"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CheckerHistoryTable list={checkerHistory}/>
                <Pagination className="justify-content-center mb-0 mt-2">
                    <Pagination.Item active>1</Pagination.Item>
                    {new Array(9).fill('').map((_, index) => (
                        <Pagination.Item key={index}>
                            {index + 2}
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