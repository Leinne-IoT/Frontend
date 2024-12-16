import React from 'react';
import './Sidebar.css';
import {Link} from "react-router-dom";

export interface RouteData{
    path: string;
    title: string;
    name: string;
    icon?: any;
    component: any;
}

interface SidebarProps{
    isOpen: boolean;
    routeList?: RouteData[];
}

const Sidebar: React.FC<SidebarProps> = ({isOpen, routeList}) => {
    return (
        <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
            {routeList && routeList.map((route, index) => {
                const isActive = location.pathname === route.path;
                if(isActive){
                    return <div key={index} className="active">{route.name}</div>
                }else{
                    return <Link key={index} to={route.path}>{route.name}</Link>;
                }
            })}
        </aside>
    );
};

export default Sidebar;
