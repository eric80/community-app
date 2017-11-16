/**
 * Routing of Wipro Community.
 */

/* TODO: This assembly of custom challenge listing page should be split out into
 * a separate component. But, it is good enough for now. */
import ChallengeListingTopBanner from
  'components/tc-communities/communities/blockchain/ChallengeListing/TopBanner';
import ChallengeListingRegisterToSee from
  'components/tc-communities/communities/blockchain/ChallengeListing/RegisterToSee';

import Error404 from 'components/Error404';
import Footer from 'components/tc-communities/Footer2';
import Header from 'containers/tc-communities/Header';
import Home from 'components/tc-communities/communities/blockchain/Home';
import Learn from 'containers/tc-communities/blockchain/Learn';
import PT from 'prop-types';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ChallengeListing from '../ChallengeListing';
import Leaderboard from '../Leaderboard';

export default function Routes({ base, member, meta }) {
  return (
    <Route
      component={({ match }) => (
        <div>
          <Header
            baseUrl={base}
            hideJoinNow
            pageId={match.params.pageId || 'home'}
          />
          <Switch>
            <Route
              component={() => (
                <div>
                  <ChallengeListingTopBanner />
                  { member ? (
                    <ChallengeListing listingOnly meta={meta} />
                  ) : <ChallengeListingRegisterToSee /> }
                </div>
              )}
              exact
              path={`${base}/challenges`}
            />
            <Route
              component={() => <Leaderboard meta={meta} />}
              exact
              path={`${base}/leaderboard`}
            />
            <Route
              component={() => <Learn baseUrl={base} />}
              exact
              path={`${base}/learn`}
            />
            <Route
              component={Home}
              exact
              path={`${base}/home`}
            />
            <Route
              component={Error404}
              path={`${base}/:any`}
            />
            <Route
              component={Home}
              exact
              path={`${base}`}
            />
          </Switch>
          <Footer />
        </div>
      )}
      path={`${base}/:pageId?`}
    />
  );
}

Routes.defaultProps = {
  base: '',
};

Routes.propTypes = {
  base: PT.string,
  member: PT.bool.isRequired,
  meta: PT.shape().isRequired,
};
