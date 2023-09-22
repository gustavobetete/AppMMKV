import { useState } from 'react';
import { StyleSheet, Text, TextInput, Button, View } from 'react-native';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV({id: 'myapp'});

type User = {
  name: string;
  email: string;
}

export default function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState<User>();

  function handleSave(){
    storage.set('user', JSON.stringify({name, email}));
    handleLoad();
  }

  function handleLoad(){
    const data = storage.getString('user');
    setUser(data ? JSON.parse(data) : {});
  }

  return (
    <View style={styles.container}>

      <TextInput 
        placeholder='Nome...' 
        style={styles.input}
        onChangeText={setName}
      />

      <TextInput 
        placeholder='Email...' 
        style={styles.input}
        onChangeText={setEmail}
      />
      
      <Button 
        title='Cadastrar'
        onPress={handleSave}
      />

      <Text style={styles.text}>
        {user?.name} - {user?.email} 
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 32,
    gap: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 5,
    height: 56,
    padding: 16,
    fontSize: 18,
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  }
});