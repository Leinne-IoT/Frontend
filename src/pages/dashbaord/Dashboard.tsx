import './Dashboard.css';

import React, {useEffect, useState} from 'react';
import Masonry from "react-masonry-css";
import SwitchBotList from "../../ui/conponent/SwitchBot/SwitchBotList.tsx";
import {useResizeDetector} from "react-resize-detector";
import CheckerList from "../../ui/conponent/Checker/CheckerList.tsx";
import WakeOnLanList from "../../ui/conponent/WakeOnLan/WakeOnLanList.tsx";
import RemoteList from "../../ui/conponent/Remote/RemoteList.tsx";

export const Dashboard: React.FC = () => {
    const {width, ref} = useResizeDetector();
    const [columnCount, setColumnCount] = useState(4);

    useEffect(() => {
        const size = (width || 0) - 10; // 10px padding
        // 한 항목당 최소크기 420px로 설정
        for(let count = 4; count > 1; --count){
            if(size / 420 >= count){
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