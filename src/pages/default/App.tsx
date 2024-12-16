import './App.scss';

import {FC, useEffect} from 'react';
import {Login} from '../login/Login.tsx';
import {Dashboard} from '../dashbaord/Dashboard.tsx';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import MainLayout from "../../ui/layout/MainLayout.tsx";
import {AuthStatus, useAuth} from "../../feature/provider/AuthProvider.tsx";

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
    return (
        <MainLayout>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Dashboard/>}/>
                    <Route path="*" element={<Navigate to="/"/>}/>
                </Routes>
            </BrowserRouter>
        </MainLayout>
    );
}
export default App;