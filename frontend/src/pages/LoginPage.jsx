import { useState } from "react";
import { Link } from "react-router";
import useLogin from "../hooks/useLogin";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { loginMutation, isPending, error } = useLogin();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    loginMutation(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="w-full max-w-md p-8 space-y-6 rounded-2xl shadow-xl bg-base-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary mb-2">
            Sign in to your account
          </h2>
          <p className="text-sm text-base-content">
            Don't have an account?{" "}
            <Link to="/signup" className="link link-primary">
              Sign up
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
            disabled={isPending}
            className="btn btn-primary w-full mt-2"
          >
            {isPending ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
