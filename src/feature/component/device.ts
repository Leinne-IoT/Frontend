interface Device{
    id: string; // 기기 ID
    name: string; // 기기 이름
}

export interface CheckerDevice extends Device{
    number?: number; // 이력 순서(모달 전용)
    open: boolean; // 열림/닫힘 여부
    battery: number; // 잔여 배터리량
    recordDate?: Date; // 가장 최근 날짜
}

export interface SwitchBotDevice extends Device{
    connected: boolean; // 기기 연결 상태
    switch: {[channel: number]: boolean}; // 채널별 on/off 상태
    switchName?: {[channel: number]: string}; // 채널별 스위치 이름
}