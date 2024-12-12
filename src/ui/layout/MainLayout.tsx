import {FC, useState, useEffect, ReactNode} from 'react';

import './MainLayout.css';

import Header from "../header/Header.tsx";
import Sidebar from "../sidebar/Sidebar.tsx";

interface Props {
    children: ReactNode;
}

const MainLayout: FC<Props> = ({children}) => {
    const [sidebar, setSidebar] = useState(false/*window.innerWidth >= 1100*/);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        /*const handleResize = () => {
            const isSmall = windowWidth < 1100;
            if(isSmall && window.innerWidth >= 1100){
                setSidebar(true);
            }else if(!isSmall && window.innerWidth < 1100){
                setSidebar(false);
            }
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);*/
    }, [windowWidth]);

    const toggleSidebar = () => {
        setSidebar(!sidebar)
    }
    return (
        <div className="app-container">
            <Sidebar isOpen={sidebar} toggleSidebar={toggleSidebar} />
            <div className={`main-container ${!sidebar ? "" : "expanded"}`}>
                <Header onToggleSidebar={toggleSidebar}/>
                <div className="main-content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
