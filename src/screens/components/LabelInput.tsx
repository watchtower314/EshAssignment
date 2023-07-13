import React, {Dispatch, SetStateAction} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardTypeOptions,
  StyleSheet,
} from 'react-native';
import {TEXT} from '../../assets/strings';
import {COLORS} from '../../theme';

export const LabelInput = ({
  label,
  value,
  setValue,
  keyboardType = 'default',
  placeholder = '',
}: {
  label: string;
  value: string;
  setValue: (input: string) => void | Dispatch<SetStateAction<string>>;
  keyboardType?: KeyboardTypeOptions;
  placeholder?: string;
}) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>

    <View style={{flexDirection: 'row', width: '100%'}}>
      {label === TEXT.amount && <Text>$</Text>}
      <TextInput
        value={value}
        style={styles.textInput}
        keyboardType={keyboardType}
        onChangeText={input => setValue(input)}
        returnKeyType="done"
        placeholder={placeholder}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  label: {
    color: COLORS.gray,
    fontSize: 18,
  },
  container: {
    width: '90%',
    height: '10%',
    justifyContent: 'space-around',
    marginVertical: '5%',
  },
  textInput: {
    fontSize: 18,
    width: '100%',
    // alignSelf: 'stretch',
    borderBottomColor: '#BFBFBF',
    borderBottomWidth: 1,
  },
});
