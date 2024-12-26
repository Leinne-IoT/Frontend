import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
    Chart,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import {CandlestickController} from "chartjs-chart-financial";

import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {ToastContainer} from "react-toastify";

import App from './ui/layout/app/App.tsx'
import {DataProvider} from "./feature/provider/DataProvider.tsx";
import {AuthProvider} from "./feature/provider/AuthProvider.tsx";

// Chart.js 플러그인 등록
Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    CandlestickController,
);

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
