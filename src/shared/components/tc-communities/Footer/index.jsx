/**
 * Footer component for communities
 */

/* global window */

import _ from 'lodash';
import config from 'utils/config';
import React from 'react';
import PT from 'prop-types';
import { themr } from 'react-css-super-themr';
import { Link, NavLink } from 'react-router-dom';
import defaultStyle from './style.scss';
import TopcoderLogoGray from '../../../../assets/images/tc-communities/logo_topcoder_gray.svg';

function Footer(props) {
  const { communityId, menuItems, theme } = props;

  const items = _.map(menuItems, (item, index) => (
    <li key={index} className={theme.item}>
      <NavLink
        className={theme.link}
        to={item.url}
      >
        {item.title}
      </NavLink>
    </li>
  ));

  const itemLogo = (
    <li key="logo" className={`${theme.item} ${theme.itemLogo}`}>
      {menuItems.length ? (
        <Link to={menuItems[0].url}><TopcoderLogoGray className={theme.logo} /></Link>
      ) : (
        <TopcoderLogoGray className={theme.logo} />
      )}
    </li>
  );

  // add logo at the middle of items
  items.splice(Math.floor(menuItems.length / 2), 0, itemLogo);

  return (
    <nav className={theme.container}>
      <ul className={theme.menu}>
        {items}
      </ul>
      {!props.isAuthorized && (
        <div className={theme.authorize}>
          <button
            className={theme.btnRegister}
            onClick={() => {
              const url = encodeURIComponent(window.location.href);
              window.location = `${config.URL.AUTH}/member/registration?retUrl=${url}&utm_source=${communityId}`;
            }}
          >Register</button>
          <button
            className={theme.btnLogin}
            onClick={() => {
              const url = encodeURIComponent(window.location.href);
              window.location = `${config.URL.AUTH}/member?retUrl=${url}&utm_source=${communityId}`;
            }}
          >Login</button>
        </div>
      )}
    </nav>
  );
}

Footer.defaultProps = {
  theme: {},
};

Footer.propTypes = {
  communityId: PT.string.isRequired,
  menuItems: PT.arrayOf(PT.shape({
    title: PT.string.isRequired,
    url: PT.string.isRequired,
  })).isRequired,
  isAuthorized: PT.bool.isRequired,
  theme: PT.shape({
    container: PT.string,
    menu: PT.string,
    authorize: PT.string,
    btnRegister: PT.string,
    btnLogin: PT.string,
  }),
};

export default themr('tcCommunities-Footer', defaultStyle)(Footer);
