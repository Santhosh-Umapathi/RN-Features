import {MaterialCommunityIcons} from '@expo/vector-icons';
import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';

const DashboardDetails = ({route, navigation}) => {
  const {icon, iconColor, iconLarge, id, style, text, label, title, saveData} =
    route.params;

  const [state, setState] = useState(String(text));

  const submitHandler = () => {
    saveData(state);
    navigation.goBack();
  };

  return (
    <View
      style={[styles.containerView, {backgroundColor: style.backgroundColor}]}>
      <View style={[styles.cardContainer, {shadowColor: iconColor}]}>
        <MaterialCommunityIcons name={icon} size={40} color={iconColor} />

        <Text style={styles.text}>Update your {title}</Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={state}
            onChangeText={setState}
            style={styles.input}
          />
          <Text style={styles.inputText}>{label}</Text>
        </View>
      </View>
      <Button title="Save" onPress={submitHandler} disabled={state === ''} />
    </View>
  );
};

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    width: '100%',
    backgroundColor: 'mintcream',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    marginVertical: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 0.5,
    padding: 10,
    marginHorizontal: 10,
    width: '50%',
    borderRadius: 10,
    fontSize: 20,
  },
  inputText: {
    fontSize: 20,
  },
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
    backgroundColor: 'snow',
    borderRadius: 10,
    // shadowColor: "red",
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    elevation: 5,
    marginBottom: 20,
  },
});
export default DashboardDetails;
