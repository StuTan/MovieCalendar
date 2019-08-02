import React, { Component } from "react";
import { View, Text, StyleSheet, Image, FlatList, Dimensions, ScrollView, ImageBackground, Animated, Easing } from "react-native";
const windowW = Dimensions.get('window').width;
class Weather extends Component {
    constructor(props) {
        super(props);
        this.spinValue = new Animated.Value(0)
        this.state = {
            index: 0,
            city: "",
            temp: 0,
            maxt: 32.8,
            hour: 0,
            week3: 0,
            script : ['Light Cloud', '06-07', 'SE', '2', 21.2, 33.2, 32.8, 2.329, 125.624, 1001.005, '31%', 10.053],
            tems: [23, 28.7, 24.7, 26, 31, 28.3, 31.6, 27.1, 29.9, 29.5, 28.9, 27],
            otherDays: [
                {date:'06-08', we: 'Mon.', min: 20.1, max: 30.2, weastate: 'Light Rain'},
                {date:'06-08', we: 'Mon.', min: 20.1, max: 30.2, weastate: 'Light Rain'},
                {date:'06-08', we: 'Mon.', min: 20.1, max: 30.2, weastate: 'Light Rain'},
                {date:'06-08', we: 'Mon.', min: 20.1, max: 30.2, weastate: 'Light Rain'},
                {date:'06-08', we: 'Mon.', min: 20.1, max: 30.2, weastate: 'Light Rain'},
            ]
        }
    }

    componentWillMount() {
        var date = new Date();//change
        var year = date.getFullYear().toString();
        var month = (date.getMonth() + 1).toString();
        var day = parseInt(date.getDate().toString());
        var web = 'https://www.metaweather.com/api/location/2151330/' + year + '/' + month + '/' + day + '/';
        function check(year, month, day) {
            if(month == 2) {
                // leap year
                if((year%4==0 && year%100!=0) || (year%400==0)) {
                    if(day > 29) { day = 1}
                }
                else {if(day > 28) {day = 1} }
            }
            else if(month == 4||month ==6||month ==9||month ==11) {if(day > 30) day = 1}
            else {if(day > 31) day = 1 }

            return day;
        }
        this.setState({
            hour: date.getHours().toString(),
            week3: date.getDay().toString(),
        })
        fetch(web)
            .then( response => response.json())
            .then(data  => {
                this.getWeather(data)
                for(let i = 1; i < 12; i++) {
                    let te = [...this.state.tems]
                    let maxx = this.state.maxt
                    
                    te[i] = data[i*4].the_temp.toFixed(1);
                    maxx = te[i] < maxx ? maxx : te[i];
                    this.setState({
                        tems: te,
                        maxt: maxx,
                    })
                }
            })
            .catch( error => alert(error))
        
        for(let i = 0; i < 5; i++) {
            day = day + 1;//31
            if(day > 29 && day != check(year, month, day)) {
                day = 1, month++;
                if(month > 12) { month = 1, year++;}
            }
            web = 'https://www.metaweather.com/api/location/2151330/' + year + '/' + month + '/' + day + '/';
            fetch(web)
                .then( response => response.json())
                .then(data  => {
                    let days = [...this.state.otherDays]
                    let me = {date:'0', we: 'Mon.', min:0, max: 0, weastate: ''}
                    let num = this.state.index;
                    let wee = this.state.week3;
                    function Week(wee) {
                        if(wee == '1') return 'Mon.'
                        else if(wee == '2') return 'Tues.'
                        else if(wee == '3') return 'Wed.'
                        else if(wee == '4') return 'Thur.'
                        else if(wee == '5') return 'Fri.'
                        else if(wee == '6') return 'Sat.'
                        else if(wee == '7') return 'Sun.'
                        else return 'none'
                    }
                    function sortarray(a, b) {
                        if(a.date > b.date) return 1;
                        else return -1;
                    }
                    me.date = data[0].applicable_date.substr(5),
                    me.min = data[0].min_temp.toFixed(1),
                    me.max = data[0].max_temp.toFixed(1),
                    me.weastate = data[0].weather_state_name,
                    days[num] = me

                    if(num == 4) {
                        days.sort(sortarray)
                        for(let i = 0; i < 5; i++) {
                            wee++;
                            if(wee == 8) wee = 1;
                            days[i].we = Week(wee);
                        }
                    }
                    this.setState({
                        otherDays: days,
                        index: num + 1,
                    })
                })
                .catch( error => alert(error))
        }
    }
    componentDidMount() {
        this.rotate()
    }
    
    getWeather = (data) => {
        var oSpan = [];
        var me = data[3];
        oSpan[0] = me.weather_state_name;
        oSpan[1] = me.applicable_date.substr(5);
        oSpan[2] = me.wind_direction_compass;
        oSpan[3] = me.created;
        oSpan[4] = me.min_temp.toFixed(1);
        oSpan[5] = me.max_temp.toFixed(1);
        oSpan[6] = me.the_temp.toFixed(1);
        oSpan[7] = me.wind_speed.toFixed(3);
        oSpan[8] = me.wind_direction.toFixed(3);
        oSpan[9] = me.air_pressure.toFixed(3);
        oSpan[10] = me.humidity + '%';
        oSpan[11] = me.visibility.toFixed(3);
        this.setState({
            script: oSpan
        })
    }
    
    changeImg = (weatherState, h) => {
        let s = '';
        if(weatherState == 'Snow')
            s = require('./images/weather_icon/sn.png');
        else if(weatherState == 'Sleet')
            s = require('./images/weather_icon/sl.png');
        else if(weatherState == 'Hail')
            s = require('./images/weather_icon/h.png');
        else if(weatherState == 'Thunderstorm')
            s = require('./images/weather_icon/t.png');
        else if(weatherState == 'Heavy Rain')
            s = require('./images/weather_icon/hr.png');
        else if(weatherState == 'Light Rain')
            s = require('./images/weather_icon/lr.png');
        else if(weatherState == 'Showers')
            s = require('./images/weather_icon/s.png');
        else if(weatherState == 'Heavy Cloud')
            s = require('./images/weather_icon/hc.png');
        else if(weatherState == 'Light Cloud')
            s = require('./images/weather_icon/lc.png');
        else if(weatherState == 'Clear')
            s = require('./images/weather_icon/c.png');
        else
            s = require('./images/weather_icon/c.png');

        return s;
    }
    rotate = () => {
        this.spinValue.setValue(0)
        // Animated.delay(100)
        Animated.timing(this.spinValue, {
            toValue: 1, // last=1，means max deg=360deg
            duration: 3000,
            easing: Easing.linear
        }).start()
    }

    render() {
        //map 0~1 to 0~360deg 
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],//input
            outputRange: ['0deg', '360deg'] //output
        })
        days = [...this.state.otherDays]
        temps = [...this.state.tems]
        return (
            <ScrollView>

                <View style={styles.today} id="today_container">
                    <Animated.Image
                        style={[styles.todayPi, {transform:[{rotate: spin}]}]}
                        source={this.changeImg(this.state.script[0], this.state.hour)}
                    />
                    <View style={styles.todayStatus}>
                        <View style={styles.row}>
                            <Text style={styles.todayTemp}>{this.state.script[6]}</Text>
                            <Text style={[styles.same, {fontSize: 35}]}>℃</Text>
                        </View>
                        <Text style={[styles.same, {fontSize: 18}]}>{this.state.script[4]}℃ / {this.state.maxt}℃</Text>
                        <Text style={[styles.same, {fontSize: 16}]}>{this.state.script[1]}  {this.state.script[0]}</Text>
                    </View>
                </View>

                <View id="future_container">
                    <FlatList
                        style={styles.list}
                        //splitter component between lines
                        ItemSeparatorComponent = {() => {
                            return (
                                <View style={styles.itemSeparator}/>
                            )
                        }}
                        keyExtractor={(item, index) => index.toString()}
                        data={days}
                        renderItem = { ({item}) => (
                            <View style={styles.futureBox}>
                                <Text style={styles.date}>{item.date}  {item.we}</Text>
                                <Image style={styles.smallPicture} source={this.changeImg(item.weastate, -1)}/>
                                <Text style={styles.temperature}>{item.min}/{item.max}℃</Text>
                            </View>
                        )}
                    />
                </View>

                <View style={styles.histoGram}>
                    <FlatList
                        style={styles.histogramList}
                        numColumns = {12}
                        columnWrapperStyle= {{alignItems: 'flex-end', justifyContent: 'space-around'}}
                        data={temps}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem = {({item}) => (
                            <View style={[styles.bar, {height: item*7 - 25}]}>
                                <Text style={styles.predicate}>{item}</Text>
                            </View>
                        )}
                    />
                </View>

                <View style={styles.hint}>
                    <ImageBackground style={{width: windowW}} source={require('./images/wind.png')}>
                        <View style={[styles.windBox]}>
                            <View style={[styles.row, {left: windowW/4}]}>
                                <Text style={styles.hintName}>Wind_direction_compass  </Text>
                                <Text style={styles.hintf}>{this.state.script[2]}</Text>
                            </View>
                            <View style={[styles.rowMargin, {left: windowW/3}]}>
                                <Text style={styles.hintName}>Wind_speed  </Text>
                                <Text style={styles.hintf}>{this.state.script[7]}mph</Text>
                            </View>
                        </View>
                    </ImageBackground>
                    
                    <ImageBackground style={{width: windowW}} source={require('./images/hints.png')}>
                        <View style={styles.hintsBox}>
                            <View style={[styles.row, {left: windowW/15}]}>
                                <Text style={styles.hintName}>Air_pressure  </Text>
                                <Text style={styles.hintf}>{this.state.script[9]}mbar</Text>
                            </View>
                            <View style={[styles.rowMargin, {left: windowW/9}]}>
                                <Text style={styles.hintName}>Visibility  </Text>
                                <Text style={styles.hintf}>{this.state.script[11]}miles</Text>
                            </View>
                            <View style={[styles.rowMargin, {left: windowW/6}]}>
                                <Text style={styles.hintName}>Humidity  </Text>
                                <Text style={styles.hintf}>{this.state.script[10]}</Text>
                            </View>
                        </View>
                    </ImageBackground>
                </View>

            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
    rowMargin: {
        flexDirection: 'row',
        marginTop: 5
    },
    today: {
        left: 10,
        height: 150,
        width: windowW,
        flexDirection: 'row',
        alignItems: 'center',
    },
    todayPi: {
        height: 100,
        width: 100,
    },
    todayStatus: {
        left: 4,
        margin: 11,
    },
    todayTemp: {
        fontWeight: '600',
        fontSize: 45,
        color: 'white'
    },
    same: {
        fontWeight: '300',
        color: 'white'
    },
    list: {
        height: 220,
    },
    itemSeparator: {
        height:3,
        backgroundColor: 'rgba(255, 255, 255, 0)'
    },
    futureBox: {
        margin: 1,
        height: 36,
        backgroundColor: 'rgba(255, 255, 255, 0.35)',
        flexDirection: 'row',
        alignItems: 'center',
    },
    date: {
        flex: 1,
        left: 18,
        fontSize: 18,
        color: 'white',
    },
    temperature: {
        flex: 1,
        fontSize: 18,
        textAlign: 'center',
        color: 'white',
    },
    smallPicture: {
        width: 32,
        height: 32,
    },
    histoGram: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        width: windowW
    },
    histogramList: {
        width: windowW,
        marginVertical: 5
    },
    bar: {
        width: 25,
        backgroundColor: 'rgba(30, 144, 255, 0.2)',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    predicate: {
        textAlign: 'center',
        color: 'white',
        fontSize: 10,
        fontWeight: '500',
    },
    hint: {
        height: 305,
        marginVertical: 15,
    },
    windBox: {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        margin: 6,
        height: 150,
        justifyContent: 'center',
        width: windowW,
    },
    hintsBox: {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        marginTop: 15,
        height: 110,
        justifyContent: 'center',
    },
    hintName: {
        color: 'rgb(255, 245, 238)',
        fontSize: 16,
    },
    hintf: {
        color: 'white',
        fontSize: 16,
    },
})

export default Weather;