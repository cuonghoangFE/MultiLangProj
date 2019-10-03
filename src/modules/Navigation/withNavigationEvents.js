import React from 'react';
import { NavigationEvents } from 'react-navigation';
import { pure } from 'recompose';

const withNavigationEventsHOC = (
  navigationEventsHandlerCreators
) => Component => {
  const EventNotPure = props => {
    const {
      onWillFocus,
      onDidFocus,
      onWillBlur,
      onDidBlur
    } = navigationEventsHandlerCreators
    const handlers = {
      onWillFocus: onWillFocus && onWillFocus(props),
      onDidFocus: onDidFocus && onDidFocus(props),
      onWillBlur: onWillBlur && onWillBlur(props),
      onDidBlur: onDidBlur && onDidBlur(props)
    }

    return (
      <React.Fragment>
        <NavigationEvents {...handlers} />
        <Component {...props} />
      </React.Fragment>
    )
  }

  return pure(EventNotPure)
}

export default withNavigationEventsHOC;
