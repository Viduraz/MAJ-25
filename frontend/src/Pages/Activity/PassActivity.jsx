import React, { useEffect, useState, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProtectedRoute from '../../Components/ProtectedRoute';

const baseUrl = 'https://maj-25-backend.onrender.com';
var scoutDetails = {};

function PassActivity() {
    const [categories, setCategories] = useState([]); // State to hold categories
    const [selectedCategory, setSelectedCategory] = useState(""); // State to hold selected category
    const [selected, setSelected] = useState(() => {
        const savedActivity = localStorage.getItem("selectedActivity");
        return savedActivity ? JSON.parse(savedActivity) : { id: "", name: "", category: "" };
    });
    const [options, setOptions] = useState([]); // State to hold all activities
    const [filteredOptions, setFilteredOptions] = useState([]); // State to hold filtered activities
    const [scanResult, setScanResult] = useState(null);
    const [completedActivities, setCompletedActivities] = useState([]);
    const [activitiesStats, setActivitiesStats] = useState({ completed: 0, pending: 0 });

    const scanner = useRef(null);
    const navigate = useNavigate();

    const categoryColors = [
        { border: "border-blue-400", bg: "bg-blue-100", lightBg: "bg-blue-50" },
        { border: "border-green-400", bg: "bg-green-100", lightBg: "bg-green-50" },
        { border: "border-purple-400", bg: "bg-purple-100", lightBg: "bg-purple-50" },
        { border: "border-yellow-400", bg: "bg-yellow-100", lightBg: "bg-yellow-50" },
        { border: "border-pink-400", bg: "bg-pink-100", lightBg: "bg-pink-50" }
    ];

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        setSelectedCategory(category);

        // Filter activities based on the selected category
        const filtered = category
            ? options.filter(option => option.category === category)
            : options; // Show all activities if no category is selected

        setFilteredOptions(filtered);

        if (filtered.length > 0) {
            // Set the selected activity to the first activity in the filtered list
            const firstActivity = filtered[0];
            setSelected(firstActivity);
            localStorage.setItem("selectedActivity", JSON.stringify(firstActivity));
        } else {
            // Reset selected activity if no activities in the category
            setSelected({ id: "", name: "", category: "" });
            localStorage.removeItem("selectedActivity");
        }
    };



    const handleActivityChange = (e) => {
        const newActivityId = e.target.value;
        const newActivityName = filteredOptions.find(option => option.id === newActivityId)?.name || "";

        const newSelected = { id: newActivityId, name: newActivityName, category: selectedCategory };
        setSelected(newSelected);
        localStorage.setItem("selectedActivity", JSON.stringify(newSelected));
    };

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
                    setScanResult(null);
                    if (scanner.current.getState() === 3) {
                        scanner.current.resume();
                    } else {
                        location.reload();
                    }
                })
                .catch((error) => {
                    console.error('Error sending data:', error);
                    alert('Error sending data!');
                    setScanResult(null);
                    if (scanner.current.getState() === 3) {
                        scanner.current.resume();
                    } else {
                        location.reload();
                    }
                });
        }
    };

    const handleCancel = () => {
        setScanResult(null);
        if (scanner.current.getState() === 3) {
            scanner.current.resume();
        } else {
            location.reload();
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/admin');
        }
        axios.get(baseUrl + '/api/activity')
            .then((response) => {
                const activities = response.data.map((activity) => ({
                    id: activity.id,
                    name: activity.name,
                    category: activity.category ? activity.category.trim() : "",
                }));

                // Extract distinct categories
                const uniqueCategories = [...new Set(activities.map(activity => activity.category))];

                setOptions(activities);
                setFilteredOptions(activities);
                setCategories(uniqueCategories);

                // Check if saved activity exists in localStorage and is valid
                const savedActivity = JSON.parse(localStorage.getItem("selectedActivity"));
                if (savedActivity && activities.some(option => option.id === savedActivity.id)) {
                    setSelected(savedActivity);
                    setSelectedCategory(savedActivity.category);
                } else if (activities.length > 0) {
                    // Default to the first activity if no valid saved activity is found
                    const firstActivity = activities[0];
                    setSelected(firstActivity);
                    setSelectedCategory(firstActivity.category);
                    localStorage.setItem("selectedActivity", JSON.stringify(firstActivity));
                } else {
                    // If no activities are available, reset the selected state and category
                    setSelected({ id: "", name: "", category: "" });
                    setSelectedCategory("");
                    localStorage.removeItem("selectedActivity");
                }
            })
            .catch((error) => {
                console.error('Error fetching activities:', error);
            });
    }, [navigate]);



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

                axios.get(`${baseUrl}/api/registration/${scoutDetails.email}`)
                    .then((response) => {
                        const userDetails = response.data;
                        setCompletedActivities(userDetails.activities || []);
                        const completedActivityIds = new Set(userDetails.activities.map(activity => activity.id));
                        const completedCount = filteredOptions.filter(option => completedActivityIds.has(option.id)).length;
                        const pendingCount = filteredOptions.length - completedCount;

                        setActivitiesStats({ completed: completedCount, pending: pendingCount });
                        if (scanner.current.getState() === 2) {
                            scanner.current.pause(true);
                        }
                    })
                    .catch((error) => {
                        if (scanner.current.getState() === 2) {
                            scanner.current.pause(true);
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
    }, [filteredOptions]);

    return (
        <ProtectedRoute allowedPage="pass-activity">
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

            <div className="flex justify-center space-x-4 my-5">
                {/* Category Dropdown */}
                <div className="w-64">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        Choose a category:
                    </label>
                    <select
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        className="w-full px-4 py-2 text-sm border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">All Categories</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Activities Dropdown */}
                <div className="w-64">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        Choose an activity:
                    </label>
                    <select
                        value={selected.id}
                        onChange={handleActivityChange}
                        className="w-full px-4 py-2 text-sm border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {filteredOptions.map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Activity ID and Status Section */}
            <div className="my-10 text-center">
                <p className="text-lg font-medium text-gray-800">
                    Activity ID: <span className="text-blue-600">{selected.id}</span>
                </p>
                <div className="mt-4 text-lg text-gray-800">
                    <p>Status:</p>
                    {scanResult ? (
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
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
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
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12H4.5" />
                                </svg>
                                <span className="ml-2">Pending</span>
                            </span>
                        )
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
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12H4.5" />
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

                    <div className="my-2">
                        <h2 className="text-xl font-bold text-gray-700">Activities Status</h2>
                        <table className="w-full mt-5 border-collapse border border-gray-300">
                            <thead>
                                <tr>
                                    <th className="border bg-blue-300 border-gray-300 px-4 py-2">Activity</th>
                                    <th className="border bg-blue-300 border-gray-300 px-4 py-2">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(
                                    options.reduce((acc, activity) => {
                                        acc[activity.category] = acc[activity.category] || [];
                                        acc[activity.category].push(activity);
                                        return acc;
                                    }, {})
                                ).map(([category, activities], index, categoryArray) => {
                                    const currentColors = categoryColors[index % categoryColors.length];
                                    const nextColors = categoryColors[(index + 1) % categoryColors.length];

                                    return (
                                        <React.Fragment key={category}>
                                            <tr>
                                                <td colSpan="2" className="p-0">
                                                    <div
                                                        className={`rounded-lg border ${currentColors.border} ${nextColors ? `border-b-${nextColors.border.split("-")[1]}-400` : ""
                                                            }`}
                                                    >
                                                        {/* Category Header */}
                                                        <div
                                                            className={`px-4 py-2 font-semibold text-gray-700 ${currentColors.bg} border-b ${currentColors.border}`}
                                                        >
                                                            {category}
                                                        </div>
                                                        {/* Activities */}
                                                        <div
                                                            className={`p-4 ${currentColors.lightBg} md:w-full md:rounded-lg`}
                                                        >
                                                            {activities.map((activity) => {
                                                                const isCompleted = completedActivities.some(
                                                                    (completed) => completed.id === activity.id
                                                                );
                                                                return (
                                                                    <div
                                                                        key={activity.id}
                                                                        className="flex justify-between items-center border-b last:border-b-0 border-gray-300 py-2"
                                                                    >
                                                                        <span>{activity.name}</span>
                                                                        {isCompleted ? (
                                                                            <span className="text-green-500 flex items-center">
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
                                                                            <span className="text-red-500 flex items-center">
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
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </React.Fragment>
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
        </ProtectedRoute>
    );
}

export default PassActivity;
