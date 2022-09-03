import React from 'react';
import { View, Text, Button, TextInput, StyleSheet, Platform, KeyboardAvoidingView} from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat'



const firebase = require('firebase');
require('firebase/firestore');


export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
    }
  }


  // This will connect to the Cloud Firestore database just created. 
  const firebaseConfig = {
    apiKey: "AIzaSyCMUrDh8DX17rMJLzhkPoHlzw8qx2m_iV4",
    authDomain: "let-s-chat-2a172.firebaseapp.com",
    projectId: "let-s-chat-2a172",
    storageBucket: "let-s-chat-2a172.appspot.com",
    messagingSenderId: "234825749572"
  }
  if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
    }
  
    // This stores and retrieves the chat messages your users send. 
    this.referenceChatMessages = firebase.firestore().collection("messages");

        // Adds message to firestore on send
        onSend(messages = []) {
          const newMessage = messages[0]
          this.referenceChatMessages.add({
    
              text: newMessage.text || '',
              createdAt: newMessage.createdAt,
              user: newMessage.user,
          });
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

  componentDidMount() {
       let name = this.props.route.params.name;  
       this.props.navigation.setOptions({title: name});
      this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 2,
          text: 'This is a system message',
          createdAt: new Date(),
          system: true,
         },
      ],
    });

    this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }
      this.setState({
        uid: user.uid,
        messages: [],
      });
      this.unsubscribe = this.referenceChatMessages
        .orderBy("createdAt", "desc")
        .onSnapshot(this.onCollectionUpdate);
    });
  }
  }

onSend(messages = []) {
  this.setState(previousState => ({
    messages: GiftedChat.append(previousState.messages, messages),
  }));
}

renderBubble(props) {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: '#000'
        }
      }}
    />
  )
}


render() {
  let { bgColor } = this.props.route.params;

  if (bgColor === '') {
    bgColor = '#FFFFF';
  }

    return (
 <View style={[styles.container, {backgroundColor:bgColor}]}> 

     <GiftedChat
      renderBubble={this.renderBubble.bind(this)}
      messages={this.state.messages}
      onSend={messages => this.onSend(messages)}
      user={{
      _id: 1,
      }}
/>
{ Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null } 

  
  
           {/* <ImageBackground source={require('../assets/wallpaper.jpg')} style={styles.image}></ImageBackground> */}
         <Button 
        title="Go to Start"
        
        onPress={() => this.props.navigation.navigate("Start")}/> 
       </View>

      
     );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
},

})



