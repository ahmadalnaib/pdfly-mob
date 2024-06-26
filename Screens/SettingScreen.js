import React, {useContext} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { AuthContext } from '../context/AuthProvider';



export default function SettingScreen() {
const {logout} = useContext(AuthContext);

  return (
    <View style={styles.container}>
     <Text> Setting</Text>
     <Button title="Logout" onPress={logout} />
  

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

    alignItems: 'center',
    justifyContent: 'center',
  },
});
