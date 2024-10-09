import React, { useState, useRef } from 'react';
import { MdPhotoCamera, MdClose } from 'react-icons/md';

interface Photo {
    src: string;
    file: File;
}

interface PhotosProps {
    photos: Photo[];
    setPhotos: React.Dispatch<React.SetStateAction<Photo[]>>;
}

const FileUpload: React.FC<PhotosProps> = ({ photos, setPhotos }) => {
    const [dragOver, setDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(false);
        if (e.dataTransfer.files) {
            handleFileChange(e.dataTransfer.files);
        }
    };

    const handleFileChange = (files: FileList) => {
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
                if (e.target && e.target.result) {
                    setPhotos(prevPhotos => [...prevPhotos, { src: e.target?.result as string, file }]);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    const handleAreaClick = () => {
        fileInputRef.current?.click();
    };

    const removePhoto = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
        e.stopPropagation();
        e.preventDefault();
        setPhotos(prev => prev.filter((_, idx) => idx !== index));
    };

    return (
        <div className="grid grid-cols-1 gap-6 pt-6">
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleAreaClick}
                className={`flex flex-col items-center justify-center px-10 py-16 border-4 rounded-lg cursor-pointer transition-colors 
                            ${dragOver ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 bg-gray-50 hover:bg-blue-100'}`}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={(e) => e.target.files && handleFileChange(e.target.files)}
                    className="hidden"
                />
                <MdPhotoCamera size={60} className="text-blue-400 mb-4" />
                <p className="text-xl font-semibold text-gray-700">
                    {dragOver ? "Release to upload" : "Drag 'n' drop or click to upload"}
                </p>
                <p className="text-sm text-gray-500">You can also use your camera on mobile.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {photos.map((photo, index) => (
                    <div key={index} className="relative group">
                        <div className="w-full h-48 bg-gray-200 rounded-lg overflow-hidden shadow-sm">
                            <img
                                src={photo.src}
                                alt="Preview"
                                className="object-cover h-full w-full transition-transform duration-200 group-hover:scale-105"
                            />
                        </div>
                        <button
                            onClick={(e) => removePhoto(e, index)}
                            className="absolute top-2 right-2 bg-white rounded-full p-1 text-red-500 hover:text-red-600 transition-colors shadow-lg"
                        >
                            <MdClose size={24} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FileUpload;
