import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { useRouter } from 'expo-router';
import { supabase } from '../lib/supabase';
import type { AuthUser } from '../types/auth';

export default function HomeScreen() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser({
        id: user.id,
        email: user.email!,
        fullName: user.user_metadata.full_name,
        role: user.user_metadata.role,
      });
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace('/login');
  }

  return (
    <View style={styles.container}>
      <Text h4 style={styles.greeting}>
        Hi {user?.fullName}
      </Text>
      <Text style={styles.role}>
        You are {user?.role}
      </Text>
      <Button
        title="Logout"
        onPress={handleLogout}
        containerStyle={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greeting: {
    marginBottom: 10,
  },
  role: {
    marginBottom: 30,
    fontSize: 18,
  },
  button: {
    width: '100%',
    maxWidth: 200,
  },
});
