import { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { studassRoutes, userRoutes } from '../../App/routes';
import { ThemeContext } from '../GlobalHook';

type Props = {
  isStudass: boolean
  isLoggedIn: boolean
}

const Tab = createBottomTabNavigator();

const NavigationBar = ({ isStudass, isLoggedIn }: Props) => {
  const { background, text, outline: {activeOutlineColor}  } = useContext(ThemeContext)
  
  return (
      <Tab.Navigator
        initialRouteName={"Helplist"}
        screenOptions={{
          tabBarStyle: { backgroundColor: background },
          tabBarActiveTintColor: activeOutlineColor,
          tabBarInactiveTintColor: text
        }}
        >
          {isStudass ? 
            studassRoutes(isLoggedIn).map(({ name, component, icon}, i) => (
                <Tab.Screen
                key={i}
                name={name}
                component={component}
                options={{
                  headerShown: false,
                  tabBarLabel: name,
                  tabBarIcon: ({ color, size }: any) => (
                    <Ionicons name={icon} color={color} size={size} />
                  ),
                }}
                />
            )) : userRoutes(isLoggedIn).map(({ name, component, icon}, i) => (
              <Tab.Screen
                key={i}
                name={name}
                component={component}
                options={{
                  headerShown: false,
                  tabBarLabel: name,
                  tabBarIcon: ({ color, size }: any) => (
                    <Ionicons name={icon} color={color} size={size} />
                  ),
                }}
                />
            ))}

      </Tab.Navigator>
  );
};

export default NavigationBar;