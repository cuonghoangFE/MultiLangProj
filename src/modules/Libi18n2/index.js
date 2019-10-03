import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { withTranslation } from 'react-i18next';

const Libi18nScreen = ({ t, i18n }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Libi18n!</Text>
    <View style={{height: 50}} />
    <TouchableOpacity onPress={() => i18n.changeLanguage(i18n.language === 'en' ? 'vi' : (i18n.language === 'vi' ? 'it' : 'en'))}>
      <Text>{t('change')}</Text>
    </TouchableOpacity>
    <View style={{height: 50}} />
    <Text>{t('welcome', { name: 'cuong', too: 'sucked' })}</Text>
  </View>
);

export default withTranslation()(Libi18nScreen);
