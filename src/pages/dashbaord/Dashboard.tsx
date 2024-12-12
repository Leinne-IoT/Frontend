import React, {useEffect, useState} from 'react';
import Masonry from "react-masonry-css";
import '../../assets/scss/module.scss';
import SwitchBotList from "../../ui/conponent/SwitchBot/SwitchBotList.tsx";
import {useResizeDetector} from "react-resize-detector";
import CheckerList from "../../ui/conponent/Checker/CheckerList.tsx";

export const Dashboard: React.FC = () => {
    const {width, ref} = useResizeDetector();
    const [columnCount, setColumnCount] = useState(4);

    useEffect(() => {
        const size = (width || 0) - 10; // 10px padding
        // 한 항목당 최소크기 430px로 설정
        for(let count = 4; count > 1; --count){
            if(size / 430 >= count){
                setColumnCount(count)
                return;
            }
        }
        setColumnCount(1)
    }, [width]);

    return <div ref={ref}>
        <Masonry
            breakpointCols={columnCount}
            className="iot-container"
            columnClassName="column"
        >
            <SwitchBotList/>
            <CheckerList/>
        </Masonry>
    </div>
}