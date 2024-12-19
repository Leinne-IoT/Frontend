import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {ToastContainer} from "react-toastify";
import App from './pages/default/App.tsx'
import {DataProvider} from "./feature/provider/DataProvider.tsx";
import {AuthProvider} from "./feature/provider/AuthProvider.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ToastContainer/>
        <DataProvider>
            <AuthProvider>
                <App/>
            </AuthProvider>
        </DataProvider>
    </StrictMode>
)
