import './Dashboard.css';

import React, {useEffect, useState} from 'react';
import Masonry from "react-masonry-css";
import {useResizeDetector} from "react-resize-detector";
import SwitchBotList from "../../../components/SwitchBot/SwitchBotList.tsx";
import RemoteList from "../../../components/Remote/RemoteList.tsx";
import CheckerList from "../../../components/Checker/CheckerList.tsx";
import WakeOnLanList from "../../../components/WakeOnLan/WakeOnLanList.tsx";
import ChartComponent from "../../../components/Chart/ChartComponent.tsx";

export const Dashboard: React.FC = () => {
    const {width, ref} = useResizeDetector();
    const [columnCount, setColumnCount] = useState(4);

    useEffect(() => {
        const size = (width || 0) - 10; // 10px padding
        // 한 항목당 최소크기 400px로 설정
        for(let count = 4; count > 1; --count){
            if(size / 400 >= count){
                setColumnCount(count)
                return;
            }
        }
        setColumnCount(1)
    }, [width]);

    return <div ref={ref}>
        <Masonry
            className="iot-container"
            columnClassName="column"
            breakpointCols={columnCount}
        >
            <SwitchBotList/>
            <RemoteList/>
            <CheckerList/>
            <WakeOnLanList/>
        </Masonry>
    </div>
}