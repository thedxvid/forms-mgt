import { createClient } from '@supabase/supabase-js';

// ⚠️ Substitua pelos valores do seu projeto Supabase
// Settings → API → Project URL
const SUPABASE_URL = 'https://tkwcddkddtfihanuhtqp.supabase.co';
// Settings → API → anon public key
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrd2NkZGtkZHRmaWhhbnVodHFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyMjUzNTMsImV4cCI6MjA4NzgwMTM1M30.hQkIa4vftDvhHdQZ4aD_aeTgTjx7RTmhvAq8mgXlqZQ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
