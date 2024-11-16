import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const BookViewer = ({ pdfUrl }) => {
    return (
        <Worker workerUrl={`https://unpkg.com/pdfjs-dist/build/pdf.worker.min.js`}>
            <div style={{ height: '750px' }}>
                <Viewer fileUrl={pdfUrl} />
            </div>
        </Worker>
    );
};

export default BookViewer;