import { useState } from "react";

const AddItem = () => {
    const [formData, setFormData] = useState({
        itemType: "Pizza",
        price: "10",
        calories: "300",
        ingredients: "Cheese, Tomato, Olives",
        image: "https://via.placeholder.com/150",
        description: "Delicious cheesy pizza with fresh ingredients.",
        category: "Fast Food",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:1000/items", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            console.log("Item added:", result);
            alert("Item added successfully!");
        } catch (error) {
            console.error("Error adding item:", error);
        }
    };

    const inputStyle = {
        width: "100%",
        padding: "10px",
        margin: "10px 0",
        border: "2px solid #ccc",
        borderRadius: "5px",
        fontSize: "16px",
    };

    return (
        <div className="text-center">
            <h2>Add food Item</h2>
            <div className="flex items-center justify-center border-2 p-8 rounded-lg">
                <form onSubmit={handleSubmit} className="w-1/2 bg-purple-300">
                    <label>Item Type</label>
                    <input 
                        type="text" 
                        name="itemType" 
                        value={formData.itemType} 
                        onChange={handleChange} 
                        style={inputStyle} 
                        required 
                    />

                    <label>Price</label>
                    <input 
                        type="number" 
                        name="price" 
                        value={formData.price} 
                        onChange={handleChange} 
                        style={inputStyle} 
                        required 
                    />

                    <label>Calories</label>
                    <input 
                        type="number" 
                        name="calories" 
                        value={formData.calories} 
                        onChange={handleChange} 
                        style={inputStyle} 
                        required 
                    />

                    <label>Ingredients</label>
                    <input 
                        type="text" 
                        name="ingredients" 
                        value={formData.ingredients} 
                        onChange={handleChange} 
                        style={inputStyle} 
                        required 
                    />

                    <label>Image URL</label>
                    <input 
                        type="url" 
                        name="image" 
                        value={formData.image} 
                        onChange={handleChange} 
                        style={inputStyle} 
                        required 
                    />

                    <label>Description</label>
                    <textarea 
                        name="description" 
                        value={formData.description} 
                        onChange={handleChange} 
                        style={inputStyle} 
                        required 
                    ></textarea>

                    <label>Category</label>
                    <input 
                        type="text" 
                        name="category" 
                        value={formData.category} 
                        onChange={handleChange} 
                        style={inputStyle} 
                        required 
                    />

                    <button type="submit" style={{ padding: "10px 20px", fontSize: "16px" }}>
                        Add Item
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddItem;
