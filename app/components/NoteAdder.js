import React from 'react';
import {
    Text,
    View,
    TextInput,
    Button,
    StyleSheet,
  } from 'react-native';

import database from "@react-native-firebase/database";
import ParamButtons from './ParamButtons.js';

class NoteAdder extends React.Component {

  constructor(props) {
    super(props);
    this.valueInput = React.createRef();
    this.paramInput = React.createRef();
    this.state = {
      noteValue : null,
      noteParam : null,
      paramTree: null,
    }
  }

  componentDidMount() {
    console.log('App component mounted!');
    this.updateParamsFromDB(this.props.uid);
  }

  //DONE (as just a LIST yet) Better have a classifier to work with in distinction to notewriter

  //DONE paramsDB updater: add a new param, if it's not there
  addNewParamToDB(uid, param) {
    //DONE - check if there is already this param in a Tree
    const paramList = this.state.paramTree;

    if(paramList.includes(param)) {
      console.log('Input param is already n the list!')
      return;
    }
    
    database()
      .ref(`${uid}/params/${param}`)
      .set({
        status: true,
      })
      .then(() => {
        console.log(`New ${param} added to paramTree`);
        this.updateParamsFromDB(uid);
      });
  }

  //DONE update a list of params of user from DB to state
  updateParamsFromDB(uid) {
    let paramList = [];
    database()
      .ref(`${uid}/params`)
      .once('value')
      .then(snapshot => {
        paramList = Object.keys(snapshot.val());
        this.updateParamTreeState(paramList);
        console.log('ParamTree updated with: ', paramList);
        console.log('DoubleCheck with state: ', this.state.paramTree);
      });
  }
  
  addNoteToDB(uid, param, value) {
    const timeStamp = Date.now();

    database()
      .ref(`${uid}/notes/${param}/${timeStamp}`)
      .set({
        value: value,
        time: timeStamp,
      })
      .then(() => {
        console.log(`note on ${param} added`);
      });
  }

  //DONE - declare and use setState function for param and value to use as callback or in child
  updateNoteParam(value) {
    this.setState({ noteParam : value });
  }

  updateNoteValue(value) {
    this.setState({ noteValue : value });
  }

  updateParamTreeState(array) {
    this.setState({ paramTree: array});
  }
  
  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.inputLabelStyle}>
            Ready to add new note?
        </Text>
        <Text style={styles.inputLabelStyle}>
          Type the parameter to record:
        </Text>
        <ParamButtons
          updateNoteParam={this.updateNoteParam.bind(this)}
          params={this.state.paramTree}
        />
        <TextInput
          onChangeText={(value) => this.updateNoteParam(value)}
          style={styles.inputArea}
          ref={this.paramInput}
        />
        <Text style={styles.inputLabelStyle}>
          Type the value of it:
        </Text>
        <TextInput
          onChangeText={(value) => this.updateNoteValue(value)}
          style={styles.inputArea}
          ref={this.valueInput}
        />
        <Button
          title='Add this note'
          onPress={() => {
            console.log('Pressing add note');
            console.log(this.state.noteParam);
            console.log(this.state.noteValue);

            this.addNoteToDB(this.props.uid, this.state.noteParam, this.state.noteValue);
            this.valueInput.current.clear();
            this.paramInput.current.clear();
            this.addNewParamToDB(this.props.uid, this.state.noteParam);
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  inputLabelStyle: {
    color: 'white',
    padding: 7,
    alignItems : 'center',
    textAlign: 'center',
  },
  inputArea: {
    height: 40,
    width: 300,
    backgroundColor: 'white',
    margin: 12,
    padding: 10,
  }
})

export default NoteAdder;