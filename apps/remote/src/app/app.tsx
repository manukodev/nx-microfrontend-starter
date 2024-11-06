// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';

import NxWelcome from './nx-welcome';

type Props = {
  initCount?: number;
};

export function App(props: Props) {
  return (
    <div>
      initCount: {props?.initCount || 'no init count'}
      <NxWelcome title="remote new xcc" />
    </div>
  );
}

export default App;
