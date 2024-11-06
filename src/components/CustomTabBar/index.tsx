// CustomTabBar.tsx
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Pressable, LayoutChangeEvent, Dimensions } from 'react-native';
import { House, Bookmarks, List } from 'phosphor-react-native';
import { Octicons } from '@expo/vector-icons';
import theme from '../../theme'; // Ajuste o caminho conforme necessário
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, navigation }) => {
  const { width } = Dimensions.get('window')

  const [dimensions, setDimensions] = useState({ width: width * 0.7, height: 80 });

  const buttonWidth = dimensions.width / state.routes.length;

  const onTabbarLayout = (event: LayoutChangeEvent) => {
    setDimensions(
      {
        height: event.nativeEvent.layout.height,
        width: event.nativeEvent.layout.width
      }
    )
    console.log(dimensions)
  }
  const tabPositionX = useSharedValue(0)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value }]
    }
  })

  return (
    <View onLayout={onTabbarLayout} style={styles.tabBar}>
      <Animated.View style={[animatedStyle, {
        position: 'absolute',
        backgroundColor: theme.colors.purpleLight,
        marginHorizontal: 35,
        borderRadius: 15,
        bottom: 14,
        height: dimensions.height - 20,
        width: buttonWidth - 25
      }]} />

      {state.routes.map((route, index) => {

        const isFocused = state.index === index;
        const scale = useSharedValue(0);

        useEffect(() => {
          scale.value = withSpring(isFocused ? 1 : 0, { duration: 350 });
        }, [scale, isFocused]);

        const animatedTextStyle = useAnimatedStyle(() => {
          const opacity = interpolate(scale.value, [0, 1], [1, 0]);
          return {
            opacity
          }
        })
        const animatedIconStyle = useAnimatedStyle(() => {
          const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2]);
          const top = interpolate(scale.value, [0, 1], [0, 9])
          return {
            transform: [{ scale: scaleValue }],
            top
          }
        })

        const onPress = () => {
          tabPositionX.value = withSpring((buttonWidth - 15) * index, { duration: 1500 })
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        let icon;
        let text;
        switch (route.name) {
          case 'Home':
            icon = <Octicons name="home" color={theme.colors.white} size={30} />;
            text = 'Início';
            break;
          case 'Bookmarks':
            icon = <Octicons name="bookmark" color={theme.colors.white} size={30} />;
            text = 'Minhas Listas';
            break;
          case 'Downloads':
            icon = <Octicons name="download" color={theme.colors.white} size={30} />;
            text = 'Baixados'
            break;
          case 'List':
            icon = <List color={theme.colors.white} size={30} weight='bold' />
            text = 'Mais'
            break;
        }

        return (
          <Pressable
            key={index}
            onPress={onPress}
            style={styles.tabButton}
          >
            <Animated.View style={animatedIconStyle}>
              {icon}
            </Animated.View>
            <Animated.Text style={[styles.text, animatedTextStyle]}>{text}</Animated.Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: theme.colors.background,
    paddingBottom: 10,
    paddingHorizontal: 30,
    height: 80,
    alignItems: 'center',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: theme.colors.white,
    fontSize: 11,
    fontFamily: theme.font_family.bold,
  }
});

export default CustomTabBar;
