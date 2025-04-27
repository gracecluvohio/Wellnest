import React from 'react';
import * as d3 from 'd3';
import { View, StyleSheet, ScrollView } from 'react-native';
import Svg, { G, Rect, Text as SvgText } from 'react-native-svg';
// import * as d3 from 'd3-shape';

const dataSource = require('@/assets/data.json');

// console.log(dataSource[1].days);
const data = dataSource[1].days.map((item) => item.total_steps);
// const data = [5,4,1,3,10, 100, 500, 20];

const BarChart = () => {
  const width = 300;
  const height = 200;
  const barWidth = 30;

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, height]);

  return (
    <View style={styles.container}>
    <View style={styles.container}>
        <ScrollView vertical>
            <ScrollView horizontal>
                <Svg width={data.length * barWidth} height={200}>
                    {data.map((value, index) => (
                        <G key={"G-" + index}>
                            <Rect
                                key={index}
                                x={index * barWidth}
                                y={height - yScale(value)} 
                                width={barWidth - 2}
                                height={yScale(value)} 
                                fill="teal"
                            />
                            <SvgText
                                key={"Text " + index}
                                x={index * barWidth + barWidth / 2}
                                y={height - yScale(value) - 5} 
                                fontSize={10}
                                fill="black"
                                textAnchor="middle"
                            >
                                {dataSource[1].days[index].date.substring(5)} {/* Assuming each day has a 'date' field */}
                            </SvgText>
                        </G>
                    ))}
                    {yScale.ticks(5).map((tickValue, i) => (
                        <G key={"tick-" + i}>
                            <SvgText
                                key={"tick-text-" + i}
                                x={30}
                                y={height - yScale(tickValue)}
                                fontSize={10}
                                fill="black"
                                textAnchor="end"
                            >
                                {tickValue}
                            </SvgText>
                            <Rect
                                key={"tick-line-" + i}
                                x={0}
                                y={height - yScale(tickValue)}
                                width={data.length * barWidth}
                                height={1}
                                fill="lightgray"
                            />
                        </G>
                    ))}
                </Svg>
            </ScrollView>
        </ScrollView>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    width: 280, 
  },
});

export default BarChart;
