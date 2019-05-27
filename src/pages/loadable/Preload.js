import React from 'react';
import loadable from 'react-loadable';
import {withState} from 'recompose';

const B = loadable({
  loader: () => import('./B'),
  loading: () => null
});

const enhance = withState('visible', 'setVisible');

const Preload = enhance(({
  visible, setVisible
}) => (
  <div>
    <h2>预加载</h2>
    <div>
      <button onClick={() => B.preload()}>加载组件</button>
      <button onClick={() => setVisible(true)}>显示组件</button>
    </div>
    {
      visible && <B />
    }
  </div>
));

export default Preload;
