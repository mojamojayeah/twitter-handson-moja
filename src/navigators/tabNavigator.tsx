import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from '../repositories/firebase'
import HomeScreen from '../screens/HomeScreen'
import UserScreen from '../screens/UserScreen'

const Stack = createStackNavigator()

const HomeStackNavigator = () => (
  <Stack.Navigator initialRouteName="Main">
    <Stack.Screen
      name="Main"
      component={HomeScreen}
      options={{
        headerTitle: 'ホーム',
        headerBackTitleVisible: false,
      }}
    />
  </Stack.Navigator>
)

const UserStackNavigator = () => {
  //Lesson1: アプリにログインログアウトを実装してみよう
  const [user] = useAuthState(firebase.auth())
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={UserScreen}
        options={{
          headerTitle: 'ユーザー',
          headerBackTitleVisible: false,
        }}
        initialParams={{ uid: user?.uid }}
      />
    </Stack.Navigator>
  )
}

const Tab = createBottomTabNavigator()

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName="HomeTab"
    tabBarOptions={{ showLabel: false }}
    screenOptions={({ route }) => ({
      tabBarIcon: ({}) => {
        if (route.name === 'HomeTab') {
          return <MaterialCommunityIcons name="home" size={24} />
        }
        if (route.name === 'UserTab') {
          return <MaterialCommunityIcons name="account" size={24} />
        }
      },
    })}
  >
    <Tab.Screen name="HomeTab" component={HomeStackNavigator} />
    <Tab.Screen name="UserTab" component={UserStackNavigator} />
  </Tab.Navigator>
)

export default TabNavigator
