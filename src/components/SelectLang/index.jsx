import React, { PureComponent } from 'react';
import { formatMessage, getLocale, setLocale } from 'umi/locale';
import { Menu, Icon } from 'antd';

import styles from './index.less';

/**
 * 选择语言组件
 */
export default class SelectLang extends PureComponent {

  changeLang = ({ key }) => {
    setLocale(key);
  };

  render() {
    const { className } = this.props;
    const selectedLang = getLocale();
    const locales = [
      { name: 'zh-CN', label: '简体中文', 'icon': '' },
      { name: 'en-US', label: 'English', 'icon': '' },
    ];

    const langMenu = (
      <Menu className={styles.menu} selectedKeys={[selectedLang]}
    );

  }
}
