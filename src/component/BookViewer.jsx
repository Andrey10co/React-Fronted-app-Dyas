import { useEffect, useState } from 'react';
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const BookViewer = ({ pdfUrl }) => {
    const [fileUrl, setFileUrl] = useState(null);

    useEffect(() => {
        const fetchFile = async () => {
            try {
                // Construimos la URL completa para acceder al archivo en el backend
                const fullUrl = `http://localhost:8080/uploads/${pdfUrl}`;

                const response = await fetch(fullUrl, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/pdf'  // Asegúrate de que el servidor sepa que se espera un PDF
                    }
                });

                if (!response.ok) {
                    throw new Error('Error al obtener el archivo PDF');
                }

                const blob = await response.blob();
                
                // Verifica que el archivo descargado sea un PDF válido
                if (blob.type !== 'application/pdf') {
                    throw new Error('El archivo descargado no es un PDF válido');
                }

                const url = URL.createObjectURL(blob);
                setFileUrl(url);
            } catch (error) {
                console.error('Error al obtener el archivo:', error);
            }
        };

        fetchFile();
    }, [pdfUrl]);

    if (!fileUrl) return <p>Cargando...</p>;

    return (
        <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js">
            <div style={{ height: '750px' }}>
                <Viewer 
                    fileUrl={fileUrl}
                    onError={(error) => {
                        console.error('Error al cargar el PDF:', error);
                    }}
                />
            </div>
        </Worker>
    );
};

export default BookViewer;
