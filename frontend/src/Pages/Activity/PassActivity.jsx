import React, { useEffect, useState, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import axios from 'axios';

const baseUrl = 'http://localhost:3000';
var scoutDetails = {};

function PassActivity() {
    const [selected, setSelected] = useState(() => {
        const savedActivity = localStorage.getItem("selectedActivity");
        return savedActivity ? JSON.parse(savedActivity) : { id: "", name: "" };
    });

    const [options, setOptions] = useState([]); // State to hold activities
    const [scanResult, setScanResult] = useState(null);
    const [completedActivities, setCompletedActivities] = useState([]);
    const [activitiesStats, setActivitiesStats] = useState({ completed: 0, pending: 0 });

    const scanner = useRef(null); // Using useRef to hold the scanner object

    // Handle dropdown change
    const handleChange = (e) => {
        const newActivityId = e.target.value;
        const newActivityName = options.find(option => option.id === newActivityId)?.name || "";

        const newSelected = { id: newActivityId, name: newActivityName };
        setSelected(newSelected);

        // Save the activity id and name in local storage
        localStorage.setItem("selectedActivity", JSON.stringify(newSelected));
    };

    // Handle done button click
    const handleDone = () => {

        if (scanResult) {
            const activityName = selected.name;
            axios.post(baseUrl + '/api/activity/pass', {
                email: scoutDetails.email,
                activityId: selected.id,
                activityName: activityName,
            })
                .then((response) => {
                    console.log('Data sent successfully:', response.data);
                    alert('Data sent successfully!');
                    setScanResult(null); // Reset scanResult

                    if(scanner.current.getState()==3){
                        scanner.current.resume(); // Access the scanner using useRef
                    }

                })
                .catch((error) => {
                    console.error('Error sending data:', error);
                    alert('Error sending data!');
                    setScanResult(null); // Reset scanResult
                    if(scanner.current.getState()==3){
                        scanner.current.resume(); // Access the scanner using useRef
                    }
                });
        }

    };

    const handleCancel = () => {
        setScanResult(null); // Reset scanResult
        if(scanner.current.getState()==3){
            scanner.current.resume(); // Access the scanner using useRef
        }
    };

    // Fetch activities from the backend
    useEffect(() => {
        axios.get(baseUrl + '/api/activity')
            .then((response) => {
                const activityOptions = response.data.map((activity) => ({
                    id: activity.id,
                    name: activity.name,
                }));
                setOptions(activityOptions);

                // Get selected activity from lo cal storage
                const savedActivity = JSON.parse(localStorage.getItem("selectedActivity"));

                // Check if saved activity exists in retrieved activities
                if (savedActivity && activityOptions.some(option => option.id === savedActivity.id)) {
                    setSelected(savedActivity);
                } else {
                    // If not, remove from local storage and select the first activity
                    localStorage.removeItem("selectedActivity");
                    if (activityOptions.length > 0) {
                        const firstActivity = activityOptions[0];
                        setSelected(firstActivity);
                        localStorage.setItem("selectedActivity", JSON.stringify(firstActivity));
                    }
                }
            })
            .catch((error) => {
                console.error('Error fetching activities:', error);
            });
    }, []);

    // Initialize QR code scanner
    useEffect(() => {
        scanner.current = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 500,
                height: 500,
            },
            fps: 5,
        });

        const success = (result) => {
            try {
                const parsedResult = JSON.parse(result);
                setScanResult(result);
                scoutDetails = parsedResult;

                // Fetch the registered user's completed activities
                axios.get(`${baseUrl}/api/registration/${scoutDetails.email}`)
                    .then((response) => {
                        const userDetails = response.data;
                        setCompletedActivities(userDetails.activities || []);

                        const completedActivityIds = new Set(userDetails.activities.map(activity => activity.id));
                        const completedCount = options.filter(option => completedActivityIds.has(option.id)).length;
                        const pendingCount = options.length - completedCount;

                        setActivitiesStats({ completed: completedCount, pending: pendingCount });
                        if(scanner.current.getState()==2){
                            scanner.current.pause(true); // Access the scanner using useRef
                        }
                    })
                    .catch((error) => {
                        if(scanner.current.getState()==2){
                            scanner.current.pause(true); // Access the scanner using useRef
                        }
                        console.error('Error fetching user details:', error);
                    });
            } catch (err) {
                console.error('Error parsing QR code result:', err);
            }
        };

        const error = (err) => {
            console.warn(err);
        };

        scanner.current.render(success, error);

        return () => {
            scanner.current.clear();
        };
    }, [options]);

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
                    Choose an activity:
                </label>
                <select
                    value={selected.id}
                    onChange={handleChange}
                    className="w-full px-4 py-2 text-sm border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {options.map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.name}
                        </option>
                    ))}
                </select>
                <p className="mt-2 text-sm text-gray-600">
                    Activity ID: {selected.id}
                </p>
                <div className="mt-2 text-sm text-gray-600">
                    <p>Status:</p> {scanResult ? (
                        // If scanResult is available, show status based on completion
                        completedActivities.some(activity => activity.id === selected.id) ? (
                            <span className="text-green-500 flex items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12.75l6 6 9-13.5"
                                    />
                                </svg>
                                <span className="ml-2">Completed</span>
                            </span>
                        ) : (
                            <span className="text-red-500 flex items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19.5 12H4.5"
                                    />
                                </svg>
                                <span className="ml-2">Pending</span>
                            </span>
                        )
                    ) : (
                        // If scanResult is not available, just show Pending
                        <span className="text-red-500 flex items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 12H4.5"
                                />
                            </svg>
                            <span className="ml-2">Waiting for scan</span>
                        </span>
                    )}
                </div>
            </div>

            {/* QR Reader or Scan Result */}
            {scanResult ? (
                <div className="text-center my-5">
                    <p className="text-lg font-medium text-gray-700">Name: {scoutDetails.fullName}</p>
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

                    {/* Activities Table */}
                    <div className="my-5">
                        <h2 className="text-xl font-bold text-gray-700">Activities Status</h2>
                        <table className="w-full mt-3 border-collapse border border-gray-300">
                            <thead>
                                <tr>
                                    <th className="border border-gray-300 px-4 py-2">Activity</th>
                                    <th className="border border-gray-300 px-4 py-2">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {options.map((activity) => {
                                    // Check if the activity is completed by matching the ID
                                    const isCompleted = completedActivities.some(
                                        (completed) => completed.id === activity.id
                                    );
                                    return (
                                        <tr key={activity.id}>
                                            <td className="border border-gray-300 px-4 py-2">{activity.name}</td>
                                            <td className="border border-gray-300 px-4 py-2 text-center">
                                                {isCompleted ? (
                                                    <span className="text-green-500 flex items-center justify-center">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="1.5"
                                                            stroke="currentColor"
                                                            className="w-6 h-6"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M4.5 12.75l6 6 9-13.5"
                                                            />
                                                        </svg>
                                                        <span className="ml-2">Completed</span>
                                                    </span>
                                                ) : (
                                                    <span className="text-red-500 flex items-center justify-center">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="1.5"
                                                            stroke="currentColor"
                                                            className="w-6 h-6"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M19.5 12H4.5"
                                                            />
                                                        </svg>
                                                        <span className="ml-2">Pending</span>
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-4 p-6 bg-white rounded-lg shadow-md border border-gray-300">
                        <h3 className="text-lg font-semibold text-gray-800">Activities Overview</h3>
                        <div className="mt-2">
                            <p className="text-sm text-gray-600">
                                <span className="font-medium text-gray-800">Completed:</span> {activitiesStats.completed}
                            </p>
                            <p className="text-sm text-gray-600 mt-2">
                                <span className="font-medium text-gray-800">Pending:</span> {activitiesStats.pending}
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div></div>
            )}
            <div id="reader" className="max-w-xl mx-auto">  </div>
        </div>
    );
}

export default PassActivity;
