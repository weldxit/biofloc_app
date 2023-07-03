import Login from './user_comp/Login'
import Register from './user_comp/Register'
import Dashboard from './user_comp/Dashboard'
// import Admin from './components/Admin'
// import CameraScreen from './components/ImageUpload'
// import Camera from './components/Camera'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator()




export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login' component={Login} options={{headerShown:false}}/>
        <Stack.Screen name='Register' component={Register} options={{headerShown:false}}/>
        <Stack.Screen name='Dashboard' component={Dashboard} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}


