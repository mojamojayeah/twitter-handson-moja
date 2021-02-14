import React, { useCallback } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import firebase, { signout } from '../repositories/firebase'
import { useUser } from '../hooks/user'
import { useRoute } from '@react-navigation/native'
import { useAuthState } from 'react-firebase-hooks/auth'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const UserScreen = () => {
  const route = useRoute()
  const uid = route.params?.uid
  //Lesson1: アプリにログインログアウトを実装してみよう
  const [user] = useAuthState(firebase.auth())
  //Lesson1: アプリにログインログアウトを実装してみよう
  const onPressLogout = useCallback(() => {
    firebase.auth().signOut()
  }, [])
  //Lesson2: Firebase Fucntionsでユーザーデータを作成してみよう

  return (
    <View style={styles.root}>
      {
        //Lesson1: アプリにログインログアウトを実装してみよう
        user && user.uid && <Text>{user.uid}</Text>
      }
      {uid && <Text>{uid}</Text>}
      {
        //Lesson2: Firebase Fucntionsでユーザーデータを作成してみよう
      }
      <TouchableOpacity style={styles.logoutButton} onPress={onPressLogout}>
        <Text style={styles.logoutButtonText}>ログアウト</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  message: {
    textAlign: 'center',
  },
  name: {
    textAlign: 'center',
  },
  logoutButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    padding: 12,
    borderRadius: 50,
    backgroundColor: '#ffffff',
  },
  logoutButtonText: {
    color: '#404040',
  },
})

export default UserScreen
