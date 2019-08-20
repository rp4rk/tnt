import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  div.setAttribute('id', 'root');
  document.body.appendChild(div);
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
