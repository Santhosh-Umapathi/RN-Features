import {useState, useLayoutEffect} from 'react';
//Locales
import en from '../../locales/en';
import it from '../../locales/it';
//Helpers
import {getLocalData, storeLocalData} from '../screens/helpers/helpers';

export default () => {
  const [lang, setLang] = useState('it');

  const [locale, setLocale] = useState(true);

  const languageConfig = async () => {
    const language = await getLocalData('lang');
    if (language && language !== lang) {
      setLang(language);
    }
  };

  const changeLanguage = async value => {
    await storeLocalData('lang', value);
    setLang(value);
  };

  let t; //Translations files

  useLayoutEffect(() => {
    languageConfig();
    setLocale(lang === 'it');
  }, [lang]);

  if (locale) t = it;
  else t = en;

  return {t, lang, changeLanguage};
};
