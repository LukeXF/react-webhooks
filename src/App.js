import React from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';

const socket = io('ws://localhost:3001');

function App() {
	// const socket = io();
	console.log("socket");

	console.log({socket});
	//
	// socket.on('connect', () => {
	// 	// either with send()
	// 	socket.send('Hello!');
	//
	// 	// or with emit() and custom event names
	// 	socket.emit('event', 'Hello! v3', {'mr': 'john'}, Uint8Array.from([1, 2, 3, 4]));
	// });

	socket.on("connect", () => {
		console.log('on connect', socket);
		if (socket) {
			console.log('trying to authenticate');
			socket.emit("authenticate", {
				token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMzZjYWUxYTYxZGE5MTQ3ZGU5NGM2MiIsImVtYWlsIjoibHVrZUBlbGVtZW50c29mdHdvcmtzLmNvLnVrIiwiaWF0IjoxNTk2MjQ3MzMyLCJleHAiOjE1OTYyNDkxMzJ9.w3RDgDwx4KeqGoxW5_vSqXwE063B-1ixOhUXg1Vg0rY'
			}); //send the jwt
		}
	});

	socket.on("linked", data => {
		console.log(data.body);
	});

	// handle the event sent with socket.send()
	socket.on('message', data => {
		console.log(data);
	});

	// handle the event sent with socket.emit()
	socket.on('greetings', (elem1, elem2, elem3) => {
		console.log(elem1, elem2, elem3);
	});
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo"/>
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<button onClick={ActionLink}>
					Activate Lasers
				</button>
			</header>
		</div>
	);
}

function ActionLink(e) {
	e.preventDefault();
	console.log('The link was clicked.');
	socket.emit('test', 'Hello! v3', {'mr': 'john'},);
}

export default App;
