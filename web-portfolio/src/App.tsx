import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import PhotoVideo from './pages/PhotoVideo';
import CreativeCode from './pages/CreativeCode';
import CaseStudy from './pages/CaseStudy';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/:id" element={<CaseStudy />} />
          <Route path="/creative-code" element={<CreativeCode />} />
          <Route path="/photo-video" element={<PhotoVideo />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
