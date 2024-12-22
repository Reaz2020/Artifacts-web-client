import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import useAxiosSecure from "../hooks/useAxiosSecure";
import axios from 'axios';

const ArtifactDetails = () => {
    const axiosSecure = useAxiosSecure();
    const { artifactId} = useParams(); // Get the artifactId from the URL

  const [artifact, setArtifact] = useState(null); // State to store fetched artifact details
  const [loading, setLoading] = useState(true); // Loading state to manage API call
  const [error, setError] = useState(null); // Error state to handle any issues

  useEffect(() => {
    console.log("Fetching artifact with ID:", artifactId); 
    // Make the API call to fetch the artifact details by ID
    axiosSecure.get(`${import.meta.env.VITE_CLIENT_PORT}/artifact-details/${artifactId}`)
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
    <div>
      <h1>Artifact Details</h1>
      <div>
        <strong>Image:</strong>
        <img 
          src={artifact.artifactImage} 
          alt={artifact.artifactName} 
          style={{ maxWidth: '300px', marginTop: '10px' }} // Optional styling
        />
      </div>
      <p><strong>Name:</strong> {artifact.artifactName}</p>
      <p><strong>Description:</strong> {artifact.description}</p>
      <p><strong>Price:</strong> ${artifact.price}</p>
   
    </div>
  );
};

export default ArtifactDetails;
