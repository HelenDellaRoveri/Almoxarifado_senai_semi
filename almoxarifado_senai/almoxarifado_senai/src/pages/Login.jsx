import { Container, Box, TextField, Button, Typography, Paper, Link } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link as RouterLink, useNavigate } from "react-router-dom"; // <-- useNavigate

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate(); // <-- hook do react-router
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          width: "100%",
          bgcolor: "var(--bg)",
          border: "1px solid var(--border)",
          borderRadius: 2,
          boxShadow: "var(--shadow)",
        }}
      >
        <Typography
          variant="h4"
          sx={{ mb: 3, color: "var(--text-h)", fontWeight: 600, textAlign: "center" }}
        >
          Login
        </Typography>

        <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
            sx={{ input: { color: "var(#333)" } }}
          />
          <TextField
            label="Senha"
            type="password"
            variant="outlined"
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
            sx={{ input: { color: "var(#333)" } }}
          />
          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              bgcolor: "var(--primary)",
              "&:hover": { bgcolor: "var(--primary)" },
            }}
            onClick={() => login(email, password, navigate)} // <-- passa navigate
          >
            Entrar
          </Button>
        </Box>

        {/* Link para a página de cadastro */}
        <Typography sx={{ mt: 2, textAlign: "center", color: "#333" }}>
          Não tem uma conta?{" "}
          <Link
            component={RouterLink}
            to="/register"
            sx={{ color: "var(--accent)", fontWeight: 500, textDecoration: "none" }}
          >
            Cadastre-se
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}