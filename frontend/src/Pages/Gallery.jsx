<<<<<<< HEAD
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

=======
import React, { useState } from "react";

export default function Gallery() {
  // State for managing modal visibility and selected image
  const [selectedImage, setSelectedImage] = useState(null);

  // Dummy image URLs (replace with your actual image URLs)
  const dummyImages = [
    "https://scontent-hkg1-2.xx.fbcdn.net/v/t1.6435-9/85146473_859284564501081_2936027999889260544_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=cf85f3&_nc_eui2=AeF2kjjEvh6HzsfsoZbiCA1EPZxkARWOFGA9nGQBFY4UYIQeG42sGqFuA6B6cZyeFB4eZbSJMSxXx3zOep8ikPd_&_nc_ohc=RwUd9lDghNcQ7kNvgEvhx2g&_nc_zt=23&_nc_ht=scontent-hkg1-2.xx&_nc_gid=A0k3nNLNdimTS8YVggsUW-U&oh=00_AYCOCbcBM7I2I_J4Av3NGHKCIzg10woHHWf4_W4zyYFD7A&oe=67850FF4",
    "https://scontent-hkg1-2.xx.fbcdn.net/v/t1.6435-9/85192132_859288194500718_6128277977537970176_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=cf85f3&_nc_eui2=AeGdpcrC_g0Un2Wwb1ZFBElFJpODvtxwf9Imk4O-3HB_0vYUkG5BW7DkjnVvmXzaWwLr6gL6bwkv43tVXRSNxxma&_nc_ohc=cUtZKiaR8kMQ7kNvgFbUGRf&_nc_zt=23&_nc_ht=scontent-hkg1-2.xx&_nc_gid=AKnqGjtCA0gexqd_K1Mbksl&oh=00_AYAFc3sN5vEEAHB61YANvHleaAPnCbrvvwkoB9U6N1N0oQ&oe=6785125D",
    "https://scontent-hkg1-2.xx.fbcdn.net/v/t1.6435-9/86189218_859285081167696_8438373201943199744_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=cf85f3&_nc_eui2=AeFcnoAlLgCbbU450r8I6lxzqg0imtY_C0OqDSKa1j8LQ5-ZPT8rjL2ivKVAqDcvdfNqS5vHVTHqjPL3v0NzcwLZ&_nc_ohc=c1aDagvOxZkQ7kNvgHTeZm3&_nc_zt=23&_nc_ht=scontent-hkg1-2.xx&_nc_gid=AzoimsfV1n1NCHB6A6_Hf2w&oh=00_AYC0hT7s96V_F-oQGBr6u8s8JrzdhjyFHvvo6CjrJ9VcCA&oe=678516C7",
    "https://scontent-hkg1-1.xx.fbcdn.net/v/t1.6435-9/86272558_860688584360679_197977823179177984_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=cf85f3&_nc_eui2=AeFo8vE6P3H8tJknJ4eCFbumq-oI0Udm9qur6gjRR2b2q2W5Z1_SKnzYOw6wO0IKCyn9EgZXDpMVIS5fV_bWKEoO&_nc_ohc=wc-JXRLQbccQ7kNvgHPWuDr&_nc_zt=23&_nc_ht=scontent-hkg1-1.xx&_nc_gid=Aevfklat_2u8YwvVIrgvxVr&oh=00_AYANTgFWJ3JXGsIisXxMZyC0zbAl4-l3ttnUYS9pDkanyA&oe=678512FB",
    "https://scontent-hkg1-1.xx.fbcdn.net/v/t1.6435-9/84921806_860689367693934_7116471852662259712_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=cf85f3&_nc_eui2=AeFeYGTQwhSfn1F__84QFw8fD657CDfP1IYPrnsIN8_UhrCSB2hKHb7IOM_asbqwxtKzW9u4UgfWmpsirFiJ9w2R&_nc_ohc=ObA_144kSTcQ7kNvgGAWeHp&_nc_zt=23&_nc_ht=scontent-hkg1-1.xx&_nc_gid=Awe2n8aJErAbX52pGMmT-rj&oh=00_AYD3EDIDD23HbPyXc4YlNnUU8L8tKPX_K-umVq-pKTKO5A&oe=67850BC8",
    "https://scontent-hkg4-1.xx.fbcdn.net/v/t1.6435-9/86284780_860702051025999_1335291408042426368_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=cf85f3&_nc_eui2=AeH67qV6EV5_zT5W7BCo9uBR5AOr_JYABdrkA6v8lgAF2sq4Hc2KQHG15-iKlIktui7rKzsG2FGwmY9K9AaUL8dO&_nc_ohc=C-3tPTb51gUQ7kNvgF3k2sU&_nc_zt=23&_nc_ht=scontent-hkg4-1.xx&_nc_gid=AEOe453logn-FYyn2DHrWEe&oh=00_AYCL_X8Sws6WqLaXKXyeP9MPZ6-y1Q2FPZ9nR8v-TcKeGw&oe=678523BD",
    " https://scontent-hkg4-1.xx.fbcdn.net/v/t1.6435-9/86699232_860705464358991_4962917410123284480_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=cf85f3&_nc_eui2=AeFtZbOC_-N8TEi5kVuLQfC_LyfNKJR_HgEvJ80olH8eAejHNID0_zRUMBZ9ZCirS6Y6Bmaa3fqYGgDtyMOa40rX&_nc_ohc=o5weBARnuysQ7kNvgElf_5B&_nc_zt=23&_nc_ht=scontent-hkg4-1.xx&_nc_gid=AtTfmf1pEzXYfTp28Ne8ZQq&oh=00_AYDnLkDpnjm3rD-miwwb6EJNc1JQ3Zfetur1hDQwLB3Xlg&oe=67852A34",
    "https://scontent-hkg1-1.xx.fbcdn.net/v/t1.6435-9/86391615_860707557692115_5814275302234259456_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=cf85f3&_nc_eui2=AeGfQWL7ITu-Xr1oDWMo4Ihox7eJ-_Vw3mDHt4n79XDeYOWNJ2OrsSZhOyw6AnUoSqznbyIMZIpcIiFnWVLXb1-I&_nc_ohc=8UEQk1OHE1gQ7kNvgGxy6iB&_nc_zt=23&_nc_ht=scontent-hkg1-1.xx&_nc_gid=AfU8j21r3yDcL3k9ejzBHvW&oh=00_AYD-pfoj8lVdJZ45tF2kdf18V8K-tnqBnYv4j0wLokfLFA&oe=67852CD6"
  ];
>>>>>>> ca897cea8e8ce0edd0761379ecfad1f5c221189c

  return (
    <div className="min-h-screen bg-gray-100">
      <div
<<<<<<< HEAD
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
=======
  className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[32rem] bg-cover bg-center"
  style={{
    backgroundImage: `url('https://scontent-hkg1-1.xx.fbcdn.net/v/t1.6435-9/84479872_859290007833870_2172793800081014784_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=cf85f3&_nc_eui2=AeEiA4EYV5ie9hgyRs7tqnyQlb0Zogu-pnKVvRmiC76mcns_eO9SLI57ls_1_khAcowzY3Ob-ssDY-7s-tCNh_Lq&_nc_ohc=drOkbXKai3MQ7kNvgE5f6sH&_nc_zt=23&_nc_ht=scontent-hkg1-1.xx&_nc_gid=AyqMc2kBAGvSDLfJQ3bQmy_&oh=00_AYAbRJSx0qQt2EzC7eZDJq_gHJXG5sda8Uq4keCjX_Sq3g&oe=6785280B')`,
  }}
>
  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase text-center">
      Gallery
    </h1>
  </div>
</div>

      {/* Gallery Section */}
      <div className="container mx-auto py-12 px-4">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-8">
          Our Beautiful Moments
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {dummyImages.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image}
                alt={`Gallery Image ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg shadow-lg cursor-pointer transition-transform transform group-hover:scale-105"
                onClick={() => setSelectedImage(image)}
>>>>>>> ca897cea8e8ce0edd0761379ecfad1f5c221189c
              />
            </div>
          ))}
        </div>
<<<<<<< HEAD
      </AnimationContainer>
=======
      </div>
>>>>>>> ca897cea8e8ce0edd0761379ecfad1f5c221189c

      {/* Modal for Enlarged Image */}
      {selectedImage && (
        <div
<<<<<<< HEAD
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
=======
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
>>>>>>> ca897cea8e8ce0edd0761379ecfad1f5c221189c
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
<<<<<<< HEAD
              className="absolute px-3 py-1 text-sm font-bold text-black bg-white rounded-full top-2 right-2 hover:bg-gray-300"
=======
              className="absolute top-2 right-2 bg-white text-black px-3 py-1 rounded-full text-sm font-bold hover:bg-gray-300"
>>>>>>> ca897cea8e8ce0edd0761379ecfad1f5c221189c
              onClick={() => setSelectedImage(null)}
            >
              Close
            </button>
            {/* Download Button */}
            <a
              href={selectedImage}
              download
<<<<<<< HEAD
              className="absolute flex items-center px-3 py-1 text-sm font-bold text-black bg-white rounded-full bottom-2 right-2 hover:bg-gray-300"
=======
              className="absolute bottom-2 right-2 bg-white text-black px-3 py-1 rounded-full text-sm font-bold hover:bg-gray-300 flex items-center"
>>>>>>> ca897cea8e8ce0edd0761379ecfad1f5c221189c
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
