import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import * as Keychain from 'react-native-keychain';

export default function Login({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const checkCredentials = async () => {
      try {
        if (Keychain && Keychain.getGenericPassword) {
          const credentials = await Keychain.getGenericPasswordForOptions();
          if (credentials) {
            // Perform automatic login using stored credentials
            const { username, password } = credentials;
            // Call your login function or update app state accordingly
            console.log(username, password);
          }
        } else {
          console.log('Keychain functionality is not available');
        }
      } catch (error) {
        console.log("Keychain couldn't be accessed!", error);
      }
    };

    checkCredentials();
  }, []);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const registerButtonClicked = () => {
    navigation.navigate('Register');
  };

  const loginBtnClicked = async () => {
    console.log('hello');
    console.log(phone);
    console.log(password);
    await fetch('https://onrender.com/login2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: phone,
        pwd: password,
      }),
    })
      .then((response) => response.json())
      .then(async (data) => {
        if (Keychain && Keychain.setGenericPassword) {
          // Store credentials in Keychain
          await Keychain.setGenericPassword(data.phone, data.passwords);
          console.log('Credentials stored successfully!');
        } else {
          console.log('Keychain functionality is not available');
        }

        if (data !== 'invalid credentials !') {
          console.log(data);
          if (data.roles !== null && data.roles === 'user') {
            navigation.navigate('Dashboard', { data });
          } else if (data.ac_role !== null && data.ac_role === 'admin') {
            navigation.navigate('Admin');
          }
        } else {
          console.error('Invalid credentials !');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const notWorking = () => {
    console.log('working');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logincontainer}>
        <TextInput
          placeholder="Phone no"
          keyboardType="number"
          style={styles.textinput}
          value={phone}
          onChangeText={setPhone}
        />

        {showPassword ? (
          <TextInput
            placeholder="Password"
            style={[styles.textinput, styles.passwd]}
            value={password}
            onChangeText={setPassword}
          />
        ) : (
          <TextInput
            placeholder="Password"
            style={[styles.textinput, styles.passwd]}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        )}

        <TouchableOpacity
          style={styles.showPasswordButton}
          onPress={toggleShowPassword}
        >
          <Text style={showPassword ? styles.showPasswordButtonText : styles.hidePasswordButtonText}>
            {showPassword ? 'Hide' : 'Show'} Password
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginbtn} onPress={loginBtnClicked}>
          <Text style={styles.logintxt}>Login</Text>
        </TouchableOpacity>

        <View style={styles.signup_forget}>
          <TouchableOpacity style={styles.forgetbtn} onPress={notWorking}>
            <Text style={styles.fg_re_txt}>Forgot password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.forgetbtn} onPress={registerButtonClicked}>
            <Text style={styles.fg_re_txt}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  logincontainer: {
    marginTop: '60%',
  },
  textinput: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
    marginHorizontal: 37,
    height: 50,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#F3F3F3',
  },
  loginbtn: {
    backgroundColor: 'green',
    height: 50,
    marginHorizontal: 130,
    borderRadius: 20,
  },
  logintxt: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    paddingVertical: 10,
  },
  signup_forget: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    marginHorizontal: 47,
  },
  forgetbtn: {
    height: 40,
    backgroundColor: 'lightsky',
    marginTop: 20,
  },
  fg_re_txt: {
    color: 'blue',
    fontSize: 15,
    fontFamily: 'System',
  },
  showPasswordButton: {
    alignSelf: 'flex-end',
    marginRight: 38,
    marginTop: 5,
  },
  showPasswordButtonText: {
    color: '#4E4E4E',
  },
  hidePasswordButtonText: {
    color: 'gray',
  },
  passwd: {
    marginBottom: 0,
  },
});
