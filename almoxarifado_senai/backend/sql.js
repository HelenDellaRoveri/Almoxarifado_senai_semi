import postgres from "postgres";
import dotenv from "dotenv";
dotenv.config();


export const sql = postgres(process.env.DATABASE_URL, {
  ssl: 'require'
});

// DATABASE_URL='postgresql://neondb_owner:npg_DFHtjiYpu9m6@ep-icy-moon-aci3w5pn-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
// JWT_SECRET=secreto