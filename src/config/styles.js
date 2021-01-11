import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import colors from './colors';

const styles = StyleSheet.create({
  activityIndicator: {
    position: 'absolute',
    left: wp(45),
    top: hp(40),
  },
  container: {
    flex: 1,
    backgroundColor: colors.navyBlue,
    paddingTop: hp(10),
  },

  textInput: {
    padding: hp(2),
    borderColor: colors.white,
    borderWidth: 1,
    borderRadius: hp(5),
    marginVertical: hp(1),
    fontSize: 18,
    color: colors.white,
  },

  addButton: {
    width: wp(100),
    marginTop: hp(2),
    elevation: 10,
  },

  addButtonText: {
    fontSize: 18,
    color: colors.white,
  },

  heading: {
    fontSize: 25,
    color: colors.cyan,
    alignSelf: 'center',
    marginBottom: hp(7),
  },

  styleFAB: {position: 'absolute', right: wp(5), bottom: hp(5)},
});

export default styles;
