import './Setting.css';

import React, {useEffect, useState} from 'react';
import {useResizeDetector} from "react-resize-detector";

export const Setting: React.FC = () => {
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
        <h1>준비중인 기능입니다.</h1>
        {/*<Masonry
            className="iot-container"
            columnClassName="column"
            breakpointCols={columnCount}
        >
        </Masonry>*/}
    </div>
}