import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import * as d3 from "d3";
import  { useTheme } from "@/app/contexts/ThemeContext";

import Div from "@/components/Div";
import BarChart from "@/components/BarChart";

export default function Index() {
  const { isDarkMode } = useTheme();
  const [data, setData] = useState<string>("loading...");
  const getInspo = async () => {
    try {
      const response = await fetch(
        'http://46.110.43.43:8080/inspire-text?uid=reet0512',
      );
      const json = await response.json();
      setData(json.response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getInspo();
  }, []);
  
  return (
    <View style={[styles.container, {backgroundColor: isDarkMode ? '#25292e' : '#fff'}]}>
      <View style={styles.divContainer}>
        <View style={{marginVertical: 10,  backgroundColor: isDarkMode ? '#fff' : '#eee', borderRadius: 18, paddingVertical: 10, paddingHorizontal: 18, height: 300}}>
          <BarChart />
          <Text style={{ color: 'grey', fontSize: 20, textAlign: 'left', marginTop: 10 }}>Steps</Text>
        </View>
        <View style={{ backgroundColor: isDarkMode ? '#fff' : '#eee', borderRadius: 18, paddingVertical: 10, paddingHorizontal: 18, height: 300, width: 320}}>
          <Text style={{marginVertical: 10, color: 'grey', fontSize: 20, textAlign: 'left', marginTop: 10 }}>Daily Insight</Text>
          <Text>{data}</Text>
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
