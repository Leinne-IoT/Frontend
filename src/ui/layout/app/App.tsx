import './App.scss';

import {FC, useEffect} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {AuthStatus, useAuth} from "../../../feature/provider/AuthProvider.tsx";
import {Login} from "../../pages/login/Login.tsx";
import {RouteData} from "../sidebar/Sidebar.tsx";
import {Dashboard} from "../../pages/dashbaord/Dashboard.tsx";
import {Statistics} from "../../pages/statistics/Statistics.tsx";
import {Setting} from "../../pages/setting/Setting.tsx";
import MainLayout from "../body/MainLayout.tsx";

const App: FC = () => {
    const {jwtFetch, authStatus} = useAuth();

    useEffect(() => {
        const urlBase64ToUint8Array = (value: string) => {
            const padding = '='.repeat((4 - value.length % 4) % 4);
            const base64 = (value + padding)
                .replace(/-/g, '+')
                .replace(/_/g, '/');

            const rawData = window.atob(base64);
            const outputArray = new Uint8Array(rawData.length);
            for(let i = 0; i < rawData.length; ++i){
                outputArray[i] = rawData.charCodeAt(i);
            }
            return outputArray;
        }

        const registerWebPush = async (permission: string) => {
            if(permission !== 'granted'){
                return;
            }

            try{
                const registration = await navigator.serviceWorker.register('./js/worker.js');
                let subscription = await registration.pushManager.getSubscription(); // 기존 구독 정보 확인
                if(!subscription){
                    const keyRes = await jwtFetch('/notify/get-key');
                    const key = await keyRes.text();
                    const applicationServerKey = urlBase64ToUint8Array(key);
                    subscription = await registration.pushManager.subscribe({userVisibleOnly: true, applicationServerKey});
                }
                await jwtFetch('/notify/subscribe', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(subscription),
                });
            }catch(e){
                console.error(e);
            }
        }

        const checkAndRegister = async () => {
            if(!window.Notification){
                return;
            }

            Notification.requestPermission()
                .then(permission => registerWebPush(permission))
                .catch(e => alert(e));
        };
        checkAndRegister().then();
        navigator.permissions.query({name: 'notifications'}) // 알림 활성화 감지 (권한 상태 변경 시 다시 확인)
            .then(permissionStatus => permissionStatus.onchange = checkAndRegister);
    }, []);

    if(authStatus <= AuthStatus.VERIFYING){
        return <></>;
    }else if(!authStatus){
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="*" element={<Navigate to="/"/>}/>
                </Routes>
            </BrowserRouter>
        )
    }

    const routeList: RouteData[] = [
        {
            path: "/",
            title: "IoT Webpage",
            name: "대시보드",
            component: <Dashboard/>,
        },
        {
            path: "/statistics",
            title: "Statistics",
            name: "통계",
            component: <Statistics/>,
        },
        {
            path: "/settings",
            title: "Settings",
            name: "설정",
            component: <Setting/>,
        },
    ];
    return (
        <BrowserRouter>
            <Routes>
                {routeList.map((data, index) => (
                    <Route
                        key={index}
                        path={data.path}
                        element={<MainLayout routeList={routeList}>{data.component}</MainLayout>}
                    />
                ))}
                <Route path="*" element={<Navigate to="/"/>}/>
            </Routes>
        </BrowserRouter>
    );
}
export default App;