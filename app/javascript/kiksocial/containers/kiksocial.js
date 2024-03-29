'use strict';

import React from 'react';
import { Provider, connect } from 'react-redux';
import PropTypes from 'prop-types';
import configureStore from '../store/configureStore';
import { INTRODUCTION_VERSION } from '../actions/onboarding';
import { BrowserRouter, Route } from 'react-router-dom';
import { ScrollContext } from 'react-router-scroll-4';
import UI from '../features/ui';
import Introduction from '../features/introduction';
import { fetchCustomEmojis } from '../actions/custom_emojis';
import { hydrateStore } from '../actions/store';
import {
  connectUserStream,
  connectStatusUpdateStream,
} from '../actions/streaming';
import { IntlProvider, addLocaleData } from 'react-intl';
import { getLocale } from '../locales';
import initialState from '../initial_state';
import { me } from '../initial_state';
import ErrorBoundary from '../components/error_boundary';

const { localeData, messages } = getLocale();
addLocaleData(localeData);

export const store = configureStore();
const hydrateAction = hydrateStore(initialState);

store.dispatch(hydrateAction);
store.dispatch(fetchCustomEmojis());

const mapStateToProps = (state) => {
  const account = state.getIn(['accounts', me]);
  const showIntroduction = account ? state.getIn(['settings', 'introductionVersion'], 0) < INTRODUCTION_VERSION : false;

  return {
    showIntroduction,
  }
}

@connect(mapStateToProps)
class KikSocialMount extends React.PureComponent {

  static propTypes = {
    showIntroduction: PropTypes.bool,
  };

  render () {
    // Disabling introduction for launch
    // const { showIntroduction } = this.props;
    //
    // if (showIntroduction) {
    //   return <Introduction />;
    // }

    return (
      <BrowserRouter>
        <ScrollContext>
          <Route path='/' component={UI} />
        </ScrollContext>
      </BrowserRouter>
    );
  }

}

export default class KikSocial extends React.PureComponent {

  static propTypes = {
    locale: PropTypes.string.isRequired,
  };

  componentDidMount() {
    this.disconnect = store.dispatch(connectUserStream());
    store.dispatch(connectStatusUpdateStream());
  }

  componentWillUnmount () {
    if (this.disconnect) {
      this.disconnect();
      this.disconnect = null;
    }
  }

  render () {
    const { locale } = this.props;

    return (
      <IntlProvider locale={locale} messages={messages}>
        <Provider store={store}>
          <ErrorBoundary>
            <KikSocialMount />
          </ErrorBoundary>
        </Provider>
      </IntlProvider>
    );
  }

}
