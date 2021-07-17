import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, ActivityIndicator, FlatList, StyleSheet, Text, View, ImageBackground, TextInput, Image, Button } from 'react-native';

import Logo from './assets/appIcon.svg';

const WeatherInfo = (props) => {
  return (
    < View
      style={styles.conditionsContainer}
    >

      {/* Title */}
      <View View style={styles.conditionsTitle} >
        <Text
          style={{
            fontSize: 20,
          }}
        >{props.data.name} Current Weather Conditions</Text>
      </View>

      {/* Details */}
      < View style={styles.detailedConditions} >

        <View style={styles.leftSection}>
          <View
            style={{
              alignItems: 'center',
              borderWidth: 2,
              borderRadius: 10,
              borderColor: '#77CCFF',
              paddingHorizontal: 10,
              paddingVertical: 10,
            }}
          >
            <Text>Temperature</Text>
            <Text
              style={{
                fontSize: 22,
              }}
            >{props.data.main.temp}</Text>
          </View>
          <View
            style={{
              marginTop: 15,
              alignItems: 'center',
              borderWidth: 2,
              borderRadius: 10,
              borderColor: '#77CCFF',
              paddingHorizontal: 10,
              paddingVertical: 10,
            }}
          >
            <Text>Min Temperature: </Text>
            <Text
              style={{
                fontSize: 22,
              }}
            >{props.data.main.temp_min}</Text>
          </View>
          <View
            style={{
              marginTop: 15,
              alignItems: 'center',
              borderWidth: 2,
              borderRadius: 10,
              borderColor: '#77CCFF',
              paddingHorizontal: 10,
              paddingVertical: 10,
            }}
          >
            <Text>Max Temperature: </Text>
            <Text
              style={{
                fontSize: 22,
              }}
            >{props.data.main.temp_max}</Text>
          </View>
          <View
            style={{
              marginTop: 15,
              alignItems: 'center',
              borderWidth: 2,
              borderRadius: 10,
              borderColor: '#77CCFF',
              paddingHorizontal: 10,
              paddingVertical: 10,
            }}
          >
            <Text>Humidity: </Text>
            <Text
              style={{
                fontSize: 22,
              }}
            >{props.data.main.humidity}</Text>
          </View>
        </View>

        <View style={styles.rightSection}>
          <View
            style={{
              alignItems: 'center',
              borderWidth: 2,
              borderRadius: 10,
              borderColor: '#77CCFF',
              paddingHorizontal: 10,
              paddingVertical: 10,
            }}
          >
            <Image
              style={{
                width: 50,
                height: 50,
              }}
              source={{
                uri: 'https://openweathermap.org/img/wn/' + props.data.weather[0].icon + '@2x.png',
              }}
            />
            <Text>{props.data.weather[0].description}</Text>
          </View>
          <View
            style={{
              marginTop: 15,
              alignItems: 'center',
              borderWidth: 2,
              borderRadius: 10,
              borderColor: '#77CCFF',
              paddingHorizontal: 10,
              paddingVertical: 10,
            }}
          >
            <Text>Wind Speed</Text>
            <Text
              style={{
                fontSize: 22,
              }}
            >{props.data.wind.speed}</Text>
          </View>
          <View
            style={{
              marginTop: 15,
              alignItems: 'center',
              borderWidth: 2,
              borderRadius: 10,
              borderColor: '#77CCFF',
              paddingHorizontal: 10,
              paddingVertical: 10,
            }}
          >
            <Text>Pressure</Text>
            <Text
              style={{
                fontSize: 22,
              }}
            >{props.data.main.pressure}</Text>
          </View>
          <View
            style={{
              marginTop: 15,
              alignItems: 'center',
              borderWidth: 2,
              borderRadius: 10,
              borderColor: '#77CCFF',
              paddingHorizontal: 10,
              paddingVertical: 10,
            }}
          >
            <Text>Feels like {props.data.main.feels_like}</Text>
          </View>
        </View>
      </ View>

      {/* Country */}
      < View style={styles.countryCode} >
        <Text>{props.data.name} is in {props.data.sys.country}</Text>
      </ View>

    </View >
  );

}



const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [reveal, setReveal] = useState(false);
  const [data, setData] = useState({});
  const [value, onChangeText] = useState('');
  const [city, setCity] = useState('');


  const searchPressed = () => {
    setCity(value);
    onChangeText('');
    console.log("yES");
  }

  const getWeather = () => {
    try {
      const city = city;
      const apiKey = "d0e8acb2f1b85bb6d8cde2a02e4c03d5";
      const units = "metric";
      const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=" + units;
      const response = fetch(url);
      const json = response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setReveal(true);
    }
  }


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
        <Logo
          style={{
            marginBottom: 5,
            width: 100,
            height: 100,
          }}
        />
        <Text style={styles.headerTitle}>City Weather</Text>
        <Text style={styles.headerSubTitle}>Get Current Weather For Any City</Text>
      </View>

      {/* Text input  */}
      <View>
        <View
          style={styles.inputBox}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps='handled'
          >
            <TextInput
              style={{
                fontSize: 15,
              }}
              onChangeText={text => onChangeText(text)}
              placeholder="Enter A City"
              value={value}
            />
          </ScrollView>
          <TouchableOpacity
            onPress={searchPressed}
            style={styles.searchIconContainer}>
            <Image

              style={styles.searchIcon}
              source={require('./assets/search.png')}
            />
          </TouchableOpacity>

        </View>
      </View>

      {isLoading ? <Text>Loading</Text> : <Text>{city}</Text>}
      {/* Weather Conditions */}

      {reveal ? <WeatherInfo data={data} /> : <Text>Ready</Text>}

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
    position: 'relative',

  },
  headerTitleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10%',
    position: 'absolute',
    top: 0,
  },
  headerTitle: {
    color: '#77ACF1',
    marginBottom: 10,
    fontSize: 30,
    fontWeight: "bold"
  },
  headerSubTitle: {
    color: '#FFf',
    marginBottom: 5,
    fontSize: 12,
    textTransform: 'uppercase',
    fontWeight: '100',
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
  inputBox: {
    color: '#FFF',
    backgroundColor: '#77ACF1',
    borderColor: '#ffd',
    borderWidth: 1,
    width: 380,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginTop: '55%',
    position: 'relative',
  },
  searchIconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: '#77CCFF',
    paddingHorizontal: 15,
    paddingVertical: 14,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    right: 0,
    top: 0,
  },
  searchIcon: {
    width: 20,
    height: 20,
  },

  // Conditions 
  conditionsContainer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
    shadowColor: '#000',
    width: 380,
    height: 500,
    marginTop: 30,

  },

  conditionsTitle: {
    marginVertical: 25,

  },
  detailedConditions: {
    display: 'flex',
    flexDirection: 'row',
    width: 370,
  },

  leftSection: {
    display: 'flex',
    width: 160,
    marginLeft: 10,

  },
  rightSection: {
    display: 'flex',
    width: 160,
    marginLeft: 30,
  },
  countryCode: {
    marginTop: 60,
  },

  power: {
    position: 'absolute',
    bottom: 10,
    color: '#F0EBCC',
  },
});

export default App;