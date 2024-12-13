import './Container.scss';
import React, {ReactNode} from "react";

interface Props{
    children?: ReactNode;
}

const Container: React.FC<Props> = ({children}) => {
    return (
        <div className="item-container">
            {children}
        </div>
    );
}
export default Container;