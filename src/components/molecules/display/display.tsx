import React, {FC} from 'react';
import './display.scss';
import Button from "../../atoms/button/button";
import axios from "axios";

interface DisplayProps {
    temperature: number;
    collectedMeter: number;
    objectId: number;
}
const Display:FC<DisplayProps> = ({temperature, collectedMeter, objectId}) => {
    const handleStopClick = () => {
        updateEnableMotor(false);
    };

    const handleContinueClick = () => {
        updateEnableMotor(true);
    };

    const updateEnableMotor = (value: boolean) => {
        const apiUrl = `https://apifilamentoextruido-production.up.railway.app/api/ExtrudedFilament/${objectId}`;

        const updatedValue = {
            enableMotor: value
        };

        axios.put(apiUrl, updatedValue)
            .then((response) => {
                console.log('Value updated successfully:', response.data);
            })
            .catch((error) => {
                console.error('Error updating value:', error);
            });
    };

    return (
        <div className="display-container">
            <h2 className="temperature-container">Temperatura del extrusor {temperature} ℃</h2>
            <h2 className="meter-container">Filamento recolectado {collectedMeter} m</h2>
            <div className="display-buttons-container">
                <Button text="Detener" variant="stop" size="tall" onClick={handleStopClick}/>
                <Button text="Continuar" variant="continue" size="tall" onClick={handleContinueClick}/>
            </div>
        </div>
    );
};

export default Display;