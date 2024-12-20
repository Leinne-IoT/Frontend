import React, {FC, useState, useEffect, ReactNode} from 'react';

import './MainLayout.css';

import Header from "../header/Header.tsx";
import Sidebar, {RouteData} from "../sidebar/Sidebar.tsx";
import Header from "../header/Header.tsx";

interface Props {
    children: ReactNode;
    routeList?: RouteData[];
}

const MainLayout: FC<Props> = ({routeList, children}) => {
    const [sidebar, setSidebar] = useState(false/*window.innerWidth >= 1100*/);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            /*const isSmall = windowWidth < 1100;
            if(isSmall && window.innerWidth >= 1100){
                setSidebar(true);
            }else if(!isSmall && window.innerWidth < 1100){
                setSidebar(false);
            }*/
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [windowWidth]);

    return (
        <div className="app-container">
            <Sidebar isOpen={sidebar} routeList={routeList}/>
            <div className={`main-container ${!sidebar ? "" : "expanded"}`}>
                <Header onToggleSidebar={() => setSidebar(!sidebar)}/>
                <div className="main-content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
