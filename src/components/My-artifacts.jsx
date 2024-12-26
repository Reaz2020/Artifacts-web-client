import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; 
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../provider/AuthProvider";
import Swal from 'sweetalert2';
import Loading from './Loading';

const MyArtifacts = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [artifacts, setArtifacts] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const navigate = useNavigate(); 

  useEffect(() => {
    if (user && user.email) {
      // Fetch artifacts for the user based on their email
      axiosSecure.get(`/my-artifacts?email=${user.email}`)
        .then((response) => {
          setArtifacts(response.data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    } else {
      setError("User is not authenticated.");
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <div><Loading></Loading> </div>;
  }

  if (error) {
    return <div>Error: {error}</div>; 
  }

  const handleUpdate = (id) => {
    // Redirect to the UpdateForm page with the artifact ID
    navigate(`/update-artifact/${id}`);
  };

  const handleDelete = (id) => {
    // Show confirmation alert before deleting
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform the deletion if confirmed
        axiosSecure
          .delete(`/delete-artifact/${id}?email=${user.email}`)
          .then((response) => {
            setArtifacts(artifacts.filter(artifact => artifact._id !== id)); // Remove artifact from state
            Swal.fire(
              'Deleted!',
              'Your artifact has been deleted.',
              'success'
            );
            navigate('/all-products');
          })
          .catch((err) => {
            console.error("Error deleting artifact:", err);
            Swal.fire(
              'Error!',
              'Failed to delete the artifact. Please try again.',
              'error'
            );
          });
      }
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">My added Artifacts</h1>
      {artifacts.length === 0 ? (
        <p>No artifacts added by you yet.</p>
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
       
              <div>
                <button
                  className="btn bg-green-600 text-white px-4 py-2 mr-2"
                  onClick={() => handleUpdate(artifact._id)}
                >
                  Update
                </button>
                <button className="btn bg-orange-500 text-white px-4 py-2" onClick={() => handleDelete(artifact._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyArtifacts;
