import React from 'react';
import './SchoolInfo.css'; // Make sure to add any necessary styling

const SchoolInfo = () => (
    <div className="section">
        <h2>Informação Sobre a Escola</h2>
        <img src="/car.jpg" alt="Car" className="school-image" />
        <p>
            Escola Nova de Gaia foi fundada em 1900 e troca o passo pelo Sir Vaz Fernandes, em Canelas, Vila Nova de Gaia - foi considerada em 2000 a melhor escola de conduçao de sempre.
        </p>
    </div>
);

export default SchoolInfo;
