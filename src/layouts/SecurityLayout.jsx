import React from 'react';
import { connect } from 'dva';
import { Redirect } from 'umi';
import { stringify } from 'querystring';
import PageLoading from '@/components/PageLoading';
import defaultSettings from '../../config/defaultSettings';

class SecurityLayout extends React.Component {
  state = {
    isReady: false,
  };

  componentDidMount() {
    this.setState({
      isReady: true,
    });
    const { dispatch } = this.props;

    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
  }

  render() {
    const { isReady } = this.state;
    const { children, loading, currentUser } = this.props;
    const isLogin = currentUser && currentUser.id;
    const queryString = stringify({
      redirect: window.location.href,
    });

    if ((!isLogin && loading) || !isReady) {
      return <PageLoading />;
    }

    if (!isLogin) {
      const { ssoEnabled, ssoLoginUrl } = defaultSettings;
      if (ssoEnabled && ssoLoginUrl) {
        window.location.href = `${ssoLoginUrl}?${queryString}`;
        return;
      }
      return <Redirect to={`/user/login?${queryString}`}></Redirect>;
    }
    return children;
  }
}

export default connect(({ user, loading }) => ({
  currentUser: user.currentUser,
  loading: loading.models.user,
}))(SecurityLayout);
