import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import Loading from '../components/Loading'
import useAxiosSecure from "../hooks/useAxiosSecure"; 

const LikedArtifacts = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [likedArtifacts, setLikedArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => { 
    if (user) {
      
      
      axiosSecure
      .post(`/liked-artifacts`, { email: user.email })
      .then((response) => {
          setLikedArtifacts(response.data.artifacts); 
          setLoading(false); 
      })
        .catch((err) => {
          setError("Failed to fetch liked artifacts");
          setLoading(false);
        });
    }
  }, [user]); 

 
  if (loading) {
    return <div><Loading></Loading> </div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {/* <h2 className="text-center text-semibold text-2xl font-serif ">Liked Artifacts</h2> */}
      {likedArtifacts.length === 0 ? (
        <p>You haven't liked any artifacts yet.</p>
      ) : (
<ul className=" text-center flex flex-wrap">
  {likedArtifacts.map((artifact) => (
    <li className=" border-2 sm:flex flex-col md:flex-row items-center justify-center bg-violet-200" key={artifact._id} style={{ margin: "10px", padding: "10px", borderRadius: "5px" }}>
      
     <div className="flex items-center justify-center ">
       
     
      <img className=" border-2 p-2"
        src={artifact?.artifactImage } 
        alt={artifact.name} 
        style={{ width: "250px", height: "250px", objectFit: "cover", borderRadius: "5px" }} 
       />
     </div>
    <div className="text-start mx-2 ">
    <h3> Name: {artifact.artifactName}</h3>
    <h3> Discovered by: {artifact.discoveredBy}</h3>
      <h3> Owner: {artifact?.owner_name || 'Artifact Atlas'}</h3>
     
      <p><strong>Total Likes:</strong> {artifact.like_count}</p>
    </div>
    </li>
  ))}
</ul>

      )}
    </div>
  );
};

export default LikedArtifacts;
