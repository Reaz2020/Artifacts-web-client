import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom'; 

const UpdateArtifact = () => {
  const navigate = useNavigate(); 
  const artifactTypes = ["Tools", "Weapons", "Documents", "Writings", "Other"];
  const { artifactId } = useParams(); // Getting the artifactId from the URL
  const { user } = useContext(AuthContext); // Geting user details from context
  const axiosSecure = useAxiosSecure(); // Secureing Axios instance
  const [artifact, setArtifact] = useState(null); // Statting to store artifact details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [updatedData, setUpdatedData] = useState({}); // State to manage updated data

  useEffect(() => {
    // Fetching artifact details using artifactId
    axiosSecure
      .get(`/update-artifact/${artifactId}`)
      .then((response) => {
        setArtifact(response.data); // Seting fetched artifact details
        setUpdatedData(response.data); // Initialize updatedData with fetched data
        setLoading(false); // Stop loading
      
      
      })
      .catch((err) => {
        setError(err.message); // Seting error if fetch fails
        setLoading(false); // Stoping loading
      });
  }, [artifactId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to update this artifact?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .put(`/update-artifact/${artifactId}`, updatedData)
          .then((response) => {
            Swal.fire("Updated!", "Artifact has been updated successfully.", "success");
            navigate("/my-artifacts");
          })
          .catch((err) => {
            console.error("Error updating artifact:", err);
            Swal.fire("Error", "Failed to update artifact. Please try again.", "error");
          });
      }
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Update Artifact</h1>
      {artifact ? (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          {/* Artifact Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Artifact Name</label>
            <input
              type="text"
              name="artifactName"
              value={updatedData.artifactName || ""}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              required
            />
          </div>

          {/* Artifact Image */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Artifact Image (URL)</label>
            <input
              type="url"
              name="artifactImage"
              value={updatedData.artifactImage || ""}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              required
            />
          </div>



            {/* Artifact Type (Dropdown) */}
               <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Artifact Type</label>
            <select
              name="artifactType"
              value={updatedData.artifactType || ""}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              required
            >
              <option value="" disabled>
                Select a type
              </option>
              {artifactTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Historical Context */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Historical Context</label>
            <textarea
              name="historicalContext"
              value={updatedData.historicalContext || ""}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              rows="3"
              required
            />
          </div>

          {/* Present Location */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Present Location</label>
            <input
              type="text"
              name="presentLocation"
              value={updatedData.presentLocation || ""}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              required
            />
          </div>

          {/* Discovered By */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Discovered By</label>
            <input
              type="text"
              name="discoveredBy"
              value={updatedData.discoveredBy || ""}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              required
            />
          </div>

          {/* Discovered At */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Discovered At</label>
            <input
              type="text"
              name="discoveredAt"
              value={updatedData.discoveredAt || ""}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              required
            />
          </div>

          {/* Created At */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Created At</label>
            <input
              type="text"
              name="createdAt"
              value={updatedData.createdAt || ""}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              required
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Update Artifact
          </button>
        </form>
      ) : (
        <p>Artifact not found.</p>
      )}
    </div>
  );
};

export default UpdateArtifact;
