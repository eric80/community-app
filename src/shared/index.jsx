/**
 * The shared part of Topcoder Community App. This code is further wrapped in
 * different ways by Webpack and ExpressJS server to properly support both
 * client- and server-side rendering.
 */

import React from 'react';
import Routes from 'routes';
import ErrorAlertContainer from 'containers/ErrorAlert';

import 'styles/global.scss';

const USE_DEV_TOOLS = Boolean(process.env.DEV_TOOLS);
const DevTools = USE_DEV_TOOLS ? require('containers/DevTools').default : undefined;

export default function App() {
  return (
    <div>
      <Routes />
      <ErrorAlertContainer />
      { USE_DEV_TOOLS ? <DevTools /> : undefined }
    </div>
  );
}
