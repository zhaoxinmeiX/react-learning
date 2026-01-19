import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import Basics from './pages/Basics';
import State from './pages/State';
import Effects from './pages/Effects';
import Forms from './pages/Forms';
import ContextModule from './pages/Context';
import Hooks from './pages/Hooks';
import API from './pages/API';
import NotFound from './pages/NotFound';

/**
 * App Component
 * 
 * The root component that sets up the routing provider.
 * 根组件，用于设置路由提供者。
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="basics" element={<Basics />} />
          <Route path="state" element={<State />} />
          <Route path="effects" element={<Effects />} />
          <Route path="forms" element={<Forms />} />
          <Route path="context" element={<ContextModule />} />
          <Route path="hooks" element={<Hooks />} />
          <Route path="api" element={<API />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
