import React, { useEffect, useRef } from 'react';
import ePub from 'epubjs';

const EbookViewer = ({ fileUrl }) => {
    const viewerRef = useRef(null);

    useEffect(() => {
        if (viewerRef.current && fileUrl) {
            const book = ePub(fileUrl);
            const rendition = book.renderTo(viewerRef.current, {
                width: '100%',
                height: '100%',
            });
            rendition.display();
        }
    }, [fileUrl]);

    return <div ref={viewerRef} style={{ width: '100%', height: '750px', border: '1px solid #ddd' }} />;
};

export default EbookViewer;
