import { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, FlatList, ActivityIndicator, Alert, Linking } from 'react-native';
import { Dimensions } from "react-native";
const screenHeight = Dimensions.get('screen').height;
const windowHeight = Dimensions.get('window').height;
const navbarHeight = screenHeight - windowHeight

const url = "https://codeforces.com/api/contest.list?gym=false";
const giturl = "https://github.com/sambhavsaxena"
const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => setData(json.result.slice(0, 20)))
      .then(() => Alert.alert("Contests Updated", "The upcoming contests have been updated."))
      .catch((error) => Alert.alert("Error", error))
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
                      {item.id}. {item.name}
                      {"\n"}
                      <Text style={styles.text2}>
                        {dateStr}, {hours} hrs {minutes} mins
                      </Text>
                      {"\n"}<Text style={styles.none1} onPress={() => Linking.openURL("https://codeforces.com/contests/" + item.id)}>Register</Text>
                    </Text>
                  </Text> : <Text style={styles.table}>
                    <Text style={styles.text}>
                      {item.id}. {item.name}
                      {"\n"}
                      <Text style={styles.text2}>
                        {dateStr}, {hours} hrs {minutes} mins
                      </Text>
                      {"\n"}<Text style={styles.none2} onPress={() => Linking.openURL("https://codeforces.com/contest/" + item.id)}>Upsolve</Text>
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
    marginTop: navbarHeight,
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
    color: '#1a75ff',
  },
  title: {
    color: '#fff',
    marginTop: 20,
    marginBottom: 20,
    fontFamily: 'monospace',
    fontSize: 20,
  },
  footer: {
    color: '#fff',
    margin: 16,
  },
  none1: {
    color: '#66ff33'
  },
  none2: {
    color: '#990000',
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
