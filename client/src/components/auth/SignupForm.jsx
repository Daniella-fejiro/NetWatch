import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import {
  MdPerson,
  MdEmail,
  MdLock,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import { registerUser } from "../../services/authServices";

export default function SignupForm() {
  const navigate =
    useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [formData, setFormData] =
    useState({
      username: "",
      email: "",
      password: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await registerUser(
        formData
      );

      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div>
        <label className="text-primaryText text-sm block mb-2">
          Username
        </label>

        <div className="relative">
          <MdPerson className="absolute left-4 top-1/2 -translate-y-1/2 text-secondaryText text-xl" />

          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter username"
            required
            className="w-full bg-surface border border-white/10 rounded-xl pl-12 pr-4 py-3 text-primaryText outline-none focus:border-accent"
          />
        </div>
      </div>

      <div>
        <label className="text-primaryText text-sm block mb-2">
          Email
        </label>

        <div className="relative">
          <MdEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-secondaryText text-xl" />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
            className="w-full bg-surface border border-white/10 rounded-xl pl-12 pr-4 py-3 text-primaryText outline-none focus:border-accent"
          />
        </div>
      </div>

      <div>
        <label className="text-primaryText text-sm block mb-2">
          Password
        </label>

        <div className="relative">
          <MdLock className="absolute left-4 top-1/2 -translate-y-1/2 text-secondaryText text-xl" />

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create password"
            required
            className="w-full bg-surface border border-white/10 rounded-xl pl-12 pr-12 py-3 text-primaryText outline-none focus:border-accent"
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 text-secondaryText"
          >
            {showPassword ? (
              <MdVisibilityOff />
            ) : (
              <MdVisibility />
            )}
          </button>
        </div>
      </div>

      {error && (
        <p className="text-red-500 text-sm">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-accent text-background font-semibold py-3 rounded-xl disabled:opacity-50"
      >
        {loading
          ? "Creating Account..."
          : "Create Account"}
      </button>

      <p className="text-center text-secondaryText">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-accent"
        >
          Sign In
        </Link>
      </p>
    </form>
  );
}