import React, {useState, useEffect} from 'react';
import {TextInput, Text, View} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import Snackbar from 'react-native-snackbar';

import styles from '../config/styles';
import colors from '../config/colors';
import {AppButton} from '../components/index';

export default function Edit({navigation, route}) {
  const [name, setName] = useState('');
  const [totalNoSeason, setTotalNoSeason] = useState('');
  const [id, setId] = useState('');

  const updateList = async () => {
    try {
      if (!name || !totalNoSeason) {
        return Snackbar.show({
          text: 'Please enter valid values',
          backgroundColor: 'gold',
          textColor: 'red',
        });
      }

      const storedValue = await AsyncStorage.getItem('@season_list');
      const list = await JSON.parse(storedValue);

      list.map((singleSeason) => {
        if (singleSeason.id == id) {
          singleSeason.name = name;
          singleSeason.totalNoSeason = totalNoSeason;
          singleSeason.isWatched = false;
        }
        return singleSeason;
      });

      await AsyncStorage.setItem('@season_list', JSON.stringify(list));

      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const {item} = route.params;
    const {id, name, totalNoSeason} = item;

    setName(name);
    setTotalNoSeason(totalNoSeason);
    setId(id);
  }, []);

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
        title="Update"
        style={styles.addButton}
        textStyle={styles.addButtonText}
        onPress={updateList}
      />
    </View>
  );
}
