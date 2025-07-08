import { useState } from 'react'
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  Checkbox,
  ListItemText,
  IconButton,
  Typography
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { pink, red } from '@mui/material/colors';

//テーマを定義(font,color)
const theme = createTheme({
  typography:{
    fontFamily:"Gill Sans , sans-serif"
  },
  palette:{
    primary:{
      main:pink[400],
    },
    secondary: {
      main: red[600],
    },
  },
});

function App() {
  //状態管理
  const [task, setTask] = useState('')    //入力欄の文字列を保存
  const [todos, setTodos] = useState([])  //登録されたタスクリストを配列で管理

  //タスク追加
  const handleAdd = () => {
    if (task.trim() === '') return  //空白だけなら配列しない
    //タスクをリストに追加
    setTodos([...todos, { 
      id: Date.now(), //現在時刻を取得(IDになる)
      text: task, //入力欄に記入された文字列
      isDone: false   //未完了として追加
    }])
    setTask('') //入力欄を空に
  }

  //チェックの切り替え
  const handleToggle = (id) => {
    setTodos(
      //map=状態の更新
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    )
  }

  //タスク削除
  const handleDelete = (id) => {
    //filter=状態の削除
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          ToDo list
        </Typography>

        <TextField
          fullWidth
          label="Task"
          variant="outlined"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
          sx={{ mb: 2 }}
        />

        <Button
          fullWidth
          variant="contained"
          onClick={handleAdd}
          sx={{ mb: 4 }}
          color="primary"
        >
          Add Task
        </Button>

        <List>
          {todos.map((todo) => (
            <ListItem
              key={todo.id}
              secondaryAction={
                <IconButton edge="end" onClick={() => handleDelete(todo.id)} sx={{'&:hover':{color:theme.palette.secondary.main,},}}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <Checkbox
                edge="start"  //リストの左側に表示
                checked={todo.isDone} //完了状態
                onChange={() => handleToggle(todo.id)}  //クリックされたときの動作
              />
              <ListItemText
                primary={todo.text} //テキスト本文
                sx={{
                  textDecoration: todo.isDone ? 'line-through' : 'none',
                  color: todo.isDone ? 'gray' : 'inherit'
                }}
              />
            </ListItem>
          ))}
        </List>
      </Container>
    </ThemeProvider>
  );
}

export default App;
