import React from "react";
import { View, Button, StyleSheet, Platform, KeyboardAvoidingView } from "react-native";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from '@react-native-community/netinfo';
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';

//Firestore database
const firebase = require("firebase");
require("firebase/firestore");

// This will connect to the Cloud Firestore database just created.
const firebaseConfig = {
  apiKey: "AIzaSyCMUrDh8DX17rMJLzhkPoHlzw8qx2m_iV4",
  authDomain: "let-s-chat-2a172.firebaseapp.com",
  projectId: "let-s-chat-2a172",
  storageBucket: "let-s-chat-2a172.appspot.com",
  messagingSenderId: "234825749572",
};

//initializes the Firestore app
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: "",
        name: "",
      }
    };
  }

  //async function used to avoid the blocking of application when retrieving chat data
  //await function used to wait for an async promise to settle
  //Fetches messages from async storage

  async getMessages() {
    let messages = '';
    try {
      messages = await AsyncStorage.getItem('messages') || [];
      this.setState({
        messages: JSON.parse(messages)
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  
  //Saves messages in asyncStorage (local)
  async saveMessages() {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (error) {
      console.log(error.message);
    }
  }
  //Deletes messages in asyncStorage 
  async deleteMessages() {
    try {
      await AsyncStorage.removeItem('messages');
      this.setState({
        messages: []
      })
    } catch (error) {
      console.log(error.message);
    }
  }

  componentDidMount() {
    // This stores and retrieves the chat messages your users send.
    this.referenceChatMessages = firebase.firestore().collection("messages");
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });

    //Fetch messages from local storage online and offline
    this.getMessages();
  
    //Check to see if user is offline or online
    NetInfo.fetch().then(connection => {
      if (connection.isConnected) {
        this.setState({ isConnected: true });
        console.log('online');
      } else {
        this.setState({isConnected: false})
        console.log('offline');
      }
    });

    // this.setState({
    //   messages: [
    //     {
    //       _id: 1,
    //       text: "Hello developer",
    //       createdAt: new Date(),
    //       user: {
    //         _id: 2,
    //         name: "React Native",
    //         avatar: "https://placeimg.com/140/140/any",
    //       },
    //     },
    //     {
    //       _id: 2,
    //       text: "This is a system message",
    //       createdAt: new Date(),
    //       system: true,
    //     },
    //   ],
    // });


    //Authenticates users using Firebase
    this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }
      this.setState({
        uid: user.uid,
       user: {
        _id:  user.uid,
        name,
       }
      });

      this.unsubscribe = this.referenceChatMessages
        .orderBy("createdAt", "desc")
        .onSnapshot(this.onCollectionUpdate);
    });
  }

  // stop listening to auth and collection changes
componentWillUnmount() {
  this.authUnsubscribe();
  this.unsubscribe();
  
}


  // Adds message to firestore on send
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }), () => {
      this.saveMessages();
      this.addMessages();

    })
    // const newMessage = messages[0];
    // this.referenceChatMessages.add({
    //   text: newMessage.text || "",
    //   createdAt: newMessage.createdAt,
    //   user: newMessage.user,
    // });
  }


  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user,
      });
    });
    this.setState({
      messages,
    })
  };

  // Adds message to firestore on send
addMessages = () => {
  const newMessage = this.state.messages[0];
  this.referenceChatMessages.add({
    text: newMessage.text || "",
    createdAt: newMessage.createdAt,
    user: newMessage.user,
    _id: newMessage._id,
    uid: this.state.uid,
  });
}

  // Customize the color of the chat sender bubble
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#1A4314",
          },
        }}
      />
    );
  }

  //Will not render toolbar if offline
renderInputToolbar(props) {
    if (this.state.isConnected == false) {
    } else {
      return(
        <InputToolbar
        {...props}
        />
      );
    }
  }

  // creating the circle button
renderCustomActions = (props) => {
  return <CustomActions {...props} />;
};

 //Render the map location
renderCustomView (props) {
  const { currentMessage} = props;
  if (currentMessage.location) {
    return (
        <MapView
          style={{width: 150,
            height: 100,
            borderRadius: 13,
            margin: 3}}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
    );
  }
  return null;
}

  render() {
    //background color based on the color selected from 'start.js'
    let { bgColor } = this.props.route.params;

    if (bgColor === "") {
      bgColor = "#FFFFF";
    }

    //fullscreen component
    return (
      <View style={[styles.container, { backgroundColor: bgColor }]}>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          renderActions={this.renderCustomActions}
          renderCustomView={this.renderCustomView}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: this.state.user._id,
            name: this.state.user.name,
          }}
        /> 
        {/* Avoid keyboard to overlap text messages on older Andriod versions  */}
        {Platform.OS === "android" ? (
          <KeyboardAvoidingView behavior="height" />
        ) : null}

        {/* <ImageBackground source={require('../assets/wallpaper.jpg')} style={styles.image}></ImageBackground> */}
        <Button
          title="Go to Start"
          onPress={() => this.props.navigation.navigate("Start")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});