import BookViewer from "./BookViewer";
import EbookViewer from "./EbookViewer";
import AudioPlayer from "./AudioPlayer";


const DisplayContent = ({ fileUrl, type }) => {
    if (!fileUrl || !type) return <p>Selecciona un archivo para visualizarlo.</p>;

    switch (type) {
        case 'pdf':
            return <BookViewer  pdfUrl={fileUrl} />;
        case 'ebook':
            return <EbookViewer fileUrl={fileUrl} />;
        case 'audiobook':
            return <AudioPlayer audioUrl={fileUrl} />;
        default:
            return <p>Tipo de archivo no soportado.</p>;
    }
};

export default DisplayContent;