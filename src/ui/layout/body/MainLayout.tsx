import React, {FC, useState, useEffect, ReactNode} from 'react';

import './MainLayout.css';

import classNames from "classnames";
import Sidebar, {RouteData} from "../sidebar/Sidebar.tsx";
import Header from "../header/Header.tsx";

interface Props {
    children: ReactNode;
    routeList?: RouteData[];
}

const MIN_WIDTH = 1100;

const MainLayout: FC<Props> = ({routeList, children}) => {
    const [sidebar, setSidebar] = useState(window.innerWidth >= MIN_WIDTH);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            const before = windowWidth >= MIN_WIDTH; // 컴포넌트 최소 400px x 2, 사이드바 200px, 스크롤바 포함 대략 1100px
            const current = window.innerWidth >= MIN_WIDTH;
            if(!before && current){ // 작았지만 확장이 가능해진 경우
                setSidebar(true);
            }else if(before && !current){
                setSidebar(false);
            }
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [windowWidth]);

    const canExpanded = windowWidth >= MIN_WIDTH;
    return (
        <div className="app-container">
            <Sidebar isOpen={sidebar} routeList={routeList}/>
            <div className={classNames(`main-container`, {'expanded': canExpanded, 'slider': !canExpanded && sidebar})}>
                <Header expanded={canExpanded} onToggleSidebar={() => setSidebar(!sidebar)}/>
                <div className="main-content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
