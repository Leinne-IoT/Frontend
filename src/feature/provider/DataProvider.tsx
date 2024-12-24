import React, {createContext, useReducer, useContext, ReactNode, Dispatch} from 'react';
import {SwitchBotDevice, CheckerDevice} from "../component/device.ts";

export interface AppState{
    humidity?: number;
    temperature?: number;
    checkerList?: CheckerDevice[];
    switchBotList?: SwitchBotDevice[];
    [key: string]: any;
}

type ActionData = AppState | ((state: AppState) => AppState);
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
    if(typeof action === 'function'){
        const newValue = action(state);
        return {...state, ...newValue};
    }
    return {...state, ...action};
}

interface DataProviderProps {
    children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({children}) => {
    const [state, dispatch] = useReducer(dataReducer, {});
    return (
        <DataContext.Provider value={{state, dispatch}}>
            {children}
        </DataContext.Provider>
    );
}
