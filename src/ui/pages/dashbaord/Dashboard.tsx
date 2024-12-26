import './Dashboard.css';

import React, {useEffect, useState} from 'react';
import Masonry from "react-masonry-css";
import {useResizeDetector} from "react-resize-detector";
import SwitchBotList from "../../../components/SwitchBot/SwitchBotList.tsx";
import RemoteList from "../../../components/Remote/RemoteList.tsx";
import CheckerList from "../../../components/Checker/CheckerList.tsx";
import WakeOnLanList from "../../../components/WakeOnLan/WakeOnLanList.tsx";
import TemperatureChart from "../../../components/Sensor/TemperatureChart.tsx";
import HumidityChart from "../../../components/Sensor/HumidityChart.tsx";

const PADDING = 10; // 패딩 값
const MIN_COLUMN_WIDTH = 410; // 최소 항목 크기

export const Dashboard: React.FC = () => {
    const {width, ref} = useResizeDetector();
    const [columnCount, setColumnCount] = useState(0);

    useEffect(() => {
        const adjustedWidth = Math.max((width ?? 0) - PADDING, 0);
        setColumnCount(Math.min(4, Math.max(1, Math.floor(adjustedWidth / MIN_COLUMN_WIDTH))));
    }, [width]);

    return <div ref={ref}>
        {columnCount <= 0 || <Masonry
            className="iot-container"
            columnClassName="column"
            breakpointCols={columnCount}
        >
            <SwitchBotList/>
            <RemoteList/>
            <CheckerList/>
            <WakeOnLanList/>
            <TemperatureChart/>
            <HumidityChart/>
        </Masonry>}
    </div>
}