import React, {useEffect, useState} from "react";
import ModalBase from "./ModalBase.tsx";
import {CheckerDevice} from "../conponent/Checker/Checker.tsx";
import {CheckerHistoryTable} from "../conponent/Checker/CheckerHistory.tsx";
import {Button} from "react-bootstrap";
import {notifyError} from "../../utils/noti.tsx";
import {useAuth} from "../../feature/provider/AuthProvider.tsx";

interface Props{
    visibility: boolean;
    setVisibility: (visibility: boolean) => void;
    device: CheckerDevice
}

export const CheckerInfoModal: React.FC<Props> = ({visibility, setVisibility, device}) => {
    const {jwtFetch} = useAuth();
    const [checkerHistory, setCheckerHistory] = useState<CheckerDevice[]>([]);

    useEffect(() => {
        const updateHistory = async () => {
            try{
                const res = await jwtFetch(`/data/checker?history=true&device=${device.id}`, {method: 'POST'});
                const list = [];
                const jsonData = await res.json();
                for(const index in jsonData){
                    const history = jsonData[index];
                    history.number = +index + 1;
                    list.push(history);
                }
                setCheckerHistory(list)
            }catch(error: any){
                notifyError(error.message, error)
            }
        }

        updateHistory();
        const interval = setInterval(updateHistory, 1000 * 60 * 5); // 5분 주기로 창문 상태 갱신, 추후 개선 예정
        return () => clearInterval(interval);
    }, []);

    return (
        <ModalBase title={device.name + " 최근 이력"} visibility={visibility} setVisibility={setVisibility}>
            <CheckerHistoryTable list={checkerHistory}/>
            <Button className='animation-on-hover' onClick={() => setVisibility(false)}>닫기</Button>
        </ModalBase>
    );
};