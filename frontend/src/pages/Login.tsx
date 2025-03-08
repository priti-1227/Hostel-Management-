import { TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { loginUser } from "../services/api"; // Import the mutation function

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
interface LoginFormData {
  email: string;
  password: string;
}
function Login({ onLogin }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });

  const handleFormSubmit: SubmitHandler<LoginFormData> = async (data) => {
    setIsSubmitting(true);

    const credentials = {
      email: data.email,
      password: data.password,
      type: "email",
    };

    try {
      const response = await loginUser(credentials);
      console.log("Login Response:", response);
      console.log("token", response?.token);

      if (response?.token) {
        localStorage.setItem("token", response?.token);
        onLogin(response.user);
        navigate("/dashboard");
        alert("Login successful!");
      } else {
        alert(response.message || "Login failed");
      }
    } catch (error) {
      console.error("Login Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
        <Typography variant="h5" mb={2}>
          Login
        </Typography>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <TextField
            fullWidth
            label="Email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            margin="normal"
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Box>
    </>
  );
}

export default Login;
