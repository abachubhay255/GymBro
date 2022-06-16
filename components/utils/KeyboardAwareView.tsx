import React, {ReactElement, ReactNode, useEffect, useRef} from 'react';
import {Keyboard, Animated, KeyboardEvent} from 'react-native';

type Props = {
  children: ReactNode;
};

export default function KeyboardAwareView({children}: Props) {
  const keyboardHeight = useRef(new Animated.Value(0)).current;

  const keyboardWillShow = (event: KeyboardEvent) => {
    console.log('showing kb');
    Animated.timing(keyboardHeight, {
      duration: event.duration,
      toValue: event.endCoordinates.height,
      useNativeDriver: false,
    }).start();
  };

  const keyboardWillHide = (event: KeyboardEvent) => {
    console.log('hiding kb');
    Animated.timing(keyboardHeight, {
      duration: event.duration,
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      'keyboardDidShow',
      keyboardWillShow,
    );
    const hideSubscription = Keyboard.addListener(
      'keyboardDidHide',
      keyboardWillHide,
    );
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  console.log(keyboardHeight);

  return (
    <Animated.View style={{flex: 1, paddingBottom: keyboardHeight}}>
      {children}
    </Animated.View>
  );
}
