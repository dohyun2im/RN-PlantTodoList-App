import * as React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import ListItem from '../component/ListItem';
import { useAppDispatch, useAppSelector } from '../store/hook';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { setReverse } from '../slices/todolist';

function TodoList() {
  const dispatch = useAppDispatch();
  const todo = useAppSelector(state => state.todo.todoList);
  const reverse = useAppSelector(state => state.todo.reverse);
  
  const sortedTodo = [...todo]
    .sort((a: any, b: any) => new Date(b.date).valueOf() - new Date(a.date).valueOf());
  const reverseSortedTodo = [...todo]
    .sort((a: any, b: any) => new Date(a.date).valueOf() - new Date(b.date).valueOf());
  const todoStage = todo.filter((t) => t.stage === 1)?.length;
  const progressStage = todo.filter((t) => t.stage === 2)?.length;
  const completeStage = todo.filter((t) => t.stage === 3)?.length;

  const OnPress = (f: boolean) => {
    dispatch(setReverse(f))
  }
  return (
    <>
    <View style={styles.treeWrapper}>
      <View style={styles.tree}>
        <FontAwesome5 color='#b9ffb9' name='seedling' size={18} />
        <Text style={styles.text}>x{todoStage}</Text>
      </View>
      <View style={styles.tree}>
        <FontAwesome5 color='lightgreen' name='spa' size={15} />
        <Text style={styles.text}> x{progressStage}</Text>
      </View>
      <View style={styles.tree}>
        <View style={styles.iconWrapper}>
          <FontAwesome5 color='green' name='tree' size={18} />
        </View>
        <Text style={styles.text}> x{completeStage}</Text>
      </View>
      <View style={styles.tree}>
        <BouncyCheckbox
          size={20}
          fillColor='green'
          unfillColor='white'
          text={!reverse ? 'Latest' : 'Old'}
          textStyle={{ textDecorationLine: 'none' }}
          onPress={OnPress}
        />
      </View>
    </View>
    <ScrollView style={styles.container}>
      {(reverse ? reverseSortedTodo : sortedTodo).map((t: any) => (
        <ListItem
          key={t.id}
          id={t.id}
          content={t.content}
          stage={t.stage}
          date={t.date}
        />
      ))}
    </ScrollView>
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 3,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  iconWrapper: {
    marginTop: -2
  },
  tree: {
    flexDirection: 'row',
    marginRight: 15,
  },
  treeWrapper: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 3,
    paddingLeft: 5,
  },
  text: {
    marginRight: 10,
  }
})

export default TodoList;