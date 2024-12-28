import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [revealedPassword, setRevealedPassword] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const password = "erpmisropnaijuoy";
    const targetDate = new Date("2025-12-31T23:59:59");
    const startDate = new Date("2025-01-01");
    const daysPerLetter = Math.ceil(365 / (password.length - 1));

    const calculateTimeLeft = () => {
      const currentDate = new Date();
      const timeDifference = targetDate - currentDate;

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
      const seconds = Math.floor((timeDifference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });

      const elapsedDays = Math.max(0, Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24)));
      const revealedLetters = 1 + Math.min(password.length - 1, Math.floor(elapsedDays / daysPerLetter));
      setRevealedPassword(password.slice(0, revealedLetters));
    };

    calculateTimeLeft();
    const intervalId = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  const handleDeleteComment = (index) => {
    setComments(comments.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h1>Contador de días de Pio y Juan 💕</h1>
      <p>
        Faltan <strong>{timeLeft.days}</strong> días,{" "}
        <strong>{timeLeft.hours}</strong> horas,{" "}
        <strong>{timeLeft.minutes}</strong> minutos y{" "}
        <strong>{timeLeft.seconds}</strong> segundos para el 31 de diciembre de 2025.
      </p>
      <p>
        Días: <strong>{1000 - timeLeft.days}/1000</strong>
      </p>
      <h4>Letras de la contraseña reveladas:</h4>
      <p className="bold">
        {revealedPassword || "Aún no se ha revelado ninguna letra."}
      </p>

      <h4>Comentarios:</h4>
      <div>
        <input
          type="text"
          value={newComment}
          placeholder="Escribe un comentario"
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleAddComment}>Agregar</button>
      </div>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>
            {comment}{" "}
            <button onClick={() => handleDeleteComment(index)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
