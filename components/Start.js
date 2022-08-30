import React from 'react';
import { View, Text, Button, TextInput, StyleSheet, ImageBackground } from 'react-native';

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: ""};
  }
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../assets/wallpaper.jpg')} style={styles.image}>
        <Text style={styles.title}>Let's Chat!</Text>
        <View style={styles.mainbox}></View>
        <TextInput style = {[styles.input, styles.smallText]}
        onChangeText={(name) => this.setState({ name })}
        value= {this.state.name}
        placeholder="Enter your name..."  
        />
        <Button
          title="Let's Chat"
          onPress={() => this.props.navigation.navigate('Chat', { name: this.state.name})}
        />
        </ImageBackground>
       
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  image: {
      flex: 1,
      resizeMode: 'cover',
      flexDirection: 'column',
      alignItems: 'center',
  },

  title: {
    flex: 1,
    padding: '30%',
    fontSize: 45,
    fontWeight: '600',
    color: '#B533C1',
  },

  mainbox: {
    flex: 1,
    width: '88%',
    height: '44%',
    backgroundColor: '#FFFFFF',
    marginBottom: '6%',
    paddingTop: '6%',
    paddingBottom: '6%',
    alignItems: 'center',
},
  
input: {
  width: '88%',
  padding: '2%',
  height: 50,
  
  borderColor: 'gray',
  borderWidth: 1.5,
  borderRadius: 2
},
  })