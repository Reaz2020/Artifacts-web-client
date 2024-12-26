import InteractiveMap from "../components-home/InteractiveMap";
import Banner from "../components-home/Banner";
import FeaturedArtifacts from "../components-home/FeaturedArtifacts";
import TopArtifacts from "../components-home/TopArtifacs";
import { motion } from "framer-motion";
import { useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import ReactPlayer from 'react-player';

const Home = () => {
  const [isHovered, setIsHovered] = useState(false);
       // Initializing AOS
       useEffect(() => {
        AOS.init({
            duration: 2000, 
            once: true, 
        });
    }, []);

  return (
    <div> 
          <ReactPlayer 
         url="src/public/artifact.mp3"  //this only works in locl host 
        //  url="https://jumpshare.com/s/HjoM2z750ouk8vKe4GgI" 
        
        playing={true} 
        loop={true}    
        volume={0.2}   
        width="0"      
        height="0"     
      />
      <div
        className="overflow-hidden h-20 flex items-center border-2 w-full"
        onMouseEnter={() => setIsHovered(true)} // Stop on hover
        onMouseLeave={() => setIsHovered(false)} // Resume on leave
      >
        <motion.div
          className="flex space-x-28 min-w-max text-3xl font-bold"
          animate={isHovered ? { x: "0%" } : { x: ["0%", "-100%"] }} 
          transition={{
            duration: 100,
            ease: "linear",
            repeat: isHovered ? 0 : Infinity, // Stop repeating on hover
          }}
        >
          <div className="flex items-center justify-center">
            <img
              src="https://i.ibb.co/GtCMBSj/Screenshot-2024-12-24-at-00-56-27.png"
              alt="Limited Edition"
              className="h-16 p-2 rounded-xl"
            />
            <h1 className="font-serif text-lg">1944 - "Golden Era"</h1>
          </div>
          <div className="flex items-center justify-center">
            <img
              src="https://i.ibb.co/qCgm2b6/Screenshot-2024-12-24-at-00-56-07.png"
              alt="New Collection"
              className="h-16 p-2 rounded-xl"
            />
            <h1 className="font-serif text-lg">1897 - "Victorian Gem"</h1>
          </div>
          <div className="flex items-center justify-center">
            <img
              src="https://i.ibb.co/7kHfSHL/Screenshot-2024-12-24-at-00-55-50.png"
              alt="Limited Edition"
              className="h-16 p-2 rounded-xl"
            />
            <h1 className="font-serif text-lg">1765 - "Age of Discovery"</h1>
          </div>
          <div className="flex items-center justify-center">
            <img
              src="https://i.ibb.co/n1VNQsq/Screenshot-2024-12-24-at-00-55-12.png"
              alt="New Collection"
              className="h-16 p-2 rounded-xl"
            />
            <h1 className="font-serif text-lg">1520 - "Renaissance Artifact"</h1>
          </div>
          <div className="flex items-center justify-center">
            <img
              src="https://i.ibb.co/dpTjFkR/Screenshot-2024-12-24-at-00-54-51.png"
              alt="Limited Edition"
              className="h-16 p-2 rounded-xl"
            />
            <h1 className="font-serif text-lg">1939 - "World at War"</h1>
          </div>
          <div className="flex items-center justify-center">
            <img
              src="https://i.ibb.co/MGTm6HT/Screenshot-2024-12-24-at-18-48-23.png"
              alt="New Artifact"
              className="h-16 p-2 rounded-xl"
            />
            <h1 className="font-serif text-lg">1987 - "Modern Marvel"</h1>
          </div>
          <div className="flex items-center justify-center">
            <img
              src="https://i.ibb.co/7r6sbB9/Screenshot-2024-12-24-at-18-48-06.png"
              alt="Artifact Display"
              className="h-16 p-2 rounded-xl"
            />
            <h1 className="font-serif text-lg">2001 - "Millennium Piece"</h1>
          </div>
          <div className="flex items-center justify-center">
            <img
              src="https://i.ibb.co/tQS7hdF/Screenshot-2024-12-24-at-18-47-48.png"
              alt="Ancient Collection"
              className="h-16 p-2 rounded-xl"
            />
            <h1 className="font-serif text-lg">500 BCE - "Ancient Relic"</h1>
          </div>
          <div className="flex items-center justify-center">
            <img
              src="https://i.ibb.co/grWrFR4/Screenshot-2024-12-24-at-18-48-53.png"
              alt="Historical Artifact"
              className="h-16 p-2 rounded-xl"
            />
            <h1 className="font-serif text-lg">1453 - "Fall of Byzantium"</h1>
          </div>
        </motion.div>
      </div>

      <section className="text-4xl border-2 my-8">
        <Banner />
      </section>
      <section className="text-4xl border-2 " data-aos="zoom-in-up">
        <FeaturedArtifacts />
      </section>
      <section>
        <h2 className="text-2xl font-semibold text-center my-4">
          Interactive Map of Historical Artifacts
        </h2>
        <InteractiveMap />
      </section>
      <section>
        <TopArtifacts />
      </section>
    </div>
  );
};

export default Home;
