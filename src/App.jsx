import React, { useState } from 'react';

// Navbar Component
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = ['Features', 'Pricing', 'Resources', 'About Us', 'Demo', 'Contact'];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                NexaCRM
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-gray-700 hover:text-blue-600 transition-colors text-sm font-medium"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Join Waitlist Button */}
          <div className="hidden md:block">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
              Join Waitlist
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            {menuItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
              Join Waitlist
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

// Hero Section Component
const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              The CRM Built for{' '}
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Growing Teams
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Manage clients, track sales, and scale operations seamlessly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl">
                Join Waitlist
              </button>
              <button className="border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 px-8 py-4 rounded-lg font-medium transition-colors">
                Watch Demo Video
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl p-8 shadow-2xl">
              <div className="bg-white rounded-lg p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-3 w-24 bg-gray-200 rounded"></div>
                  <div className="h-3 w-16 bg-gray-200 rounded"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg"></div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="h-12 bg-gray-100 rounded"></div>
                    <div className="h-12 bg-gray-100 rounded"></div>
                    <div className="h-12 bg-gray-100 rounded"></div>
                  </div>
                  <div className="h-24 bg-gray-100 rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Features Section Component
const Features = () => {
  const features = [
    {
      icon: '👥',
      title: 'Customer Management',
      description: 'Organize and track all customer interactions in one centralized platform.'
    },
    {
      icon: '📊',
      title: 'Pipeline & Deal Tracking',
      description: 'Visualize your sales pipeline and move deals through stages effortlessly.'
    },
    {
      icon: '🤝',
      title: 'Team Collaboration',
      description: 'Work together seamlessly with real-time updates and shared insights.'
    },
    {
      icon: '📈',
      title: 'Analytics & Reports',
      description: 'Get actionable insights with customizable reports and dashboards.'
    },
    {
      icon: '🔗',
      title: 'Integrations',
      description: 'Connect with your favorite tools and automate workflows.'
    },
    {
      icon: '⚡',
      title: 'Automation',
      description: 'Save time with smart automation for repetitive tasks and follow-ups.'
    }
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything you need to grow
          </h2>
          <p className="text-xl text-gray-600">
            Powerful features designed for modern sales teams
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow border border-gray-100 hover:border-blue-200"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Demo Video Section Component
const DemoVideo = () => {
  return (
    <section id="demo" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            See NexaCRM in Action
          </h2>
          <p className="text-xl text-gray-600">
            See how NexaCRM helps your team close more deals in less time.
          </p>
        </div>
        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-900 aspect-video">
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="bg-white hover:bg-gray-100 rounded-full p-6 shadow-lg transition-transform hover:scale-110">
              <svg
                className="w-12 h-12 text-blue-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
          <div className="w-full h-full bg-gradient-to-br from-blue-900 to-blue-700"></div>
        </div>
      </div>
    </section>
  );
};

// Pricing Section Component
const Pricing = () => {
  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for small teams getting started',
      price: 'Coming Soon',
      features: ['Up to 5 users', 'Basic CRM features', 'Email support', '1GB storage']
    },
    {
      name: 'Growth',
      description: 'For growing teams that need more power',
      price: 'Coming Soon',
      features: ['Up to 25 users', 'Advanced analytics', 'Priority support', '10GB storage', 'Custom integrations'],
      highlighted: true
    },
    {
      name: 'Enterprise',
      description: 'For large organizations with custom needs',
      price: 'Custom',
      features: ['Unlimited users', 'Enterprise features', 'Dedicated support', 'Unlimited storage', 'Custom solutions']
    }
  ];

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600">
            Choose the plan that fits your team
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-2xl p-8 ${
                plan.highlighted
                  ? 'bg-blue-600 text-white shadow-2xl scale-105'
                  : 'bg-gray-50 border border-gray-200'
              }`}
            >
              <h3 className={`text-2xl font-bold mb-2 ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                {plan.name}
              </h3>
              <p className={`mb-6 ${plan.highlighted ? 'text-blue-100' : 'text-gray-600'}`}>
                {plan.description}
              </p>
              <div className="mb-6">
                <span className={`text-4xl font-bold ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                  {plan.price}
                </span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <svg
                      className={`w-5 h-5 mr-3 ${plan.highlighted ? 'text-blue-200' : 'text-blue-600'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className={plan.highlighted ? 'text-blue-100' : 'text-gray-700'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                  plan.highlighted
                    ? 'bg-white text-blue-600 hover:bg-gray-100'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Join Waitlist
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Resources Section Component
const Resources = () => {
  const resources = [
    {
      icon: '📝',
      title: 'Blog',
      description: 'Latest insights and best practices',
      link: '#'
    },
    {
      icon: '❓',
      title: 'Help Center',
      description: 'Get answers to your questions',
      link: '#'
    },
    {
      icon: '🚀',
      title: 'Product Updates',
      description: 'Stay updated with new features',
      link: '#'
    }
  ];

  return (
    <section id="resources" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Resources</h2>
          <p className="text-xl text-gray-600">
            Everything you need to succeed with NexaCRM
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <a
              key={index}
              href={resource.link}
              className="bg-white rounded-xl p-8 hover:shadow-lg transition-all border border-gray-200 hover:border-blue-300 group"
            >
              <div className="text-4xl mb-4">{resource.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
                {resource.title}
              </h3>
              <p className="text-gray-600">{resource.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

// About Us Section Component
const AboutUs = () => {
  return (
    <section id="about-us" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              About NexaCRM
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              We're on a mission to empower growing teams with the tools they need to build lasting customer relationships and drive sustainable growth.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Built by a team of sales professionals and software engineers, NexaCRM combines powerful features with an intuitive interface that your team will actually love to use.
            </p>
            <p className="text-lg text-gray-600">
              Join thousands of teams who are transforming the way they manage customer relationships.
            </p>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl p-8 aspect-square flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🎯</div>
                <p className="text-gray-700 font-medium">Our Mission</p>
                <p className="text-gray-600 mt-2">Empowering teams to grow</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Contact Section Component
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-600">
            Have questions? We'd love to hear from you.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                placeholder="Tell us how we can help..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
            >
              Send Message
            </button>
          </form>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-600">
              Or reach us at{' '}
              <a href="mailto:support@nexacrm.com" className="text-blue-600 hover:text-blue-700 font-medium">
                support@nexacrm.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  const socialLinks = [
    { name: 'Twitter', icon: '𝕏', link: '#' },
    { name: 'LinkedIn', icon: '💼', link: '#' },
    { name: 'GitHub', icon: '👨‍💻', link: '#' },
    { name: 'Facebook', icon: '👥', link: '#' }
  ];

  return (
    <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-12 text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">
            Be among the first 500 users to try NexaCRM
          </h3>
          <p className="text-blue-100 mb-6 text-lg">
            Get exclusive early access and special launch pricing
          </p>
          <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-medium transition-colors shadow-lg">
            Join Waitlist Now
          </button>
        </div>

        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <h4 className="text-2xl font-bold mb-4">NexaCRM</h4>
            <p className="text-gray-400 mb-4">
              The CRM built for growing teams. Manage clients, track sales, and scale operations seamlessly.
            </p>
          </div>
          <div>
            <h5 className="font-semibold mb-4">Product</h5>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#demo" className="hover:text-white transition-colors">Demo</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-4">Company</h5>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#about-us" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#resources" className="hover:text-white transition-colors">Resources</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-6 mb-8">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.link}
              className="text-2xl hover:text-blue-400 transition-colors"
              aria-label={social.name}
            >
              {social.icon}
            </a>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2025 NexaCRM. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <DemoVideo />
      <Pricing />
      <Resources />
      <AboutUs />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;