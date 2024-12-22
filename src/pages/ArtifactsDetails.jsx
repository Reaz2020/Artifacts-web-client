import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from "../hooks/useAxiosSecure";
import axios from 'axios';

const ArtifactDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { artifactId } = useParams(); // Get the artifactId from the URL

  const [artifact, setArtifact] = useState(null); // State to store fetched artifact details
  const [loading, setLoading] = useState(true); // Loading state to manage API call
  const [error, setError] = useState(null); // Error state to handle any issues

  useEffect(() => {
    console.log("Fetching artifact with ID:", artifactId);
    // Make the API call to fetch the artifact details by ID
    axios.get(`${import.meta.env.VITE_CLIENT_PORT}/artifact-details/${artifactId}`)
      .then(res => {
        setArtifact(res.data); // Store the artifact data in state
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch(err => {
        setError(err.message); // Handle errors
        setLoading(false); // Set loading to false in case of error
      });
  }, [artifactId]); // Effect runs every time artifactId changes

  if (loading) {
    return <div>Loading . . . .. </div>; // Show loading message while fetching data
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message if there's an issue
  }

  if (!artifact) {
    return <div>No artifact found</div>; // Show message if no artifact is found
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Artifact Details</h1>
      <div className="max-w-sm mx-auto bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden">
        <img 
          src={artifact.artifactImage} 
          alt={artifact.artifactName} 
          className="w-full h-64 object-cover"
        />
        <div className="p-4">
          <p><strong className="font-semibold">Artifact Name:</strong> {artifact.artifactName}</p>
          <p><strong className="font-semibold">Artifact Type:</strong> {artifact.artifactType}</p>
          <p><strong className="font-semibold">Historical Context:</strong> {artifact.historicalContext}</p>
          <p><strong className="font-semibold">Created At:</strong> {artifact.createdAt}</p>
          <p><strong className="font-semibold">Discovered At:</strong> {artifact.discoveredAt}</p>
          <p><strong className="font-semibold">Discovered By:</strong> {artifact.discoveredBy}</p>
          <p><strong className="font-semibold">Present Location:</strong> {artifact.presentLocation}</p>
          <p><strong className="font-semibold">Owner Email:</strong> {artifact.owner_email}</p>
          <p><strong className="font-semibold">Like Count:</strong> {artifact.like_count}</p>
          <div><button className='btn bg-purple-500'>Like this </button></div>
        </div>
       
      </div>
    </div>
  );
};

export default ArtifactDetails;
