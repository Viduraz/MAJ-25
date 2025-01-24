import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL, listAll, deleteObject } from 'firebase/storage';
import firebaseApp from '../../../Firebase';
import { toast } from 'react-hot-toast';

export const AGallery = () => {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Function to upload image
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const storage = getStorage(firebaseApp);
      const storageRef = ref(storage, `gallery/${Date.now()}-${file.name}`);
      
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      
      // Add new image URL to the list
      setImages(prev => [...prev, downloadURL]);
      toast.success('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  // Fetch existing images on component mount
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const storage = getStorage(firebaseApp);
        const galleryRef = ref(storage, 'gallery');
        const imagesList = await listAll(galleryRef);
        
        const urls = await Promise.all(
          imagesList.items.map(item => getDownloadURL(item))
        );
        
        setImages(urls);
      } catch (error) {
        console.error('Error fetching images:', error);
        toast.error('Failed to fetch images');
      }
    };

    fetchImages();
  }, []);

  // Add delete handler
  const handleDelete = async (imageUrl) => {
    if (!window.confirm('Are you sure you want to delete this image?')) {
      return;
    }

    try {
      setDeleting(true);
      const storage = getStorage(firebaseApp);
      
      // Get the full path from the URL
      const imagePath = imageUrl.split('gallery%2F')[1].split('?')[0];
      const imageRef = ref(storage, `gallery/${decodeURIComponent(imagePath)}`);
      
      await deleteObject(imageRef);
      
      // Update images state by filtering out the deleted image
      setImages(prevImages => prevImages.filter(img => img !== imageUrl));
      toast.success('Image deleted successfully!');
    } catch (error) {
      console.error('Error deleting image:', error);
      toast.error('Failed to delete image');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Gallery Management</h1>
        
        {/* Upload Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Upload New Image</h2>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
          {uploading && <p className="mt-2 text-blue-600">Uploading...</p>}
        </div>

        {/* Gallery Preview with Delete Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((url, index) => (
            <div key={index} className="relative group">
              <img
                src={url}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg"
              />
              <button
                onClick={() => handleDelete(url)}
                disabled={deleting}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
