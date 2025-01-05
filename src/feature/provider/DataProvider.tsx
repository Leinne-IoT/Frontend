import React, {createContext, useReducer, useContext, ReactNode, Dispatch} from 'react';
import {WakeOnLanPC, Device} from "../component/device.ts";
import {isArray, isObject} from "../../utils/utils.ts";

export interface AppState{
    deviceList: Device[];
    wakeOnLanPcList?: WakeOnLanPC[];
    [key: string]: any;
}

type ActionData = Record<string, any> | ((state: AppState) => Record<string, any>);
interface DataContextProps{
    state: AppState;
    dispatch: Dispatch<ActionData>;
}

export const useData = (): DataContextProps => {
    const context = useContext(DataContext);
    if(!context){
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};

const DataContext = createContext<DataContextProps | undefined>(undefined);

const dataReducer = (state: AppState, action: ActionData): AppState => {
    const newValue = typeof action === 'function' ? action(state) : action;
    if(
        isObject(newValue) &&
        (newValue.deviceList == null || isArray(newValue.deviceList)) &&
        (newValue.wakeOnLanPcList == null || isArray(newValue.wakeOnLanPcList))
    ){
        return {...state, ...newValue};
    }
    return state;
}

interface DataProviderProps {
    children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({children}) => {
    const [state, dispatch] = useReducer(dataReducer, {deviceList: []});
    return (
        <DataContext.Provider value={{state, dispatch}}>
            {children}
        </DataContext.Provider>
    );
}
