import React from 'react';
import { View, Text, Button, TextInput, StyleSheet, ImageBackground, Pressable, TouchableOpacity } from 'react-native';

import BackgroundImage from '../assets/wallpaper.jpg';
import Icon from "../assets/icon.svg";

// Create constant that holds background colors for Chat Screen
const colors = {
  black: "#090C08",
  purple: "#474056",
  grey: "#8A95A5",
  green: "#B9C6AE",
};

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      color:''
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={BackgroundImage}
         resizeMode='cover'
         style={styles.image}>
        <Text style={styles.title}>Let's Chat!</Text>
        <View style={styles.mainbox}></View>
       
        <TextInput style = {styles.input}
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
    // fontFamily: 'Poppins-BoldItalic',
    padding: '30%',
    fontSize: 45,
    fontWeight: '600',
    color: '#B533C1',
  },

  
input: {
  width: '88%',
  padding: '2%',
  height: 50,
  alignItems: 'center',
  borderColor: 'gray',
  borderWidth: 1.5,
  borderRadius: 2
},
  })