import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import CheckBox from '@react-native-community/checkbox';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default function ListItem({
  iconOneName,
  iconOneColor,
  onPressIconOne,
  iconOneStyle,
  iconOneBgColor = 'tomato',
  iconTwoName,
  iconTwoColor,
  onPressIconTwo,
  iconTwoBgColor = '#303F9F',
  iconTwoStyle,
  title,
  subtitle,
  titleStyle,
  subTitleStyle,
  size,
  Checkbox,
  listStyle,
  value,
  onValueChange,
}) {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: hp(3),
        },
        listStyle,
      ]}>
      {iconOneName && (
        <TouchableOpacity
          onPress={onPressIconOne}
          style={[
            {
              backgroundColor: 'gold',
              padding: wp(2.5),
              borderRadius: size * 0.3,
              marginRight: wp(2),
              backgroundColor: iconOneBgColor,
            },
            iconOneStyle,
          ]}>
          <Icon name={iconOneName} size={size} color={iconOneColor} />
        </TouchableOpacity>
      )}
      {iconTwoName && (
        <TouchableOpacity
          onPress={onPressIconTwo}
          style={[
            {
              backgroundColor: 'gold',
              padding: wp(2.5),
              borderRadius: size * 0.3,
              marginRight: wp(2),
              backgroundColor: iconTwoBgColor,
            },
            iconTwoStyle,
          ]}>
          <Icon name={iconTwoName} size={size} color={iconTwoColor} />
        </TouchableOpacity>
      )}

      <View style={{flex: 1, paddingLeft: wp(2)}}>
        <Text style={[{fontSize: size * 1, color: '#fdcb9e'}, titleStyle]}>
          {title}
        </Text>
        <Text
          style={[
            {
              fontSize: size * 0.8,
              color: '#78909C',
            },
            subTitleStyle,
          ]}>
          {subtitle}
        </Text>
      </View>

      {Checkbox && (
        <CheckBox
          value={value}
          onValueChange={onValueChange}
          style={{marginHorizontal: 10}}
          tintColors={{true: '#00b7c2', false: 'gray'}}
        />
      )}
    </View>
  );
}
