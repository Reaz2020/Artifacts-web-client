import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import { useState, useEffect } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

const AllArtifacts = () => {
    const { user, loading ,setLoading} = useContext(AuthContext);
    const [artifacts, setArtifacts] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const axiosSecure = useAxiosSecure();

    // Fetching items from the API
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_CLIENT_PORT}/artifacts`, {
                    params: {
                        name: searchQuery // Send search query to the backend
                    }
                });
                setArtifacts(response.data); // Set artifacts based on the search result
                setLoading(false)
            } catch (error) {
                console.error("Error fetching artifacts:", error);
            }
        };

        fetchItems();
    }, [searchQuery]); // Re-fetch whenever the search query changes

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value); // Update the search query state
    };


    if(loading){return <Loading></Loading> }

    return (
        <div className="p-8">
            <h2 className="text-center text-2xl font-bold mb-6">All Artifacts</h2>

            {/* Search input */}
            <div className="mb-6  flex justify-center items-center">
                <input
                    type="text"
                    placeholder="Search by Artifact Name"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className=" px-4 py-2 border-2 border-sky-800 rounded-md w-1/2"
                />
            </div>

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
                        <p className="mt-2">Liked by <span className="text-red-500">{artifact.like_count}</span> person</p>

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
