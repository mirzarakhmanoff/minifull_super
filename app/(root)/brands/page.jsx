"use client";
import { useState, useEffect } from "react";
import { FiTrash2 } from "react-icons/fi";
import axios from "../../../lib/axios";
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
import { LoaderCircle } from "lucide-react";

export default function BrandsManager() {
  const [brands, setBrands] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);
  const [form, setForm] = useState({ name: "", image: "" });
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [brandToDelete, setBrandToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchBrands = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/brands");
      setBrands(response.data);
    } catch (error) {
      console.error("Error fetching brands:", error);
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (brand) => {
    setEditingBrand(brand);
    setForm({ name: brand.name, image: brand.image });
    setModalOpen(true);
  };

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

  const handleDeleteBrand = (brand) => {
    setBrandToDelete(brand);
    setConfirmDeleteModalOpen(true);
  };

  const deleteBrand = async () => {
    setDeleteLoading(true);
    try {
      await axios.delete(`/brands/${brandToDelete._id}`);
      setBrands(brands.filter((brand) => brand._id !== brandToDelete._id));
      setConfirmDeleteModalOpen(false);
      setBrandToDelete(null);
    } catch (error) {
      console.error("Error deleting brand:", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const updateBrand = async () => {
    setModalLoading(true);
    try {
      const brandData = { ...form };
      await axios.put(`/brands/${editingBrand._id}`, brandData);
      fetchBrands();
      setModalOpen(false);
      setEditingBrand(null);
      setForm({ name: "", image: "" });
    } catch (error) {
      console.error("Error updating brand:", error);
    } finally {
      setModalLoading(false);
    }
  };

  const addBrand = async () => {
    setModalLoading(true);
    try {
      const brandData = { ...form };
      await axios.post("/brands", brandData);
      fetchBrands();
      setModalOpen(false);
      setForm({ name: "", image: "" });
    } catch (error) {
      console.error("Error adding brand:", error);
    } finally {
      setModalLoading(false);
    }
  };

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <div className="p-6 space-y-6">
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

      {loading ? (
        <div className="flex justify-center items-center py-6">
          <LoaderCircle className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      ) : (
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
                          onClick={() => handleDeleteBrand(brand)}
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
      )}

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
                if (editingBrand) {
                  updateBrand();
                } else {
                  addBrand();
                }
              }}
              className="bg-blue-600 text-white"
            >
              {modalLoading ? (
                <LoaderCircle className="w-4 h-4 animate-spin" />
              ) : editingBrand ? (
                "Save Changes"
              ) : (
                "Add Brand"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={confirmDeleteModalOpen}
        onOpenChange={setConfirmDeleteModalOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setConfirmDeleteModalOpen(false)}
              className="bg-gray-400 text-white"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={deleteBrand}
              className="bg-red-600 text-white"
            >
              {deleteLoading ? (
                <LoaderCircle className="w-4 h-4 animate-spin" />
              ) : (
                "Yes, Delete"
              )}{" "}
              {/* Заменили Spinner на LoaderCircle */}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
