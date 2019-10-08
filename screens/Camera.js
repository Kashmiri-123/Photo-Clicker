import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import {FontAwesome} from "@expo/vector-icons";

export default class CameraScreen extends React.Component {

   constructor(props)
   {
       super(props);
       this.state = {
         hasCameraPermission : null,
         type : Camera.Constants.Type.back,
         isFlashLightOn : Camera.Constants.FlashMode.off
       };
   }

    static navigationOptions = {
        title : "Camera"
    };

    //ask for camera permission
    async componentDidMount(){
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermission : status === "granted"
        });
    }

    //flip the camera
    flipCamera = () => {
        this.setState({
         type : this.state.type === Camera.Constants.Type.back ? Camera.Constants.Type.front
          : Camera.Constants.Type.back 
        });
    }
     
    //toggle flash light
    toggleFlash = () => {
        this.setState({
            isFlashLightOn : this.state.isFlashLightOn === Camera.Constants.FlashMode.off ?
            Camera.Constants.FlashMode.on : Camera.Constants.FlashMode.off
        });
    }
    
       //take picture and send to home screen
       //photo -> given this name at home page(Home.js)
       //didnt understand this function
       takePicture = async () => {
           if (this.camera) {
               let photo = await this.camera.takePictureAsync();
               this.props.navigation.navigate("Home",{photo : photo});
           }
       };
    
    render(){
      const {hasCameraPermission} = this.state;

      if(hasCameraPermission === null)
      {
         return <View/>
      }
      else if(hasCameraPermission === false)
      {
         return <View><Text>No access to Camera</Text></View>
      }
      else if(hasCameraPermission === true)
      {
         return (
           <View style={styles.container}>
             <Camera
             style={styles.cameraView}
             type={this.state.type}
             flashMode={this.state.isFlashLightOn}
             ref={ref => {
               this.camera = ref;//cause multiple sreens can have multiple cameras
             }}>
             <View style={styles.actionContainer}>
               <TouchableOpacity 
               onPress={() => this.flipCamera()}
                style={styles.iconHolder}>
                <FontAwesome
                name="camera"
                size={35}
                style={styles.icon}
                />
               </TouchableOpacity> 

               <TouchableOpacity 
                onPress={() => this.takePicture()}
                style={styles.iconHolder}>
                <FontAwesome
                name="circle"
                size={35}
                style={styles.icon}
                />
               </TouchableOpacity> 

               <TouchableOpacity 
                onPress={() => this.toggleFlash()}
                style={styles.iconHolder}>
                <FontAwesome
                name="flash"
                size={35}
                style={styles.icon}
                />
               </TouchableOpacity> 
             </View>
             </Camera>
           </View>
         )
      }
}
}

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  cameraView : {
    flex : 1
  },
  
  actionContainer : {
    flex :1,
    flexDirection :"row",
    backgroundColor : "transparent"
  },
  iconHolder: {
    flex: 1,
    alignItems : "center",
    alignSelf : "flex-end"
  },
  icon : {
    marginBottom : 10,
    color : "#fff"
  }
})
