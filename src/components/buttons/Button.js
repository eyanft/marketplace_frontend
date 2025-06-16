import * as React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styled } from 'nativewind';

const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledText = styled(Text);

const variantClasses = {
  default: 'bg-[#ff5c00]',
  destructive: 'bg-red-500',
  outline: 'bg-transparent border border-[#e0e0e0]',
  secondary: 'bg-[#FFFAF8]',
  ghost: 'bg-transparent',
  link: 'bg-transparent p-0',
};

const sizeClasses = {
  default: 'py-3 px-4',
  sm: 'py-2 px-3',
  lg: 'py-4 px-6',
  icon: 'w-10 h-10 p-2',
};

const textVariantClasses = {
  default: 'text-white',
  destructive: 'text-white',
  outline: 'text-black',
  secondary: 'text-white',
  ghost: 'text-black',
  link: 'text-[#ff5c00] underline',
};

const Button = React.forwardRef(({ 
  className, 
  variant = 'default', 
  size = 'default', 
  children, 
  disabled, 
  ...props 
}, ref) => {
  const buttonClasses = [
    'flex-row items-center justify-center rounded-lg',
    variantClasses[variant],
    sizeClasses[size],
    disabled ? 'opacity-50' : '',
    className || '',
  ].join(' ');

  const textClasses = [
    'text-sm font-medium',
    textVariantClasses[variant],
    disabled ? 'opacity-50' : '',
  ].join(' ');

  return (
    <StyledTouchableOpacity 
      className={buttonClasses} 
      ref={ref} 
      disabled={disabled} 
      activeOpacity={0.7} 
      {...props}
    >
      {typeof children === 'string' ? (
        <StyledText className={textClasses}>{children}</StyledText>
      ) : (
        children
      )}
    </StyledTouchableOpacity>
  );
});

Button.displayName = 'Button';

export { Button };
