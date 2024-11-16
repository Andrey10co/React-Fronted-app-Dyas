import { useEffect, useState } from 'react';

const AudioPlayer = ({ audioUrl }) => {
    const [audioSrc, setAudioSrc] = useState(null);

    useEffect(() => {
        const fetchAudio = async () => {
            try {
                // Construimos la URL completa para acceder al archivo de audio en el backend
                const fullUrl = `http://localhost:8080/uploads/${audioUrl}`;

                const response = await fetch(fullUrl, {
                    method: 'GET',
                    headers: {
                        'Accept': 'audio/mpeg'  // Asegúrate de que el servidor sepa que se espera un archivo de audio
                    }
                });

                if (!response.ok) {
                    throw new Error('Error al obtener el archivo de audio');
                }

                const blob = await response.blob();

                // Verifica que el archivo descargado sea un audio válido
                if (blob.type !== 'audio/mpeg') {
                    throw new Error('El archivo descargado no es un audio válido');
                }

                const url = URL.createObjectURL(blob);
                setAudioSrc(url);
            } catch (error) {
                console.error('Error al obtener el archivo de audio:', error);
            }
        };

        fetchAudio();
    }, [audioUrl]);

    if (!audioSrc) return <p>Cargando audio...</p>;

    return (
        <div>
            <audio controls style={{ width: '100%' }}>
                <source src={audioSrc} type="audio/mpeg" />
                Tu navegador no soporta el reproductor de audio.
            </audio>
        </div>
    );
};

export default AudioPlayer;

