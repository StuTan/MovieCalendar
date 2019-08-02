import React, {Component} from 'react';
import {
    View,
    Dimensions,
    TouchableOpacity,
    StyleSheet,
    Image,
    Text,
    TextInput,
    FlatList,
    ScrollView,
    ImageBackground,
    Alert,
} from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { Overlay } from 'react-native-elements'
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import moviedata from './data.js'
import MyDatePicker from './datePicker.js'

var today = ['日','一','二','三','四','五','六'][new Date().getDay()];
var today2=0;
if(today==='一')  today2=0;
else if(today==='二') today2=1;
else if(today==='三') today2=2;
else if(today==='四') today2=3;
else if(today==='五') today2=4;
else if(today==='六') today2=5;
else if(today==='日') today2=6;
 var movieData=moviedata; 

 var date = new Date();
    var year = date.getFullYear().toString();
    var month = (date.getMonth()+1).toString();
    var day = date.getDate().toString();
    var now=year+'-'+month+'-'+day;

const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: true, 
});
global.storage=storage;

const Width=Dimensions.get('window').width;
const Height=Dimensions.get('window').height;

const MyText =(props)=> (
    <Text style={{fontSize:20,color:'white',marginTop:10}} >{props.show}</Text>
)

class Schedule extends Component {
    constructor(props){
        super(props)
        this.state={
            isVisible:false,
            title:'',
            details:'',
            data:[],
            day:'',
            month:'',
            day2:today2,
            data2:movieData,
            start:now,
            end:now,
        }
    }
    static navigationOptions = {
        header:null,
    }

    componentWillMount(){
        storage.load({
            key:'schedules',
            autoSync:true,
        }).then(ret=>{
            // console.log(ret.schedules);
            this.setState({data:ret})
        })
        .catch(err=>{
            // console.warn(err.message);
        })
    }
    componentDidUpdate(){
        storage.save({
            key:'schedules',
            data:this.state.data,
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground style={{width:Width,height:Height*0.16}} source={ this.state.data2[4].home} resizeMode='cover'>
                    <CalendarStrip 
                        calendarAnimation={{type: 'sequence', duration: 30}}
                        daySelectionAnimation={{type: 'background',highlightColor:'white'}}
                        style={{height: 100, paddingTop: 10, paddingBottom: 10}}
                        calendarHeaderStyle={{color: 'white'}}
                        calendarColor={'transparent'}
                        dateNumberStyle={{color: 'white'}}
                        dateNameStyle={{color: 'white'}}
                        highlightDateNumberStyle={{color: '#0DA463'}}
                        highlightDateNameStyle={{color: '#0DA463'}}
                        iconLeft={require('./image/schedule/left-arrow.png')}
                        iconRight={require('./image/schedule/right-arrow.png')}
                        iconContainer={{flex: 0.1}}
                        onDateSelected={this._setDate}
                        ref='calendarStrip'
                        />
                </ImageBackground>
               
                {
                    this.state.isVisible ===true?
                    
                    <Overlay isVisible={this.state.isVisible}
                    onBackdropPress={() => this.setState({ isVisible: false })}
                    height={Height*0.68}
                    width={Width*0.8}
                    overlayBackgroundColor={'#43C3F1'}
                    // containerStyle={{margin:0}}
                    children={{marginLeft:0}}
                    >
                        <View>
                            <LinearGradient
                                colors={['#43C3F1','#3DE8C4']}
                                // colors={['red', 'green']}
                                start={{ x : 0.0, y : 0.0 }} end={{ x : 1.0, y : 1.0 }}
                                locations={[0.7,1]}
                                style={{height:Height*0.667,width:Width*0.77,margin:0}}
                                >
                                    <View style={{flexDirection:'row',height:Height*0.1,marginLeft:0,width:Width*0.75}}>
                                        <View style={{justifyContent:'center',alignItems:'center',height:Height*0.09,width:Width*0.6}}>
                                            <Text style={{fontSize:25,color:'white',marginLeft:Width*0.15}}>New Task</Text>
                                        </View>
                                        <TouchableOpacity onPress={()=>this.setState({isVisible:false})}>
                                            <Image style={{width:Width*0.15,height:Height*0.09}} source={require('./image/schedule/X.png')} resizeMode='center'></Image>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{width:Width*0.75,height:Height*0.5}}>
                                    <MyText show='Add Title'></MyText>
                                        <TextInput
                                            placeholder="title"
                                            onChangeText={(text)=>this.setState({title:text})}
                                            onSubmitEditing={(text)=>this.setState({title:text})}
                                            onEndEditing={(event)=>this.setState({title:event.nativeEvent.text})}
                                            style={{backgroundColor:'white',height:Height*0.07,width:Width*0.75,marginTop:2}}
                                            />
                                        <MyText show='Add Details'></MyText>
                                        <TextInput
                                            placeholder="datails"
                                            onChangeText={(text)=>this.setState({details:text})}
                                            onSubmitEditing={(text)=>this.setState({details:text})}
                                            onEndEditing={(event)=>this.setState({details:event.nativeEvent.text})}
                                            style={{backgroundColor:'white',height:Height*0.07,width:Width*0.75,marginTop:2}}
                                            />
                                        {/* <Text style={{fontSize:20,color:'white',marginTop:5}} >Start</Text> */}
                                        <MyText show='Start'></MyText>
                                        <MyDatePicker thisGetDate={this._rememberStart.bind(this)} />
                                        <MyText show='End'></MyText>
                                        <MyDatePicker thisGetDate={this._rememberEnd.bind(this)} />
                                        <TouchableOpacity style={{justifyContent:'center',alignItems:'center',marginTop:10,width:Width*0.75,height:Height*0.05,backgroundColor:'transparent',position:'relative'}} onPress={this._addNewTask} >
                                            <Image source={require('./image/schedule/ok.png')} style={{backgroundColor:'#3DE8C4',width:Width*0.18,height:Width*0.18,borderRadius:250,marginTop:30}}  resizeMethod='auto'/>
                                        </TouchableOpacity>
                                    </View>
                            </LinearGradient>
                        </View>
                    </Overlay>
                   :null
                }
                <ScrollView style={{width:Width,height:Height*0.8}}>
                    <FlatList
                    data={this.state.data}
                    renderItem={this._renderItem}
                    keyExtractor={(item,index)=>String(index)}
                    onfresh={this._refreshing}
                    ></FlatList>
                </ScrollView>

                <ActionButton buttonColor="rgba(231,76,60,1)">
                    <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={this._newTask}>
                        <Icon name="md-create" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#1abc9c' title="Delete All" onPress={this._deleteAll}>
                        <Icon name="md-done-all" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                </ActionButton>
            </View>
        );
    }
    _deleteAll=()=>{
            Alert.alert('Warning','Make sure to delete all schedule?',
            [
                {text:'No'},
                {text:'Yes',onPress:()=>{
                  this.setState({data:[]})
                }}
              ])
    }
    _setDate=()=>{
        let Day,Month;
        Day=this.refs.calendarStrip.getSelectedDate()._d.getDate();
        Month=this.refs.calendarStrip.getSelectedDate()._d.getMonth();
        Month++;
        this.setState({day:Day,month:Month});
    }
    _newTask=()=>{
        this.setState({isVisible:true});
    }
   _addNewTask=()=>{
       if(this.state.title===''&&this.state.details===''){
           this.setState({isVisible:false});
           return;
       }
        let day,mon,start,end,weekday;
        console.log(this.refs.calendarStrip.getSelectedDate()._d);
        let mid=this.refs.calendarStrip.getSelectedDate()._d.toString();
        weekday=mid.substr(0,3);
        day=this.refs.calendarStrip.getSelectedDate()._d.getDate();
        mon=this.refs.calendarStrip.getSelectedDate()._d.getMonth();
        start=this.state.start;
        end=this.state.end;
        mon++;
       let cc=[...this.state.data,
           {
               title:this.state.title,
               details:this.state.details,
               id:this.state.data.length+1,
               complete:false,
               day:day,
               month:mon,
               start:start,
               end:end,
               weekday:weekday,
           }
       ];
        function paixu(a,b){
            if(a.month>b.month)  return 1;
            if(a.month<b.month)  return -1;
            if(a.day>b.day)  return 1;
            return -1;
        }
        cc.sort(paixu) ;
        this.setState({data:cc,isVisible:false,title:'',details:'',start:now,end:now});
   }
   _refreshing(){
    let timer= setTimeout(()=>{
      clearTimeout(timer)
    },1500)
  }
  _delete=(index)=>{
            if(this.state.data.length==1)
                this.setState({data:[]})
        else{
            this.state.data.splice(index,1);
            this.setState({data:this.state.data})
        }
    }
    _rememberStart=(start)=>{
        this.setState({start:start});
    }
    _rememberEnd=(end)=>{
        this.setState({end:end});
    }
   _renderItem=(item)=>{
       return(
    <ScrollView
        horizontal={true}
        snapToStart={true}
        showsHorizontalScrollIndicator={false}
        ref={scrollView =>{
                if(scrollView !== null){
                    setTimeout(()=>{
                        scrollView.scrollTo({x:0,y:0,animated:true},1) 
                    })}}}
        >
        <View style={{flexDirection:'row',height:Height*0.15,width:Width*1.25,marginTop:Width*0.01}}>
            <LinearGradient
                colors={['#43C3F1','#3DE8C4']}
                style={{height:Height*0.15,width:Width*0.02,marginLeft:10,borderRadius:10}}
                >
            </LinearGradient>
            <View style={{height:Height*0.15,width:Width*0.15,borderRadius:10,justifyContent:'center',flexDirection:'column',alignItems:'center'}}>
               <Text style={{fontSize:40}}>{item.item.day}</Text>
               <Text style={{fontSize:20}}>{item.item.weekday}</Text>
            </View>
            <View style={{height:Height*0.2,width:Width*0.85,marginTop:Height*0.007}}>
                <View style={{flexDirection:'row',width:Width*0.8,height:Height*0.04,alignItems:'center'}}>
                    <Text style={{fontSize:15}}>{item.item.start} ~ </Text>
                    <Text style={{fontSize:15}}>{item.item.end}</Text>
                </View>
                <Text style={{fontSize:25,color:'black'}}>{item.item.title}</Text>
                <Text style={{fontSize:15,marginLeft:5}}>{item.item.details}</Text>
            </View>
            <View style={{width:Width*0.25,height:Height*0.15,justifyContent:'center',backgroundColor:'#E74C3D'}}>
                <Text style={{fontSize:18,color:'white',marginLeft:10}} onPress={(index)=>this._delete(item.index)}>Delete</Text>
            </View>
        </View>
    </ScrollView>
       )
   }
}
const styles=StyleSheet.create({
  container:{
    width:Width,
    height:Height,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  toggleIcon: {
    fontSize: 30,
    color: "#CCC"
    },
})
module.exports = Schedule;