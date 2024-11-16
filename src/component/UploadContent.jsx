const UploadContent = ({ onSuccess }) => {
    const [file, setFile] = useState(null);
    const [type, setType] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleTypeChange = (event) => {
        setType(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file || !type) {
            alert('Selecciona un archivo y tipo.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', type);

        try {
            const response = await axios.post('http://localhost:8080/api/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            const uploadedFileUrl = response.data.fileUrl; // La URL del archivo desde el backend
            onSuccess(uploadedFileUrl, type); // Notifica al componente padre
        } catch (error) {
            console.error('Error al subir archivo:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} accept=".pdf,.epub,.mp3" />
            <select value={type} onChange={handleTypeChange}>
                <option value="">Selecciona el tipo</option>
                <option value="ebook">eBook (ePub)</option>
                <option value="pdf">PDF</option>
                <option value="audiobook">Audiolibro (MP3)</option>
            </select>
            <button type="submit">Subir</button>
        </form>
    );
};

export default UploadContent;
