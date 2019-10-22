import React from 'react';
import PageLoading from '@/components/PageLoading';
import { connect } from 'dva';

class Layout extends React.Component {
  state = {
    isReady: false,
  };

  componentDidMount() {
    // 获取client信息
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'client/fetch',
      });
    }
    this.setState({
      isReady: true,
    });
  }

  render() {
    const { isReady } = this.state;
    const { children, loading, client } = this.props;
    const initFinished = client && client.id;

    if (!initFinished || loading || !isReady) {
      return <PageLoading />;
    }
    return <div>{children}</div>;
  }
}

export default connect(({ client, loading }) => ({
  client,
  loading: loading.models.client,
}))(Layout);
