import React, {createContext, useReducer, useContext, ReactNode, Dispatch} from 'react';
import {JSONData} from '../../utils/utils.ts';

type ActionData = JSONData | ((state: JSONData) => JSONData);

interface DataContextProps{
    state: JSONData;
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

const dataReducer = (state: JSONData, action: ActionData): JSONData => {
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
