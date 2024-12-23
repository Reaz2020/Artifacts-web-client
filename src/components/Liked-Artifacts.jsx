import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";

const LikedArtifacts = () => {
  const { user } = useContext(AuthContext);
  const [likedArtifacts, setLikedArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => { 
    if (user) {
      // Fetch liked artifacts when the user is available
      axios
        .post("http://localhost:1000/liked-artifacts", { email: user.email })
        .then((response) => {
          setLikedArtifacts(response.data.artifacts); // Set the artifacts in the state
          setLoading(false); // Set loading to false after data is fetched
        })
        .catch((err) => {
          setError("Failed to fetch liked artifacts");
          setLoading(false);
        });
    }
  }, [user]); // Only run the effect when the user changes

  // Display loading, error, or the list of liked artifacts
  if (loading) {
    return <div>Loading liked artifacts...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Liked Artifacts</h2>
      {likedArtifacts.length === 0 ? (
        <p>You haven't liked any artifacts yet.</p>
      ) : (
<ul className=" md:text-center">
  {likedArtifacts.map((artifact) => (
    <li key={artifact._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px", borderRadius: "5px" }}>
       <h3>{artifact.artifactName}</h3>
      <img className=""
        src={artifact?.artifactImage } 
        alt={artifact.name} 
        style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "5px" }} 
      />
      <h3>{artifact.name}</h3>
      <p>{artifact.description}</p>
      <p><strong>Likes:</strong> {artifact.like_count}</p>
    </li>
  ))}
</ul>

      )}
    </div>
  );
};

export default LikedArtifacts;
