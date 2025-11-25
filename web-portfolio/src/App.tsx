import Layout from './components/Layout';
import Hero from './components/Hero';
import ProjectSection from './components/ProjectSection';
import { projects } from './data/projects';

function App() {
  return (
    <Layout>
      <Hero />

      <div className="relative z-10 pb-8">
        {projects.map((project, index) => (
          <ProjectSection key={project.id} project={project} index={index} />
        ))}
      </div>

      <footer className="text-center py-8 text-white/60 text-sm">
        <p className="mb-2">
          © {new Date().getFullYear()} Silas Howe
        </p>
        <div className="flex justify-center gap-4">
          <a href="https://www.linkedin.com/in/silashowe" target="_blank" className="hover:text-white transition-colors">LinkedIn</a>
          <span>•</span>
          <a href="mailto:silashowe1999@gmail.com" target="_blank" className="hover:text-white transition-colors">Email</a>
        </div>
      </footer>
    </Layout>
  );
}

export default App;
