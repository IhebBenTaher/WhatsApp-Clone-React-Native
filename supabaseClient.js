// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Replace with your Supabase project URL and Key
const supabaseUrl = 'https://godsacdygdfpltvlmjtk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvZHNhY2R5Z2RmcGx0dmxtanRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM0NDEyMTEsImV4cCI6MjA0OTAxNzIxMX0.RwoeOJhlmHlpRUtZaNigZYemTN2t8-kartS1-vJnQcY';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
