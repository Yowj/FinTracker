import { useState } from "react";
import { Link } from "react-router";
import useSignup from "../hooks/useSignup";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
  });

  const { signupMutation, isLoading, error } = useSignup();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    signupMutation(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="w-full max-w-md p-8 space-y-6 rounded-2xl shadow-xl bg-base-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary mb-2">
            Create your account
          </h2>
          <p className="text-sm text-base-content">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary">
              Sign in
            </Link>
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {error && (
            <div className="alert alert-error shadow-lg">
              <span>{error}</span>
            </div>
          )}
          <div className="form-control">
            <label htmlFor="fullName" className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              value={formData.fullName}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label htmlFor="email" className="label">
              <span className="label-text">Email address</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label htmlFor="password" className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary w-full mt-2"
          >
            {isLoading ? "Creating account..." : "Sign up"}
          </button>
        </form>
      </div>
    </div>
  );
}
