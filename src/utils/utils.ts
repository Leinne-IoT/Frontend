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
    const year = date.getFullYear();
    const currentYear = new Date().getFullYear();
    let output = `${year === currentYear ? '' : `${year}/`}${(date.getMonth() + 1 + '').padStart(2, '0')}/${(date.getDate() + '').padStart(2, '0')}`;
    if(includeTime){
        let period = '오전';
        let hour = date.getHours();
        if(hour >= 12){
            period = '오후';
            hour %= 12;
        }
        hour = hour === 0 ? 12 : hour;
        output += ` ${period} ${(hour + '').padStart(2, '0')}:${(date.getMinutes() + '').padStart(2, '0')}`;
    }
    return output;
}

export const validateMacAddress = (mac: string): boolean => {
    const macRegex = /^(?:[0-9A-Fa-f]{2}([-:]))(?:[0-9A-Fa-f]{2}\1){4}[0-9A-Fa-f]{2}$/;
    return macRegex.test(mac);
};