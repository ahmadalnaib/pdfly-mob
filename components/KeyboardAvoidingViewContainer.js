import { KeyboardAvoidingView,Platform } from 'react-native';
export default KeyboardAvoidingViewContainer = (props) => {
  if (Platform.OS === 'android') {
    return <>{props.children}</>;
  }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior='padding'
      keyboardVerticalOffset={100}
    >
      {props.children}
    </KeyboardAvoidingView>
  );
};
