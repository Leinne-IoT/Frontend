import './Container.scss';
import React, {ReactNode} from "react";

interface Props{
    title: string;
    children?: ReactNode;
}

const ContainerHeader: React.FC<Props> = ({children, title}) => {
    return (
        <div className="item-header">
            <span>{title}</span>
            {children}
        </div>
    );
}
export default ContainerHeader;