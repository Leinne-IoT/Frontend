import React, {ReactNode} from "react";

interface Props{
    style?: any;
    children: ReactNode;
}

const Container: React.FC<Props> = ({children, style}) => {
    return (
        <div className="item-container" style={style}>
            {children}
        </div>
    );
}
export default Container;