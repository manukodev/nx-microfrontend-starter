import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';

const Remote = React.lazy(() => import('remote/Module'));

export function App() {
  return (
    <React.Suspense fallback={'loading'}>
      <p>vite host</p>
      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/remote">Remote</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              This is the generated root route.{' '}
              <Link to="/remote">Click here for page 2.</Link>
            </div>
          }
        />
        <Route
          path="/remote"
          element={
            <div>
              <Remote />
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          }
        />
      </Routes>
      {/* END: routes */}
    </React.Suspense>
  );
}

export default App;
