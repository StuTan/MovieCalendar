import React, { Component } from 'react'
import DatePicker from 'react-native-datepicker'
import {Dimensions} from 'react-native'
const Width=Dimensions.get('window').width;
const Height=Dimensions.get('window').height;

var date = new Date();
    var year = date.getFullYear().toString();
    var month = (date.getMonth()+1).toString();
    var day = date.getDate().toString();
    var now=year+'-'+month+'-'+day;

export default class MyDatePicker extends Component {

  constructor(props){
    super(props)
    this.state = {selectedDate:now}
  }
  getDate(Date){
      this.props.thisGetDate(Date);
      this.setState({selectedDate:Date});
  }
  render(){
    return (
      <DatePicker
        style={{width: Width*0.75,height:Height*0.07}}
        date={this.state.selectedDate}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2018-07-01"
        maxDate="2025-07-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.getDate(date)}}
      />
    )
  }
}