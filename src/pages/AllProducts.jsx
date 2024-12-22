import { useContext} from "react";
import { AuthContext } from "../provider/AuthProvider";

import axios from "axios";
import { useState, useEffect } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AllProducts = () => {
    const { user, loading, emailPasswordSignIn, googleSignIn,signOutUser } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const axiosSecure=useAxiosSecure()

    // Fetch items from the API
    useEffect(() => {
        const fetchItems = async () => {
      
            if (!user?.email || loading) return;

            // axios.get(`http://localhost:1000/items?email=${user?.email}`, {withCredentials:true}).then(res=>{
            //     // console.log(res.data);
            //     setProducts(res.data);
            // })

            axiosSecure.get(`/items?email=${user?.email}`).then(res => {
                setProducts(res.data);
            });
            


        };
        fetchItems();
    }, [user?.email]);

    return (
        <div className="p-8">
            <h2 className="text-center text-2xl font-bold mb-6">All Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="border rounded-lg p-4 shadow-md bg-white"
                    >
                        <img
                            src={product.image}
                            alt={product.itemType}
                            className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <h3 className="text-xl font-bold mt-4">
                            {product.itemType}
                        </h3>
                        <p className="text-gray-600">Category: {product.category}</p>
                        <p className="text-gray-600">Price: ${product.price}</p>
                        <p className="text-gray-600">Calories: {product.calories}</p>
                        <p className="text-gray-600">
                            Ingredients: {product.ingredients}
                        </p>
                        <p className="mt-2">{product.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllProducts;

{/* 
 https://i.ibb.co/gtJPkKB/food-1.png 
 https://i.ibb.co/FsJC4Cj/food-2.png 
 https://i.ibb.co/nw2vBGP/food-4.png
 https://i.ibb.co/nzYK4KQ/Screenshot-2024-12-18-at-23-53-42.png 
 
 */}
