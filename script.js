body {
  font-family: 'Inter', sans-serif;
  text-align: center;
}

.screen {
  display: none;
}

.active {
  display: block;
}

.logo-img {
  width: 150px;
  margin-bottom: 20px;
}

button, a {
  padding: 10px 20px;
  margin: 10px;
  border: 1px solid black;
  text-decoration: none;
  display: inline-block;
}

.primary {
  background: #FFC907;
  border: none;
}

.hud {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
}

.timer-bar {
  height: 6px;
  background: #eee;
  margin: 10px;
}

#timerFill {
  height: 100%;
  width: 100%;
  background: #FFC907;
}

.game-area {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 20px;
}

.card {
  background: #f0f0f0;
  padding: 40px;
  margin-bottom: 10px;
}

.card.correct {
  background: #d4ffd4;
}

.card.wrong {
  background: #ffd4d4;
}