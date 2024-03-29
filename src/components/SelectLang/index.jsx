import React, { PureComponent } from 'react';
import { formatMessage, getLocale, setLocale } from 'umi/locale';
import classNames  from 'classnames';
import { Menu, Icon } from 'antd';
import HeaderDropdown  from '../HeaderDropdown';

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
      <Menu className={styles.menu} selectedKeys={[selectedLang]} onClick={this.changeLang}>
        {
          locales.map(locale => (
            <Menu.Item key={locale.name}>
              <span role="img" aria-label={locale.label}>
                {locale.icon}
              </span>{' '}
              {locale.label}
            </Menu.Item>
          ))
        }
      </Menu>
    );

    return (
      <HeaderDropdown overlay={langMenu} placement="bottomRight">
        <span className={classNames(styles.dropDown, className)}>
          <Icon type="global" title={formatMessage({id: 'navBar.lang'})} />
        </span>
      </HeaderDropdown>
    );
  }
}
