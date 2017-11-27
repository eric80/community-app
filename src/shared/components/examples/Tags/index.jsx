import _ from 'lodash';
import React from 'react';
import {
  Tag,
  PrimaryTag,
  EventTag,
} from 'components/tags';
import { ThemeProvider } from 'react-css-super-themr';

import primaryDataScienceTagStyle from 'components/tags/primary/data-science.scss';
import primaryDevelopTagStyle from 'components/tags/primary/develop.scss';
import eventDevelopTagStyle from 'components/tags/event/develop.scss';
import eventDataScienceTagStyle from 'components/tags/event/data-science.scss';

import style from './style.scss';

_.noop(style);

export default function Tags() {
  return (
    <div styleName="style.page">
      <h1>Tags</h1>
      <p>
        All tags in this page are instances of the generic tag,
        implemented in <code>/src/components/tags</code> and wrapped
        into different style themes with help
        of <code>react-css-themr</code>.
      </p>

      <h3><a name="default-tag">Default Tag</a></h3>
      <Tag>Tag</Tag>
      <Tag to="#default-tag">Link Tag</Tag>

      <h3>Primary Tag</h3>

      <p>Default &mdash; design color scheme:</p>
      <PrimaryTag>Tag</PrimaryTag>
      <PrimaryTag to=".">Link Tag</PrimaryTag>

      <p>Develop color scheme (underlying source code also
        demonstrates the proper context theming in action):</p>

      <ThemeProvider
        theme={{ PrimaryTag: primaryDevelopTagStyle }}
      >
        <div>
          <PrimaryTag>Tag</PrimaryTag>
          <PrimaryTag to=".">Link Tag</PrimaryTag>
        </div>
      </ThemeProvider>

      <p>Data science color scheme:</p>
      <ThemeProvider
        theme={{ PrimaryTag: primaryDataScienceTagStyle }}
      >
        <div>
          <PrimaryTag>Tag</PrimaryTag>
          <PrimaryTag to=".">Link Tag</PrimaryTag>
        </div>
      </ThemeProvider>

      <h3>Event Tag</h3>
      <p>Default &mdash; design color scheme:</p>
      <EventTag>Tag</EventTag>
      <EventTag to=".">Link Tag</EventTag>
      <p>Develop color scheme:</p>
      <ThemeProvider
        theme={{ EventTag: eventDevelopTagStyle }}
      >
        <div>
          <EventTag>Tag</EventTag>
          <EventTag to=".">Link Tag</EventTag>
        </div>
      </ThemeProvider>
      <p>Data Science color scheme:</p>
      <ThemeProvider
        theme={{ EventTag: eventDataScienceTagStyle }}
      >
        <div>
          <EventTag>Tag</EventTag>
          <EventTag to=".">Link Tag</EventTag>
        </div>
      </ThemeProvider>
    </div>
  );
}
