import { useEffect, useState } from "react";
import { api } from "../services/Api";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  Stack,
  Paper,
} from "@mui/material";
import { AddBox, Inventory2 } from "@mui/icons-material";

export default function Itens() {
  const [itens, setItens] = useState([]);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [loading, setLoading] = useState(false);

  const load = async () => {
    try {
      const res = await api.get("/itens");
      setItens(res.data);
    } catch (error) {
      console.error("Erro ao carregar itens:", error);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const create = async () => {
    if (!nome.trim() || !descricao.trim()) return;

    try {
      setLoading(true);

      await api.post("/itens", {
        nome,
        descricao,
      });

      setNome("");
      setDescricao("");
      await load();
    } catch (error) {
      console.error("Erro ao cadastrar item:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fb 0%, #eef2ff 100%)",
        p: { xs: 2, md: 4 },
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: "auto" }}>
        <Typography
          variant="body1"
          sx={{
            color: "#6b7280",
            mb: 4,
          }}
        >
          Cadastre e visualize os itens disponíveis no estoque 📦
        </Typography>

        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 5,
            borderRadius: "24px",
            border: "1px solid #e5e7eb",
            background: "#fff",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              mb: 3,
              color: "#111827",
            }}
          >
            Novo Item
          </Typography>

          <Stack spacing={3}>
            <TextField
              label="Nome do item"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "14px",
                },
              }}
            />

            <TextField
              label="Descrição"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              fullWidth
              multiline
              minRows={3}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "14px",
                },
              }}
            />

            <Box>
              <Button
                variant="contained"
                startIcon={<AddBox />}
                onClick={create}
                disabled={loading}
                sx={{
                  background: "#15176b",
                  borderRadius: "14px",
                  px: 4,
                  py: 1.5,
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "1rem",
                  boxShadow: "0 10px 24px rgba(21,23,107,0.2)",
                  "&:hover": {
                    background: "#0f1254",
                  },
                }}
              >
                {loading ? "Cadastrando..." : "Cadastrar Item"}
              </Button>
            </Box>
          </Stack>
        </Paper>

        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            color: "#111827",
            mb: 3,
          }}
        >
          Itens cadastrados
        </Typography>

        <Grid container spacing={3}>
          {itens.map((item) => (
            <Grid item xs={12} md={6} lg={4} key={item.id}>
              <Card
                sx={{
                  borderRadius: "22px",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 12px 24px rgba(0,0,0,0.06)",
                  height: "100%",
                  transition: "0.25s",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 18px 30px rgba(0,0,0,0.10)",
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Inventory2 sx={{ color: "#15176b", fontSize: 32 }} />

                    <Chip
                      label={item.status || "Disponível"}
                      sx={{
                        background:
                          item.status === "Indisponível"
                            ? "#fee2e2"
                            : "#dcfce7",
                        color:
                          item.status === "Indisponível"
                            ? "#b91c1c"
                            : "#166534",
                        fontWeight: 600,
                        borderRadius: "10px",
                      }}
                    />
                  </Box>

                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: "#111827",
                      mb: 1,
                    }}
                  >
                    {item.nome}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "#6b7280",
                      lineHeight: 1.7,
                    }}
                  >
                    {item.descricao || "Sem descrição cadastrada."}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {itens.length === 0 && (
          <Paper
            sx={{
              mt: 4,
              p: 5,
              textAlign: "center",
              borderRadius: "20px",
              background: "#fff",
              border: "1px dashed #d1d5db",
            }}
          >
            <Typography sx={{ color: "#6b7280" }}>
              Nenhum item cadastrado ainda 📭
            </Typography>
          </Paper>
        )}
      </Box>
    </Box>
  );
}