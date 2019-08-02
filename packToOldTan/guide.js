 /**
 * Created by linyufeng on 2016/8/27.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ViewPagerAndroid,
    Image,
    ToastAndroid,
    TouchableOpacity,
}from 'react-native';
import { WebView } from 'react-native-webview';
import { createStackNavigator, createAppContainer } from 'react-navigation';

 
class webb extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
        }
    }
    static navigationOptions = ({ navigation, navigationOptions }) => {
      const { params } = navigation.state;
  
      return {
        title: params ? params.otherParam : 'bh' ,
        /* These values are used instead of the shared configuration! */
        headerStyle: {
          backgroundColor:'red',
        },
        headerTintColor: 'red',
      };
    };
    //监听页面变化
    onPageSelected=function(e) {
        //默认从0开始，0是第一页
        this.setState({page: e.nativeEvent.position});
        console.log('CurrentPage: '+e.nativeEvent.position);
        ToastAndroid.show('CurrentPage: '+e.nativeEvent.position, ToastAndroid.SHORT);
    }
 
    render() {
        let page = this.state.page;
        return (
            
                          /*左右翻页组件*/
 <ViewPagerAndroid
 style={styles.container}
 //绑定事件，引用时要在函数末尾加bind(this)
 onPageSelected={this.onPageSelected.bind(this)}
 //初始化页面为第一个页面，从0开始
 initialpage={0}>
 <View style={styles.container}>
     <Image source={require('./img/1.jpeg')} style={styles.image}></Image>
     <Text style={styles.welcome}>
         医生叫我进行光合作用{'\n'}
         不要熬夜了
     </Text>
 </View>
 <View style={styles.container}>
     <Image source={require('./img/1.jpeg')} style={styles.image}></Image>
     <Text style={styles.welcome}>
         人生不断向前的秘诀{'\n'}
         就是忘记从那里来 记得到哪里去
     </Text>
 </View>
 <View style={styles.container}>
     <Image source={require('./img/1.jpeg') } style={styles.image}></Image>
     <Text style={styles.welcome}>
         人生路虽漫长{'\n'}
         但是关键的就那几步
     </Text>
 </View>
 <View style={styles.container}>
     <Image source={require('./img/1.jpeg')} style={styles.image}></Image>
     <Text style={styles.welcome}>
         欢迎使用原点APP
     </Text>
     <TouchableOpacity style={{ justifyContent:'center',alignContent:'center',
         height:40,width:40,marginLeft: 80, 
         backgroundColor:'red',  borderRadius:250,alignItems:'flex-end'
         
         }}
         onPress={() => {
          /* 1. Navigate to the Details route with params */
          this.props.navigation.navigate('Third', { 
          });
        }}
           >
       <Text  style={{  fontSize:20, textAlign:'center' }} >+  </Text>
        </TouchableOpacity>
 </View>
</ViewPagerAndroid>
                        
        );
    }
}
class ThirdScreen extends React.Component {
  
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;

    return {
      title: params ? params.otherParam : 'cd',
      /* These values are used instead of the shared configuration! */
      headerStyle: {
        backgroundColor: 'red',
      },
      headerTintColor: 'red',
    };
  };
  constructor(props) {
    super(props);
    this.state = {}; 
  }
  render() { 

    return (
      <View style={{ flex: 1,  }}>
         <WebView
        source={{  uri:  'https://movie.douban.com/subject/27060077/' }}
        style={{ marginTop: 20 }}
      />
      </View>
    );
  }
}
const styles = StyleSheet.create({
    bg: {
        flex: 1,
        backgroundColor:'#CCFF66',
    },
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    image: {
        width:300,
        height:300,
        borderRadius:150,
    },
    welcome: {
        fontSize: 16,
        textAlign: 'center',
    },
    slider: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    ol: {
        backgroundColor:'rgba(0,0,0,0.3)',
        height:20,
        width:80,
        justifyContent:'space-around',
        alignItems: 'center',
        flexDirection:'row',
        borderRadius:10,
        margin:20,
    },
    li: {
        backgroundColor:'rgba(255,255,255,1.0)',
        height:10,
        width:10,
        borderRadius:5,
    },
    currt: {
        backgroundColor:'rgba(255,255,255,1.0)',
        height:10,
        width:15,
        borderRadius:5,
    },
});
 
const RootStack = createStackNavigator(
  {
     
    webbn: {
        screen : webb,
    },
    Third: {
      screen : ThirdScreen,
  },
  }, 
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
AppRegistry.registerComponent('webb', () => webb);