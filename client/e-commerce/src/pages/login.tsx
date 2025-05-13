import { useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { login } from "../services/authServices";  // Import the login function

const Login: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Call the login function from your service
      const response = await login(email, password);

      // Check if the response contains the token
      if (response.token) {
        // Save the token to localStorage
        localStorage.setItem("token", response.token);

        // Redirect to the home page or dashboard
        router.push("/"); // Redirect to the homepage (or a dashboard)
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      // Handle error from login failure
      setError("Something went wrong. Please try again.");
      console.error(err);
    }
  };

  return (
    <>
      <Head>
        <title>Exclusive | Login</title>
        <meta name="description" content="Login to your Exclusive account" />
      </Head>

      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">Login to Exclusive</h1>

          {error && (
            <div className="text-red-600 text-center mb-4">
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-indigo-600 hover:underline font-medium">
              Sign up
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
