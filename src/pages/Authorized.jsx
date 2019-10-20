// import React from 'react';
// import Redirect from 'umi/redirect';
import RenderAuthorized from '../components/Authorized';
import { getAuthority } from '@/utils/auth';

let Authorized = RenderAuthorized(getAuthority()); // eslint-disable-line
// export default ({ children }) => (
//   <Authorized authority={children.props.route.authority} noMatch={<Redirect to="/login" />}>
//     {children}
//   </Authorized>
// );
const reloadAuthorized = () => {
  Authorized = RenderAuthorized(getAuthority());
};

export { reloadAuthorized };
export default Authorized;
