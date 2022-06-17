import React, {ReactElement, ReactNode, useEffect, useRef} from 'react';
import {Keyboard, Animated, KeyboardEvent} from 'react-native';

type Props = {
  children: ReactNode;
};

export default function KeyboardAwareView({children}: Props) {
  const keyboardHeight = useRef(new Animated.Value(0)).current;

  const keyboardDidShow = (event: KeyboardEvent) => {
    Animated.timing(keyboardHeight, {
      duration: event.duration,
      toValue: event.endCoordinates.height,
      useNativeDriver: false,
    }).start();
  };

  const keyboardDidHide = (event: KeyboardEvent) => {
    Animated.timing(keyboardHeight, {
      duration: event.duration,
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      'keyboardDidShow',
      keyboardDidShow,
    );
    const hideSubscription = Keyboard.addListener(
      'keyboardDidHide',
      keyboardDidHide,
    );
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <Animated.View style={{flex: 1, marginBottom: keyboardHeight}}>
      {children}
    </Animated.View>
  );
}
