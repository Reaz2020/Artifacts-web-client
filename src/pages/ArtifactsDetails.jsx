import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../provider/AuthProvider";

const ArtifactDetails = () => {
  const { user } = useContext(AuthContext); // Access the authenticated user
  const axiosSecure = useAxiosSecure();
  const { artifactId } = useParams(); // Get the artifactId from the URL

  const [artifact, setArtifact] = useState(null); // State to store fetched artifact details
  const [loading, setLoading] = useState(true); // Loading state to manage API call
  const [error, setError] = useState(null); // Error state to handle any issues
  const [hasLiked, setHasLiked] = useState(false); // State to track like button click

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_CLIENT_PORT}/artifact-details/${artifactId}`)
      .then(res => {
        setArtifact(res.data); // Store the artifact data in state
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch(err => {
        setError(err.message); // Handle errors
        setLoading(false); // Set loading to false in case of error
      });
  }, [artifactId]);

  useEffect(() => {
    if (user) {
      axiosSecure
        .post('/check-liked-artifact', {
          artifactId, // Send the artifactId
          email: user.email // Send the user's email
        })
        .then(res => {
          setHasLiked(res.data.liked); // Set the hasLiked state based on the response
        })
        .catch(err => console.error('Error checking like status:', err.message));
    }
  }, [user, artifactId, axiosSecure]);

  const handleLike = () => {
    if (user) {
      axiosSecure
        .post('/like-artifact', {
          artifactId,
          email: user.email,
        })
        .then(res => {
          if (res.data.success) {
            setHasLiked(true); // Set like status to true after successful like
            setArtifact(prevArtifact => ({
              ...prevArtifact,
              like_count: prevArtifact.like_count + 1, // Increment like count
            }));
            Swal.fire({
              icon: 'success',
              title: 'Liked!',
              text: 'You have liked this artifact.',
            });
          }
        })
        .catch(err => {
          console.error('Error liking artifact:', err.message);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to like the artifact.',
          });
        });
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Login Required',
        text: 'Please log in to like this artifact.',
      });
    }
  };

  const handleUnlike = () => {
    if (user) {
      axiosSecure
        .post('/unlike-artifact', {
          artifactId,
          email: user.email,
        })
        .then(res => {
          setHasLiked(false); // Set like status to false after successful unlike
          setArtifact(prevArtifact => ({
            ...prevArtifact,
            like_count: prevArtifact.like_count - 1, // Decrement like count
          }));
          Swal.fire({
            icon: 'success',
            title: 'Unliked!',
            text: 'You have unliked this artifact.',
          });
        })
        .catch(err => {
          console.error('Error unliking artifact:', err.message);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to unlike the artifact.',
          });
        });
    }
  };

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
          {hasLiked ? (
            <button className="btn bg-gray-400" onClick={handleUnlike}>
              Unlike
            </button>
          ) : (
            <button className="btn bg-purple-500" onClick={handleLike}>
              Like this
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtifactDetails;
