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

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    images: [],
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingProductId, setDeletingProductId] = useState(null);
  const [deletingImageIndex, setDeletingImageIndex] = useState(null);

  const mockData = [
    {
      _id: "1",
      name: "Product 1",
      description: "Description for Product 1",
      price: 100,
      images: ["/gucci.png"],
    },
    {
      _id: "2",
      name: "Product 2",
      description: "Description for Product 2",
      price: 200,
      images: ["/gucci.png"],
    },
    {
      _id: "3",
      name: "Product 3",
      description: "Description for Product 3",
      price: 300,
      images: ["/gucci.png"],
    },
  ];

  useEffect(() => {
    setProducts(mockData);
    setFilteredProducts(mockData);
  }, []);

  const openEditModal = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      images: product.images,
    });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProduct) {
      setProducts(
        products.map((p) =>
          p._id === editingProduct._id ? { ...editingProduct, ...form } : p
        )
      );
    } else {
      const newProduct = { ...form, _id: Date.now().toString() };
      setProducts([...products, newProduct]);
    }
    setModalOpen(false);
    setForm({ name: "", description: "", price: "", images: [] });
    setEditingProduct(null);
  };

  const handleDeleteProduct = () => {
    setProducts(
      products.filter((product) => product._id !== deletingProductId)
    );
    setDeleteModalOpen(false);
    setDeletingProductId(null);
  };

  const handleDeleteImage = () => {
    setForm({
      ...form,
      images: form.images.filter((_, i) => i !== deletingImageIndex),
    });
    setDeletingImageIndex(null);
  };

  const handleAddImages = (e) => {
    const newImages = Array.from(e.target.files).map((file) =>
      URL.createObjectURL(file)
    );
    setForm({
      ...form,
      images: [...form.images, ...newImages],
    });
  };

  const handleRemoveImage = (index) => {
    setDeletingImageIndex(index);
  };

  // Filter products based on the search term (name, description, price)
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
      >
        Add New Product
      </Button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-all"
          >
            <div className="mb-4">
              <img
                src={product.images[0]}
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
                <FiEdit />
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  setDeletingProductId(product._id);
                  setDeleteModalOpen(true);
                }}
                className="bg-red-600 text-white"
              >
                <FiTrash2 />
              </Button>
            </div>
          </div>
        ))}
      </div>

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
              className="bg-red-600 text-white"
            >
              Yes, Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal for adding/editing a product */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? "Edit Product" : "Add Product"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Input
                placeholder="Product Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full"
              />
              <Input
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full"
              />
              <Input
                type="number"
                placeholder="Price"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full"
              />
              <div className="space-y-2">
                <Input
                  type="file"
                  multiple
                  onChange={handleAddImages}
                  className="w-full"
                />
                <div className="flex flex-wrap gap-2">
                  {form.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Image ${index}`}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-0 right-0 text-red-600 bg-white rounded-full p-1"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="secondary"
                onClick={() => {
                  setModalOpen(false);
                  setEditingProduct(null);
                  setForm({ name: "", description: "", price: "", images: [] });
                }}
                className="mr-2"
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 text-white">
                {editingProduct ? "Save Changes" : "Add Product"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
