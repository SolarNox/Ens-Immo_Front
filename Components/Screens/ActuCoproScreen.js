import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, RefreshControl, ActivityIndicator, } from 'react-native';
import Timeline from 'react-native-timeline-flatlist';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import ipAdress from '../../config';

import {connect} from 'react-redux';

class ActuCopro extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isRefreshing: false,
            waiting: false,
            data: null,
            dataOnLoad: null
        };
    }

    getCoproDataFromBdd = () => {

        var ctx = this;

        fetch(`${ipAdress}/coproToTimeline?token=${this.props.user.token}&id=${this.props.copro._id}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            var timeline = data.data.reverse();
            var timelineOnLoad = timeline.slice(0, 5)
            var timelineOnRefresh = timeline.slice(5)

            ctx.setState({data: timelineOnLoad, dataOnLoad: timelineOnRefresh, timelineLength: timeline.length})
        })
        .catch(function(error) {
            console.log('Request failed', error)
        });
    }

    onRefresh = () => {
        this.setState({ isRefreshing: true });
        this.getCoproDataFromBdd();
        //refresh to initial data
        setTimeout(() => {
            //refresh to initial data
            this.setState({
            isRefreshing: false,
            });
        }, 2000);
    }

    onEndReached = () => {
        if (!this.state.waiting) {
            this.setState({ waiting: true });

            //fetch and concat data
            setTimeout(() => {
                //refresh to initial data
                var data = this.state.data.concat(this.state.dataOnLoad);
                if(data.length > this.state.timelineLength){
                    this.setState({
                        waiting: false,
                    });
                } else {
                    this.setState({
                        waiting: false,
                        data: data,
                    });
                }          
            }, 2000);
        }
    }

    renderFooter = () => {
        if (this.state.waiting) {
            return <ActivityIndicator />;
        } else {
            return <Text>~</Text>;
        }
    }

    componentDidMount() {
        this.getCoproDataFromBdd();
    }

    render() {
        //'rgb(45,156,219)'
        return (
            <View style={styles.container}>
                <Text
                    style={{
                    padding: hp(2),
                    fontSize: 20,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    }}>
                    Refresh Load More Example
                </Text>
                <Timeline
                    columnFormat="two-column"
                    separator={true}
                    style={styles.list}
                    data={this.state.data}
                    circleSize={20}
                    circleColor="rgb(45,156,219)"
                    lineColor="rgb(45,156,219)"
                    timeContainerStyle={{ minWidth: 52, marginTop: -5 }}
                    timeStyle={{
                    textAlign: 'center',
                    color: 'black',
                    padding: 5,
                    borderRadius: 13,
                    }}
                    descriptionStyle={{ color: 'gray' }}
                    options={{
                    style: { paddingTop: 5 },
                    refreshControl: (
                        <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this.onRefresh}
                        />
                    ),
                    renderFooter: this.renderFooter,
                    onEndReached: this.onEndReached,
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    list: {
        flex: 1,
        marginTop: 20,
    },
});

function mapStateToProps(state) {
    return { user: state.userData, copro: state.coproData }
}

export default connect(mapStateToProps, null)(ActuCopro);