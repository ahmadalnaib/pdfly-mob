import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';


export default function HomeScreen(props) {
  const { navigation } = props;
  return (
    <View style={styles.container}>

  
      <Button title=" تسجيل  " onPress={() => navigation.navigate('Register')} />
      <Button title="دخول" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 10,
    margin: 10,
  },
});
