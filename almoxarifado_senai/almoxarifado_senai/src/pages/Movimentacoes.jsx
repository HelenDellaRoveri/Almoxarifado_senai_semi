import { useEffect, useState } from "react";
import { api } from "../services/Api";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Stack,
  Paper,
  Divider,
} from "@mui/material";
import {
  Refresh,
  Login,
  Logout,
  History,
  Person,
  Inventory2,
} from "@mui/icons-material";

export default function Movimentacoes() {
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    try {
      setLoading(true);

      const res = await api.get("/movimentacoes");
      setMovimentacoes(res.data);
    } catch (error) {
      console.error("Erro ao carregar movimentações:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const getTipoConfig = (tipo) => {
    if (tipo?.toLowerCase() === "entrada") {
      return {
        label: "Entrada",
        icon: <Login />,
        bg: "#dcfce7",
        color: "#166534",
      };
    }

    return {
      label: "Saída",
      icon: <Logout />,
      bg: "#fee2e2",
      color: "#b91c1c",
    };
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
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "center" }}
          spacing={2}
          mb={4}
        >
          <Box>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: "#15176b",
                mb: 1,
              }}
            >
              Histórico de Movimentações
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "#6b7280",
              }}
            >
              Visualize todas as entradas e saídas realizadas no almoxarifado 🔄
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<Refresh />}
            onClick={load}
            disabled={loading}
            sx={{
              background: "#15176b",
              borderRadius: "14px",
              px: 3,
              py: 1.5,
              textTransform: "none",
              fontWeight: 600,
              boxShadow: "0 10px 24px rgba(21,23,107,0.2)",
              "&:hover": {
                background: "#0f1254",
              },
            }}
          >
            {loading ? "Atualizando..." : "Atualizar"}
          </Button>
        </Stack>

        {movimentacoes.length === 0 ? (
          <Paper
            sx={{
              p: 6,
              textAlign: "center",
              borderRadius: "24px",
              background: "#fff",
              border: "1px dashed #d1d5db",
            }}
          >
            <History
              sx={{
                fontSize: 60,
                color: "#9ca3af",
                mb: 2,
              }}
            />

            <Typography
              variant="h6"
              sx={{
                color: "#374151",
                mb: 1,
                fontWeight: 600,
              }}
            >
              Nenhuma movimentação encontrada
            </Typography>

            <Typography sx={{ color: "#6b7280" }}>
              Assim que houver entradas ou saídas, elas aparecerão aqui 📦
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {movimentacoes.map((mov) => {
              const tipo = getTipoConfig(mov.tipo);

              return (
                <Grid item xs={12} md={6} lg={4} key={mov.id}>
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
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={2}
                      >
                        <Chip
                          icon={tipo.icon}
                          label={tipo.label}
                          sx={{
                            background: tipo.bg,
                            color: tipo.color,
                            fontWeight: 700,
                            borderRadius: "12px",
                            px: 1,
                          }}
                        />

                        {mov.data && (
                          <Typography
                            variant="caption"
                            sx={{
                              color: "#6b7280",
                              fontWeight: 500,
                            }}
                          >
                            {new Date(mov.data).toLocaleDateString("pt-BR")}{" "}
                            {new Date(mov.data).toLocaleTimeString("pt-BR", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </Typography>
                        )}
                      </Stack>

                      <Divider sx={{ mb: 2 }} />

                      <Stack spacing={2}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                          <Inventory2 sx={{ color: "#15176b" }} />
                          <Box>
                            <Typography
                              variant="caption"
                              sx={{ color: "#6b7280" }}
                            >
                              Item
                            </Typography>

                            <Typography
                              sx={{
                                fontWeight: 600,
                                color: "#111827",
                              }}
                            >
                              {mov.item}
                            </Typography>
                          </Box>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                          <Person sx={{ color: "#15176b" }} />
                          <Box>
                            <Typography
                              variant="caption"
                              sx={{ color: "#6b7280" }}
                            >
                              Usuário
                            </Typography>

                            <Typography
                              sx={{
                                fontWeight: 600,
                                color: "#111827",
                              }}
                            >
                              {mov.usuario}
                            </Typography>
                          </Box>
                        </Box>

                        {mov.observacao && (
                          <Box>
                            <Typography
                              variant="caption"
                              sx={{ color: "#6b7280" }}
                            >
                              Observação
                            </Typography>

                            <Typography
                              sx={{
                                mt: 0.5,
                                color: "#4b5563",
                                lineHeight: 1.7,
                              }}
                            >
                              {mov.observacao}
                            </Typography>
                          </Box>
                        )}
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Box>
    </Box>
  );
}