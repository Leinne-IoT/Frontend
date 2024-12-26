import React, {useEffect, useState} from "react";
import CheckerHistoryTable from "./CheckerHistoryTable.tsx";
import {Button, Modal, Pagination} from "react-bootstrap";
import {toastError} from "../../feature/utils/toast.tsx";
import {useAuth} from "../../feature/provider/AuthProvider.tsx";
import {CheckerDevice} from "../../feature/component/device.ts";

interface Props{
    visibility: boolean;
    setVisibility: (visibility: boolean) => any;
    device: CheckerDevice
}

export const CheckerInfoModal: React.FC<Props> = ({visibility, setVisibility, device}) => {
    const {jwtFetch} = useAuth();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [checkerHistory, setCheckerHistory] = useState<CheckerDevice[]>([]);

    const updateHistory = async () => {
        try{
            const res = await jwtFetch(`/checker/history?device_id=${device.id}&page=${page}`);
            const list = [];
            const jsonData = await res.json();
            console.log(jsonData);
            setTotalPages(Math.min(10, jsonData.totalPages));
            for(const index in jsonData.data){
                const history = jsonData.data[index];
                history.number = +index + 1 + (page - 1) * 10;
                list.push(history);
            }
            setCheckerHistory(list)
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
                <CheckerHistoryTable list={checkerHistory}/>
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