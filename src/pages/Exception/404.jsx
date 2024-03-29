import React from 'react';
import { formatMessage } from 'umi/locale';
import Link from 'umi/link';
import Exception from '@/components/Exception';

/**
 * 404异常页面
 * @returns {*}
 * @constructor
 */
const Exception404 = () => (
  <Exception
    type="404"
    description={formatMessage({ id: 'app.exception.description.404' })}
    linkElement={Link}
    backText={formatMessage({ id: 'app.exception.back' })}
  />
);

export default Exception404;
