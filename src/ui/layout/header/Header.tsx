import {FC, useEffect, useRef, useState} from 'react';
import './Header.css';
import {useData} from "../../../feature/provider/DataProvider.tsx";
import {AuthStatus, useAuth} from "../../../feature/provider/AuthProvider.tsx";

interface HeaderProps {
    onToggleSidebar: () => void;
}

const Header: FC<HeaderProps> = ({onToggleSidebar}) => {
    const {state} = useData();
    const {setAuthStatus} = useAuth();
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null); // 드롭다운을 감지하기 위한 Ref

    const handleUserClick = () => {
        setShowDropdown((prev) => !prev);
    };

    const handleLogout = () => {
        fetch(`/logout`).then(res => res.ok && setAuthStatus(AuthStatus.FALSE));
    };

    useEffect(() => {
        // 프로필 드롭박스 외부 클릭 감지(창 닫기)
        const handleClickOutside = (event: MouseEvent) => {
            if(
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ){
                setShowDropdown(false); // 외부 클릭 시 드롭다운 닫기
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="header">
            <div className="header-left">
                <button className="sidebar-toggle-btn" onClick={onToggleSidebar}>
                    ☰
                </button>
                <div className="header-title">IOT WEBPAGE</div>
            </div>
            <div className="profile-container" onClick={handleUserClick}>
                <span className="nickname">{state.profile?.nickname || "사용자"}</span>
                <div className="profile-icon">👤</div>
                {showDropdown && (
                    <div className="user-dropdown" ref={dropdownRef}>
                        <button onClick={() => alert('준비중인 기능입니다.')}>내 정보</button>
                        <div className="separator-line"/>
                        <button onClick={handleLogout}>로그아웃</button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
