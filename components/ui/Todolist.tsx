'use client'

import React, { useState, useEffect } from 'react';
import { TextField, IconButton, List, ListItem, ListItemText, ListItemSecondaryAction, Typography, Checkbox } from '@mui/material';
import { AddCircleOutline, Delete, Edit } from '@mui/icons-material';

interface Todo {
  id: number;
  text: string;
  expense: string;
  completed: boolean; // Add completed field
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(JSON.parse(localStorage.getItem('todos') || '[]'));
  const [inputText, setInputText] = useState<string>('');
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>('');
  const [editExpense, setEditExpense] = useState<string>('');
  const [editCompleted, setEditCompleted] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (inputText.trim() !== '') {
      setTodos(prevTodos => [
        ...prevTodos,
        {
          id: Date.now(),
          text: inputText.trim(),
          expense: editExpense.trim(),
          completed: false, // Set completed
        },
      ]);
      setInputText('');
      setEditExpense('');
    }
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const handleEditTodo = (id: number) => {
    const todoToEdit = todos.find(todo => todo.id === id);
    if (todoToEdit) {
      setEditId(id);
      setEditText(todoToEdit.text);
      setEditExpense(todoToEdit.expense);
      setEditCompleted(todoToEdit.completed);
    }
  };

  const handleSaveEdit = () => {
    if (editId !== null) {
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo.id === editId ? { ...todo, text: editText.trim(), expense: editExpense.trim(), completed: editCompleted } : todo
        )
      );
      setEditId(null);
      setEditText('');
      setEditExpense('');
      setEditCompleted(false);
    }
  };

  const handleToggleCompleted = (id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        To do list
      </Typography>
      <TextField
        label="Task"
        variant="outlined"
        value={inputText}
        onChange={e => setInputText(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            handleAddTodo();
          }
        }}
      />
      <TextField
        label="Expense"
        variant="outlined"
        value={editExpense}
        onChange={e => setEditExpense(e.target.value)}
      />
      <IconButton color="primary" aria-label="add todo" onClick={handleAddTodo}>
        <AddCircleOutline />
      </IconButton>
      <List>
        {todos.map(todo => (
          <ListItem key={todo.id}>
            <Checkbox
              checked={todo.completed}
              onChange={() => handleToggleCompleted(todo.id)}
            />
            {editId === todo.id ? (
              <>
                <TextField
                  label="Task"
                  variant="outlined"
                  value={editText}
                  onChange={e => setEditText(e.target.value)}
                />
                <TextField
                  label="Expense"
                  variant="outlined"
                  value={editExpense}
                  onChange={e => setEditExpense(e.target.value)}
                />
                <IconButton edge="end" aria-label="save" onClick={handleSaveEdit}>
                  <Edit />
                </IconButton>
              </>
            ) : (
              <>
                <ListItemText primary={todo.text} secondary={todo.expense} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="edit" onClick={() => handleEditTodo(todo.id)}>
                    <Edit />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTodo(todo.id)}>
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </>
            )}
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default TodoList;
