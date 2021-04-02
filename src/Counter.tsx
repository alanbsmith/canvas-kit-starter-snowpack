/** @jsxRuntime classic */
/** @jsx jsx */
import * as React from 'react';
import { jsx, css} from '@emotion/react';
import { canvas, styled, IconButton } from '@workday/canvas-kit-react';
import { minusCircleIcon, plusCircleIcon } from '@workday/canvas-system-icons-web';

const StyledCounter = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

interface CounterModel {
  state: {
    count: number;
  },
  events: {
    increment: () => void;
    decrement: () => void;
    setCount: (count: number) => void;
  }
}

interface CounterConfigProps {
  initialCount?: number;
  onChange?: (count: number) => void;
  model?: never;
}

interface UseCounteModelConfig {
  initialCount?: number;
  onChange?: (count: number) => void;
}

interface CounterModelProps {
  initialCount?: never;
  onChange?: never;
  model: CounterModel;
}

type CounterProps = CounterConfigProps | CounterModelProps;

export const useCounter = (config = {} as UseCounteModelConfig): CounterModel => {
  const { onChange, initialCount = 0 } = config;
  const [count, setCount] = React.useState(initialCount);

  const handleChange = (newCount: number) => {
    onChange?.(newCount);
    setCount(newCount);
  }

  const increment = () => {
    setCount(count + 1);
  }
  
  const decrement = () => {
    setCount(count - 1);
  }

  return {
    state: {
      count,
    },
    events: {
      increment,
      decrement,
      setCount: handleChange,
    }
  }
}

function useDefaultModel<T, C>(model: T | undefined, config: C, fn: (config: C) => T) {
  return model || fn(config);
}

export const Counter = (props: CounterProps) => {
  const counter = useDefaultModel(props.model, props as UseCounteModelConfig, useCounter);

  return (
    <StyledCounter>
      <IconButton
        aria-label="decrememnt counter"
        size={IconButton.Size.Small}
        variant={IconButton.Variant.Square}
        icon={minusCircleIcon}
        onClick={counter.events.decrement}
      />
      <span css={css({ margin: `0 ${canvas.spacing.xs}` })}>{counter.state.count}</span>
      <IconButton
        aria-label="incrememnt counter"
        size={IconButton.Size.Small}
        variant={IconButton.Variant.Square}
        icon={plusCircleIcon}
        onClick={counter.events.increment}
      />
    </StyledCounter>
  )
}
