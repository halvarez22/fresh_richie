import React from 'react';

const NewsletterSection: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle the form submission here.
    alert('Gracias por suscribirte!');
  };

  return (
    <section id="contact" className="py-20 bg-secondary">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-anton uppercase tracking-wider text-primary">
          Únete al Movimiento
        </h2>
        <p className="mt-4 text-lg text-gray-400">
          Suscríbete para recibir noticias exclusivas, lanzamientos y acceso anticipado a mis próximos proyectos.
        </p>
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-4 max-w-lg mx-auto animate-fade-in-up">
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="flex-auto appearance-none rounded-full border border-gray-700 bg-gray-800 px-5 py-3 text-base text-white placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Tu correo electrónico"
          />
          <button
            type="submit"
            className="flex-none rounded-full bg-primary px-8 py-3 text-base font-bold text-white tracking-widest uppercase transition-all duration-300 transform hover:scale-105 hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-secondary"
          >
            Suscribir
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSection;