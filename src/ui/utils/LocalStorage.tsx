import {useState} from "react";

export const useStorageState = <T,>(key: string, defaultValue: T): [T, (value: T) => void] => {
    const isNumber = typeof defaultValue === "number";
    const [storageValue, setStorageValue] = useState<T>(() => {
        let data: any = window.localStorage.getItem(key);
        if(data != null){
            data = isNumber ? +data : data;
            return data as T;
        }
        return defaultValue;
    });

    const setValue = (value: T) => {
        const newValue: any = isNumber ? +value : value;
        setStorageValue(newValue);
        window.localStorage.setItem(key, String(newValue));
    };
    return [storageValue, setValue];
};

export const useStorageJsonState = <T,>(key: string, defaultValue: T): [T, (value: T) => void] => {
    const [storageValue, setStorageValue] = useState<T>(() => {
        try{
            const data: any = window.localStorage.getItem(key);
            if(data){
                return JSON.parse(data)
            }
        }catch{
            window.localStorage.setItem(key, JSON.stringify(defaultValue));
        }
        return defaultValue;
    });

    const setValue = (value: T) => {
        setStorageValue(value);
        window.localStorage.setItem(key, JSON.stringify(value));
    };
    return [storageValue, setValue];
};