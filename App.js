/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text,View, TouchableOpacity} from 'react-native';

export default class App extends Component {

  constructor(props){
    super(props);
    this.state={
      resultText: "",
      calculation: ""
    }  
    this.operations = ['DEL', '+', '-', '*', '/'] 
    //this.operate = this.operate.bind(this);
  }

  calculate(){

    this.setState({calculation: eval(this.state.resultText)})
  }
  validate(){
    text = this.state.resultText
    switch(text.split('').pop()){

      case '+':
      case '-':        
      case '*':
      case '/':
        return false        
    }
    return true
  }
  buttonPressed(text) {
    //console.log(text)
    if(text == '='){
      return this.validate() && this.calculate()
    }
    else if(text == '.'){
      lastchar = this.state.resultText.split('').pop()
      if (text == lastchar)
      return
      else
      this.setState({resultText: this.state.resultText+text})
    }
    else{
      this.setState({resultText: this.state.resultText+text})
    }
  }
  operate(operation){
    //console.log(operation);
    if(this.state.resultText == "") return
    else{
          //console.log(this.operations.indexOf(lastchar)) 
    switch(operation){
      case 'DEL':
        let text = this.state.resultText.split('')
        text.pop()
        this.setState({
          resultText: text.join('')
        })
        break
      case '+':
      case '-':
      case '*':
      case '/':
      lastchar = this.state.resultText.split('').pop()
      if (this.operations.indexOf(lastchar) > 0){
        return
      }
      this.setState({resultText: this.state.resultText+operation})
    }
  }
  }

  render() {

    let rows =[]
    let nums = [[7,8,9],[4,5,6],[1,2,3],['.',0,'=']]
    for(let i=0; i<4; i++){
      let row= []
      for(let j=0; j<3; j++){
        row.push(<TouchableOpacity style={styles.btn} key={nums[i][j]} onPress={ () => this.buttonPressed(nums[i][j])} >
          <Text style={styles.btntext}>{nums[i][j]}</Text>
        </TouchableOpacity>)
      }
      rows.push(<View key={i} style={styles.row}>{row}</View>)
    }
    
    //let operations = ['D','+','-','*','/']
    //let operations = [1,2,3,4,5]

    let op = []
    for(i=0; i<5; i++){
      let abc = this.operations[i];
      //console.log(operations[i])
      op.push(<TouchableOpacity key={abc} style={styles.btn} onPress={ () => this.operate(abc)} >
        <Text style={[styles.btntext,styles.white]}>{this.operations[i]}</Text>
      </TouchableOpacity>)
    }

    return (
      <View style={styles.container}>
        <View style={styles.result}>
          <Text style={styles.resulttext}>{this.state.resultText}</Text>
        </View>
        <View style={styles.calculation}>
          <Text style={styles.calculationtext}>{this.state.calculation}</Text>
        </View>
        <View style={styles.button}>
          <View style={styles.number}>{rows}</View>
          <View style={styles.operation}>{op}</View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  white:{
    color:'#C3C3C3'
  },
  btntext:{
    fontSize: 30,
    color: '#389A81'
  },
  btn:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch'

  },
  calculationtext:{
    fontSize: 24,
    color: '#888888'
  },
  resulttext:{
    fontSize: 40,
    color: '#A1A1A1'
  },
  row:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },  
  result:{
    flex: 2,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  calculation:{
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  button:{
    flex: 7,
    backgroundColor: 'black',
    flexDirection: 'row',

  },
  number:{
    flex: 3,
    backgroundColor: '#61C4A8'
  },
  operation:{
    flex: 1,
    backgroundColor: '#636363',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
  
});