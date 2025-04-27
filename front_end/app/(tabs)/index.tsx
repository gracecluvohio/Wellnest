import { Text, View, StyleSheet } from "react-native";
import * as d3 from "d3";

import Div from "@/components/Div";
import BarChart from "@/components/BarChart";


export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.divContainer}>
        <View style={{ backgroundColor: 'white', borderRadius: 18, paddingVertical: 10, paddingHorizontal: 18, height: 300}}>
          <BarChart />
          <Text style={{ color: 'grey', fontSize: 20, textAlign: 'left', marginTop: 10 }}>Steps</Text>
        </View>
        
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
