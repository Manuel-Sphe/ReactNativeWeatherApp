import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput } from 'react-native';


const AreaTextInput = (props) => {
  return (
    <TextInput
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      editable
      maxLength={40}
    />
  );
}


const App = () => {

  const [value, onChangeText] = React.useState('Useless Multiline Placeholder');

  return (
    <View style={styles.container}>

      {/* Background images */}

      <ImageBackground
        source={require('./assets/overlay.jpg')}
        style={styles.overlay}
      />
      <ImageBackground
        source={require('./assets/weather_bg.jpg')}
        style={styles.bgImage}
      />

      {/* Header Part */}
      <View style={styles.headerTitleContainer}>
        <Text style={styles.headerTitle}>Weather App</Text>
      </View>

      {/* Text input  */}

      <View
        style={{
          backgroundColor: value,
          borderBottomColor: '#000000',
          borderBottomWidth: 1,
        }}>
        <AreaTextInput
          multiline
          numberOfLines={4}
          onChangeText={text => onChangeText(text)}
          value={value}
        />
      </View>




      <Text style={styles.power}>Powered by nkululeko.io</Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',

  },
  headerTitleContainer: {
    marginTop: '20%',
  },
  headerTitle: {
    color: '#77ACF1',
    fontSize: 60,
    fontWeight: "bold"

  },
  overlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    opacity: 0.6,
    zIndex: 0,
  },
  bgImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: -1,

  },
  power: {
    position: 'absolute',
    bottom: 20,
    color: '#F0EBCC',
  },
});

export default App;