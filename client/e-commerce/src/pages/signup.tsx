import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signUp } from "../services/authServices";

const SignUp = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    console.log(formData);
    const { name, email, password, rePassword } = formData;

    if (password !== rePassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await signUp(name, email, password, rePassword);
      router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
    } catch (err) {
      setError("Signup failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Exclusive</h1>
          <p className="mt-2 text-gray-600">Create your account</p>
        </div>

        {error && <p className="text-red-600 mb-4 text-sm">{error}</p>}

        <form className="space-y-6" onSubmit={handleSubmit}>
          {[
            { id: "name", label: "Full Name" },
            { id: "email", label: "Email" },
            { id: "password", label: "Password" },
            { id: "rePassword", label: "Confirm Password" },
          ].map(({ id, label }) => (
            <div key={id}>
              <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {label}
              </label>
              <input
                type={
                  id.toLowerCase().includes("password") ? "password" : "text"
                }
                id={id}
                value={formData[id as keyof typeof formData]}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
          >
            Create Account
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
