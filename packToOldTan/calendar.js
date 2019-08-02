import React from 'react'; 
import {Platform,ScrollView, StyleSheet,TouchableOpacity, FlatList,Text,Alert, View,Dimensions,ImageBackground,Image,Button} from 'react-native';
import {LocaleConfig, CalendarList} from 'react-native-calendars'; 
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { WebView } from 'react-native-webview';
import moviedata from './data.js'
import Schedule from './Schedule.js'
import Paa from './Paa.js'
import ActionButton from 'react-native-action-button';

const windowWidth = Dimensions.get('window').width; 
const windowHeight= Dimensions.get('window').height;
var date = new Date();
var today = ['日','一','二','三','四','五','六'][date.getDay()];
var year = date.getFullYear().toString();
var month = (date.getMonth() + 1).toString();
var day = parseInt(date.getDate().toString());
var today2=0;
if(today==='一')  today2=0;
else if(today==='二') today2=1;
else if(today==='三') today2=2;
else if(today==='四') today2=3;
else if(today==='五') today2=4;
else if(today==='六') today2=5;
else if(today==='日') today2=6;
 var movieData=moviedata;
 
class HomeScreen extends React.Component {
  
    
  constructor(props) {
    super(props);
    this.state = {name: ''};
    this.onDayPress = this.onDayPress.bind(this);
    this.state.data=movieData;
    this.state.day=today2;
  }

  static navigationOptions =   { 
      header:null 
  };

  componentWillMount() {
    this.props.navigation.setParams({ increaseCount: this._increaseCount });
    var web = 'https://www.metaweather.com/api/location/2151330/' + year + '/' + month + '/' + day + '/';
    fetch(web)
      .then( response => response.json())
      .then( data => {
        this.setState({
          name: data[3].weather_state_name
        })
      }
      )
      .catch( error => alert(error))
   }

   Img = (stateN) => {
    if(stateN == 'Sleet')
        s = require('./image/weather_icon/lr.png')
    else if(stateN == 'Hail')
        s = require('./image/weather_icon/h.png')
    else if(stateN == 'Thunderstorm')
        s = require('./image/weather_icon/t.png')
    else if(stateN == 'Heavy Rain')
        s = require('./image/weather_icon/hr.png')
    else if(stateN == 'Light Rain')
        s = require('./image/weather_icon/lr.png')
    else if(stateN == 'Showers')
        s = require('./image/weather_icon/lr.png')
    else if(stateN == 'Heavy Cloud')
        s = require('./image/weather_icon/hc.png')
    else if(stateN == 'Light Cloud')
        s =require('./image/weather_icon/hc.png')
    else if(stateN == 'Clear')
        s = require('./image/weather_icon/c.png')
    else
        s = require('./image/weather_icon/c.png');
    return s;
   }

  state = {
    count: 0,
  };
 

  onDayPress(day) {
    this.setState({
      selected: day.dateString
    });
  }

  onDayLongPress() {
      this.props.navigation.navigate('Third', { 
        otherParam: this.state.data[this.state.day].nameChinese,
      })
  }
  

  render() {
    return (

      <View style={{ flex: 1, }}>
      <View >
          <ImageBackground source={  this.state.data[this.state.day].home}
            style={{width: windowWidth, height: windowHeight/2.5,}}>
                <View style={{width : windowWidth, height: windowHeight/2.5, justifyContent:'flex-end',alignContent:'flex-end'}}>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Fifth')}>
                    <Image source={this.Img(this.state.name)} style={{width:50,height:50,marginBottom:windowHeight/2.5-120 ,marginLeft:10}} 
                    resizeMode='contain'></Image>
                </TouchableOpacity>
              
              <Text style={{fontSize:15,color: 'white',paddingLeft:5,textAlign :'left',fontWeight: '300',marginBottom:5}}
                    onPress={() => {
                      this.props.navigation.navigate('Details', { 
                        otherParam: this.state.data[this.state.day].nameChinese,
                      });
                    }}
              > { this.state.data[this.state.day].language}</Text>
              <Text style={{fontSize:15,color: 'white',textAlign :'right',fontWeight: '300',marginBottom:5}}
                    onPress={() => {
                      this.props.navigation.navigate('Details', { 
                        otherParam: this.state.data[this.state.day].nameChinese,
                      });
                    }}>-- { this.state.data[this.state.day].nameChinese}  </Text>
              </View>
          </ImageBackground>
       </View>  

        <View>
            <CalendarList
            horizontal={true} 
            pagingEnabled={true} 
            calendarWidth={windowWidth}
            monthFormat = { '>  yy  MM  <' } 
            markingType={'multi-dot'}
            onDayPress={this.onDayPress} 
            onDayLongPress={this.onDayLongPress}
            hideExtraDays={true}
            showWeekNumbers={false}
            markedDates={{[this.state.selected]: {selected: true}}}
            />
        </View> 
 
        <ActionButton buttonColor="rgba(231,76,60,1)"
            onPress={()=>this.props.navigation.navigate('Fourth')}
        ></ActionButton>
         </View>
    );
  }
}

export default HomeScreen;