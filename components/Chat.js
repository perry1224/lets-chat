import React from 'react';
import { View, Text, Button, TextInput, StyleSheet} from 'react-native';


export default class Chat extends React.Component {

componentDidMount() {
 let name = this.props.route.params.name;
 this.props.navigation.setOptions({title: name});
}

render() {

  let { bgColor } = this.props.route.params;

  if (bgColor === '') {
    bgColor = '#FFFFF';
  }
    return (

<View style={[styles.container, 
{backgroundColor:bgColor}]}>
  
  
           {/* <ImageBackground source={require('../assets/wallpaper.jpg')} style={styles.image}></ImageBackground> */}
        <Button 
        title="Go to Start"
        
        onPress={() => this.props.navigation.navigate("Start")}/>
      </View>

      
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
},
//   image: {
//     flex: 1,
//     resizeMode: 'cover',
//     flexDirection: 'column',
//     alignItems: 'center',
// },
})



