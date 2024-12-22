import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../provider/AuthProvider"; // Assuming AuthContext is where user is stored

const MyArtifacts = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext); // Get the user from AuthContext
  const [artifacts, setArtifacts] = useState([]); // State to store fetched artifacts
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const fakeEmail='reaz.morshed@yahoo.com' //testing email 


  function handleUpdate(id){
  console.log(id)
  }

  useEffect(() => {
    // Check if the user is logged in and has an email
    if (user && user.email) {
      // Fetch artifacts for the user based on their email
      axiosSecure.get(`/my-artifacts?email=${user.email}`)
        .then((response) => {
          setArtifacts(response.data); // Store fetched artifacts
          setLoading(false); // Set loading to false once data is fetched
        })
        .catch((err) => {
          setError(err.message); // Set error if something goes wrong
          setLoading(false); // Set loading to false if there is an error
        });
    } else {
      setError("User is not authenticated.");
      setLoading(false);
    }
  }, [user, axiosSecure]); // Trigger effect when user or axiosSecure changes

  if (loading) {
    return <div>Loading...</div>; // Show loading message
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message
  }

  return (
<div>
  <h1 className="text-2xl font-semibold mb-4">My Artifacts</h1>
  {artifacts.length === 0 ? (
    <p>No artifacts added by you yet.</p> // If no artifacts, show this message
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {artifacts.map((artifact) => (
        <div key={artifact._id} className="artifact-card border rounded-lg p-4 shadow-md">
          <img
            src={artifact.artifactImage}
            alt={artifact.artifactName}
            className="w-full h-40 object-cover rounded-md mb-4"
          />
          <h3 className="text-lg font-semibold">{artifact.artifactName}</h3>
          <p className="text-sm text-gray-600">{artifact.description}</p>
          <p className="mt-2 font-bold">${artifact.price}</p>
          <div>
            <button className='btn bg-green-600' onClick={() => handleUpdate(artifact._id)}>Update </button> 
          <button className='btn bg-orange-500'>Delete </button></div>
        </div>
      ))}
    </div>
  )}
</div>

  );
};

export default MyArtifacts;
