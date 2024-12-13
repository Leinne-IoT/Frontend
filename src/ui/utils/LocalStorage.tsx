import {useState} from "react";

export const useStorageState = <T,>(key: string, defaultValue: T): [T, (value: T) => void] => {
    const isNumber = typeof defaultValue === "number";
    const [storageValue, setStorageValue] = useState<T>(() => {
        let data: any = window.localStorage.getItem(key);
        if(data !== null){
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
