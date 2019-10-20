import React, { Component } from 'react';
import { Tabs } from 'antd';
import LoginContext from './LoginContext';

const { TabPane } = Tabs;

/**
 * ID生成器
 */
const generateId = (() => {
  let i = 0;
  return (prefix = '') => {
    i += 1;
    return `${prefix}${i}`;
  };
})();

class LoginTab extends Component {
  constructor(props) {
    super(props);
    this.uniqueId = generateId('login-tab-');
  }

  componentDidMount() {
    const { tabUtil } = this.props;
    tabUtil.addTab(this.uniqueId);
  }

  render() {
    const { children } = this.props;
    return <TabPane {...this.props}>{children}</TabPane>;
  }
}

const WrapContext = props => (
  <LoginContext.Consumer>
    {value => value && <LoginTab tabUtil={value.tabUtil} {...props} />}
  </LoginContext.Consumer>
);

WrapContext.typeName = 'LoginTab';

export default WrapContext;

