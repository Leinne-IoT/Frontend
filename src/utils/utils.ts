export interface JSONData{
    [key: string | number]: any;
}

export const isObject = (data: any) => {
    return !!data && typeof data === 'object';
}

export const isArray = (data: any) => {
    return isObject(data) && data.constructor === Array;
}

export const isNumeric = (data: any) => {
    if(typeof data !== 'number'){
        data = parseInt(data);
    }
    return !isNaN(data) && isFinite(data);
}

export const lshift = (value: number, bit: number) => {
    return value * Math.pow(2, bit);
}

export const sleep = (millis: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, millis));
}

export const tryParseJson = (data: any) => {
    let json;
    if(data && typeof data === 'string'){
        try{
            json = JSON.parse(data);
        }catch{
            json = {}
        }
    }
    return json
}

export const dateToString = (date: Date | number | string, includeTime: boolean) => {
    date = typeof date !== 'object' ? new Date(date || 0) : date;
    let output = `${date.getFullYear()}-${(date.getMonth() + 1 + '').padStart(2, '0')}-${(date.getDate() + '').padStart(2, '0')}`;
    if(includeTime){
        output += ` ${(date.getHours() + '').padStart(2, '0')}:${(date.getMinutes() + '').padStart(2, '0')}:${(date.getSeconds() + '').padStart(2, '0')}`;
    }
    return output;
}