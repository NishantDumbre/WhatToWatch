import React, {useState, useEffect} from 'react';
import {FlatList, ActivityIndicator, Text, View} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import {useIsFocused} from '@react-navigation/native';

import styles from '../config/styles';
import {ListItem, FAB} from '../components/index';

export default function Home({navigation}) {
  const [listOfSeasons, setListOfSeasons] = useState([]);
  const [loading, setLoading] = useState(false);

  const isFocused = useIsFocused();

  const getList = async () => {
    setLoading(true);

    const storedValue = await AsyncStorage.getItem('@season_list');
    if (!storedValue) {
      setListOfSeasons([]);
    }
    const list = JSON.parse(storedValue);
    setListOfSeasons(list);

    setLoading(false);
  };

  const deleteSeason = async (id) => {
    const newList = await listOfSeasons.filter((list) => list.id !== id);
    AsyncStorage.setItem('@season_list', JSON.stringify(newList));

    setListOfSeasons(newList);
  };

  const markAsComplete = async (id) => {
    const newArr = listOfSeasons.map((list) => {
      if (list.id == id) {
        list.isWatched = !list.isWatched;
      }
      return list;
    });

    await AsyncStorage.setItem('@season_list', JSON.stringify(newArr));
    setListOfSeasons(newArr);
  };

  useEffect(() => {
    getList();
  }, [isFocused]);

  if (loading) {
    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicator color="tomato" size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {listOfSeasons.length == 0 ? (
        <>
          <Text style={styles.heading}>Nothing to Watch Next</Text>
          <FAB
            iconName="plus"
            position={styles.styleFAB}
            onPress={() => navigation.navigate('Add')}
          />
        </>
      ) : (
        <>
          <Text style={styles.heading}>Series to watch</Text>
          <FlatList
            data={listOfSeasons}
            keyExtractor={(keys) => keys.id.toString()}
            renderItem={({item}) => (
              <ListItem
                title={item.name}
                subtitle={item.totalNoSeason}
                size={20}
                iconOneName="trash"
                iconTwoName="pencil"
                onPressIconOne={() => deleteSeason(item.id)}
                onPressIconTwo={() => navigation.navigate('Edit', {item})}
                Checkbox={true}
                value={item.isWatched}
                onValueChange={() => markAsComplete(item.id)}
              />
            )}
          />

          <FAB
            iconName="plus"
            position={styles.styleFAB}
            onPress={() => navigation.navigate('Add')}
          />
        </>
      )}
    </View>
  );
}
