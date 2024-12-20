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
                const subscription = await registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(await (await jwtFetch('/notify/get-key')).text()),
                });
                jwtFetch('/notify/subscribe', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(subscription),
                });
            }catch(e){
                console.error(e);
            }
        }
        if(window.Notification && Notification.permission !== 'granted'){
            Notification.requestPermission()
                .then(permission => registerWebPush(permission))
                .catch(e => alert(e));
        }
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