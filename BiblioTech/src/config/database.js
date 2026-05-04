const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const url = process.env.URL;
const key = process.env.KEY;

const supabase = createClient(url, key);

module.exports = supabase;
