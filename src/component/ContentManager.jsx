import React from 'react';
import DisplayContent from './DisplayContent'; // Lógica para mostrar el tipo de contenido

const ContentManager = ({ fileUrl, type }) => {
    return (
        <div>
            <DisplayContent fileUrl={fileUrl} type={type} />
        </div>
    );
};

export default ContentManager;
