import React, {useEffect, useState} from 'react';
import './dashboard.scss';
import Slider from "../../atoms/slider/slider";
import Display from "../../molecules/display/display";
import Image from "../../atoms/image/image";
import logo from '../../../assets/images/logo.jpg';
import axios from "axios";

const Dashboard = () => {
    const objectId = 1;
    const [temperature, setTemperature] = useState(0);
    const [collectedMeter, setCollectedMeter] = useState(0);

    useEffect(() => {
        axios.get(`https://apifilamentoextruido-production.up.railway.app/api/ExtrudedFilament/${objectId}`)
            .then(response => {
                const apiData = response.data;
                setTemperature(apiData.extruderTemperature);
                setCollectedMeter(apiData.collectMeters);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Dashboard de Control</h1>
            <h2 className="title-designer">Elaborado por Bryan Montoya</h2>
            <Image urlImage={logo}/>
            <div className="sliders-image-container">
                <div className="slider-content">
                    <p className="slider-title speed">Velocidad</p>
                    <Slider min={0} max={100} variant="speed" objectId={1}/>
                </div>
                <div className="slider-content">
                    <p className="slider-title temperature">Temperatura</p>
                    <Slider min={25} max={450} variant="temperature" objectId={1}/>
                </div>
            </div>
            <div className="display-container">
                <Display temperature={temperature} collectedMeter={collectedMeter} objectId={1}/>
            </div>
        </div>
    );
};

export default Dashboard;