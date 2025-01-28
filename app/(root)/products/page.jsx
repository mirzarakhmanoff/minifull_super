"use client";
import React, { useState, useEffect } from "react";
import { Button } from "../../../components/ui/button";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import axiosInstance from "@/lib/axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { baseImageUrl } from "@/lib/utils";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    images: [],
    brand_id: "",
    mb: "",
    is_activation_from_sales: false,
    is_new: false,
    is_popular: false,
    bonus_amount: "",
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingProductId, setDeletingProductId] = useState(null);
  const [deletingImageIndex, setDeletingImageIndex] = useState(null);

  const [loading, setLoading] = useState(false);
  const [creatingProduct, setCreatingProduct] = useState(false);
  const [updatingProduct, setUpdatingProduct] = useState(false);
  const [deletingProduct, setDeletingProduct] = useState(false);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/products");
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    const fetchBrands = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/brands");
        setBrands(response.data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBrands();
    fetchProducts();
  }, []);

  const openEditModal = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      images: product.images,
      brand_id: product.brand_id,
      mb: product.mb,
      is_activation_from_sales: product.is_activation_from_sales,
      is_new: product.is_new,
      is_popular: product.is_popular,
      bonus_amount: product.bonus_amount,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.images.length === 0) {
      alert("Image is required");
      return;
    }

    setCreatingProduct(true);

    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("brand_id", form.brand_id);
    formData.append("mb", form.mb);
    formData.append("is_activation_from_sales", form.is_activation_from_sales);
    formData.append("is_new", form.is_new);
    formData.append("is_popular", form.is_popular);
    formData.append("bonus_amount", form.bonus_amount);

    form.images.forEach((image) => {
      if (image instanceof File) {
        formData.append("images", image);
      } else {
        formData.append("images", image);
      }
    });

    try {
      if (editingProduct) {
        const response = await axiosInstance.put(
          `/products/${editingProduct._id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setProducts(
          products.map((p) =>
            p._id === editingProduct._id
              ? { ...editingProduct, ...formData }
              : p
          )
        );
      } else {
        const response = await axiosInstance.post("/products", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setProducts([...products, response.data]);
      }
      setModalOpen(false);
      setForm({
        name: "",
        description: "",
        price: "",
        images: [],
        brand_id: "",
        mb: "",
        is_activation_from_sales: false,
        is_new: false,
        is_popular: false,
        bonus_amount: "",
      });
      setEditingProduct(null);
    } catch (error) {
      console.error("Error saving product:", error);
    } finally {
      setCreatingProduct(false);
    }
  };

  const handleDeleteProduct = async () => {
    setDeletingProduct(true);
    try {
      await axiosInstance.delete(`/products/${deletingProductId}`);
      setProducts(
        products.filter((product) => product._id !== deletingProductId)
      );
      setDeleteModalOpen(false);
      setDeletingProductId(null);
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setDeletingProduct(false);
    }
  };

  const handleAddImages = (e) => {
    const newImages = Array.from(e.target.files);
    setForm({
      ...form,
      images: [...form.images, ...newImages],
    });
  };

  const handleRemoveImage = (index) => {
    setForm((prevForm) => ({
      ...prevForm,
      images: prevForm.images.filter((_, i) => i !== index),
    }));
  };

  useEffect(() => {
    setFilteredProducts(
      products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          product.price.toString().includes(searchTerm)
      )
    );
  }, [searchTerm, products]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

      {/* Search input */}
      <div className="mb-6">
        <Input
          placeholder="Search Products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>

      <Button
        onClick={() => setModalOpen(true)}
        className="mb-6 bg-blue-600 text-white"
        disabled={loading}
      >
        Add New Product
      </Button>

      {loading ? (
        <div className="text-center text-gray-500">Loading products...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-all"
            >
              <div className="mb-4">
                <img
                  src={baseImageUrl + product.images[0]}
                  alt={product.name}
                  className="w-full h-48 object-contain rounded-lg"
                />
              </div>
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-sm text-gray-500">{product.description}</p>
              <p className="text-lg font-bold mt-2">${product.price}</p>

              <div className="mt-4 flex justify-between">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => openEditModal(product)}
                  className="bg-yellow-500 text-white"
                >
                  {updatingProduct ? "Saving..." : <FiEdit />}
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    setDeletingProductId(product._id);
                    setDeleteModalOpen(true);
                  }}
                  className="bg-red-600 text-white"
                  disabled={deletingProduct}
                >
                  {deletingProduct ? "Deleting..." : <FiTrash2 />}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Product Delete Confirmation Modal */}
      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete this product?
            </DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => setDeleteModalOpen(false)}
              className="mr-2"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteProduct}
              disabled={deletingProduct}
            >
              {deletingProduct ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Product Edit/Add Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? "Edit Product" : "Add New Product"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Name */}
            <Input
              name="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Product Name"
              required
            />

            {/* Description */}
            <Input
              name="description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Description"
              required
            />

            {/* Price and MB */}
            <div className="grid grid-cols-2 gap-4">
              <Input
                name="price"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                type="number"
                placeholder="Price"
                required
              />
              <Input
                name="mb"
                value={form.mb}
                onChange={(e) => setForm({ ...form, mb: e.target.value })}
                type="number"
                placeholder="MB"
                required
              />
            </div>

            {/* Brand Selection */}
            <Select
              value={form.brand_id}
              onValueChange={(value) => setForm({ ...form, brand_id: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Brand" />
              </SelectTrigger>
              <SelectContent>
                {brands.map((brand) => (
                  <SelectItem key={brand._id} value={brand._id}>
                    {brand.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Checkbox Fields */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={form.is_activation_from_sales}
                  onChange={() =>
                    setForm({
                      ...form,
                      is_activation_from_sales: !form.is_activation_from_sales,
                    })
                  }
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span>Activation from Sales</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={form.is_new}
                  onChange={() => setForm({ ...form, is_new: !form.is_new })}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span>New Product</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={form.is_popular}
                  onChange={() =>
                    setForm({ ...form, is_popular: !form.is_popular })
                  }
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span>Popular Product</span>
              </label>
            </div>

            {/* Image Upload */}
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                {form.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={baseImageUrl + image}
                      alt={`Product Image ${index + 1}`}
                      className="w-full h-32 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleRemoveImage(index)}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
              <label className="block">
                <span className="sr-only">Upload Images</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleAddImages}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </label>
            </div>

            {/* Dialog Footer */}
            <DialogFooter>
              <Button
                variant="secondary"
                onClick={() => setModalOpen(false)}
                className="mr-2"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={creatingProduct}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {creatingProduct
                  ? "Saving..."
                  : editingProduct
                  ? "Save Changes"
                  : "Add Product"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
