import { View, Text } from 'react-native'
import React, {useState} from 'react'
import { Redirect, Stack } from 'expo-router'

const Rootnavigation = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}></Stack>
      {isLogin ? <Redirect href={'/(main)'} /> : <Redirect href={'/(auth)'} />}
    </>
  )
}

export default Rootnavigation