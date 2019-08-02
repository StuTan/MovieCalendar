import React from 'react';
import PropTypes from 'prop-types';
import Main from './Main.js'
import {
    StyleSheet,
    ViewPropTypes,
    Text,
    ImageBackground
} from 'react-native';

export default class CountDown extends React.Component {

    static propTypes = {
        style: ViewPropTypes.style,
        count: PropTypes.number,
    };
    constructor(props) {
        super(props);
        this.state = {
            thisCount: 1,
            page: 'main'
        }
    }

    render() {
        let {
            source,
            style
        } = this.props;

        if (this.state.page === 'main')
            return ( <
                ImageBackground source = {
                    require('./image/welcome/1.jpg')
                }
                style = {
                    styles.backImg
                } >
                <
                /ImageBackground>
            );
        else
            return ( <
                Main / >
            );
    }
    componentDidMount() {

        this.timeInterval = setInterval(() => {
            if (this.state.thisCount) {
                this.setState(prevState => ({
                    thisCount: prevState.thisCount - 1,

                }))
            } else
                this.setState({
                    page: 'other'
                })

        }, 1000)
    }

    componentWillUnmount() {

        this.timeInterval && clearInterval(this.timeInterval);
    }
}

const styles = StyleSheet.create({
    countView: {
        backgroundColor: 'white',
    },
    backImg: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        paddingHorizontal: 5,
    },
    countText: {
        color: '#fff'
    }
});