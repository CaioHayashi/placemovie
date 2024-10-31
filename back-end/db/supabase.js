import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

// Configurações do Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Criando o cliente do Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
