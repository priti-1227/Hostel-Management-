import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useState } from "react";
import { registerUser } from "../services/api"; // Import the mutation function
import { Navigate, useNavigate } from "react-router-dom";

// Define form data type
interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Yup Validation Schema
const schema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

const Signup = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: yupResolver(schema),
  });

  const handleFormSubmit: SubmitHandler<SignupFormData> = async (data) => {
    setIsSubmitting(true);

    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    try {
      const result = await registerUser(userData);

      console.log("Signup Response:", result);
      navigate("/dashboard");

      alert("Signup successful! Please log in.");
    } catch (error) {
      console.error("Signup Error:", error);
      alert(error || "Signup failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" mb={2}>
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <TextField
          fullWidth
          label="Name"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
          margin="normal"
        />
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
        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          {...register("confirmPassword")}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Signing up..." : "Sign Up"}
        </Button>
      </form>
    </Box>
  );
};

export default Signup;
