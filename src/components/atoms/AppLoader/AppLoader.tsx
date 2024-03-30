import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { PRIMARY } from '@/lib/constants'

export default function AppLoader() {
  return (
    <View className='flex items-center justify-center'>
      <ActivityIndicator color={PRIMARY} />
    </View>
  )
}