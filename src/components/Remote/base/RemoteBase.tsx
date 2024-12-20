import './RemoteBase.css';
import React, {ReactNode} from "react";

interface Props{
    children?: ReactNode;
}

const RemoteBase: React.FC<Props> = ({children}) => {
    return (
        <div className="remote-con">
            {children}
        </div>
    );
}
export default RemoteBase;