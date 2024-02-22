import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://onmwizcukxzrycjhzlum.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ubXdpemN1a3h6cnljamh6bHVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg1NDgyMTcsImV4cCI6MjAyNDEyNDIxN30.4I0mADew8PZww5ahXy0Avc84iS9bjL31ePqmbIWijAo";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});