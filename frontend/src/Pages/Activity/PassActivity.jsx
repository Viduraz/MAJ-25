import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import axios from 'axios'; // Install axios if not already installed: npm install axios

function PassActivity() {
    const [selected, setSelected] = useState(() => {
        // Get previously selected activity from local storage, or default to "Activity 1"
        return localStorage.getItem("selectedActivity") || "Activity 1";
    });

    const options = ["Activity 1", "Activity 2", "Activity 3"];
    const [scanResult, setScanResult] = useState(null);
    var scanner;

    const handleChange = (e) => {
        const newActivity = e.target.value;
        setSelected(newActivity);

        // Save the new selected activity to local storage
        localStorage.setItem("selectedActivity", newActivity);
    };

    const handleDone = () => {
        if (scanResult) {
            // Send HTTP request to set activity code
            axios.post('https://example.com/api/endpoint', {
                scannedData: scanResult,
                activityNo: selected
            })
                .then((response) => {
        scanner.render(success, error);
                    
        console.log('Data sent successfully:', response.data);
                    alert('Data sent successfully!');
                })
                .catch((error) => {
        scanner.render(success, error);
        
        console.error('Error sending data:', error);
                    alert('Error sending data!');
                });
        }

        // Reset scanResult
        setScanResult(null);
    };

    const handleCancel = () => {
        // Reset scanResult
        setScanResult(null);
    };

    useEffect(() => {
        scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 250,
                height: 250,
            },
            fps: 5,
        });

        const success = (result) => {
            scanner.clear();
            console.log(result); // Handle result here
            setScanResult(result);
        };

        const error = (err) => {
            console.warn(err);
        };

        scanner.render(success, error);

        return () => {
            scanner.clear();
        };
    }, []);

    return (
        <div className="bg-gray-50">
            {/* Hero Section */}
            <div className="relative h-[400px]">
                <img
                    src="https://via.placeholder.com/1920x1080" // Replace with actual background image
                    alt="Scout Group"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-5xl md:text-6xl text-white font-bold uppercase tracking-wider drop-shadow-lg">
                        Pass Activity
                    </h1>
                </div>
            </div>

            {/* Dropdown */}
            <div className="w-64 mx-auto my-5">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                    Choose an option:
                </label>
                <select
                    value={selected}
                    onChange={handleChange}
                    className="w-full px-4 py-2 text-sm border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {options.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <p className="mt-2 text-sm text-gray-600">Selected: {selected}</p>
            </div>

            {/* QR Reader or Scan Result */}
            {scanResult ? (
                <div className="text-center my-5">
                    <p className="text-lg font-medium text-gray-700">Scan Result: {scanResult}</p>
                    <div className="flex justify-center space-x-4 mt-4">
                        {/* Done Button */}
                        <button
                            onClick={handleDone}
                            className="px-4 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                        >
                            Done
                        </button>
                        {/* Cancel Button */}
                        <button
                            onClick={handleCancel}
                            className="px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div id="reader"></div>
            )}
        </div>
    );
}

export default PassActivity;
