import React from 'react';
import { Spin } from 'antd';

/**
 * loading component
 * @returns {*}
 */
export default () => (
  <div style={{ paddingTop: '100', textAlign: 'center' }}>
    <Spin size="large" />
  </div>
);
