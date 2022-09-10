import React, { Component } from 'react';
import Start from './components/Start';
import Chat from './components/Chat';
import 'react-native-gesture-handler';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CustomActions from './CustomActions';

// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
 const Stack = createStackNavigator();

// const Tab = createBottomTabNavigator();

// constructor(props) {
//   super(props);
//   this.state= { text: ''};
// }




export default class App extends Component {
  async loadFonts() {
      await Font.loadAsync({
          'Poppins-Regular': require('./assets/fonts/Poppins/Poppins-Regular.ttf'),
          'Poppins-BoldItalic': require('./assets/fonts/Poppins/Poppins-BoldItalic.ttf'),
          'Poppins-Light': require('./assets/fonts/Poppins/Poppins-Light.ttf'),
      });
      this.setState({ fontsLoaded: true });
  }

  constructor(props) {
      super(props);
      this.state = {
          fontsLoaded: false
      }
  }
  renderCustomActions = (props) => {
    return <CustomActions {...props} />;
  };
 

render() {
  if (!this.state.fontsLoaded) { return null }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start}/>
        <Stack.Screen name="Chat" component={Chat}/>
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}

componentDidMount() {
  this.loadFonts();
}
}


