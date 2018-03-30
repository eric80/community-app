/* eslint jsx-a11y/no-static-element-interactions:0 */

/**
 * Challenge filters cards type.
 *
 */

import React from 'react';
import PT from 'prop-types';
import { utils } from 'topcoder-react-utils';

import './style.scss';

const FiltersCardsType = ({ hideSrm, isCardTypeSet }) => (
  <div styleName="cards-type-col">
    <a
      styleName={`${isCardTypeSet === 'Challenges' ? 'active' : ''}`}
      onClick={e => e.preventDefault()}
    >Challenges</a>
    {
      hideSrm ? null : (
        <a
          href={utils.config.URL.ARENA}
          target="_blank"
          rel="noopener noreferrer"
        >SRMs</a>
      )
    }
  </div>
);

FiltersCardsType.defaultProps = {
  isCardTypeSet: false,
};

FiltersCardsType.propTypes = {
  hideSrm: PT.bool.isRequired,
  isCardTypeSet: PT.oneOfType([PT.bool, PT.string]),
};

export default FiltersCardsType;
