import { motion, AnimatePresence } from "framer-motion";
import {
  MdClose,
  MdRouter,
  MdHub,
  MdDns,
  MdSecurity,
  MdComputer,
  MdDevices,
  MdSave,
} from "react-icons/md";

const iconMap = {
  Router: MdRouter,
  Switch: MdHub,
  Server: MdDns,
  Firewall: MdSecurity,
  PC: MdComputer,
  Other: MdDevices,
};

export default function DeviceModal({
  open,
  onClose,
  device,
  isEditing,
  setIsEditing,
  formData,
  setFormData,
  onSave,
}) {
  if (!open || !device) return null;

  const Icon = iconMap[device.type] || MdDevices;

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <AnimatePresence>
      <motion.div
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-xl max-h-[90vh] bg-surface rounded-3xl border border-white/10 overflow-hidden pointer-events-auto"
        >
          <div className="p-5 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Icon className="text-accent" size={24} />
                </div>

                <div>
                  <h2 className="text-lg font-heading font-semibold text-primaryText">
                    {device.name}
                  </h2>

                  <p className="text-sm text-secondaryText">
                    Device Details
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="text-secondaryText hover:text-primaryText transition-colors"
              >
                <MdClose size={24} />
              </button>
            </div>
          </div>

          <div className="p-5 overflow-y-auto max-h-[60vh]">
            <div className="grid gap-4">
              <Field
                label="Name"
                value={formData?.name}
                editable={isEditing}
                onChange={(value) => handleChange("name", value)}
              />

              <Field
                label="IP Address"
                value={formData?.ipAddress}
                editable={isEditing}
                onChange={(value) => handleChange("ipAddress", value)}
              />

              <Field
                label="Port"
                value={formData?.port}
                editable={isEditing}
                onChange={(value) => handleChange("port", value)}
              />

              <Field
                label="Device Type"
                value={formData?.type}
              />

              <Field
                label="Monitor Type"
                value={formData?.monitorType}
              />

              {formData?.url && (
                <Field
                  label="URL"
                  value={formData.url}
                />
              )}

              <Field
                label="Status"
                value={formData?.status}
              />
            </div>
          </div>

          <div className="p-5 border-t border-white/10 flex gap-3">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex-1 py-3 rounded-xl border border-accent text-accent font-medium hover:scale-115 transition-opacity"
              >
                Edit Device
              </button>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 py-3 rounded-xl border border-white/10 text-primaryText hover:bg-background transition-colors"
                >
                  Cancel
                </button>

                <button
                  onClick={onSave}
                  className="flex-1 py-3 rounded-xl bg-success text-white flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                  <MdSave />
                  Save Changes
                </button>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function Field({
  label,
  value,
  editable = false,
  onChange,
}) {
  return (
    <div>
      <p className="text-xs text-secondaryText mb-2">
        {label}
      </p>

      {editable ? (
        <input
          type="text"
          value={value ?? ""}
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-primaryText outline-none focus:border-accent"
        />
      ) : (
        <div className="bg-background rounded-xl px-4 py-3 text-primaryText">
          {value || "-"}
        </div>
      )}
    </div>
  );
}