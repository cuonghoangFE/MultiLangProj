import React from 'react';
import { View, Text } from 'react-native';
import { Header, TranslatableText, withTranslation } from '../Language';

const SettingsScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Settings!</Text>
    <View style={{height: 50}} />
    <Header />
    <View style={{height: 50}} />
    <Text>
      <TranslatableText
        i18nKey='welcome'
        values={{ name: 'cuong', too: 'sucked' }}
      />
    </Text>
  </View>
);

export default withTranslation(SettingsScreen);
