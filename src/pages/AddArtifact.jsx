import React, { useState, useContext } from 'react';
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from 'sweetalert2';

import { AuthContext } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import ReactPlayer from 'react-player';
import music from '../assets/artifact.mp3'

const AddArtifact = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    // State for storing form field values
    const [artifactName, setArtifactName] = useState('');
    const [artifactImage, setArtifactImage] = useState('');
    const [artifactType, setArtifactType] = useState('');
    const [historicalContext, setHistoricalContext] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [discoveredAt, setDiscoveredAt] = useState('');
    const [discoveredBy, setDiscoveredBy] = useState('');
    const [presentLocation, setPresentLocation] = useState('');

    // State to handle error message
    const [error, setError] = useState('');

    // Artifact types for the dropdown
    const artifactTypes = ['Tools', 'Weapons', 'Documents', 'Writings'];

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Prepare the data to be sent in the POST request
        const artifactData = {
            artifactName,
            artifactImage,
            artifactType,
            historicalContext,
            createdAt,
            discoveredAt,
            discoveredBy,
            presentLocation,
            like_count: 0, // Initialize like_count with 0
            likers: [], // Initialize likers as an empty array
            owner_email: user?.email, // To track who added this artifact
            owner_name: user?.displayName // 
        };
    
        try {
            // Using axiosSecure for the POST request
            axiosSecure.post('/add-artifact', artifactData, { withCredentials: true })
                .then((response) => {
                    // Handling the response after successful submission
                    if (response.status === 200) {
                        Swal.fire({
                            title: 'Success!',
                            text: 'Artifact added successfully!',
                            icon: 'success',
                            confirmButtonText: 'OK',
                        });
    
                        // Reset form fields
                        setArtifactName('');
                        setArtifactImage('');
                        setArtifactType('');
                        setHistoricalContext('');
                        setCreatedAt('');
                        setDiscoveredAt('');
                        setDiscoveredBy('');
                        setPresentLocation('');
                    }
                })
                .catch((error) => {
                    // Handles errors if the request fails
                    setError('An error occurred while adding the artifact.');
                    console.error(error);
                });
        } catch (error) {
            console.error('Unexpected error:', error);
        }
    };

    // Navigates to artifact details page
    const handleDetails = (id) => {
        navigate(`/artifact/${id}`);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 py-6 "
        

        style={{
            backgroundImage: "url('https://i.ibb.co/7kHfSHL/Screenshot-2024-12-24-at-00-55-50.png')",
        }}
        
        
        >
            <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center text-gray-700 mb-8">Add New Artifact</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Artifact Name */}
                    <div>
                        <label htmlFor="artifactName" className="block text-lg font-medium text-gray-700">Artifact Name:</label>
                        <input
                            type="text"
                            id="artifactName"
                            value={artifactName}
                            onChange={(e) => setArtifactName(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Artifact Image URL */}
                    <div>
                        <label htmlFor="artifactImage" className="block text-lg font-medium text-gray-700">Artifact Image URL:</label>
                        <input
                            type="text"
                            id="artifactImage"
                            value={artifactImage}
                            onChange={(e) => setArtifactImage(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Artifact Type */}
                    <div>
                        <label htmlFor="artifactType" className="block text-lg font-medium text-gray-700">Artifact Type:</label>
                        <select
                            id="artifactType"
                            value={artifactType}
                            onChange={(e) => setArtifactType(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">Select type</option>
                            {artifactTypes.map((type) => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    {/* Historical Context */}
                    <div>
                        <label htmlFor="historicalContext" className="block text-lg font-medium text-gray-700">Historical Context:</label>
                        <textarea
                            id="historicalContext"
                            value={historicalContext}
                            onChange={(e) => setHistoricalContext(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Created At */}
                    <div>
                        <label htmlFor="createdAt" className="block text-lg font-medium text-gray-700">Created At:</label>
                        <input
                            type="text"
                            id="createdAt"
                            value={createdAt}
                            onChange={(e) => setCreatedAt(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Discovered At */}
                    <div>
                        <label htmlFor="discoveredAt" className="block text-lg font-medium text-gray-700">Discovered At:</label>
                        <input
                            type="text"
                            id="discoveredAt"
                            value={discoveredAt}
                            onChange={(e) => setDiscoveredAt(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Discovered By */}
                    <div>
                        <label htmlFor="discoveredBy" className="block text-lg font-medium text-gray-700">Discovered By:</label>
                        <input
                            type="text"
                            id="discoveredBy"
                            value={discoveredBy}
                            onChange={(e) => setDiscoveredBy(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Present Location */}
                    <div>
                        <label htmlFor="presentLocation" className="block text-lg font-medium text-gray-700">Present Location:</label>
                        <input
                            type="text"
                            id="presentLocation"
                            value={presentLocation}
                            onChange={(e) => setPresentLocation(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* User Info (Read-Only) */}
                    <div>
                        <label htmlFor="userEmail" className="block text-lg font-medium text-gray-700">User Email:</label>
                        <input
                            type="email"
                            id="userEmail"
                            value={user?.email || ''}
                            readOnly
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="userName" className="block text-lg font-medium text-gray-700">Name:</label>
                        <input
                            type="text"
                            id="userName"
                            value={user?.displayName || ''}
                            readOnly
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Error Message */}
                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-2 bg-purple-600 text-white font-bold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Add Artifact
                    </button>
                </form>
            </div>
            <ReactPlayer 
        // url="src/components-home/artifact.mp3" 
        url={music} 
        playing={true} 
        loop={true}    
        volume={0.2}   
        width="0"      
        height="0"     
      />
        </div>
    );
};

export default AddArtifact;
