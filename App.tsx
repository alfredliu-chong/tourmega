import 'react-native-gesture-handler'
import React from 'react'
import { Provider, ReactReduxContext } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '@screens/Home'
import Tours from '@screens/Tours'
import TourTitle from "@components/TourTitle"
import createStore from './src/store'

const Stack = createStackNavigator()
const { store, persistor } = createStore()

export default function App() {
  return (
    <Provider store={store} context={ReactReduxContext}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="Tours" component={Tours} options={{
              headerTitle: () => (<TourTitle/>)
            }}/>
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}