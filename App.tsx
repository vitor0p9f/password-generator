import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image , TextInput, TouchableOpacity} from 'react-native';
import Slider from '@react-native-community/slider';
import { useFonts } from 'expo-font';
import CheckBox from '@react-native-community/checkbox';

export default function App() {
  let [fontsLoaded] = useFonts({
    'UbuntuCondensed': require('./assets/fonts/UbuntuCondensed-Regular.ttf'),
  });

  const [size,setSize] = useState(5);
  const [checkedNumbers,checkNumbers] = useState(false);
  const [checkedSpecialCharacters,checkSpecialCharacters] = useState(false);

  if(!fontsLoaded) return null;

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={require('./assets/locked.png')}/>

      <TextInput style={styles.input}/>

      <Image style={styles.copy} source={require('./assets/copy.png')}/>

      <View style={styles.slideBarContainer}>
        <Text style={styles.label}>Size: {size} characters</Text>
        <Slider
          style={{width: 300, height: 40}}
          minimumValue={5}
          maximumValue={20}
          minimumTrackTintColor="#f5f5f5"
          maximumTrackTintColor="#DDDDDD"
          value={size}
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

      <TouchableOpacity style={styles.button}>
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
    marginVertical: 50
  },
  input:{
    width: 300,
    height: 50,
    backgroundColor: '#DDDDDD',
    borderColor: '#f5f5f5',
    borderWidth: 5,
    borderRadius: 10,
    borderStyle: 'dashed',
    paddingHorizontal: 15,
    fontSize: 26,
    color: '#f5f5f5',
    marginBottom: 30
  },
  copy:{
    marginBottom: 30
  },
  slideBarContainer:{
    alignItems: 'center',
    height: 10,
    marginBottom: 90,
  },
  label:{
    fontSize: 26,
    color: '#f5f5f5',
    letterSpacing: 1.5,
    fontFamily: 'UbuntuCondensed'
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
