import React from 'react';
import './Loading.css';

const Loading = () => {
    return (
        <div className="loading-box">
            <span className="loader"></span>
            <span className="loading-msg">Carregando...</span>
        </div>
    );
};

export default Loading;