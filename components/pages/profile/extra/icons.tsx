import React from 'react';
import {Icon, IconElement, useTheme} from '@ui-kitten/components';
import {ImageStyle} from 'react-native';

export const MessageCircleIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="message-circle" />
);

export const PersonAddIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="person-add" />
);
export const BackIcon = props => <Icon {...props} name="arrow-back" />;
