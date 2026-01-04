import { useState } from 'react';
import { FiUpload, FiImage, FiX, FiCheck } from 'react-icons/fi';

const IMGBB_API_KEY = '1b5d848d79aaff23083c6e0c6bb33399';

const ImageUpload = ({ onImageUpload, currentImage = '', className = '' }) => {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(currentImage);
    const [error, setError] = useState('');

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('Please select an image file');
            return;
        }

        // Validate file size (max 32MB)
        if (file.size > 32 * 1024 * 1024) {
            setError('Image must be less than 32MB');
            return;
        }

        setError('');
        setUploading(true);

        try {
            const formData = new FormData();
            formData.append('image', file);

            const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                const imageUrl = data.data.display_url;
                setPreview(imageUrl);
                onImageUpload(imageUrl);
            } else {
                setError('Failed to upload image. Please try again.');
            }
        } catch (err) {
            console.error('Upload error:', err);
            setError('Failed to upload image. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const clearImage = () => {
        setPreview('');
        onImageUpload('');
    };

    return (
        <div className={`form-control ${className}`}>
            <div className="relative">
                {preview ? (
                    <div className="relative rounded-xl overflow-hidden border-2 border-primary/30 bg-base-200">
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <label className="btn btn-sm btn-primary gap-2 cursor-pointer">
                                <FiUpload className="w-4 h-4" />
                                Change
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                            </label>
                            <button
                                type="button"
                                onClick={clearImage}
                                className="btn btn-sm btn-error gap-2"
                            >
                                <FiX className="w-4 h-4" />
                                Remove
                            </button>
                        </div>
                        <div className="absolute top-2 right-2 badge badge-success gap-1">
                            <FiCheck className="w-3 h-3" />
                            Uploaded
                        </div>
                    </div>
                ) : (
                    <label className={`
                        flex flex-col items-center justify-center w-full h-48 
                        border-2 border-dashed border-base-300 rounded-xl 
                        hover:border-primary/50 hover:bg-base-200/50 
                        transition-all cursor-pointer
                        ${uploading ? 'opacity-50 pointer-events-none' : ''}
                    `}>
                        <div className="flex flex-col items-center justify-center py-6">
                            {uploading ? (
                                <>
                                    <span className="loading loading-spinner loading-lg text-primary"></span>
                                    <p className="mt-3 text-sm text-base-content/70">Uploading...</p>
                                </>
                            ) : (
                                <>
                                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                                        <FiImage className="w-7 h-7 text-primary" />
                                    </div>
                                    <p className="text-sm font-medium text-base-content">
                                        Click to upload image
                                    </p>
                                    <p className="text-xs text-base-content/60 mt-1">
                                        PNG, JPG, GIF up to 32MB
                                    </p>
                                </>
                            )}
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            disabled={uploading}
                        />
                    </label>
                )}
            </div>
            
            {error && (
                <p className="text-error text-sm mt-2 flex items-center gap-1">
                    <FiX className="w-4 h-4" />
                    {error}
                </p>
            )}
        </div>
    );
};

export default ImageUpload;
