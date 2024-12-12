import React, {createContext, useReducer, useContext, ReactNode, Dispatch} from 'react';
import {JSONData} from '../../utils/utils.ts';

interface DataAction{
    key: string;
    value: any;
}

interface DataContextProps{
    state: JSONData;
    dispatch: Dispatch<DataAction | ((state: JSONData) => DataAction)>;
}

export const useData = (): DataContextProps => {
    const context = useContext(DataContext);
    if(!context){
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};

const DataContext = createContext<DataContextProps | undefined>(undefined);

const dataReducer = (state: JSONData, action: any): JSONData => {
    action = typeof action === 'function' ? action(state) : action;
    return {
        ...state,
        [action.key]: action.value
    };
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
