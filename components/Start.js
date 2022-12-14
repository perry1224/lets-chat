import React from "react";

import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  ImageBackground,
  Pressable,
  TouchableOpacity,
  Image,
} from "react-native";

import BackgroundImage from "../assets/wallpaper.jpg";
//  import Icon from "../assets/icon.png";

export default class Start extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      bgColor: "",
    };
  }
  // function to update the state with the new background color for Chat Screen chosen by the user
  changeBgColor = (newColor) => {
    this.setState({ bgColor: newColor });
  };
  // backgroud colors to choose
  colors = {
    black: "#090C08",
    purple: "#474056",
    grey: "#8A95A5",
    green: "#B9C6AE",
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={BackgroundImage}
          resizeMode="cover"
          style={styles.image}
        >
          <View style={styles.titleBox}>
            <Text style={styles.title}>Let's Chat!</Text>
          </View>

          <View style={styles.inputMain}>
            <View style={styles.inputBox}>
              <Image
                source={require('../assets/icon.png')}
                style={{ width: 20, height: 20 }}
              />
              <TextInput
                style={styles.input}
                onChangeText={(name) => this.setState({ name })}
                value={this.state.name}
                placeholder="Enter your name..."
              />
            </View>

            <View style={styles.colorBox}>
              <Text style={styles.chooseColor}>Choose background color</Text>
            </View>

            {/* Change color background here */}
            <View style={styles.colorArray}>
              <TouchableOpacity
                style={[
                  { backgroundColor: this.colors.black },
                  styles.colorButton,
                ]}
                onPress={() => this.changeBgColor(this.colors.black)}
              ></TouchableOpacity>
              <TouchableOpacity
                style={[
                  { backgroundColor: this.colors.purple },
                  styles.colorButton,
                ]}
                onPress={() => this.changeBgColor(this.colors.purple)}
              ></TouchableOpacity>
              <TouchableOpacity
                style={[
                  { backgroundColor: this.colors.grey },
                  styles.colorButton,
                ]}
                onPress={() => this.changeBgColor(this.colors.grey)}
              ></TouchableOpacity>
              <TouchableOpacity
                style={[
                  { backgroundColor: this.colors.green },
                  styles.colorButton,
                ]}
                onPress={() => this.changeBgColor(this.colors.green)}
              ></TouchableOpacity>
            </View>

            <Pressable
              style={styles.button}
              onPress={() =>
                this.props.navigation.navigate("Chat", {
                  name: this.state.name,
                  bgColor: this.state.bgColor,
                })
              }
            >
              <Text style={styles.buttonText}>Start chatting</Text>
            </Pressable>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    alignItems: "center",
  },

  titleBox: {
    height: "40%",
    width: "135%",
    alignItems: "center",
    paddingTop: 100,
  },

  title: {
    flex: 1,
    fontFamily: 'Poppins-BoldItalic',
    padding: "30%",
    fontSize: 45,
    fontWeight: "600",
    marginTop: "-35%",
    flexWrap: "nowrap",
    color: "#B533C1",
  },

  input: {
    fontFamily: 'Poppins-Regular',
    width: "88%",
    padding: "2%",
    height: 50,
    alignItems: "center",
    borderColor: "gray",
    borderWidth: 1.5,
    borderRadius: 2,
  },

  inputMain: {
    backgroundColor: "#FFFFFF",
    height: "46%",
    width: "88%",
    justifyContent: "space-around",
    alignItems: "center",
  },

  inputBox: {
    borderWidth: 2,
    borderRadius: 1,
    borderColor: "grey",
    width: "88%",
    height: 60,
    paddingLeft: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 4.5,
    width: "100%",
  },

  colorBox: {
    width: "88%",
  },

  chooseColor: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    fontWeight: "300",
    color: "#757083",
    opacity: 100,
    textAlign: "center",
  },

  colorArray: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
  },

  colorButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  button: {
    width: "88%",
    height: 70,
    borderRadius: 8,
    backgroundColor: "#757083",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: 'Poppins-Regular'
  },
});