import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { MdCloudUpload, MdClose } from 'react-icons/md'; // Import icons from Material Design

function Photos() {
    const [photos, setPhotos] = useState([]);  // Holds an array of photos

    const onDrop = useCallback(acceptedFiles => {
        // Map over each file and convert to readable URL
        const newPhotos = acceptedFiles.map(file => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            return new Promise(resolve => {
                reader.onloadend = () => {
                    resolve({ file, preview: reader.result });
                };
            });
        });

        // Resolve all FileReader promises and update state
        Promise.all(newPhotos).then(newPhotos => {
            setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
        });
    }, []);

    const removePhoto = (index) => {
        setPhotos(prevPhotos => prevPhotos.filter((_, idx) => idx !== index));
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'image/*',
        multiple: true  // Allow multiple files to be dropped
    });

    return (
        <div className="grid grid-cols-1 gap-4 rounded-md p-4 shadow-lg bg-white">
            <div {...getRootProps()} className="flex flex-col items-center justify-center p-10 border-dashed border-4 border-gray-300 rounded-md text-center cursor-pointer hover:border-indigo-500">
                <input {...getInputProps()} capture="user" />
                <MdCloudUpload size={48} className="text-gray-400 mb-2" />
                <p className="text-lg font-medium text-gray-700">
                    {isDragActive ? "Drop the photos here ..." : "Drag 'n' drop photos here, or tap to select photos"}
                </p>
                <p className="text-sm text-gray-500">(Tap to use your camera on mobile)</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {photos.map((photo, index) => (
                    <div key={index} className="relative mt-4 border rounded-lg">
                        <img src={photo.preview} alt="Preview" className="rounded-md" style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }} />
                        <button
                            onClick={() => removePhoto(index)}
                            className="absolute top-0 right-0 text-red-500 rounded-2xl hover:text-red-600"
                            style={{ margin: '8px' }}
                        >
                            <MdClose size={30} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Photos;
