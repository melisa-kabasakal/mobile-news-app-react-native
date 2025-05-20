import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';

export default function TestScreen() {
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={(t) => setText(t)}
        placeholder="Türkçe karakter test"
        autoCorrect={false}
        autoCapitalize="none"
        autoFocus
      />
      <Text style={{ marginTop: 20, fontSize: 18 }}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    fontSize: 18,
  },
});
