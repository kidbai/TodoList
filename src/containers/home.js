import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  TextInput,
  Button,
  NativeModules
} from 'react-native';

import { connect } from 'react-redux'
import { add, done } from '../actions/actions'
import { ADD, DONE } from '../actions/actionsTypes.js'
import uuidv4 from 'uuid'

class Todo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
    }
  }

  _setTodoType = (index) => {
    this.props.dispatch(done(index))
    this.setState({
      text: ''
    })
  }

  _renderRow = ({item, index}) => {
    return (
      <View style={Style.listItem}>
        <View style={Style.left}>
          { item.selected ? <Text style={Style.done}>{item.text}</Text> : <Text style={Style.text}>{item.text}</Text> }
        </View>
        <TouchableOpacity style={Style.right} onPress={() => this._setTodoType(index)}>
          { item.selected ? <Text style={Style.success}>完成</Text> : <Text style={Style.pendding}>待办</Text> }
        </TouchableOpacity>
      </View>
    )

  }

  _addTodo () {
    if (this.state.text === '') {
      NativeModules.ToastAndroid.show('请输入待办事项', 500)
      return false
    }
    this.props.dispatch(add(this.state.text))
    this.setState({
      text: ''
    })
  }

  _keyExtractor = (item, index) => item.id

  componentDidMount () {
  }

  render() {
    return (
      <View style={Style.container}>
        <View style={Style.setTodo}>
          <TextInput
            value={this.state.text}
            style={[Style.left, Style.input]}
            underlineColorAndroid="#666"
            onChangeText={(text) => this.setState({text: text})}
            placeholder='请输入待办的事项'
          />
          <Button
            style={Style.right}
            onPress={this._addTodo.bind(this)}
            title='添加'
          />
        </View>
        <FlatList
          data={this.props.todo.todo}
          extraData={this.state}
          renderItem={this._renderRow}
          style={Style.list}
          keyExtractor={this._keyExtractor}
        />

      </View>
    )
  }
}

const Style = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingLeft: 5,
    paddingRight: 5
  },
  setTodo: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10
  },
  left: {
    flex: 1
  },
  right: {
  },
  input: {
    padding: 0,
    height: 40
  },
  text: {
    fontSize: 18,
    color: '#000'
  },
  list: {
    position: 'relative',
  },
  listItem: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  done: {
    fontSize: 18,
    color: '#999',
    textDecorationColor: '#999',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid'
  },
  success: {
    fontSize: 18,
		color: 'green',
	},
	pendding: {
    fontSize: 18,
		color: 'blue',
	},

})

const mapStateToProps = state => ({
    todo: state.todo
})

export default connect(mapStateToProps)(Todo)
