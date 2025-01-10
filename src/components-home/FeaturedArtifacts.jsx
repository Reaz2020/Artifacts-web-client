import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from '../components/Loading';
import { Link } from "react-router-dom";

const FeaturedArtifacts = () => {
  const [artifacts, setArtifacts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeaturedArtifacts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_CLIENT_PORT}/featured-artifacts`);

        // Ensuring response is an array
        if (Array.isArray(response.data)) {
          setArtifacts(response.data);
        } else {
          console.error("Unexpected response data format:", response.data);
          setArtifacts([]); 
        }
      } catch (error) {
        console.error("Error fetching featured artifacts:", error);
        setArtifacts([]); // Handle error by setting an empty array
      }
    };

    fetchFeaturedArtifacts();
  }, []);

  const handleViewDetails = (id) => {
    navigate(`/artifact-details/${id}`);
  };

  if (!Array.isArray(artifacts)) {
    return <div><Loading /></div>;
  }

  return (
    <div className="p-8 rounded-md">
      <h2 className="text-3xl font-bold text-center text-purple-600 mb-6">
        Featured Artifacts
      </h2>
      {artifacts.length === 0 ? (
        <div className="text-center text-gray-600">
          <Loading />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 ">
          {artifacts.map((artifact) => (
            <div
              key={artifact._id}
              className="bg-gray-200 shadow-md rounded-lg p-4 hover:shadow-lg transition-transform transform hover:scale-105 duration-300"
            >
              <img
                src={artifact.artifactImage}
                alt={artifact.name}
                className="rounded-lg w-full h-40 object-cover mb-4"
              />
              <h3 className="text-xl font-bold text-gray-800">{artifact.artifactName}</h3>
              <p className="text-gray-600 text-sm my-2">
                Description: {artifact.historicalContext}
              </p>
              <p className="text-xs font-semibold mb-4">
                Liked by {artifact.like_count}
              </p>
              <button
                className="btn bg-purple-500 text-white w-full"
                onClick={() => handleViewDetails(artifact._id)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="text-center">
        <Link className="btn bg-purple-500 text-white" to={'/all-products'}>
          See All Artifacts
        </Link>
      </div>
    </div>
  );
};

export default FeaturedArtifacts;
