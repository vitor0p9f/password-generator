import CheckBox from '@react-native-community/checkbox';
import Slider from '@react-native-community/slider';
import Clipboard from 'expo-clipboard';
import { useFonts } from 'expo-font';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';

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

  function copyToClipboard(){
    Clipboard.setString(password);
    
    ToastAndroid.showWithGravityAndOffset(
      'Your password has been copied',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      0,
      100,
    );
  }

  if(!fontsLoaded) return null;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>PA**WORD{'\n'}GENERATOR</Text>

      {password !== '' &&(
        <View style={styles.passwordArea}>
          <Text style={styles.passwordLabel} onLongPress={copyToClipboard}>{password}</Text>
        </View>
      )}
      
      <Text style={styles.sizeLabel}>Size: {size} characters</Text>
      <View style={styles.slideBarContainer}>
        <Slider
          style={styles.slider}
          value={size}
          minimumValue={5}
          maximumValue={20}
          minimumTrackTintColor="#004C54"
          maximumTrackTintColor="#1E272C"
          onValueChange={value => setSize(Number(value.toFixed(0)))}
        />
      </View>

      <View style={styles.checkboxesContainer}>
        <View style={styles.checkboxContainer}>
          <CheckBox 
            value={checkedNumbers}
            style={styles.checkbox}
            onValueChange={value => checkNumbers(value)}
            tintColors={{true:'#ffffff', false:'#ffffff'}}
          />
          <Text style={styles.checkboxLabel}>Numbers</Text>
        </View>

        <View style={styles.checkboxContainer}>
          <CheckBox 
            value={checkedSpecialCharacters}
            style={styles.checkbox}
            onValueChange={value => checkSpecialCharacters(value)}
            tintColors={{true:'#ffffff', false:'#ffffff'}}
          />
          
          <Text style={styles.checkboxLabel}>Special characters</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={generatePassword}>
        <Text style={styles.buttonLabel}>Generate</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#004C54',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo:{
    textAlign: 'center',
    color: '#F8F8FF',
    fontSize: 40,
    marginBottom: 50,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 2, height: 4},
    textShadowRadius: 2
  },
  passwordArea:{
    width: 300,
    height: 45,
    backgroundColor: '#F8F8FF',
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 15,
    marginBottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 2,  
    elevation: 4,
  },
  passwordLabel:{
    fontSize: 26,
    color: '#1E272C',
    fontFamily: 'UbuntuCondensed',
  },
  slideBarContainer:{
    alignItems: 'center',
    marginBottom: 50,
    backgroundColor: '#F8F8FF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 2,  
    elevation: 5,
  },
  sizeLabel:{
    fontSize: 22,
    color: '#F8F8FF',
    letterSpacing: 1.5,
    fontFamily: 'UbuntuCondensed',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 2, height: 3},
    textShadowRadius: 2
  },
  slider: {
    width: 300, 
    height: 40, 
  },
  checkboxesContainer:{
    width: 270,
    alignItems: 'center',
  },
  checkboxContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    width: 200
  },
  checkbox:{
    marginRight: 20,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 2,  
    elevation: 5,
  },
  checkboxLabel:{
    fontSize: 22,
    color: '#F8F8FF',
    letterSpacing: 1.5,
    fontFamily: 'UbuntuCondensed',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 2, height: 3},
    textShadowRadius: 2
  },
  button:{
    backgroundColor: '#F8F8FF',
    marginTop: 50,
    borderRadius: 10,
    padding: 6,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 2,  
    elevation: 5,
  },
  buttonLabel:{
    letterSpacing: 1.5,
    fontFamily: 'UbuntuCondensed',
    fontSize: 28,
    color: '#1E272C'
  }
});
