/**
 * Renders 'Add a Web Link' section.
 */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PT from 'prop-types';

import './styles.scss';

export default class AddWebLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      webLink: '',
    };

    this.onUpdateWebLink = this.onUpdateWebLink.bind(this);
    this.onAddWebLink = this.onAddWebLink.bind(this);
    this.isWebLinkValid = this.isWebLinkValid.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { profileState } = this.props;
    if (profileState.addingWebLink && !nextProps.profileState.addingWebLink) {
      this.setState({ webLink: '' });
    }
  }

  // Set web link
  onUpdateWebLink(e) {
    e.preventDefault();
    this.setState({ webLink: e.target.value });
  }

  // Add web link
  onAddWebLink(e) {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      e.stopPropagation();
      const {
        addWebLink,
        handle,
        tokenV3,
      } = this.props;
      const { webLink } = this.state;
      if (webLink && this.isWebLinkValid()) {
        addWebLink(handle, tokenV3, webLink);
      }
    }
  }

  isWebLinkValid() {
    const { webLink } = this.state;
    return !webLink || ((webLink.split('.').length > 2) && /^(http(s?):\/\/)?(www\.)?[a-zA-Z0-9\.\-\_]+(\.[a-zA-Z]{2,15})+(\/[a-zA-Z0-9\_\-\s\.\/\?\%\#\&\=]*)?$/.test(webLink)); /* eslint-disable-line no-useless-escape */
  }

  render() {
    const { webLink } = this.state;

    const webLinkValid = this.isWebLinkValid();

    return (
      <div styleName="external-web-link">
        <div styleName="web-link">
          <form
            name="addWebLinkFrm"
            autoComplete="off"
            onSubmit={this.onAddWebLink}
          >
            <label htmlFor="external-link">
              External Link
            </label>
            <div styleName={webLinkValid ? 'validation-bar url' : 'validation-bar url error-bar'}>
              <input
                id="web-link-input"
                name="url"
                type="text"
                styleName="url"
                value={webLink}
                onChange={this.onUpdateWebLink}
                placeholder="http://www.yourlink.com"
                onKeyDown={this.onAddWebLink}
                required
              />
              {
                !webLinkValid
                && (
                  <div styleName="form-input-error">
                    <p>
Please enter a valid URL
                    </p>
                  </div>
                )
              }
            </div>
          </form>
        </div>
      </div>
    );
  }
}

AddWebLink.propTypes = {
  handle: PT.string.isRequired,
  tokenV3: PT.string.isRequired,
  profileState: PT.shape().isRequired,
  addWebLink: PT.func.isRequired,
};
