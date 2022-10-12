const msgList = document.querySelector('ul');
const msgForm = document.querySelector('form');
const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener('open', () => {
  console.log('Connected to Server ✔');
});

socket.addEventListener('message', (message) => {
  const li = document.createElement('li');
  li.innerText = message.data;
  msgList.append(li);
});

socket.addEventListener('close', () => {
  console.log('Disconneted from Server ❌');
});

function handleListen(event) {
  event.preventDefault();
  const nicknmInput = msgForm.querySelector('#nickname');
  const msgInput = msgForm.querySelector('#msg');
  socket.send({
    type: 'nickname',
    payload: nicknmInput.value,
  });
  socket.send({
    type: 'message',
    payload: msgInput.value,
  });

  msgInput.value = '';
}

msgForm.addEventListener('submit', handleListen);
