import React, {FC, useState, useEffect, ReactNode} from 'react';

import './MainLayout.css';

import classNames from "classnames";
import Sidebar, {RouteData} from "../sidebar/Sidebar.tsx";
import Header from "../header/Header.tsx";
import {useResizeDetector} from "react-resize-detector";

interface Props {
    children: ReactNode;
    routeList?: RouteData[];
}

const PADDING = 10; // 패딩 값
const SIDEBAR_WIDTH = 240; // 추가 여유 공간 기준
const COMPONENT_WIDTH = 410; // 400px + 10px padding

const MainLayout: FC<Props> = ({routeList, children}) => {
    const {width, ref} = useResizeDetector();
    const [sidebar, setSidebar] = useState(false);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        const adjustedWidth = Math.max((width ?? 0) - PADDING, 0);
        const count = Math.floor(adjustedWidth / COMPONENT_WIDTH);
        const canExpanded = count > 3 || adjustedWidth - (count * COMPONENT_WIDTH) >= SIDEBAR_WIDTH;
        setSidebar(canExpanded);
        setExpanded(canExpanded);
    }, [width]);

    return (
        <div className="app-container" ref={ref}>
            <Sidebar isOpen={sidebar} routeList={routeList}/>
            <div className={classNames(`main-container`, {'expanded': expanded, 'slider': !expanded && sidebar})}>
                <Header expanded={expanded} onToggleSidebar={() => setSidebar(!sidebar)}/>
                <div className="main-content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
