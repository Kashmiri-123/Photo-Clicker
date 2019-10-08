import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

export default class HomeScreen extends React.Component {

    static navigationOptions = {
        title : "PhotoClicker"
    };
  
    render(){
        let photo = this.props.navigation.getParam("photo", "empty")
  return (
    <View style={styles.container}>
      <Image 
      resizeMode = "center"
      style = {styles.imageholder}
      source = {
          photo === "empty" ? require("../assets/email.jpg") : photo
      }
      />
      <Button 
      title = "Take Photo"
      style = {styles.button}
      onPress = { () => {
          this.props.navigation.navigate("Camera");
      } }
      />
    </View>
  );
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  imageholder: {
    alignItems: 'center',
    height :100,
    margin:20   
  },

  button : {
   margin : 20
  }

});
