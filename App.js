import React, {Fragment, Component, useState} from 'react';
import * as ImagePicker from 'react-native-image-picker';
var Platform = require('react-native').Platform;
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

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Slider from '@react-native-community/slider';
import type {Node} from 'react';

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
    width: 150,
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3,
  },
  btnParentSection: {
    alignItems: 'center',
    marginTop: 10,
    flex: 1,
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
  headerText: {
    fontSize: 20,
    alignSelf: 'center',
  },
  title: {
    backgroundColor: 'gray',
    padding: 5,
  },
  titleText: {
    color: 'white',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderColor: 'black',
    borderWidth: 1,
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
            console.log(pickerResponse);
            putImageIntoList();
          }
        });
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  // var star1 = [];
  // var star2 = [];
  // var star3 = [];
  const [pickerResponse, setPickerResponse] = useState(null);
  const [star1, setStar1] = useState([]);
  const [star2, setStar2] = useState([]);
  const [star3, setStar3] = useState([]);
  const [starValue, setStarValue] = useState(1);

  const openGallery = () => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };
    launchImageLibrary(options, setPickerResponse);
    putImageIntoList();
  };
  const putImageIntoList = () => {
    //If it is iOS, remove 'file://' prefix
    let uri = pickerResponse?.assets && pickerResponse.assets[0].uri;
    //If android, don't need to remove the 'file://'' prefix
    if (Platform.OS === 'iOS') {
      uri = uri.replace('file://', '');
    }
    console.log(uri);
    if (uri === null) return;
    // console.log(uri);
    switch (starValue) {
      case 1:
        setStar1([...star1, uri]);
        break;
      case 2:
        setStar2([...star2, uri]);
        break;
      case 3:
        setStar3([...star3, uri]);
        break;
      default:
        console.log('Not suitable value');
        break;
    }
    // star3.map((uri, i) => {
    //   console.log(i + '\t' + uri);
    // });
    // console.log(star3);
    // if (star3 !== null) console.log(star3);
    // else {
    //   console.log('null');
    //   // star3 = [];
    //   // setStar3([...star3, uri]);
    // }
    // if (star2 !== null) console.log('not null');
    // else {
    //   console.log('null');
    //   // setStar2([...star2, uri]);
    // }
    // if (star1 !== null) console.log('not null');
    // else {
    //   console.log('null');
    //   // setStar1([...star1, uri]);
    // }
  };
  const uri = pickerResponse?.assets && pickerResponse.assets[0].uri;

  return (
    <ScrollView>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={backgroundStyle}>
        <Text style={{textAlign: 'center', fontSize: 20, paddingBottom: 10}}>
          Pick Images from Camera & Gallery
        </Text>
        <ScrollView>
          <View style={styles.body}>
            {/* <View style={styles.ImageSections}>
            {uri && <Image source={{uri}} style={styles.images}></Image>}
          </View> */}
            <View style={{flex: 2, paddingTop: 10}}>
              <View style={styles.title}>
                <Text style={styles.titleText}>3 Stars</Text>
              </View>
              <View style={styles.row}>
                {star3 &&
                  star3.map((source, i) => (
                    <View style={styles.ImageSections}>
                      {source && (
                        <Image
                          key={'star3-' + i}
                          style={styles.image}
                          source={{uri: source}}></Image>
                      )}
                    </View>
                  ))}
              </View>
              <View style={styles.title}>
                <Text style={styles.titleText}>2 Stars</Text>
              </View>
              <View style={styles.row}>
                {star2 &&
                  star2.map((source, i) => (
                    <View style={styles.ImageSections}>
                      {source && (
                        <Image
                          key={'star2-' + i}
                          style={styles.image}
                          source={{uri: source}}></Image>
                      )}
                    </View>
                  ))}
              </View>
              <View style={styles.title}>
                <Text style={styles.titleText}>1 Star</Text>
              </View>
              <View style={styles.row}>
                {star1 &&
                  star1.map((source, i) => (
                    <View style={styles.ImageSections}>
                      {source &&
                        (console.log(source),
                        (
                          <Image
                            key={'star1-' + i}
                            style={styles.image}
                            source={{uri: source}}></Image>
                        ))}
                    </View>
                  ))}
              </View>
            </View>
            <View style={styles.btnParentSection}>
              <Text
                style={{
                  textAlign: 'center',
                  paddingBottom: 10,
                  color: '#000',
                }}>
                Please select coolness of this picture.
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 20,
                  paddingBottom: 10,
                  color: 'black',
                }}>
                {starValue}
              </Text>
              <Slider
                style={{width: 225, height: 20}}
                minimumValue={1}
                maximumValue={3}
                step={1}
                minimumTrackTintColor="#3DB4E2"
                maximumTrackTintColor="#000000"
                onValueChange={value => setStarValue(value)}
              />
              <TouchableOpacity
                onPress={launchCamera}
                style={styles.btnSection}>
                <Text style={styles.btnText}>Launch Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={openGallery} style={styles.btnSection}>
                <Text style={styles.btnText}>Pick from Gallery</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ScrollView>
  );
};

export default App;
