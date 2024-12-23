import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import { useState, useEffect } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Link } from "react-router-dom";  // Import Link for navigation

const AllArtifacts = () => {
    const { user, loading } = useContext(AuthContext);
    const [artifacts, setArtifacts] = useState([]);
    const axiosSecure = useAxiosSecure();

    // Fetch items from the API
    useEffect(() => {
        const fetchItems = async () => {
      

            axios.get(`${import.meta.env.VITE_CLIENT_PORT}/artifacts`).then(res => {
                setArtifacts(res.data); // Set artifacts instead of products
            });
            
        };
        fetchItems();
    }, []);

    return (
        <div className="p-8">
            <h2 className="text-center text-2xl font-bold mb-6">All Artifacts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {artifacts.map((artifact) => (
                    <div
                        key={artifact._id}
                        className="border rounded-lg p-4 shadow-md bg-white"
                    >
                        <img
                            src={artifact.artifactImage}
                            alt={artifact.artifactType}
                            className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <h3 className="text-xl font-bold mt-4">{artifact.artifactType}</h3>
                        <p className="text-gray-600">Historical Context: {artifact.historicalContext}</p>
                        <p className="text-gray-600">Created At: {artifact.createdAt}</p>
                        <p className="text-gray-600">Discovered At: {artifact.discoveredAt}</p>
                        <p className="text-gray-600">Discovered By: {artifact.discoveredBy}</p>
                        <p className="mt-2">{artifact.description}</p>
                        <p className="mt-2">liked by <span className="text-red-500">{artifact.like_count}</span> person</p>

                        {/* "Details" Button to navigate to Artifact Details page */}
                        <Link 
                            to={`/artifact-details/${artifact._id}`} 
                            className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Details
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllArtifacts;
