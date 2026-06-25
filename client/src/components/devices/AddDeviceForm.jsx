import { motion, AnimatePresence } from "framer-motion";
import { MdClose, MdAdd } from "react-icons/md";

export default function AddDeviceModal({
  open,
  onClose,
  formData,
  setFormData,
  onSubmit,
}) {
  if (!open) return null;

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

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-xl bg-surface rounded-3xl border border-white/10 overflow-hidden"
        >
          <div className="p-5 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-heading font-semibold text-primaryText">
                  Add Device
                </h2>
                <p className="text-sm text-secondaryText">
                  Register a new network device for monitoring.
                </p>
              </div>

              <button
                onClick={onClose}
                className="text-secondaryText hover:text-primaryText transition-colors"
              >
                <MdClose size={24} />
              </button>
            </div>
          </div>

          <div className="p-5 max-h-[65vh] overflow-y-auto">
            <div className="grid gap-4">
              <InputField
                label="Device Name"
                value={formData.name}
                onChange={(value) => handleChange("name", value)}
                placeholder="Core Router"
              />

              <InputField
                label="IP Address"
                value={formData.ipAddress}
                onChange={(value) => handleChange("ipAddress", value)}
                placeholder="192.168.1.1"
              />

              <InputField
                label="Port"
                type="number"
                value={formData.port}
                onChange={(value) => handleChange("port", value)}
                placeholder="80"
              />

              <SelectField
                label="Device Type"
                value={formData.type}
                onChange={(value) => handleChange("type", value)}
                options={[
                  "Router",
                  "Switch",
                  "Server",
                  "Firewall",
                  "PC",
                  "Other",
                ]}
              />

              <SelectField
                label="Monitor Type"
                value={formData.monitorType}
                onChange={(value) => handleChange("monitorType", value)}
                options={["PING", "HTTP"]}
              />

              {formData.monitorType === "HTTP" && (
                <InputField
                  label="URL"
                  value={formData.url}
                  onChange={(value) => handleChange("url", value)}
                  placeholder="https://example.com"
                />
              )}
            </div>
          </div>

          <div className="p-5 border-t border-white/10 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-white/10 text-primaryText"
            >
              Cancel
            </button>

            <button
              onClick={onSubmit}
              className="flex-1 py-3 rounded-xl bg-accent text-background font-medium flex items-center justify-center gap-2"
            >
              <MdAdd />
              Add Device
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}) {
  return (
    <div>
      <p className="text-xs text-secondaryText mb-2">
        {label}
      </p>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-primaryText outline-none focus:border-accent"
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}) {
  return (
    <div>
      <p className="text-xs text-secondaryText mb-2">
        {label}
      </p>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-primaryText outline-none focus:border-accent"
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}