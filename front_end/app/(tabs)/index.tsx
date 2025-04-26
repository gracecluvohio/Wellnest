import { Text, View, StyleSheet } from "react-native";

import Div from "@/components/div";


export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.divContainer}>
        <Div  />
        <Div  />
        <Div  />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#25292e',
    alignItems: 'center',
  }, 
  divContainer: {
    flex: 1, 
    alignItems: 'center', 
  }
})
