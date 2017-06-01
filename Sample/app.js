import React, { Component } from "react";
import { View, Text, AppRegistry, ActivityIndicator, StyleSheet, Image } from "react-native";
import {InfiniteListView} from "react-native-infinite-listview";
import TimerMixin from 'react-timer-mixin';

console.disableYellowBox = true;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: 10,
    flexDirection: 'column',
    paddingRight: 10,
  },
  thumbView: {
    width: 40,
    height: 40,
    margin: 10,
  },
  thumbImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 13,
    color: '#444444',
  },
  message: {
    fontSize: 13,
    paddingTop: 8,
    paddingBottom: 10,
    color: '#444444',
    fontWeight: '200',
  },
  time: {
    fontSize: 11,
    color: '#999999',
    fontWeight: '200',
  },
  devider: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 0.5,
    backgroundColor: '#C8C8C8',
  },
});

const DEFAULT_LIST = [
        { index: 1, title: 'What is Lorem Ipsum', message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry' },
        { index: 2, title: 'Why do we use it', message: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout' },
        { index: 3, title: 'Where does it come from?', message: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.' },
        { index: 4, title: 'Where can I get some?', message: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form' },
        { index: 5, title: 'The standard Lorem Ipsum passage, used since the 1500s', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' },
        { index: 6, title: 'What is Lorem Ipsum', message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry' },
        { index: 7, title: 'Why do we use it', message: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout' },
        { index: 8, title: 'Where does it come from?', message: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.' },
        { index: 9, title: 'Where can I get some?', message: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form' },
        { index: 10, title: 'The standard Lorem Ipsum passage, used since the 1500s', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' },
      ]

export default class App extends Component {
  state = {
    isRefreshing: false,
    isLoadingMore: false,
    listItems: [],
  }

  componentDidMount() {
    this.setState({
      listItems: DEFAULT_LIST
    });
  }

  onRefresh = () => {
    this.setState({ isRefreshing: true });
    setTimeout( () => {
      this.setState({ isRefreshing: false });
    }, 3000);
  };

  canLoadMoreContent = () => {
    return this.state.listItems.length < 50 && !this.state.isLoadingMore;
  };

  onLoadMore = () => {
    console.log('start loading more');
    this.setState({ isLoadingMore: true });
    setTimeout( () => {
      console.log('stop loading more');
      this.setState({
        isLoadingMore: false,
        listItems: [...this.state.listItems, ...DEFAULT_LIST]
      });
    }, 3000);
  };

  renderRow = (rowData, sectionID, rowID) => {
    return (
      <View style={{flexDirection: 'row'}}>
        <View style={styles.thumbView}>
          <Image style={styles.thumbImage} source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}} />
        </View>
        <View style={styles.body}>
          <Text style={styles.title}>{rowData.title}</Text>
          <Text style={styles.message}>{rowData.message}</Text>
        </View>
        <View style={styles.devider} />
      </View>
    );
  };

  /*renderLoadMoreRow = () => {
    return (
      <View
        style={{ height: 60, alignItems: 'center', justifyContent: 'center' }}
      >
        {this.state.isLoadingMore
          ? <ActivityIndicator
              color={this.props.spinnerColor}
              animating={true}
              size="small"
            />
          : <View />}
      </View>
    );
  };*/

  render() {
    return (
      <InfiniteListView
        style={{ flex: 1, marginTop: 64 }}
        dataArray={this.state.listItems}
        renderRow={this.renderRow}
        onRefresh={this.onRefresh}
        isRefreshing={this.state.isRefreshing}
        canLoadMore={this.canLoadMoreContent}
        isLoadingMore={this.state.isLoadingMore}
        /*renderLoadMoreRow={this.renderLoadMoreRow}*/
        onLoadMore={this.onLoadMore}
      />
    );
  }
}
