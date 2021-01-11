import React, {useState} from 'react';
import {Text, View, TextInput} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import shortid from 'shortid';
import Snackbar from 'react-native-snackbar';

import styles from '../config/styles';
import colors from '../config/colors';
import {AppButton} from '../components/index';

const Add = ({navigation}) => {
  const [name, setName] = useState('');
  const [totalNoSeason, setTotalNoSeason] = useState('');

  const addToList = async () => {
    try {
      if (!name || !totalNoSeason) {
        return Snackbar.show({
          text: 'Please enter valid values',
          backgroundColor: 'gold',
          textColor: 'red',
        });
      } else {
        const seasonToAdd = {
          id: shortid.generate(),
          name,
          totalNoSeason,
          isWatched: false,
        };

        const storedValue = await AsyncStorage.getItem('@season_list');
        const prevList = await JSON.parse(storedValue);

        if (!prevList) {
          const newList = [seasonToAdd];
          await AsyncStorage.setItem('@season_list', JSON.stringify(newList));
        } else {
          prevList.push(seasonToAdd);
          await AsyncStorage.setItem('@season_list', JSON.stringify(prevList));
        }

        setName('');
        setTotalNoSeason('');
        navigation.navigate('Home');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Series to your List</Text>
      <TextInput
        placeholder="Name of the Series"
        placeholderTextColor={colors.grey}
        value={name}
        onChangeText={(name) => setName(name)}
        style={styles.textInput}
      />
      <TextInput
        placeholder="No.of Seasons"
        placeholderTextColor={colors.grey}
        value={totalNoSeason}
        onChangeText={(totalNoSeason) => setTotalNoSeason(totalNoSeason)}
        style={styles.textInput}
        keyboardType="numeric"
      />
      <AppButton
        title="Add"
        style={styles.addButton}
        textStyle={styles.addButtonText}
        onPress={addToList}
      />
    </View>
  );
};

export default Add;
