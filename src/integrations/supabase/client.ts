// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://mllbiuikcwhaxwzqgpap.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sbGJpdWlrY3doYXh3enFncGFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU5NTY5MzcsImV4cCI6MjA1MTUzMjkzN30.4ghFv9rtfbijxi382BH3ig87KVCdzjZculVidL-6kw8";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);