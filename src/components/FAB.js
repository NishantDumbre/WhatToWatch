import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

export default function FAB({
  iconName,
  size = 70,
  backgroundColor = '#303F9F',
  iconColor = 'white',
  position,
  onPress,
}) {
  return (
    <TouchableOpacity onPress={onPress} style={position}>
      <View
        style={[
          {
            height: size,
            width: size,
            borderRadius: size,
            backgroundColor,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 50,
          },
        ]}>
        <Icon name={iconName} size={size * 0.5} color={iconColor} />
      </View>
    </TouchableOpacity>
  );
}
