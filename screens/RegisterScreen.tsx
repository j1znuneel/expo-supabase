import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import { supabase } from '../lib/supabase';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Role } from '../types/auth';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export default function RegisterScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<Role>('staff');
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    setLoading(true);
    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role,
          },
        },
      });
      
      if (signUpError) throw signUpError;
      
      Alert.alert('Success', 'Registration successful! Please check your email for verification.');
      navigation.navigate('Login');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text h3 style={styles.header}>Register</Text>
      <Input
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.pickerContainer}>
        <Text>Role:</Text>
        <Picker
          selectedValue={role}
          onValueChange={(itemValue) => setRole(itemValue as Role)}
          style={styles.picker}
        >
          <Picker.Item label="Staff" value="staff" />
          <Picker.Item label="Manager" value="manager" />
        </Picker>
      </View>
      <Button
        title="Register"
        onPress={handleRegister}
        loading={loading}
        containerStyle={styles.button}
      />
      <Button
        title="Already have an account? Login"
        type="clear"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    marginVertical: 10,
  },
  pickerContainer: {
    marginBottom: 20,
  },
  picker: {
    marginTop: 10,
  },
});
