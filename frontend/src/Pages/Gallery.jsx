import AnimationContainer from "@/Components/AnimationContainer";
import React, { useState, useEffect } from "react";
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import firebaseApp from '../../Firebase';


export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);
  const [bannerUrl, setBannerUrl] = useState(null);

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
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const storage = getStorage(firebaseApp);
        const bannerRef = ref(storage, 'banner/gallery-banner.jpg');
        const url = await getDownloadURL(bannerRef);
        setBannerUrl(url);
      } catch (error) {
        console.error('Error loading banner:', error);
        // Fallback to default banner
        setBannerUrl('https://scontent-hkg1-1.xx.fbcdn.net/v/t1.6435-9/84479872_859290007833870_2172793800081014784_n.jpg');
      }
    };
    
    fetchBanner();
  }, []);


  return (
    <div className="min-h-screen bg-gray-100">
      <div
        className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[32rem] bg-cover bg-center"
        style={{
          backgroundImage: `url('${bannerUrl || 'loading...'}')`
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase text-center">
            Gallery
          </h1>
        </div>
      </div>

      {/* Gallery Section */}
      <AnimationContainer>
        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {images.map((url, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
              onClick={() => setSelectedImage(url)}
            >
              <img
                src={url}
                alt={`Gallery Image ${index + 1}`}
                className="object-cover w-full h-full transition-transform duration-300 transform hover:scale-105"
              />
            </div>
          ))}
        </div>
      </AnimationContainer>

      {/* Modal for Enlarged Image */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative">
            <img
              src={selectedImage}
              alt="Enlarged Image"
              className="max-w-full max-h-screen rounded-lg"
              onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking on the image
            />
            {/* Close Button */}
            <button
              className="absolute px-3 py-1 text-sm font-bold text-black bg-white rounded-full top-2 right-2 hover:bg-gray-300"
              onClick={() => setSelectedImage(null)}
            >
              Close
            </button>
            {/* Download Button */}
            <a
              href={selectedImage}
              download
              className="absolute flex items-center px-3 py-1 text-sm font-bold text-black bg-white rounded-full bottom-2 right-2 hover:bg-gray-300"
              onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking on the download button
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V3"
                />
              </svg>
              Download
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
