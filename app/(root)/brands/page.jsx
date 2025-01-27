"use client";
import { useState, useEffect } from "react";
import { FiTrash2 } from "react-icons/fi";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function BrandsManager() {
  const [brands, setBrands] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);
  const [form, setForm] = useState({ name: "", image: "" });

  // Fetch mock brands
  const fetchBrands = async () => {
    const mockBrands = [
      { _id: "1", name: "Brand A", image: "/gucci.png" },
      { _id: "2", name: "Brand B", image: "/gucci.png" },
    ];
    setBrands(mockBrands);
  };

  // Open modal for editing
  const openEditModal = (brand) => {
    setEditingBrand(brand);
    setForm({ name: brand.name, image: brand.image });
    setModalOpen(true);
  };

  // Handle image file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle brand deletion
  const deleteBrand = (id) => {
    setBrands(brands.filter((brand) => brand._id !== id));
  };

  // Remove image in edit mode
  const handleRemoveImage = () => {
    setForm({ ...form, image: "" });
  };

  // Filter brands by search term
  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Search and Add Brand Button */}
      <div className="flex justify-between items-center">
        <Input
          placeholder="Search brands..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/3"
        />
        <Button
          onClick={() => setModalOpen(true)}
          className="bg-blue-600 text-white"
        >
          Add Brand
        </Button>
      </div>

      {/* Brands Table */}
      <div className="overflow-x-auto">
        <Table className="w-full border">
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBrands.length > 0 ? (
              filteredBrands.map((brand, index) => (
                <TableRow key={brand._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{brand.name}</TableCell>
                  <TableCell>
                    <img
                      src={brand.image}
                      alt={brand.name}
                      className="w-10 h-10 object-contain rounded-full"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => openEditModal(brand)}
                        className="bg-yellow-500 text-white"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteBrand(brand._id)}
                        className="bg-red-600 text-white"
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="4" className="text-center">
                  No brands found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add/Edit Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingBrand ? "Edit Brand" : "Add Brand"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Brand Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <div className="space-y-2">
              <label className="text-gray-600">Brand Image</label>
              <Input
                type="file"
                onChange={handleImageChange}
                className="file-input w-full p-2 border border-gray-300 rounded-lg"
              />
              {form.image && (
                <div className="mt-2 relative">
                  <img
                    src={form.image}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded-lg shadow-md"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-0 right-0 p-1 bg-red-600 text-white rounded-full text-xs"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => {
                setModalOpen(false);
                setEditingBrand(null);
                setForm({ name: "", image: "" });
              }}
              className="bg-gray-400 text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setModalOpen(false);
                setEditingBrand(null);
                setForm({ name: "", image: "" });
              }}
              className="bg-blue-600 text-white"
            >
              {editingBrand ? "Save Changes" : "Add Brand"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
