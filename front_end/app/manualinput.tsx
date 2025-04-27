import { View, StyleSheet, SectionList, Text, TextInput, Button } from "react-native";
import { useForm, Controller } from "react-hook-form";

export default function ManualInput() {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      Category: '',         
      Date: '', 
      Physician: '',       
      Value: '',          
    },
  });

  const onSubmit = (data: any) => {
    console.log("User data:", data);
    reset(); 
  };

  const DATA = [
    {
      title: "Category",
      data: ["Category"],
    },
    {
      title: "Date",
      data: ["Date"],
    },
    {
      title: "Physician",
      data: ["Physician"],
    },
    {
      title: "Value",
      data: ["Value"],
    },
  ];

  return (
    <View style={styles.container}>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <Controller
            control={control}
            // @ts-expect-error
            name={item} 
            rules={{ required: true }}  
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Input..."
                placeholderTextColor="#999"
                onChangeText={onChange}
                value={value}
                returnKeyType="done"
              />
            )}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={{ fontSize: 24, color: 'white', marginTop: 20, marginBottom: 10 }}>
            {title}
          </Text>
        )}
      />
        <View style={styles.buttonWrapper}>
            <Button
                title="Submit"
                onPress={handleSubmit(onSubmit)}  
                color="#007BFF" 
            />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    marginRight: 10,
    backgroundColor: "#333", 
    borderRadius: 5,
    padding: 10,
    marginBottom: 10, 
  },
  buttonWrapper: {
    marginBottom: 40,
    alignSelf: 'stretch' 
  },
});
