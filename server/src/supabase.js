const path = require("path");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("SUPABASE_URL (atau NEXT_PUBLIC_SUPABASE_URL) dan SUPABASE_SERVICE_ROLE_KEY/NEXT_PUBLIC_SUPABASE_ANON_KEY wajib diatur.");
}

if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.log("Backend memakai SUPABASE_SERVICE_ROLE_KEY (service_role), fitur admin siap.");
} else {
  console.warn("SUPABASE_SERVICE_ROLE_KEY belum diatur; backend memakai NEXT_PUBLIC_SUPABASE_ANON_KEY. Fitur admin memerlukan service role key.");
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

module.exports = { supabase };
