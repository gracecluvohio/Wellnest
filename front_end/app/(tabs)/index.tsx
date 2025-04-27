import { Text, View, StyleSheet } from "react-native";
import * as d3 from "d3";
import  { useTheme } from "@/app/contexts/ThemeContext";

import Div from "@/components/Div";
import BarChart from "@/components/BarChart";


export default function Index() {
  const { isDarkMode } = useTheme();
  return (
    <View style={[styles.container, {backgroundColor: isDarkMode ? '#25292e' : '#fff'}]}>
      <View style={styles.divContainer}>
        <View style={{ backgroundColor: isDarkMode ? '#fff' : '#eee', borderRadius: 18, paddingVertical: 10, paddingHorizontal: 18, height: 300}}>
          <BarChart />
          <Text style={{ color: 'grey', fontSize: 20, textAlign: 'left', marginTop: 10 }}>Steps</Text>
        </View>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center',
  }, 
  divContainer: {
    flex: 1, 
    alignItems: 'center', 
  }
})
