import React, { PureComponent } from 'react';
import { FormattedMessage, formatMessage } from 'umi/locale';
import { Spin, Menu, Icon, Avatar, Tooltip } from 'antd';
import HeaderDropdown from '../HeaderDropdown';
import SelectLang from '../SelectLang';
import styles from './index.less';

export default class GlobalHeaderRight extends PureComponent {

  render() {
    const { theme, client, currentUser, onMenuClick } = this.props;
    const { docUrl } = client;

    const menu = (
      <Menu
        className={styles.menu}
        style={{ marginRight: 1 }}
        selectedKeys={[]}
        onClick={onMenuClick}
      >
        <Menu.Item key="logout">
          <Icon type="logout" />
          <FormattedMessage id="menu.account.logout" defaultMessage="logout" />
        </Menu.Item>
      </Menu>
    );

    let className = styles.right;
    if (theme === 'dark') {
      className = `${styles.right} ${styles.dark}`;
    }

    return (
      <div className={className} style={{ marginRight: 8 }}>
        {/* 帮助文档 */}
        <Tooltip title={formatMessage({ id: 'component.globalHeader.help' })}>
          <a
            className={styles.action}
            target="_blank"
            rel="noopener noreferrer"
            href={docUrl}
          >
            <Icon type="question-circle-o" />
          </a>
        </Tooltip>
        {/* 用户 */}
        {
          currentUser.name ? (
            <HeaderDropdown overlay={menu} style={{ marginRight: 8 }}>
              <span className={`${styles.action}  ${styles.account}`}>
                <Avatar
                  size="small"
                  className={styles.avatar}
                  src={currentUser.avatar || 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'}
                  alt="avatar"
                />
                <span className={styles.name}>{currentUser.name}</span>
              </span>
            </HeaderDropdown>
          ) : (
            <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
          )
        }
        <SelectLang className={styles.action} />
      </div>
    );
  }
}
