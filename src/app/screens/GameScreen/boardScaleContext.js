// @flow
import React, { createContext, type ComponentType, type StatelessFunctionalComponent } from 'react';

const contextData: {
  scale: number,
  updateScale: (scale: number) => void,
} = {
  scale: 1,
  updateScale: () => undefined,
};

const {
  Provider,
  Consumer,
} = createContext(contextData);

const withScale = (Component: ComponentType<any>): StatelessFunctionalComponent<any> =>
  (props: any) => (
    <Consumer>{
      ({ scale, updateScale }) => <Component {...props} {...{ scale, updateScale }} />
    }
    </Consumer>);

export { Provider, Consumer, withScale };
