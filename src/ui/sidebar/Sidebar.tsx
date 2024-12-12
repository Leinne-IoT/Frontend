import React from 'react';
import './Sidebar.css';

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({isOpen}) => {
    return (
        <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
            <div className="sidebar-button">메뉴 1</div>
            <div className="sidebar-button">메뉴 2</div>
            <div className="sidebar-button">메뉴 3</div>
        </aside>
    );
};

export default Sidebar;
