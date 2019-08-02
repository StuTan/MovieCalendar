import React from 'react'; 
import {Platform,ScrollView, StyleSheet,TouchableOpacity, FlatList,Text,Alert, View,Dimensions,ImageBackground,Image,Button} from 'react-native';
import {LocaleConfig, CalendarList} from 'react-native-calendars'; 
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { WebView } from 'react-native-webview';
import moviedata from './data.js'
import Schedule from './Schedule.js'
import Paa from './Paa.js'
import ActionButton from 'react-native-action-button';
import HomeScreen from './calendar.js'



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


class DetailsScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};  
    this.state.data=movieData;
    this.state.day=today2;
    this.state.expand=0;
  }

  static navigationOptions = ({ navigation  }) => {
    
    const { params } = navigation.state;
    
    return {
      title: params ? params.otherParam : this.state.data[4].nameChinese,
      headerStyle: {
        backgroundColor: '#0DA463',
      },
      headerTintColor:'white', 
      
    };
  };

  render() { 

    return (

      <View style={{}}> 

      <ScrollView style={{ }}  showsVerticalScrollIndicator={true} endFillColor={'red'} 
      overScrollMode={'auto'} indicatorStyle={'black'}
      >

      <View style={{  }}>
      <View style={{flex:1,backgroundColor:'white',width: windowWidth, height: 200,   magin:2,flexDirection:'row'}}>
          <View style={{flex:4,height: 200,justifyContent:'center'}}>
                <Image   source={ this.state.data[4].detail }
                        style={{width:120, height: 170,marginTop:15,marginLeft:10, marginBottom:15 }}>
                 
              </Image  >
          </View>
          <View style={{ flex:7,marginLeft:40,marginTop:30,marginBottom:70, padding :0}}>
                <Text style={{fontSize:25,textShadowColor:'black', }}>{this.state.data[this.state.day].nameChinese}</Text> 
                <Text style={{fontSize:16,textShadowColor:'black', }}>{this.state.data[this.state.day].nameEnglish}</Text>
                <Text style={{fontSize:16,textShadowColor:'black', }}>{this.state.data[this.state.day].prop}</Text>
                <Text style={{fontSize:16,textShadowColor:'black', }}>{this.state.data[this.state.day].country}</Text> 
                <Text style={{fontSize:16,textShadowColor:'black', }}>{this.state.data[this.state.day].score}</Text>  
          </View>
          <View  style={{flex: 1,justifyContent:'center'}}>
            <Text
            onPress={() => {
               this.props.navigation.navigate('Third', {
                 otherParam: this.state.data[this.state.day].nameChinese,
              });
            }}
            >></Text>
            </View>
      </View>  
        
    <View style={{width:windowWidth-20,backgroundColor:'white',marginTop:20,marginLeft:10}}>
    <Text style={{fontSize:20, marginTop:5}}>简介</Text>
         {
           this.state.expand===0?
           <View>
             <View style={{marginTop: 5,backgroundColor:'white',marginLeft:10, }}>
                  <Text style={{fontSize:15,  textShadowColor:'white'}}numberOfLines={3}>{this.state.data[this.state.day].introduce}</Text>  
                  <Button
                              onPress={() => 
                                  {  this.setState({expand:1}) }}
                                        title="展开" 
                                        color='#0DA463'
                                      />   
             </View> 
           </View>:null
         }
        {
           this.state.expand===1?
           <View>
             <View style={{marginTop: 5,backgroundColor:'white',marginLeft:10, }}>
                  <Text style={{fontSize:15,  textShadowColor:'white'}}>{this.state.data[this.state.day].introduce}</Text>  
                  <Button
                              onPress={() => 
                                  {  this.setState({expand:0}) }}
                                        title="收起" 
                                        color='#0DA463'
                                      />   
             </View>
           </View>:null
         }
    </View>
  </View>

  <View style={{marginLeft:10,height:250,marginTop:20}}>
        <Text style={{fontSize:20, marginTop:5}}>演职人员</Text>
        < FlatList
                  key='cast'
                  horizontal={true}
                   data={this.state.data[this.state.day].actor}
                   keyExtractor={item =>item.name}
                   renderItem={({item})=>
                   <View  style={{width:120, height: 200, padding:5,marginLeft:5,alignContent:'center'   }}>
                        <Image   source={item.arl}
                        style={{width:120, height: 150,   }}>
                        </Image  >
                        <View style={{alignSelf:'center'}}>
                        <Text style={{fontSize: 12}}>
                         {item.name} 
                        </Text>
                        </View>
                        <View style={{alignSelf:'center'}}>
                        <Text style={{fontSize: 10}}>
                         {item.name2} 
                        </Text>
                        </View>
                    </View>
                }
                      /> 
    </View>

   <View style={{backgroundColor:'white',width:windowWidth,height:20,}}>
     </View>
     
     <View style={{marginLeft:10,height:250,marginTop:-20}}>
        <Text style={{fontSize:20, marginTop:5}}>电影剧照</Text>
        < FlatList
                  key='pictrue'
                  horizontal={true}
                  data={this.state.data[this.state.day].vedio}
                  keyExtractor={item =>item.arl} 
                  keyExtractor={(index)=>String(index)}
                  renderItem={({item})=>
                  <View  style={{width:200, height: 200, padding:5,marginLeft:5,alignContent:'center'   }}>
                        <Image   source={ item.arl}
                        style={{width:200, height: 150,   }}>
                        </Image  > 
                  </View>
                }
       /> 
    </View>

    <View style={{marginLeft:10,marginTop:-20,marginRight:20}}>
    <Text style={{fontSize:20, marginTop:5}}> 经典台词</Text>
      <FlatList 
          key='taici'
          data={this.state.data[this.state.day].lan}
          keyExtractor={item =>item.intro2} 
          renderItem={({item})=>
          <View  style={{backgroundColor:'#F8F8F8',width:windowWidth-20, padding:20,marginLeft:5,marginTop:10,alignContent:'center'   }}>
               <Text  
               style={{ fontSize:14 }}>{item.intro+'\n'}  
               </Text >  
               <Text  
               style={{ fontSize:14  }}>{item.intro2+'\n'} 
               </Text > 
               <Text  
               style={{ fontSize:14,textAlign:'right'  }}>{item.intro3}
               </Text > 
           </View>
       }
          
      />
      </View>
    </ScrollView>
    </View>
    );
  }
}

class ThirdScreen extends React.Component {
  
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;

    return {
      title: params ? params.otherParam : this.state.data[4].nameChinese , 
      headerStyle: {
        backgroundColor: '#0DA463',
      },
      headerTintColor:'white'
    };
  };
  constructor(props) {
    super(props);
    this.state = {};
    this.state.data=movieData;
    this.state.day=today2; 
  }
  render() { 

    return (
      <View style={{ flex: 1,  }}>
        <WebView
            geolocationEnabled={true}
            allowFileAccess={true}
            javaScriptEnabled={true}
            mediaPlaybackRequiresUserAction={true}
            automaticallyAdjustContentInsets={true}
            mixedContentMode={"never"}
            hardwareBack={true}
            source={{  uri:  this.state.data[this.state.day].expand }}
            style={{ marginTop: 0 }}
            domStorageEnabled={true}
            onLoad={() => console.log('onLoad')}
            onLoadEnd={() => console.log('onLoadEnd')}
            onLoadStart={() => console.log('onLoadStart')}
            renderError={() => {
                console.log('renderError')
                return <View><Text>renderError </Text></View>
            }}
            renderLoading={() => {
                return <View><Text> Loading...</Text></View>
            }}  
        />
      </View>
    );
  }
}

class FifthScreen extends React.Component {
  static navigationOptions = {
    header:null,
  }
  render(){
    return(
      <Paa/>
    )
  }
}


const RootStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
    Third: {
        screen : ThirdScreen,
    },
    Fourth:{
      screen: Schedule,
    },
    Fifth:{
      screen: Paa,
    }
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class Main extends React.Component {
  render() {
    return <AppContainer />;
  }
}
  