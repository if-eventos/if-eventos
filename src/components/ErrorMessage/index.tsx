import { styles } from './styles';
import { View, Text } from 'react-native';

interface Props{
  description: string | undefined;
}

export function ErrorMessage({description}:Props) {
  
  return (
    <View style={styles.Container}>
      <Text style={styles.ErrorText}>{description}</Text>
    </View>
  );
}