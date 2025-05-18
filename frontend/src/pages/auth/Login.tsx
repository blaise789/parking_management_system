import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { signin } from "@/services/auth";
import { Eye, EyeOff } from "lucide-react";
import { BiLoaderAlt } from "react-icons/bi";

const Login: React.FC = () => {
  type LoginInputs = {
    email: string;
    password: string;
  };

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const LoginSchema = yup.object({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{6,}$/, {
        message:
          "At least 6 characters, one uppercase, one number, one special character.",
      }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: yupResolver(LoginSchema),
    mode: "onTouched",
  });

  // Helper function to generate consistent input classes
  const getInputClass = (fieldName: keyof LoginInputs) => {
    const baseClass = "w-full px-4 py-2 border rounded-lg transition";
    const errorClass = errors[fieldName] ? 'border-red-500' : 'border-gray-300 hover:border-gray-400';
    // Focus styling will override error styling when focused
    const focusClass = "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10";
    
    return `${baseClass} ${errorClass} ${focusClass}`;
  };

  const handleLogin: SubmitHandler<LoginInputs> = async (data) => {
    setLoading(true);
    try {
      await signin({
        dispatch,
        setLoading,
        email: data.email,
        password: data.password,
      });
    } catch (err) {
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <Helmet>
        <title>Login | ParkingMS </title>
      </Helmet> 

      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-blue-700 mb-2 text-center">
          Parking MS
        </h1>
        <p className="text-gray-600 text-center mb-6">Login to your account</p>

        <form className="space-y-5" onSubmit={handleSubmit(handleLogin)}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className={getInputClass('email')}
              {...register("email")}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className={getInputClass('password')}
                {...register("password")}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle Password"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition duration-200 flex items-center justify-center ${
              loading ? "opacity-80 cursor-not-allowed" : "shadow-md hover:shadow-lg"
            }`}
          >
            {loading ? (
              <>
                <BiLoaderAlt className="animate-spin mr-2" size={18} />
                Signing In...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
              Sign up
            </a>
          </p>
          <p className="mt-2">
            <a href="/forgot-password" className="text-blue-600 hover:text-blue-700 font-medium">
              Forgot your password?
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;