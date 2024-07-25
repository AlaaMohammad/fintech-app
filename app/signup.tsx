import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { defaultStyles } from '@/constants/Styles'
import Colors from '@/constants/Colors'
import { Link, useRouter } from 'expo-router'
import AppAPI from '@/utils/AppAPI'
import LottieView from 'lottie-react-native'

enum SignUpType {
  PHONE = 'phone',
  EMAIL = 'email',
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
  APPLE = 'apple',
}
const signup = () => {
  const [countryCode, setCountryCode] = React.useState('+1')
  const [phoneNumber, setPhoneNumber] = useState('');
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 80 : 0;
  const router = useRouter()

  const onSignup = async() => {
    // handle signup
  
      const fullPhoneNumber = `${countryCode}${phoneNumber}`
      try{ 
      await AppAPI.sendSMS(phoneNumber)
      router.push({pathname:'/confirm/[phoneNumber]', params :{ phoneNumber: fullPhoneNumber }})

      if(phoneNumber === ''){
        throw new Error('Phone number is required')
      }
    }catch(error){
      console.error('Failed to send SMS:', error);
      throw new Error('Failed to send SMS');

    }

  }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}>

    <View style={defaultStyles.container}>
      <Text style={defaultStyles.header}>Let't Get Started!</Text>
      <Text style={defaultStyles.descriptionText}>Enter your phone number. We will send you a confirmation code there</Text>
    <LottieView
  source={require('../assets/images/sign.json')}
  autoPlay
  loop
/>
    <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Country code"
            placeholderTextColor={Colors.gray}
            value={countryCode}
          />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Mobile number"
            placeholderTextColor={Colors.gray}
            keyboardType="numeric"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>
        <Link href={'/login'} replace asChild>
          <TouchableOpacity>
            <Text style={defaultStyles.textLink}>Already have an account? Log in</Text>
          </TouchableOpacity>
        </Link>
        <View style={{ flex: 1 }} />

        <TouchableOpacity
          style={[
            defaultStyles.pillButton,
            phoneNumber !== '' ? styles.enabled : styles.disabled,
            { marginBottom: 20 },
          ]}
          onPress={onSignup}>
          <Text style={defaultStyles.buttonText}>Sign up</Text>
        </TouchableOpacity>
      </View>

        </KeyboardAvoidingView>
  )
}
const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 40,
    flexDirection: 'row',
  },
  input: {
    backgroundColor: Colors.lightGray,
    padding: 20,
    borderRadius: 16,
    fontSize: 20,
    marginRight: 10,
  },
  enabled: {
    backgroundColor: Colors.primary,
  },
  disabled: {
    backgroundColor: Colors.primaryMuted,
  },
});
export default signup