import { Icon, Tooltip } from 'antd';
import React from 'react';
import { connect } from 'dva';
import Avatar from './AvatarDropdown';
import styles from './index.less';

const GlobalHeaderRight = props => {
  const { theme, layout, docUrl } = props;
  let className = styles.right;

  if (theme === 'dark' && layout === 'topmenu') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <div className={className}>
      {/* 帮助文档 */}
      <Tooltip
        title="使用文档"
      >
        <a
          target="_blank"
          href={docUrl}
          rel="noopener noreferrer"
          className={styles.action}
        >
          <Icon type="question-circle-o" />
        </a>
      </Tooltip>
      {/* 用户信息 */}
      <Avatar menu />
    </div>
  );
};

export default connect(({ settings }) => ({
  theme: settings.navTheme,
  layout: settings.layout,
}))(GlobalHeaderRight);
