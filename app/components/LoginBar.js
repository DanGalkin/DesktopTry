import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
  } from 'react-native';

class LoginBar extends React.Component {
  render() {
    return (
      <View style={styles.loginBar}>
        <Text style={styles.greeting}>
          Hi, {this.props.name || 'Fella'}!
        </Text>
        <TouchableOpacity
          onPress={this.props.logoutHandle}
        >
          <Text style={styles.logout}>🚪</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  loginBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  greeting: {
    color: 'white',
    fontSize: 20,
  },
  logout: {
    fontSize: 20,
  }
})

export default LoginBar;