import Layout from './components/Layout';
import Hero from './components/Hero';
import ProjectSection from './components/ProjectSection';
import { projects } from './data/projects';

function App() {
  return (
    <Layout>
      <Hero />

      <div className="relative z-20">
        {projects.map((project, index) => (
          <ProjectSection key={project.id} project={project} index={index} />
        ))}
      </div>

      <footer className="bg-neo-black text-neo-white py-12 border-t-4 border-neo-white text-center">
        <p className="text-xl font-bold uppercase">
          © {new Date().getFullYear()} Silas Howe
        </p>
        <a href="https://www.linkedin.com/in/silashowe" target="_blank">LinkedIn</a> | <a href="mailto:silashowe1999@gmail.com" target="_blank">Email</a>
      </footer>
    </Layout>
  );
}

export default App;
