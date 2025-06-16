import * as React from 'react';
import { Platform } from 'react-native';
import { styled } from 'nativewind';
import { View } from 'react-native';

const StyledView = styled(View);

const Card = React.forwardRef(({ className, children, ...props }, ref) => (
  <StyledView
    ref={ref}
    className={`bg-white border border-[#e0e0e0] rounded-xl ${
      Platform.OS === 'ios'
        ? 'shadow-sm'
        : 'elevation-3'
    } ${className || ''}`}
    {...props}
  >
    {children}
  </StyledView>
));
Card.displayName = 'Card';

const CardContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <StyledView
    ref={ref}
    className={`p-4 ${className || ''}`}
    {...props}
  >
    {children}
  </StyledView>
));
CardContent.displayName = 'CardContent';

export { Card, CardContent };
