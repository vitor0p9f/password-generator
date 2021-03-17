import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image , TextInput, TouchableOpacity} from 'react-native';
import Slider from '@react-native-community/slider';
import { useFonts } from 'expo-font';
import CheckBox from '@react-native-community/checkbox';

const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';
const specialCharacters = '!@#$%&*?-_';
let plainText;

export default function App() {
  let [fontsLoaded] = useFonts({
    'UbuntuCondensed': require('./assets/fonts/UbuntuCondensed-Regular.ttf'),
  });

  const [password,setPassword] = useState('');
  const [size,setSize] = useState(5);
  const [checkedNumbers,checkNumbers] = useState(false);
  const [checkedSpecialCharacters,checkSpecialCharacters] = useState(false);

  function generatePassword(){
    if(checkedNumbers && checkedSpecialCharacters){
      plainText = letters + numbers + specialCharacters;
    }else if(checkedNumbers && !checkedSpecialCharacters){
      plainText = letters + numbers;
    }else if(checkedSpecialCharacters && !checkedNumbers){
      plainText = letters + specialCharacters;
    }else{
      plainText = letters;
    }

    let generatedPassword = '';
    let n = plainText.length;

    for(let i=0; i<size; i++){
      generatedPassword += plainText.charAt(Math.floor(Math.random() * n));
    }

    setPassword(generatedPassword);
  }

  if(!fontsLoaded) return null;

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={require('./assets/locked.png')}/>

      {password !== '' &&(
        <TextInput 
          style={styles.input}
          value={password}
        />
      )}
      
      <Text style={styles.label}>Size: {size} characters</Text>
      <View style={styles.slideBarContainer}>
        <Slider
          style={styles.slider}
          value={size}
          minimumValue={5}
          maximumValue={20}
          minimumTrackTintColor="#355070"
          maximumTrackTintColor="#020202"
          onValueChange={value => setSize(Number(value.toFixed(0)))}
        />
      </View>

      <View style={styles.checkboxesContainer}>
        <View style={styles.checkboxContainer}>
          <CheckBox 
            value={checkedNumbers}
            style={styles.checkbox}
            onValueChange={value => checkNumbers(value)}
            tintColors={{true:'#f5f5f5', false:'#f5f5f5'}}
          />
          <Text style={styles.checkboxLabel}>Numbers</Text>
        </View>

        <View style={styles.checkboxContainer}>
          <CheckBox 
            value={checkedSpecialCharacters}
            style={styles.checkbox}
            onValueChange={value => checkSpecialCharacters(value)}
            tintColors={{true:'#f5f5f5', false:'#f5f5f5'}}
          />
          <Text style={styles.checkboxLabel}>Special characters</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={generatePassword}>
        <Text style={styles.buttonText}>Generate</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#355070',
    alignItems: 'center',
  },
  logo:{
    height: 90,
    width: 90,
    marginVertical: 60
  },
  input:{
    width: 300,
    height: 50,
    backgroundColor: '#646464',
    borderColor: '#f5f5f5',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 26,
    color: '#f5f5f5',
    marginBottom: 30,
    textAlign: 'center',
  },
  copy:{
    marginBottom: 30
  },
  slideBarContainer:{
    alignItems: 'center',
    marginBottom: 50,
    backgroundColor: '#f5f5f5',
    borderRadius: 5
  },
  label:{
    fontSize: 26,
    color: '#f5f5f5',
    letterSpacing: 1.5,
    fontFamily: 'UbuntuCondensed',
    marginBottom: 20
  },
  slider: {
    width: 300, 
    height: 40, 
  },
  checkboxesContainer:{
    width: 270,
    justifyContent: 'flex-start',
  },
  checkboxContainer:{
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkbox:{
    marginRight: 20,
  },
  checkboxLabel:{
    fontSize: 20,
    color: '#f5f5f5',
    letterSpacing: 1.5,
    fontFamily: 'UbuntuCondensed'
  },
  button:{
    backgroundColor: '#f5f5f5',
    padding: 5,
    marginTop: 45,
    borderRadius: 10
  },
  buttonText:{
    letterSpacing: 1.5,
    fontFamily: 'UbuntuCondensed',
    fontSize: 30
  }
});
