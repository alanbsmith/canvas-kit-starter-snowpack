import * as React from 'react';
import {CanvasProvider, canvas, styled } from '@workday/canvas-kit-react';
import { fonts } from "@workday/canvas-kit-react-fonts";

import { Counter, useCounter } from './Counter';

const Container = styled("div")(...fonts, {
  fontFamily: canvas.fontFamily,
  ...canvas.type.body
});

function getOhs(count: number) {
  if (count < 1) {
    return new Array(0).fill('o')
  }
  return  new Array(count).fill('o')
}

function App() {
  const counterModel = useCounter({ initialCount: 1});

  const customDecrement = () => {
    if (counterModel.state.count > 0) {
      counterModel.events.decrement();
    };
  }

  const customCounterModel = {
    state: counterModel.state,
    events: {
      ...counterModel.events,
      decrement: customDecrement,
    }
  }

  return (
    <CanvasProvider>
      <Container>
        <h1>Hello, w{getOhs(counterModel.state.count)}rld!</h1>
        <Counter model={customCounterModel} />
      </Container>
    </CanvasProvider>
  );
}

export default App;
