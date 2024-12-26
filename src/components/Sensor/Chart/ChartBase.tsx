import './ChartBase.css';
import Container from "../../base/Container.tsx";
import ContainerHeader from "../../base/ContainerHeader.tsx";
import {ButtonGroup, ToggleButton} from "react-bootstrap";
import React, {ReactNode} from "react";
import {useStorageState} from "../../../ui/utils/LocalStorage.tsx";

interface Props{
    title: string;
    saveKey: string;
    chartList: ReactNode[];
}

const ChartBase: React.FC<Props> = ({title, saveKey, chartList}) => {
    const [view, setView] = useStorageState(saveKey, 0);
    return (
        <Container>
            <ContainerHeader title={title}>
                <ButtonGroup className="ms-auto">
                    <ToggleButton
                        id="temp_hour"
                        value="0"
                        size="sm"
                        type="radio"
                        onClick={() => setView(0)}
                        variant={view === 0 ? "primary" : "outline-primary"}
                    >
                        한시간
                    </ToggleButton>
                    <ToggleButton
                        id="temp_day"
                        value="1"
                        size="sm"
                        type="radio"
                        onClick={() => setView(1)}
                        variant={view === 1 ? "primary" : "outline-primary"}
                    >
                        일간
                    </ToggleButton>
                    <ToggleButton
                        id="temp_day"
                        value="1"
                        size="sm"
                        type="radio"
                        onClick={() => setView(2)}
                        variant={view === 2 ? "primary" : "outline-primary"}
                    >
                        주간
                    </ToggleButton>
                </ButtonGroup>
            </ContainerHeader>

            <div className="w-100" style={{padding: '.75em', height: '250px'}}>
                {chartList[view]}
            </div>
        </Container>
    );
}
export default ChartBase;