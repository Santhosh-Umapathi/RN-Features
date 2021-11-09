import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeLocalData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    // console.log('[SUCCESS]: Stored in Local Storage', key);
  } catch (e) {
    console.log('[ERROR]: Failed to store in Local Storage', key);
  }
};

export const getLocalData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // console.log('[SUCCESS]: Local Storage found', key + ':' + value);
    }
    return value;
  } catch (e) {
    console.log('[ERROR]: No User Id:', key);
    return null;
  }
};

export const removeLocalData = async key => {
  try {
    await AsyncStorage.removeItem(key);
    // console.log('[SUCCESS]: Local Storage removed', key);
  } catch (e) {
    console.log('[ERROR]: Failed Local Storage removed', key);
  }
};

export const removeAllLocalData = async () => {
  try {
    await AsyncStorage.clear();
    // console.log('[SUCCESS]: Local Storage cleared', key);
  } catch (error) {
    console.log('[ERROR]: Failed Local Storage All cleared', key);
  }
};
export const showModal = ref => ref.current.present();
export const closeModal = ref => ref.current.dismiss();
