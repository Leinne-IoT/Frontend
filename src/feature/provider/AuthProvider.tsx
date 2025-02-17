import {FC, createContext, useRef, useState, useContext, useEffect, ReactNode, Dispatch, SetStateAction} from 'react';
import {isArray, isObject, tryParseJson} from '../../utils/utils.ts';
import {useData} from './DataProvider.tsx';
import {Device} from "../component/device.ts";

export enum AuthStatus{
    NONE = -2,      // 미설정
    VERIFYING = -1, // 확인중
    FALSE = 0,     // 로그인 안됨
    TRUE = 1,      // 로그인됨
}

interface AuthContextProps{
    authStatus: AuthStatus;
    setAuthStatus: Dispatch<SetStateAction<AuthStatus>>;
    jwtFetch: (url: string, options?: RequestInit) => Promise<Response>;
    socket: WebSocket | null;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps{
    children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({children}) => {
    const {dispatch} = useData();
    const socketRef = useRef<WebSocket | null>(null);
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [authStatus, setAuthStatus] = useState<AuthStatus>(AuthStatus.NONE);

    /*const refreshToken = async (): Promise<boolean> => {
        const res = await fetch('/token/refresh', {
            method: 'POST',
            credentials: 'include'
        });
        return res.ok;
    }*/

    const jwtFetch = async (url: string, options: RequestInit = {}): Promise<Response> => {
        const response = await fetch(url, {
            ...options,
            credentials: 'include',
            headers: options.headers || {}
        });
        if(response.status === 401){
            setAuthStatus(AuthStatus.FALSE);
        }
        return response;
    };

    useEffect(() => {
        if(authStatus == AuthStatus.NONE){
            setAuthStatus(AuthStatus.VERIFYING);
            jwtFetch(`/token/verify`, {method: 'POST'})
                .then(async (res) => {
                    setAuthStatus(res.ok ? AuthStatus.TRUE : AuthStatus.FALSE)
                    const user = await res.json();
                    dispatch({profile: user})
                })
                .catch(() => setAuthStatus(AuthStatus.FALSE));
        }
    }, [])

    useEffect(() => {
        let reconnectTimeout: any = null;
        const connectWebSocket = () => {
            if(!authStatus || (socketRef.current?.readyState || 3) <= WebSocket.OPEN){
                return;
            }
            const protocol = window.location.protocol.includes('https') ? 'wss://' : 'ws://';
            const webSocket = new WebSocket(`${protocol}${window.location.host}/ws`);
            webSocket.addEventListener('open', () => webSocket.send(JSON.stringify({method: 'JOIN_CLIENT'})));
            webSocket.addEventListener('message', (event) => {
                const data = tryParseJson(event.data);
                dispatch(before => {
                    const seen = new Set<string>();
                    const deviceList = (isArray(data.deviceList) ? data.deviceList : [...before.deviceList]) as Device[];
                    if(isObject(data.device)){
                        deviceList.unshift(data.device);
                    }
                    return {deviceList: deviceList.filter(device => !seen.has(device.id) && !!seen.add(device.id))};
                });
            });
            webSocket.addEventListener('close', event => {
                if(event.code === 1003){
                    setAuthStatus(AuthStatus.FALSE);
                }else if(authStatus){
                    reconnectTimeout = setTimeout(connectWebSocket, 1000);
                }
            });

            setSocket(webSocket);
            socketRef.current = webSocket;
        };
        if(authStatus){
            connectWebSocket();
        }else if(socketRef.current){
            setSocket(null);
            socketRef.current.close();
        }
        return () => {
            if(reconnectTimeout){
                clearTimeout(reconnectTimeout);
            }
            if(socketRef.current){
                setSocket(null);
                socketRef.current.close();
            }
        };
    }, [authStatus, dispatch]);

    return (
        <AuthContext.Provider value={{authStatus, setAuthStatus, jwtFetch, socket: socket}}>
            {children}
        </AuthContext.Provider>
    );
};
