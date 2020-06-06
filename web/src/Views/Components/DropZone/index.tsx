import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Container } from './style';
import { FiUpload } from 'react-icons/fi';

interface Props {
  onFileUploaded: (file: File) => void
}

const DropZone: React.FC<Props> = ({ onFileUploaded }) => {
  const [selectedFileURL, setSelectedFileURL] = useState('');

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];

    const fileUrl = URL.createObjectURL(file);
    setSelectedFileURL(fileUrl);
    onFileUploaded(file)
  }, [onFileUploaded]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  return (
    <Container {...getRootProps()}>
      <input {...getInputProps()} accept="image/*" required />
      {selectedFileURL ? (
        <img src={selectedFileURL} alt="Point thumbnail" />
      ) : isDragActive ? (
        <p>Agora é só soltar!</p>
      ) : (
        <p>
          <FiUpload /> Imagem do estabelecimento
        </p>
      )}
    </Container>
  );
};
export default DropZone;
