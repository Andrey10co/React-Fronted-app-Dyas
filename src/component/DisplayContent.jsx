// Juan Miguel Dimaté 0000282752 
// Andrey Esteban Conejo 0000281295 
// Carlos Bello 0000272648 
const DisplayContent = ({ fileUrl, type }) => {
    if (!fileUrl || !type) return <p>Selecciona un archivo para visualizarlo.</p>;

    const openInNewWindow = (content) => {
        const newWindow = window.open("", "_blank");
        newWindow.document.write(content);
        newWindow.document.close();
    };

    const handleContentDisplay = () => {
        switch (type) {
            
            case 'pdf':
                
                openInNewWindow(`
                    <html>
                        <body style="margin:0">
                            <iframe 
                                src="http://localhost:8080/uploads/${fileUrl}" 
                                style="width:100%; height:100%; border:none;" 
                                frameborder="0"></iframe>
                        </body>
                    </html>
                `);
                break;
            case 'ebook':
                openInNewWindow(`
                    <html>
                        <body style="margin:0; text-align:center;">
                            <h3>Visualizando eBook</h3>
                            <iframe 
                                src="http://localhost:8080/uploads/${fileUrl}" 
                                style="width:80%; height:80%; border:none;" 
                                frameborder="0"></iframe>
                        </body>
                    </html>
                `);
                break;
            case 'audiobook':
                openInNewWindow(`
                    <html>
                        <body style="margin:0; text-align:center;">
                            <h3>Reproduciendo Audiobook</h3>
                            <audio controls autoplay style="margin-top:20px;">
                                <source src="http://localhost:8080/uploads/${fileUrl}" type="audio/mpeg" />
                                Tu navegador no soporta la reproducción de audio.
                            </audio>
                        </body>
                    </html>
                `);
                break;
            default:
                alert("Tipo de archivo no soportado.");
        }
    };

    return (
        <button onClick={handleContentDisplay}>
            Ver contenido en nueva ventana
        </button>
    );
};

export default DisplayContent;