const { supabase } = require("./supabase");

async function requireUser(req, res, next) {
  try {
    const token = extractToken(req);
    if (!token) return res.status(401).json({ error: "Sesi tidak ditemukan. Silakan login." });

    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data.user) return res.status(401).json({ error: "Sesi tidak valid. Silakan login ulang." });

    const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).maybeSingle();
    req.user = data.user;
    req.profile = profile;
    next();
  } catch (err) {
    res.status(401).json({ error: err.message || "Autentikasi gagal." });
  }
}

function extractToken(req) {
  const header = req.headers.authorization || "";
  return header.startsWith("Bearer ") ? header.slice(7) : "";
}

// Endpoint publik: tetap memuat req.user & req.profile bila ada token valid.
async function optionalUser(req, res, next) {
  try {
    const token = extractToken(req);
    if (token) {
      const { data, error } = await supabase.auth.getUser(token);
      if (!error && data.user) {
        const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).maybeSingle();
        req.user = data.user;
        req.profile = profile;
      }
    }
    next();
  } catch {
    next();
  }
}

function requireRole(...roles) {
  return (req, res, next) => {
    const role = req.profile?.role;
    if (!role || !roles.includes(role)) {
      return res.status(403).json({ error: "Akses ditolak." });
    }
    next();
  };
}

module.exports = { requireUser, requireRole, optionalUser };
