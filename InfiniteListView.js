import React, { Component, PropTypes } from "react";
import {
  Dimensions,
  ListView,
  View,
  RefreshControl,
  ActivityIndicator
} from "react-native";

const LOAD_MORE_TYPE = "LOAD_MORE_TYPE";

export default class InfiniteListView extends Component {
  static propTypes = {
    ...ListView.propTypes,
    distanceToLoadMore: PropTypes.number.isRequired,
    canLoadMore: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
      .isRequired,
    loadMoreRow: PropTypes.func,
    isLoadingMore: PropTypes.bool,
    spinnerColor: PropTypes.color,
    onLoadMore: PropTypes.func.isRequired
  };

  static defaultProps = {
    distanceToLoadMore: 1500,
    canLoadMore: false,
    isLoadingMore: false,
    spinnerColor: "#33A9E0",
    scrollEventThrottle: 100
  };

  constructor(props) {
    super(props);
    if (props.dataArray && props.renderRow) {
      let rowHasChanged = props.rowHasChanged || ((r1, r2) => r1 !== r2);
      const ds = new ListView.DataSource({ rowHasChanged: rowHasChanged });
      this.state = {
        dataSource: ds.cloneWithRows(props.dataArray)
      };
    } else {
      this.state = {};
    }
    this.onScroll = this.onScroll.bind(this);
    this.shouldLoadMore = this.shouldLoadMore.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.dataSource) {
      let list = [...nextProps.dataArray, { type: LOAD_MORE_TYPE }];
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(list)
      });
    }
  }

  onScroll(event) {
    if (this.props.onScroll) {
      this.props.onScroll(event);
    }

    if (this.shouldLoadMore(event)) {
      this.props.onLoadMore();
    }
  }

  onRefresh() {
    this.props.onRefresh();
  }

  shouldLoadMore(event) {
    var canLoadMore = typeof this.props.canLoadMore === "function"
      ? this.props.canLoadMore()
      : this.props.canLoadMore;

    canLoadMore =
      !this.props.isLoadingMore &&
      canLoadMore &&
      this.distanceFromEnd(event) < this.props.distanceToLoadMore;
    return canLoadMore;
  }

  distanceFromEnd = event => {
    let {
      contentSize,
      contentInset,
      contentOffset,
      layoutMeasurement
    } = event.nativeEvent;

    let contentLength;
    let trailingInset;
    let scrollOffset;
    let viewportLength;
    if (this.props.horizontal) {
      contentLength = contentSize.width;
      trailingInset = contentInset.right;
      scrollOffset = contentOffset.x;
      viewportLength = layoutMeasurement.width;
    } else {
      contentLength = contentSize.height;
      trailingInset = contentInset.bottom;
      scrollOffset = contentOffset.y;
      viewportLength = layoutMeasurement.height;
    }

    return contentLength + trailingInset - scrollOffset - viewportLength;
  };

  renderLoadMoreRow = () => {
    return (
      <View
        style={{ height: 60, alignItems: "center", justifyContent: "center" }}
      >
        {this.props.isLoadingMore
          ? <ActivityIndicator
              color={this.props.spinnerColor}
              animating={true}
              size="small"
            />
          : <View />}
      </View>
    );
  };

  renderRefreshControl = () => {
    return (
      <RefreshControl
        style={{ backgroundColor: "transparent" }}
        refreshing={this.props.isRefreshing}
        onRefresh={this.onRefresh}
      />
    );
  };

  renderRow = (rowData, sectionID, rowID) => {
    if (rowData.type !== null && rowData.type === LOAD_MORE_TYPE) {
      return this.props.renderLoadMoreRow
        ? this.props.renderLoadMoreRow()
        : this.renderLoadMoreRow();
    }
    return this.props.renderRow(rowData, sectionID, rowID);
  };

  render() {
    return (
      <ListView
        {...this.props}
        enableEmptySections
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        refreshControl={this.renderRefreshControl()}
        onScroll={this.onScroll}
      />
    );
  }
}
