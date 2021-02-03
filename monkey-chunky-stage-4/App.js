import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Header } from 'react-native-elements';
import db from './localdb';
import PhonicSoundButton from './components/PhonicSoundButton';
import Dictionary from './Screens/DictionaryScreen';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      chunks: [],
      phonicSounds: [],
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={'#ccb3ff'}
          centerComponent={{
            text: 'Dictionary with Phonics',
            style: { color: '#fff', fontSize: 17 },
          }}
        />

        <View>
          <AppContainer />
        </View>
        <TextInput
          style={styles.inputBox}
          onChangeText={(text) => {
            this.setState({ text: text });
          }}
          value={this.state.text}
        />
        <TouchableOpacity
          style={styles.goButton}
          onPress={() => {
            var word = this.state.text.toLowerCase().trim();
            db[word]
              ? (this.setState({ chunks: db[word].chunks }),
                this.setState({ phonicSounds: db[word].phones }))
              : Alert.alert('The word does not exist in our database');
          }}>
          <Text style={styles.buttonText}>GO</Text>
        </TouchableOpacity>
        <View>
          {this.state.chunks.map((item, index) => {
            return (
              <PhonicSoundButton
                wordChunk={this.state.chunks[index]}
                soundChunk={this.state.phonicSounds[index]}
                buttonIndex={index}
              />
            );
          })}
        </View>
      </View>
    );
  }
}
var AppNavigator = createSwitchNavigator({
  Dictionary: Dictionary,
});

const AppContainer = createAppContainer(AppNavigator);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9966ff',
  },
  button: {
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 2,
    borderRadius: 15,
    //marginTop: 1,
    marginRight: 1,
    width: 200,
    height: 50,
  },
  inputBox: {
    marginTop: 50,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    outline: 'none',
  },
  goButton: {
    width: '50%',
    height: 55,
    alignSelf: 'center',
    padding: 10,
    margin: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  imageIcon: {
    width: 150,
    height: 150,
    marginLeft: 95,
  },
});
