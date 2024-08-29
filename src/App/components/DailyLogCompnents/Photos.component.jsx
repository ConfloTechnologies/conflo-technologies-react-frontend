import React, { useState } from 'react';

function Photos() {
    const [photoFile, setPhotoFile] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);

    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setPhotoFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPhotoFile(null);
            setPhotoPreview(null);
        }
    };

    return (
        <div className="grid grid-cols-1 gap-4 border border-gray-400 bg-gray-50 rounded-md p-4 my-8 mx-4 shadow-xl">
            <label className="block text-lg font-medium text-gray-700">Upload Photo</label>
            <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {photoPreview && (
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Preview:</label>
                    <img src={photoPreview} alt="Preview" className="mt-1 border rounded-md" style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }} />
                </div>
            )}
        </div>
    );
}

export default Photos;
