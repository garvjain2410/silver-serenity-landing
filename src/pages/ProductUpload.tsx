import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { Product } from "../data/productsData";
import cloudinary from "cloudinary";
import { getDatabase, ref, push } from "firebase/database"; // Import Firebase database functions

const ProductUpload = () => {
  const [productData, setProductData] = useState<Partial<Product>>({
    name: "",
    category: "",
    price: "",
    description: "",
    image: "",
    minOrder: "",
    purity: "",
    stoneType: "",
    features: [],
    availableSizes: "",
    sku: "",
    makingCharges: "",
    wastage: "",
    weightRange: "",
    seoDescription: "",
  });
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default"); // Replace with your actual upload preset
  
    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/dvcpapafd/image/upload", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Upload successful:", data);
      setProductData((prev) => ({ ...prev, image: data.secure_url })); // Save the uploaded image URL
    } catch (err) {
      console.error("Image upload failed:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productData.image) {
      setError("Please upload an image.");
      return;
    }

    try {
      const db = getDatabase(); // Initialize Firebase database
      const productsRef = ref(db, "products"); // Reference to the "products" collection in Firebase
  
      // Create the JSON object
      const newProduct = {
        id: Date.now(), // Generate a unique ID
        ...productData,
      };
  
      // Push the JSON object to Firebase
      await push(productsRef, newProduct);
  
      console.log("Product uploaded to Firebase:", newProduct);
      setSuccess("Product uploaded successfully!");
      setError("");
    } catch (err) {
      console.error("Failed to upload product to Firebase:", err);
      setError("Failed to upload product. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "50px auto",
        padding: 3,
        border: "1px solid #ccc",
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Upload Product
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Product Name"
          name="name"
          value={productData.name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Category"
          name="category"
          value={productData.category}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Price"
          name="price"
          value={productData.price}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Description"
          name="description"
          value={productData.description}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
          required
        />
        <TextField
          label="Minimum Order"
          name="minOrder"
          value={productData.minOrder}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Purity"
          name="purity"
          value={productData.purity}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Stone Type"
          name="stoneType"
          value={productData.stoneType}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Available Sizes"
          name="availableSizes"
          value={productData.availableSizes}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="SKU"
          name="sku"
          value={productData.sku}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Making Charges"
          name="makingCharges"
          value={productData.makingCharges}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Wastage"
          name="wastage"
          value={productData.wastage}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Weight Range"
          name="weightRange"
          value={productData.weightRange}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="SEO Description"
          name="seoDescription"
          value={productData.seoDescription}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          multiline
          rows={3}
        />
        <Button
          variant="contained"
          component="label"
          sx={{ marginTop: 2 }}
          fullWidth
        >
          Upload Image
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleImageUpload}
          />
        </Button>
        {uploading && <CircularProgress size={24} sx={{ marginTop: 2 }} />}
        {productData.image && (
          <Typography variant="body2" sx={{ marginTop: 2 }}>
            Image uploaded successfully!
          </Typography>
        )}
        {error && (
          <Typography color="error" sx={{ marginTop: 2 }}>{error}</Typography>
        )}
        {success && (
          <Typography color="success" sx={{ marginTop: 2 }}>
            {success}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: 3 }}
          fullWidth
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default ProductUpload;

