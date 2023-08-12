import React, {FC, useEffect, useState} from 'react';
import './slider.scss';
import axios from "axios";

interface SliderProps {
    min: number;
    max: number;
    variant: 'speed' | 'temperature';
    objectId: number;
}
const Slider:FC<SliderProps> = ({min, max, variant, objectId}) => {
    const localStorageKey = `${variant}-${objectId}`;

    const [sliderValue, setSliderValue] = useState<number>(
        parseInt(localStorage.getItem(localStorageKey) || String(min) )
    );

    useEffect(() => {
        localStorage.setItem(localStorageKey, sliderValue.toString());
    }, [sliderValue, localStorageKey]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(event.target.value, 10);
        setSliderValue(newValue);
    }

    const handleSliderMouseUp = () => {
        updateSpeed(sliderValue);
    };

    const handleSliderTouchEnd = () => {
        updateSpeed(sliderValue);
    };

    const updateSpeed = (newSpeed: number) => {
        const apiUrl = `https://apifilamentoextruido-production.up.railway.app/api/ExtrudedFilament/${objectId}`;

        const updatedValue = {
            [variant === 'speed' ? 'speedMotor' : 'setPointTemperature']: newSpeed
        };

        axios.put(apiUrl, updatedValue)
            .then(()=> {
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getSliderUnit = () => {
        if (variant === 'speed')
        {
            return '%';
        }
        else if (variant === 'temperature')
        {
            return '℃';
        }
        return '';
    };

    return (
        <div className={`slider-container ${variant === 'speed' ? 'speed-variant' : 'temperature-variant'}`}>
            <div className="slider-track">
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={sliderValue}
                    onChange={handleChange}
                    onMouseUp={handleSliderMouseUp}
                    onTouchEnd={handleSliderTouchEnd}
                    className="slider-input"
                />
            </div>
            <p className="slider-value">{sliderValue}{getSliderUnit()}</p>
        </div>
    );
};

export default Slider;