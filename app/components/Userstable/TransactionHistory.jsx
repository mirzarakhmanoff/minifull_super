"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axiosInstance from "@/lib/axios";
import { Loader2, Trash2 } from "lucide-react";

export default function DataTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editedUser, setEditedUser] = useState({
    id: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    role: "",
    third_name: "",
    inn: "",
    email: "",
    sponsor_id: "",
    passport: "",
    passport_issued: "",
    passport_whom_by: "",
    country: "",
    degree_id: "",
    register_id: "",
    is_active: false,
    left_pv: 0,
    right_pv: 0,
    mb: 0,
    balance: 0,
  });

  const [usersData, setUsersData] = useState([]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/users");
      setUsersData(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredData = usersData.filter(
    (item) =>
      item.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditClick = (user) => {
    setEditedUser({ ...user });
    setModalOpen(true);
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      await axiosInstance.put(`/users/${editedUser._id}`, editedUser);
      fetchUsers();
      setModalOpen(false);
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setIsDeleting(true);
    try {
      await axiosInstance.delete(`/users/${id}`);
      fetchUsers();
      setConfirmDeleteOpen(false);
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const userFields = [
    "first_name",
    "last_name",
    "phone_number",
    "role",
    "inn",
    "passport",
    "passport_issued",
    "passport_whom_by",
    "country",
    "email",
    "register_id",
    "balance",
  ];

  return (
    <div className="p-4">
      <Input
        type="text"
        className="mb-4"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Balance</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row._id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{`${row.first_name} ${row.last_name}`}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>
                  <span
                    className={`${
                      row.is_active
                        ? "text-green-600 font-semibold"
                        : "text-red-600 font-semibold"
                    }`}
                  >
                    {row.is_active ? "Active" : "Inactive"}
                  </span>
                </TableCell>
                <TableCell>{row.balance}</TableCell>
                <TableCell className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditClick(row)}
                    disabled={loading}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setConfirmDeleteOpen(true)}
                    disabled={loading}
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit User Modal */}
      {modalOpen && (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="max-w-5xl w-full p-8">
            <DialogTitle>
              <VisuallyHidden>Edit User</VisuallyHidden>
            </DialogTitle>
            <DialogHeader>
              <h3 className="text-xl font-semibold mb-6">Edit User</h3>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-6">
              <div>
                {userFields.slice(0, 7).map((field) => (
                  <div key={field} className="mb-4">
                    <Label htmlFor={field}>
                      {field.replace("_", " ").toUpperCase()}
                    </Label>
                    <Input
                      id={field}
                      value={editedUser[field]}
                      onChange={(e) =>
                        setEditedUser({
                          ...editedUser,
                          [field]: e.target.value,
                        })
                      }
                    />
                  </div>
                ))}
              </div>
              <div>
                {userFields.slice(7).map((field) => (
                  <div key={field} className="mb-4">
                    <Label htmlFor={field}>
                      {field.replace("_", " ").toUpperCase()}
                    </Label>
                    <Input
                      id={field}
                      value={editedUser[field]}
                      onChange={(e) =>
                        setEditedUser({
                          ...editedUser,
                          [field]: e.target.value,
                        })
                      }
                    />
                  </div>
                ))}

                <div className="mb-4">
                  <Label htmlFor="is_active">Активность</Label>
                  <select
                    id="is_active"
                    value={editedUser.is_active ? "active" : "inactive"}
                    onChange={(e) =>
                      setEditedUser({
                        ...editedUser,
                        is_active: e.target.value === "active",
                      })
                    }
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="active">Активный</option>
                    <option value="inactive">Неактивный</option>
                  </select>
                </div>
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button variant="outline" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="solid"
                onClick={handleSaveChanges}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Save Changes"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {confirmDeleteOpen && (
        <Dialog open={confirmDeleteOpen} onOpenChange={setConfirmDeleteOpen}>
          <DialogContent className="w-full p-8">
            <DialogTitle>
              <VisuallyHidden>Confirm Deletion</VisuallyHidden>
            </DialogTitle>
            <DialogHeader>
              <h3 className="text-xl font-semibold mb-6">Are you sure?</h3>
              <p className="text-lg text-gray-600">
                This action cannot be undone.
              </p>
            </DialogHeader>
            <DialogFooter className="mt-6">
              <Button
                variant="outline"
                onClick={() => setConfirmDeleteOpen(false)}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(editedUser._id)}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Delete"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
