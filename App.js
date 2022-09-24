import { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, FlatList, ActivityIndicator, Alert } from 'react-native';

const url = "https://codeforces.com/api/contest.list?gym=false";
const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => setData(json.result.slice(0, 25)))
      .catch((error) => Alert.alert("Error", error))
      .finally(() => setLoading(false))
      .then(() => Alert.alert("Contests fetched successfully", "Alarm for the upcoming contests has been set!"))
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Upcoming Codeforces Contests
      </Text>
      {
        isLoading ?
          <ActivityIndicator /> :
          <FlatList
            data={data}
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => {
              var date = new Date(item.startTimeSeconds * 1000);
              var dateStr = date.toDateString();
              var hours = date.getHours();
              var minutes = date.getMinutes();
              return (
                <Text style={styles.text}>
                  {item.id}. {item.name}
                  {"\n"}
                  <Text style={styles.text2}>
                    {dateStr}, {hours} hrs {minutes} mins
                  </Text>
                </Text>
              )
            }}
          />
      }
      <Text style={styles.footer}>
        By Sambhav Saxena
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontFamily: 'monospace',
    padding: 10,
  },
  text2: {
    fontFamily: 'monospace',
    color: 'red',
  },
  title: {
    textDecoration: 'underline',
    color: '#fff',
    marginTop: 50,
    marginBottom: 20,
    fontFamily: 'monospace',
    fontSize: 20,
  },
  footer: {
    color: '#fff',
    margin: 10,
  }
});

export default App
