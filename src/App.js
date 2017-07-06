import { useState, useEffect } from "react";

import "./style.css";

function App() {
  // Eğer localstorage'da bir değer yoksa boş olarak ata
  if (localStorage.getItem('todo') === null) {
    localStorage.setItem('todo', JSON.stringify([]));
  }

  // localstorage'dan todo değerini al
  const [todo, setTodo] = useState(JSON.parse(localStorage.getItem('todo')));

  // todo değiştiğinde localstorage'a yaz
  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify(todo));
  }
  , [todo]);

  // Enter tuşunun basılıp basılmadığını kontrol et
  // baslıyorsa yazılanı todo listeye ekle
  useEffect(() => {
    const listener = event => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        if (event.target.value !== "") { // Boş değilse todo liste ekle
          setTodo([...todo, { id: todo.length + 1, text: event.target.value, completed: "false" }]);
          event.target.value = "";  
        }      
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [todo]);

  // Seçilen elemanı todo listesinden sil
  const handleDelete = id => {
    setTodo(todo.filter(todo => todo.id !== id));
  }

  // Seçilen elemanın completed değerini değiştir
  const handleComplete = id => {
    setTodo(todo.map(todo => {
      if (todo.id === id) {
        todo.completed === "false" ? todo.completed = "true" : todo.completed = "false";        
      }
      return todo;
    }));
  }

  // Tamamlanmış görevleri listeden kaldır
  const handleClear = () => {
    setTodo(todo.filter(todo => {
      return todo.completed === "false";
    }));
  }

  return (
    <section className="todoapp">
      <header className="header">
        <h1>Todo List</h1>
        <form>
          <input className="new-todo" placeholder="Ne yapman gerekiyor?" autoFocus />
        </form>
      </header>

      <section className="main">
        <ul className="todo-list">
          {todo.map((item) => (
            <li key={item.id} className={ item.completed ===  "true" ? "completed" : "" }>
              <div className="view">
                <input className="toggle" type="checkbox" 
                onClick={() => handleComplete(item.id) }
                checked={item.completed === "true"}
                />
                <label>{item.text}</label>
                <button className="destroy" onClick={() => handleDelete(item.id) }></button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <footer className="footer">
        <span className="todo-count">
          <strong>{todo.length}</strong> öğe
        </span>

        <button className="clear-completed" onClick={() => handleClear() }>Tamamlananları Sil</button>
      </footer>
    </section>
  );
}

export default App;
