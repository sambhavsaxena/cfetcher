import { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, FlatList, ActivityIndicator, Alert, Linking, Button } from 'react-native';

const url = "https://codeforces.com/api/contest.list?gym=false";
const giturl = "https://github.com/sambhavsaxena"
const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => setData(json.result.slice(0, 30)))
      .catch((error) => Alert.alert("Error", error))
      .then(() => Alert.alert("Contests Updated", "The upcoming contests have been updated."))
      .finally(() => setLoading(false))
  }, []);

  const handlepress = () => {
    Linking.openURL(giturl);
  }

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
                date > new Date() ?
                  <Text style={styles.table}>
                    <Text style={styles.text}>
                      {item.id}. {item.name} | <Text style={styles.none1}>Upcoming Contests</Text>
                      {"\n"}
                      <Text style={styles.text2}>
                        {dateStr}, {hours} hrs {minutes} mins
                      </Text>
                    </Text>
                  </Text> : <Text style={styles.table}>
                    <Text style={styles.text}>
                      {item.id}. {item.name} | <Text style={styles.none2}>Contest Over</Text>
                      {"\n"}
                      <Text style={styles.text2}>
                        {dateStr}, {hours} hrs {minutes} mins
                      </Text>
                    </Text>
                  </Text>
              )
            }}
          />
      }
      <Text style={styles.footer} onPress={handlepress}>
        With love, Sambhav Saxena
      </Text>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    marginTop: 30,
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
    marginTop: 30,
    marginBottom: 30,
    fontFamily: 'monospace',
    fontSize: 20,
  },
  footer: {
    color: '#fff',
    margin: 16,
  },
  none1: {
    color: 'green'
  },
  none2: {
    color: 'yellow'
  },
  table: {
    backgroundColor: '#000',
    color: '#fff',
    fontFamily: 'monospace',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  }
});

export default App
