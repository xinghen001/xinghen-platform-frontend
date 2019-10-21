import React from 'react';
import PageLoading from '@/components/PageLoading';
import CopyBlock from '@/components/CopyBlock';
import { stringify } from "querystring";
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
    const queryString = stringify({
      redirect: window.location.href,
    });

    if ((!initFinished && loading) || !isReady) {
      return <PageLoading />;
    }
    return (
      <>
        <div>{children}</div>
        <CopyBlock id={Date.now()} />
      </>
    );
  }
}

export default connect(({ client, loading }) => ({
  client: client,
  loading: loading.models.client,
}))(Layout);
