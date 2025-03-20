import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
export default function Login() {

    const navigate = useNavigate();

  // State to manage if it's in login or create account mode
  const [isCreateAccount, setIsCreateAccount] = useState(true);

  // State for form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Toggle between login and create account modes
  const handleToggle = () => {
    setIsCreateAccount(!isCreateAccount);
  };

  // Login function
  async function loginUser(email: string, password: string) {
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      
      localStorage.setItem("id", data.id.id);

      toast("Login succesfull!")

      navigate("/home")

    } catch (error) {
      toast.error('Login failed:' + error);
      throw error;
    }
  }

  // Register function
  async function registerUser(name: string, email: string, password: string) {
    try {
      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        throw new Error('Trainer already exists');
      }

      const data = await response.json();
      return data.newTrainer; // You can handle the registration success response here
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (isCreateAccount) {
      // If in Create Account mode, call registerUser
      try {
        const result = await registerUser(name, email, password);
        console.log("Registered successfully:", result);
      } catch (error) {
        console.error("Registration failed:", error);
      }
    } else {
      // If in Login mode, call loginUser
      try {
        const result = await loginUser(email, password);
        console.log("Logged in successfully:", result);
      } catch (error) {
        console.error("Login failed:", error);
      }
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Background image */}
      <div className="absolute top-0 left-0 w-full h-full -z-1">
        <img
          src="src/assets/poke-login-background.jpg"
          alt="Login background"
          className="w-full h-full object-cover opacity-70"
        />
      </div>

      {/* Centered form */}
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
          {/* Conditional input fields based on mode */}
          {isCreateAccount && (
            <div>
              {/* Create Account - Name Input */}
              <input
                type="text"
                id="nameInput"
                placeholder="Full Name..."
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}
          {/* Email Input */}
          <input
            type="text"
            id="emailInput"
            placeholder="Email..."
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password Input */}
          <input
            type="password"
            id="passwordInput"
            placeholder="Password..."
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Button - Login or Create Account */}
          <button
            className="w-full p-2 bg-blue-500 text-white rounded-md"
            onClick={handleSubmit}
          >
            {!isCreateAccount ? "Login" : "Create Account"}
          </button>

          {/* Toggle Button */}
          <div className="flex justify-between mt-4 text-sm">
            <label className="inline-flex items-center cursor-pointer mt-4">
              <input
                type="checkbox"
                className="sr-only peer"
                onChange={handleToggle}
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                I already have an account
              </span>
            </label>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
