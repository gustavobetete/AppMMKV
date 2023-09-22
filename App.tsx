import { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, Button, View } from 'react-native';
import { MMKV, useMMKVString } from 'react-native-mmkv';

const storage = new MMKV({id: 'myapp'});

type User = {
  name: string;
  email: string;
}

export default function App() {
  const [name, setName] = useMMKVString('user.name');
  const [email, setEmail] = useMMKVString('user.email');

  const [user, setUser] = useState<User>();

  function handleSave(){
    storage.set('user', JSON.stringify({name, email}));
  }

  function handleLoad(){
    const data = storage.getString('user');
    setUser(data ? JSON.parse(data) : {});
  }

  useEffect(() => {
    const listener = storage.addOnValueChangedListener((changedKey) => {
      const newValue = storage.getString(changedKey);

      console.log('NOVO VALOR => ', newValue)
    });

    return () => listener.remove();
  }, []);

  return (
    <View style={styles.container}>

      <TextInput 
        placeholder='Nome...' 
        style={styles.input}
        onChangeText={setName}
        value={name}
      />

      <TextInput 
        placeholder='Email...' 
        style={styles.input}
        onChangeText={setEmail}
        value={email}
      />
      
      <Button 
        title='Cadastrar'
        onPress={handleSave}
      />

      <Text style={styles.text}>
        {name} - {email} 
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