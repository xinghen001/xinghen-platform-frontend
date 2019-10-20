import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';

const { Footer } = Layout;

const FooterView = props => {
  const { client, copyright: defaultCopyright } = props;
  const { copyright = defaultCopyright } = client;
  return (
    <Footer style={{ padding: 0 }}>
      <GlobalFooter
        copyright={
          <Fragment>
            Copyright <Icon type="copyright" />
            {' '}{copyright || '2019 xxx'}
          </Fragment>
        }
      />
    </Footer>
  );
};

export default FooterView;
