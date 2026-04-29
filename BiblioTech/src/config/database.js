const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const url = process.env.URL;
const key = process.env.KEY;

const supabase = createClient(url, key);

module.exports = supabase;
