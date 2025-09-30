
import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Routes from './src/routes/index.routes';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProviderList } from './src/context/AuthContextList';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProviderList>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </AuthProviderList>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1
  }
});
