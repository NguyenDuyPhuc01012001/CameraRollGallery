import React, {Fragment, Component, useState} from 'react';
import * as ImagePicker from 'react-native-image-picker';

import {launchImageLibrary} from 'react-native-image-picker';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Button,
  Dimensions,
  PermissionsAndroid,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import type {Node} from 'react';

const options = {
  title: 'Select Avatar',
  customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
  mediaType: 'photo',
  includeBase64: false,
  maxHeight: 200,
  maxWidth: 200,
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },

  body: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
    height: Dimensions.get('screen').height - 20,
    width: Dimensions.get('screen').width,
  },
  ImageSections: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  images: {
    width: 350,
    height: 350,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3,
  },
  btnParentSection: {
    alignItems: 'center',
    marginTop: 10,
  },
  btnSection: {
    width: 225,
    height: 50,
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginBottom: 10,
  },
  btnText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  };
  const launchCamera = async () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission given');
        ImagePicker.launchCamera(options, response => {
          console.log('Response = ', response);

          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            alert(response.customButton);
          } else {
            const source = {uri: response.uri};
            console.log('response', JSON.stringify(response));
            // this.setState({
            //   filePath: response,
            //   fileData: response.data,
            //   fileUri: response.uri,
            // });
            setPickerResponse(response);
          }
        });
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const [pickerResponse, setPickerResponse] = useState(null);

  const openGallery = () => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };
    launchImageLibrary(options, setPickerResponse);
  };

  const uri = pickerResponse?.assets && pickerResponse.assets[0].uri;

  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={backgroundStyle}>
        <View style={styles.body}>
          <Text style={{textAlign: 'center', fontSize: 20, paddingBottom: 10}}>
            Pick Images from Camera & Gallery
          </Text>
          <View style={styles.ImageSections}>
            {uri && <Image source={{uri}} style={styles.images}></Image>}
          </View>

          <View style={styles.btnParentSection}>
            <TouchableOpacity onPress={launchCamera} style={styles.btnSection}>
              <Text style={styles.btnText}>Launch Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={openGallery} style={styles.btnSection}>
              <Text style={styles.btnText}>Pick from Gallery</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

export default App;

// // var Platform = require('react-native').Platform;
// // // import * as ImagePicker from 'react-native-image-picker';
// // import React, {Component} from 'react';
// // import {
// //   AppRegistry,
// //   StyleSheet,
// //   Text,
// //   View,
// //   Image,
// //   TouchableOpacity,
// //   Modal,
// // } from 'react-native';
// // import Slider from '@react-native-community/slider';

// // export default class App extends Component {
// //   constructor(props) {
// //     super(props);
// //     this.state = {
// //       star3: [],
// //       star2: [],
// //       star1: [],
// //       image: null,
// //       modalVisible: false,
// //       value: 3,
// //     };
// //     this.takePhoto = this.takePhoto.bind(this);
// //     this.chooseImage = this.chooseImage.bind(this);
// //     this.setImage = this.setImage.bind(this);
// //     this.putImageIntoList = this.putImageIntoList.bind(this);
// //   }

// //   putImageIntoList() {
// //     this.setState({
// //       ['star' + this.state.value]: [
// //         ...this.state['star' + this.state.value],
// //         this.state.image,
// //       ],
// //       modalVisible: false,
// //       value: 3,
// //     });
// //   }

// //   takePhoto() {
// //     // ImagePicker.launchCamera({noData: true}, this.setImage);
// //   }

// //   chooseImage() {
// //     // ImagePicker.launchImageLibrary({noData: true}, this.setImage);
// //   }

// //   setImage(response) {
// //     console.log('Response = ', response);

// //     if (response.didCancel) {
// //       console.log('User cancelled image picker');
// //     } else if (response.error) {
// //       console.log('ImagePicker Error: ', response.error);
// //     } else if (response.customButton) {
// //       console.log('User tapped custom button: ', response.customButton);
// //     } else {
// //       //If it is iOS, remove 'file://' prefix
// //       let source = {uri: response.uri.replace('file://', ''), isStatic: true};

// //       //If android, don't need to remove the 'file://'' prefix
// //       if (Platform.OS === 'android') {
// //         source = {uri: response.uri, isStatic: true};
// //       }
// //       this.setState({image: source, modalVisible: true});
// //     }
// //   }

// //   render() {
// //     return (
// //       <View style={{flex: 1}}>
// //         <Modal
// //           animationType={'slide'}
// //           transparent={true}
// //           visible={this.state.modalVisible}
// //           onRequestClose={() => {
// //             alert('Modal has been closed.');
// //           }}>
// //           <View style={styles.modal}>
// //             <View>
// //               <TouchableOpacity
// //                 style={styles.closeButton}
// //                 onPress={() => this.setState({modalVisible: false})}>
// //                 <Text>X</Text>
// //               </TouchableOpacity>
// //               <Text>Please select coolness of this picture.</Text>
// //               <Text style={styles.headerText}>{this.state.value}</Text>
// //               <Slider
// //                 maximumValue={3}
// //                 minimumValue={1}
// //                 step={1}
// //                 value={3}
// //                 onValueChange={value => this.setState({value: value})}></Slider>
// //               <TouchableOpacity
// //                 style={styles.submitButton}
// //                 onPress={() => {
// //                   this.putImageIntoList();
// //                 }}>
// //                 <Text style={styles.buttonText}>OK</Text>
// //               </TouchableOpacity>
// //             </View>
// //           </View>
// //         </Modal>

// //         <View style={{flex: 1, paddingTop: 22}}>
// //           <View style={styles.title}>
// //             <Text style={styles.titleText}>3 Stars</Text>
// //           </View>
// //           <View style={styles.row}>
// //             {this.state.star3.map((source, i) => (
// //               <Image
// //                 key={'star3-' + i}
// //                 style={styles.image}
// //                 source={source}></Image>
// //             ))}
// //           </View>
// //           <View style={styles.title}>
// //             <Text style={styles.titleText}>2 Stars</Text>
// //           </View>
// //           <View style={styles.row}>
// //             {this.state.star2.map((source, i) => (
// //               <Image
// //                 key={'star2-' + i}
// //                 style={styles.image}
// //                 source={source}></Image>
// //             ))}
// //           </View>
// //           <View style={styles.title}>
// //             <Text style={styles.titleText}>1 Star</Text>
// //           </View>
// //           <View style={styles.row}>
// //             {this.state.star1.map((source, i) => (
// //               <Image
// //                 key={'star1-' + i}
// //                 style={styles.image}
// //                 source={source}></Image>
// //             ))}
// //           </View>
// //         </View>
// //         <View style={styles.rowCenter}>
// //           <TouchableOpacity style={styles.button} onPress={this.takePhoto}>
// //             <Text style={styles.buttonText}>Camera</Text>
// //           </TouchableOpacity>
// //           <TouchableOpacity style={styles.button} onPress={this.chooseImage}>
// //             <Text style={styles.buttonText}>Gallery</Text>
// //           </TouchableOpacity>
// //         </View>
// //       </View>
// //     );
// //   }
// // }

// // const styles = StyleSheet.create({
// //   row: {
// //     flexDirection: 'row',
// //     flexWrap: 'wrap',
// //   },
// //   rowCenter: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// //   image: {
// //     width: 100,
// //     height: 100,
// //   },
// //   button: {
// //     backgroundColor: 'gray',
// //     width: 150,
// //     height: 50,
// //     borderRadius: 10,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     margin: 10,
// //   },
// //   buttonText: {
// //     color: 'white',
// //   },
// //   modal: {
// //     height: 200,
// //     width: 300,
// //     marginTop: 200,
// //     padding: 10,
// //     alignSelf: 'center',
// //     backgroundColor: 'lightblue',
// //     margin: 10,
// //     borderRadius: 10,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   closeButton: {
// //     alignSelf: 'flex-end',
// //   },
// //   submitButton: {
// //     alignSelf: 'center',
// //     backgroundColor: 'darkblue',
// //     width: 100,
// //     height: 44,
// //     borderRadius: 10,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     margin: 10,
// //   },
// //   headerText: {
// //     fontSize: 20,
// //     alignSelf: 'center',
// //   },
// //   title: {
// //     backgroundColor: 'gray',
// //     padding: 5,
// //   },
// //   titleText: {
// //     color: 'white',
// //   },
// // });

// // AppRegistry.registerComponent('App', () => App);

// import React from 'react';
// import {View} from 'react-native';
// import CaptureImage from './src/CaptureImages';
// import {ModalPortal} from 'react-native-modals';
// export default function App() {
//   return (
//     <View style={{flex: 1}}>
//       <ModalPortal />
//       <CaptureImage />
//     </View>
//   );
// }
