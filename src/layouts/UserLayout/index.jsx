import React, { Fragment } from 'react';
import { formatMessage } from 'umi/locale';
import { Icon } from 'antd';
import Link from 'umi/link';
import GlobalFooter from '@/components/GlobalFooter';
import SelectLang from '@/components/SelectLang';
import styles from './index.less';
import { title, copyright } from '@/defaultSettings';

const links = [
  {
    key: 'help',
    title: formatMessage({ id: 'layout.user.link.help' }),
    href: '',
  },
  {
    key: 'privacy',
    title: formatMessage({ id: 'layout.user.link.privacy' }),
    href: '',
  },
  {
    key: 'terms',
    title: formatMessage({ id: 'layout.user.link.terms' }),
    href: '',
  },
];

const copyrightContent = (
  <Fragment>
    Copyright <Icon type="copyright" /> {copyright}{' '}
  </Fragment>
);

const UserLayout = ({ children }) => (
  <div className={styles.container}>
    <div className={styles.lang}>
      <SelectLang />
    </div>
    <div className={styles.content}>
      <div className={styles.top}>
        <div className={styles.header}>
          <Link to="/">
            <span className={styles.title}>{title}</span>
          </Link>
        </div>
      </div>
      {children}
    </div>
    <GlobalFooter links={links} copyright={copyrightContent} />
  </div>
);

export default UserLayout;
