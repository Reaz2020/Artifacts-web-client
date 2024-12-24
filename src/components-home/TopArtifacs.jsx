import React from "react";

const TopArtifacts = () => {
  
  const artifacts = [
    {
      id: 1,
      name: "Golden Amulet",
      buyer: "Sheikh Ahmed Al-Farsi", 
      images: [
        "https://i.ibb.co/GtCMBSj/Screenshot-2024-12-24-at-00-56-27.png",
      ], 
      size: "col-span-1 row-span-2", 
      description: "An ancient amulet believed to bring prosperity and protection to its wearer.",
    },
    {
      id: 2,
      name: "Ancient Vase",
      buyer: "Sheikh Zayed Al-Nahyan", 
      images: [
        "https://i.ibb.co/qCgm2b6/Screenshot-2024-12-24-at-00-56-07.png",
        "https://i.ibb.co/7kHfSHL/Screenshot-2024-12-24-at-00-55-50.png",
      ],
      size: "row-span-3",
      description: "A beautifully preserved vase from the Ming Dynasty, adorned with intricate patterns.",
    },
    {
      id: 3,
      name: "Silver Crown",
      buyer: "John Hove", 
      images: [
        "https://i.ibb.co/7kHfSHL/Screenshot-2024-12-24-at-00-55-50.png",
      ], 
      size: "col-span-1 row-span-2", 
      description: "A regal silver crown worn by a medieval king, symbolizing power and grace.",
    },
    {
      id: 4,
      name: "Emerald Tablet",
      buyer: "Emily Davison",
      images: ["https://i.ibb.co/n1VNQsq/Screenshot-2024-12-24-at-00-55-12.png"],
      size: "row-span-3",
      description: "A legendary tablet inscribed with alchemical secrets and mystical knowledge.",
    },
    {
      id: 5,
      name: "Ruby Scepter",
      buyer: "John Doe", 
      images: ["https://i.ibb.co/dpTjFkR/Screenshot-2024-12-24-at-00-54-51.png"],
      size: "col-span-1 row-span-2", 
      description: "A scepter encrusted with rubies, signifying wealth and authority in ancient times.",
    },
  ];

  return (
    <div className="p-6 bg-gray-50">
      <h2 className="text-2xl font-bold text-center mb-8">Top Prized Artifacts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {artifacts.map((artifact) => (
          <div
            key={artifact.id}
            className={`bg-white border rounded-lg shadow-md overflow-hidden flex flex-col p-4 ${artifact.size}`}
          >
            <div className="flex flex-wrap gap-2">
              {artifact.name === "Ancient Vase" ? (
            
                artifact.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${artifact.name} Image ${index + 1}`}
                    className="w-full h-40 object-cover rounded-md mb-2"
                  />
                ))
              ) : artifact.name === "Ruby Scepter" || artifact.name === "Golden Amulet" || artifact.name === "Silver Crown" ? (
               
                <img
                  key={0}
                  src={artifact.images[0]}
                  alt={`${artifact.name} Image`}
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
         
                artifact.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${artifact.name} Image ${index + 1}`}
                    className={`${
                      artifact.size === "row-span-2" ? "w-1/2 h-24" : "w-full h-40"
                    } object-cover rounded-md`}
                  />
                ))
              )}
            </div>
            <div className="text-center mt-4">
              <h3 className="text-lg font-semibold">{artifact.name}</h3>
              <p className="text-sm text-gray-600">Buyer: {artifact.buyer}</p>
              <p className="text-sm text-gray-500 mt-2">{artifact.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopArtifacts;
