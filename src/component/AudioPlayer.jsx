const AudioPlayer = ({ audioUrl }) => {
    return (
        <div>
            <audio controls style={{ width: '100%' }}>
                <source src={audioUrl} type="audio/mpeg" />
                Tu navegador no soporta el reproductor de audio.
            </audio>
        </div>
    );
};

export default AudioPlayer;
