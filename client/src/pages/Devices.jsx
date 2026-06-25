import { useEffect, useState } from "react";

import DevicesHeader from "../components/devices/DeviceHeader";
import DeviceList from "../components/devices/DeviceLIst";
import DeviceStats from "../components/devices/DeviceStats";
import DeviceModal from "../components/devices/DeviceModal";
import AddDeviceModal from "../components/devices/AddDeviceForm";

export default function Devices() {
  const API_URL = "http://localhost:5000/api/device";

  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  const [selectedDevice, setSelectedDevice] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newDevice, setNewDevice] = useState({
    name: "",
    ipAddress: "",
    port: "",
    type: "Router",
    monitorType: "PING",
    url: "",
  });

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");

    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  const fetchDevices = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL, {
        headers: getAuthHeaders(),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch devices");
      }

      setDevices(result.data || []);
    } catch (err) {
      console.error("Fetch devices error:", err);
      setError(err.message || "Failed to fetch devices");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  const filteredDevices = devices.filter((device) => {
    const matchesSearch =
      device.name?.toLowerCase().includes(search.toLowerCase()) ||
      device.ipAddress?.includes(search);

    const matchesStatus =
      statusFilter === "All" || device.status === statusFilter;

    const matchesType =
      typeFilter === "All" || device.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const handleAdd = () => {
    setAddModalOpen(true);
  };

  const handleCreateDevice = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          name: newDevice.name,
          ipAddress: newDevice.ipAddress,
          port: Number(newDevice.port),
          type: newDevice.type,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create device");
      }

      setDevices((prev) => [result.data, ...prev]);

      setAddModalOpen(false);

      setNewDevice({
        name: "",
        ipAddress: "",
        port: "",
        type: "Router",
        monitorType: "PING",
        url: "",
      });
    } catch (err) {
      console.error("Create device error:", err);
      alert(err.message);
    }
  };

  const handleDelete = async (device) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${device.name}?`
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `${API_URL}/${device._id}`,
        {
          method: "DELETE",
          headers: getAuthHeaders(),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete device");
      }

      setDevices((prev) =>
        prev.filter((d) => d._id !== device._id)
      );
    } catch (err) {
      console.error("Delete device error:", err);
      alert(err.message);
    }
  };

  const handleView = (device) => {
    setSelectedDevice(device);
    setFormData(device);
    setIsEditing(false);
    setModalOpen(true);
  };

  const handleEdit = (device) => {
    setSelectedDevice(device);
    setFormData(device);
    setIsEditing(true);
    setModalOpen(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `${API_URL}/${selectedDevice._id}`,
        {
          method: "PUT",
          headers: getAuthHeaders(),
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update device");
      }

      setDevices((prev) =>
        prev.map((device) =>
          device._id === selectedDevice._id
            ? result.data
            : device
        )
      );

      setModalOpen(false);
      setIsEditing(false);
      setSelectedDevice(null);
    } catch (err) {
      console.error("Update device error:", err);
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex flex-col items-center justify-center w-full gap-4">
        <div className="p-6 border border-24 rounded-full border-accent border-t-transparent animate-spin"></div>
        <p className="text-3xl text-accent font-heading">Loading Devices...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-500 text-3xl font-heading">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <DevicesHeader
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        onAdd={handleAdd}
      />

      <DeviceStats devices={filteredDevices} />

      <DeviceList
        devices={filteredDevices}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <DeviceModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setIsEditing(false);
          setSelectedDevice(null);
        }}
        device={selectedDevice}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSave}
      />

      <AddDeviceModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        formData={newDevice}
        setFormData={setNewDevice}
        onSubmit={handleCreateDevice}
      />
    </div>
  );
}