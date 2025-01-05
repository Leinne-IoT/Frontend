export class DeviceType{
    static readonly CHECKER = 0x01;
    static readonly SWITCH_BOT = 0x02;
    static readonly REMOTE_BOT = 0x03;
}

export interface Device{
    number?: number; // 이력 순서(모달 전용)
    id: string; // 기기 ID
    name: string; // 기기 이름
    model: number; // 기기 모델 ID
    battery?: number; // 잔여 배터리량
    connected: boolean; // 기기 연결 상태
    [key: string]: any;
}

export interface CheckerDevice extends Device{
    open: boolean; // 열림/닫힘 여부
    recordDate?: Date; // 가장 최근 갱신 날짜
}

export interface SwitchBotDevice extends Device{
    switch: {[channel: number]: boolean}; // 채널별 on/off 상태
    switchName?: {[channel: number]: string}; // 채널별 스위치 이름
}

export interface RemoteBotDevice extends Device{
    humidity: number;
    temperature: number;
}

export interface SwitchBotHistoryRow extends Device{
    channelName?: string;
    state: boolean;
    recordDate: Date;
}

export interface WakeOnLanPC{
    id: number;
    name: string;
    address: string;
    connected: boolean;
}