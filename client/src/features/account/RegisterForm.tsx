import { useForm } from "react-hook-form";
import { useAccount } from "../../lib/hooks/useAccount";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Paper, Typography } from "@mui/material";
import { LockOpen } from "@mui/icons-material";
import TextInput from "../../app/shared/components/TextInput";
import { Link } from "react-router";
import {
  registerSchema,
  RegisterSchema,
} from "../../lib/schemas/registerSchema";

const RegisterForm = () => {
  const { registerUser } = useAccount();
  const {
    control,
    handleSubmit,
    setError,
    formState: { isValid, isSubmitting },
  } = useForm<RegisterSchema>({
    mode: "onTouched",
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchema) => {
    await registerUser.mutateAsync(data, {
      onError: (error) => {
        if (Array.isArray(error)) {
          error.forEach((err) => {
            if (err.includes("Email")) setError("email", { message: err });
            else if (err.includes("Password"))
              setError("password", { message: err });
          });
        }
      },
    });
  };
  return (
    <Paper
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 3,
        gap: 3,
        maxWidth: "md",
        mx: "auto",
        borderRadius: 3,
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={3}
        color="secondary.main"
      >
        <LockOpen fontSize="large" />
        <Typography variant="h4">Register</Typography>
      </Box>
      <TextInput
        control={control}
        name="email"
        label="Email"
        type="email"
        required
      />
      <TextInput
        control={control}
        name="displayName"
        label="Display name"
        type="text"
        required
      />
      <TextInput
        control={control}
        name="password"
        label="Password"
        type="password"
        required
      />
      <Button
        type="submit"
        disabled={!isValid || isSubmitting}
        variant="contained"
        size="large"
      >
        Register
      </Button>
      <Typography sx={{ textAlign: "center" }}>
        Already have an account?
        <Typography
          component={Link}
          to="/login"
          sx={{ color: "primary.main", ml: 1 }}
        >
          Login in
        </Typography>
      </Typography>
    </Paper>
  );
};

export default RegisterForm;
