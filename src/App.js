import React from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';

function App() {
	// const socket = io();
	console.log("socket");
	const socket = io('ws://localhost:3001');

	console.log({socket});

	socket.on('connect', () => {
		// either with send()
		socket.send('Hello!');

		// or with emit() and custom event names
		socket.emit('salutations', 'Hello!', {'mr': 'john'}, Uint8Array.from([1, 2, 3, 4]));
	});

	socket.on("connect", () => {
		if (socket) {
			socket.emit("authenticate", {
				token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMzZjYWUxYTYxZGE5MTQ3ZGU5NGM2MiIsImVtYWlsIjoibHVrZUBlbGVtZW50c29mdHdvcmtzLmNvLnVrIiwiaWF0IjoxNTk2MjQwNDIxLCJleHAiOjE1OTYyNDIyMjF9.-J39hVsRkNCZ5mxA7lmIH6ZBmSLyIytdjXQqTKU3OOU'
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
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
			</header>
		</div>
	);
}

export default App;
