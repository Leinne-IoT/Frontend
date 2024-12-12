import {FC} from 'react';
import {Login} from './login/Login.tsx';
import {Dashboard} from './dashbaord/Dashboard.tsx';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import MainLayout from "../ui/layout/MainLayout.tsx";
import {useAuth} from "../feature/provider/AuthProvider.tsx";

const App: FC = () => {
    const {authentication} = useAuth();
    if(authentication == null){
        return <></>;
    }

    if(!authentication){
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
            <Dashboard/>
        </MainLayout>
    );
}
export default App;