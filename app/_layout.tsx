import { useEffect } from 'react';
import { Slot, useRouter, useSegments } from 'expo-router';
import { supabase } from '../lib/supabase';
import { Session } from '@supabase/supabase-js';

export default function RootLayout() {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      handleSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      handleSession(session);
    });
  }, []);

  const handleSession = (session: Session | null) => {
    const inAuthGroup = segments[0] === '(auth)';
    
    if (session && inAuthGroup) {
      // Redirect authenticated users to home
      router.replace('/home');
    } else if (!session && !inAuthGroup) {
      // Redirect unauthenticated users to login
      router.replace('/login');
    }
  };

  return <Slot />;
}
