import _ from 'lodash';
import { toJson } from 'utils/xml2json';
import { createActions } from 'redux-actions';
import { getService } from 'services/dashboard';
import { getService as srmService } from 'services/srm';
import { getService as memberService } from 'services/memberCert';
import config from 'utils/config';

import { processSRM } from 'utils/tc';

/* global fetch */
import 'isomorphic-fetch';

/**
 * Loads SRM matches.
 * @param {String} tokenV3
 * @param {String} handle
 * @param {Object} params
 */
function getSRMs(tokenV3, handle, params) {
  const service = srmService(tokenV3);
  const promises = [service.getSRMs(params)];
  if (handle) {
    promises.push(service.getUserSRMs(handle, params));
  }
  return Promise.all(promises).then((data) => {
    let srms = data[0];
    const userSrms = data[1];
    const userSrmsMap = {};
    _.forEach(userSrms, (srm) => {
      userSrmsMap[srm.id] = srm;
    });
    srms = _.map(srms, (srm) => {
      if (userSrmsMap[srm.id]) {
        return processSRM(srm);
      }
      return srm;
    });
    return srms;
  });
}

function getIosRegistration(tokenV3, userId) {
  return memberService(tokenV3).getMemberRegistration(userId, config.SWIFT_PROGRAM_ID);
}

function registerIos(tokenV3, userId) {
  return memberService(tokenV3).registerMember(userId, config.SWIFT_PROGRAM_ID);
}

export default createActions({
  DASHBOARD: {
    GET_SRMS_INIT: _.noop,
    GET_SRMS_DONE: getSRMs,
    GET_IOS_REGISTRATION: getIosRegistration,
    REGISTER_IOS: registerIos,
  },
});
