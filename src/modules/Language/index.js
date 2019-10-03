import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text } from 'react-native';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en';
import vi from './vn';
import it from './in';

const LanguageContext = React.createContext();
const LanguageConsumer = LanguageContext.Consumer;
const prefix = '{{';
const suffix = '}}';
const formatSeparator = ',';
const unescapePrefix = '-';
const unescapeSuffix = '';
const nestingPrefix = '$t(';
const nestingSuffix = ')';
const regexpStr = "".concat(prefix, "(.+?)").concat(suffix);
const regexpUnescapeStr = "".concat(prefix).concat(unescapePrefix, "(.+?)").concat(unescapeSuffix).concat(suffix);
const nestingRegexpStr = "".concat(nestingPrefix, "(.+?)").concat(nestingSuffix);

type TVarMap = { [s: string]: string };

export interface TFunction {
  // basic usage
  <
    TResult = string,
    TKeys extends TFunctionKeys = string,
    TInterpolationMap extends TVarMap = object
  >(
    i18nKey: TKeys,
    values?: TInterpolationMap,
  ): TResult;
}

const multiIndex = (obj,is) => {
  return is.length ? multiIndex(obj[is[0]],is.slice(1)) : obj
}
const pathIndex = (obj,is) => {
  return multiIndex(obj,is.split('.'))
}

export class LanguageProvider extends React.Component {
  state = {
    language: "en"
  };

  updateLanguage = e => this.setState({ language: e });

  t: TFunction = (i18nKey, values) => {
    const { language } = this.state;
    const langKey = language === 'en' ? en : (language === 'vi' ? vi : it);
    let text = pathIndex(langKey,i18nKey);
    const isHasVarRegex = text.match(new RegExp(regexpStr, 'g'));
    if (!text) {
      console.warn(`Key ${i18nKey} not found`);
      return text;
    }
    if (isHasVarRegex !== null &&
      isHasVarRegex.length > 0 &&
      !values
    ) {
      isHasVarRegex.map(keyMissing => console.warn(`Missing key ${keyMissing} in ${language}[${i18nKey}]}`));
      return text;
    }
    for (let i in values) {
      const regexpStr = "".concat(prefix, i).concat(suffix);
      const regexp = new RegExp(regexpStr, 'g');
      text = text.replace(regexp, values[i]);
    }
    return text;
  }

  render() {
    return (
      <LanguageContext.Provider
        value={{
          t: this.t,
          language: this.state.language,
          updateLanguage: this.updateLanguage
        }}
      >
        {this.props.children}
      </LanguageContext.Provider>
    );
  }
}

export const Header = () => {
  return (
    <LanguageConsumer>
      {({ t, language, updateLanguage }) => (
        <TouchableOpacity onPress={() => updateLanguage(language === 'en' ? 'vi' : (language === 'vi' ? 'it' : 'en'))}>
          <Text>{t('change')}</Text>
        </TouchableOpacity>
      )}
    </LanguageConsumer>
  );
};

export const withTranslation = Component => {
  class ThemedComponent extends React.Component {
    render() {
      return (
        <LanguageConsumer>
          {context => <Component {...context} {...this.props} />}
        </LanguageConsumer>
      );
    }
  }

  return ThemedComponent;
};

export const TranslatableText = ({ i18nKey, values }) => {
  return (
    <LanguageConsumer>
      {({ t }) => t(i18nKey, values)}
    </LanguageConsumer>
  )
}

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: cb => cb('en'),
  init: () => {},
  cacheUserLanguage: () => {},
};

const resources = {
  en: { translation: en },
  vi: { translation: vi },
  it: { translation: it },
}

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    resources,
  });

export default i18n;
