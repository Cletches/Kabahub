import { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from './emailConfig';
import { GOOGLE_SHEETS_CONFIG } from './googleSheetsConfig';

// Scroll Animation Hook
const useScrollAnimation = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
};

// Waitlist Modal Component
const WaitlistModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', company: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      // Save to Google Sheets if enabled
      if (GOOGLE_SHEETS_CONFIG.ENABLED && GOOGLE_SHEETS_CONFIG.WEB_APP_URL !== 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
        await fetch(GOOGLE_SHEETS_CONFIG.WEB_APP_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            company: formData.company,
            source: 'Website'
          })
        });
      }

      // Send email using EmailJS
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          company: formData.company,
          message: `Waitlist signup from ${formData.name} at ${formData.company || 'No company provided'}`,
          to_email: 'kabahubteam@gmail.com',
        },
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      setSubmitStatus({
        type: 'success',
        message: '🎉 Welcome to the waitlist! We\'ll be in touch soon.',
      });
      setFormData({ name: '', email: '', company: '' });

      // Close modal after 2 seconds
      setTimeout(() => {
        onClose();
        setSubmitStatus({ type: '', message: '' });
      }, 2000);
    } catch (error) {
      console.error('Waitlist signup failed:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Oops! Something went wrong. Please try again or email us at kabahubteam@gmail.com',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-gradient-to-br from-accent-900 via-accent-800 to-neutral-900 rounded-3xl p-8 md:p-12 max-w-lg w-full shadow-2xl border border-primary-400/30 animate-slide-up">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Join the Waitlist
          </h2>
          <p className="text-neutral-300">
            Be among the first 500 users and get exclusive early access benefits
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your name *"
              className="w-full px-5 py-4 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-xl focus:border-primary-400 focus:ring-4 focus:ring-primary-500/30 outline-none transition-all text-white placeholder:text-neutral-400"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Work email *"
              className="w-full px-5 py-4 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-xl focus:border-primary-400 focus:ring-4 focus:ring-primary-500/30 outline-none transition-all text-white placeholder:text-neutral-400"
            />
          </div>
          <div>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Company name (optional)"
              className="w-full px-5 py-4 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-xl focus:border-primary-400 focus:ring-4 focus:ring-primary-500/30 outline-none transition-all text-white placeholder:text-neutral-400"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white py-4 px-6 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Joining...' : 'Join Waitlist'}
          </button>

          {submitStatus.message && (
            <div
              className={`p-4 rounded-xl text-center ${
                submitStatus.type === 'success'
                  ? 'bg-green-500/20 border border-green-500/50 text-green-100'
                  : 'bg-red-500/20 border border-red-500/50 text-red-100'
              }`}
            >
              {submitStatus.message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

// Minimal Navbar Component
const Navbar = ({ onWaitlistClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-lg border-b border-neutral-200' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <span className={`text-2xl font-bold transition-colors ${
              isScrolled
                ? 'bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent'
                : 'text-white'
            }`}>
              KabaHub
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-10">
            <a href="#features" className={`transition-colors text-sm font-medium ${
              isScrolled ? 'text-neutral-600 hover:text-neutral-900' : 'text-white/90 hover:text-white'
            }`}>
              Features
            </a>
            <a href="#pricing" className={`transition-colors text-sm font-medium ${
              isScrolled ? 'text-neutral-600 hover:text-neutral-900' : 'text-white/90 hover:text-white'
            }`}>
              Pricing
            </a>
            <a href="#about-us" className={`transition-colors text-sm font-medium ${
              isScrolled ? 'text-neutral-600 hover:text-neutral-900' : 'text-white/90 hover:text-white'
            }`}>
              About
            </a>
            <a href="#contact" className={`transition-colors text-sm font-medium ${
              isScrolled ? 'text-neutral-600 hover:text-neutral-900' : 'text-white/90 hover:text-white'
            }`}>
              Contact
            </a>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onWaitlistClick}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all transform hover:scale-105 ${
              isScrolled
                ? 'bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white shadow-lg hover:shadow-xl'
                : 'bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/30'
            }`}>
              Join Waitlist
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Hero Section - Full Viewport Centered with Animated Blue-Black Background
const Hero = ({ onWaitlistClick }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
      {/* Animated Blue-Black Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-900 via-accent-800 to-neutral-900">
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary-900/40 via-primary-600/20 to-accent-900/40 animate-pulse" style={{ animationDuration: '8s' }}></div>

        {/* Abstract Blurred Patterns */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }}></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '7s', animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '9s', animationDelay: '2s' }}></div>
      </div>

      {/* Overlay for Depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-900/50 to-accent-900/80 backdrop-blur-sm"></div>

      {/* Content - High Contrast Typography */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <div className="animate-fade-in">
          <div className="inline-block mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/20 backdrop-blur-md text-primary-200 text-sm font-medium border border-primary-400/30 shadow-lg">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-300 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-400"></span>
              </span>
              Now accepting early access users
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-8 tracking-tight drop-shadow-2xl">
            The CRM Built for
            <span className="block bg-gradient-to-r from-primary-400 via-primary-300 to-primary-500 bg-clip-text text-transparent">
              Growing Teams
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-neutral-200 mb-12 max-w-3xl mx-auto leading-relaxed font-light drop-shadow-lg">
            Complete customer management platform with sales pipelines, marketing automation, and powerful analytics—all in one place.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={onWaitlistClick}
              className="group w-full sm:w-auto bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 text-white px-10 py-5 rounded-full text-lg font-semibold transition-all transform hover:scale-105 shadow-2xl hover:shadow-primary-500/50">
              Join Waitlist
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </button>
            <a
              href="#demo"
              className="group w-full sm:w-auto bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-10 py-5 rounded-full text-lg font-semibold border-2 border-white/30 hover:border-white/50 transition-all shadow-xl inline-flex items-center justify-center">
              Watch Demo
              <span className="inline-block ml-2 group-hover:scale-110 transition-transform">▶</span>
            </a>
          </div>

          <div className="flex items-center justify-center gap-8 md:gap-12 text-sm text-neutral-300 flex-wrap">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              14 Powerful Modules
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              Full Automation
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              Enterprise Ready
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Features Section - Minimal Cards with Hover Animations
const Features = () => {
  const features = [
    { icon: '👥', title: 'Contacts', description: 'Central hub for customer relationships with complete interaction history and activity timelines.' },
    { icon: '📧', title: 'Email', description: 'Unified inbox for client communication with templates and automated campaign sequences.' },
    { icon: '📅', title: 'Calendar', description: 'Never miss a meeting with Google/Outlook sync and shareable booking links.' },
    { icon: '📢', title: 'Marketing', description: 'Track campaigns from visitors to customers with visual funnels and performance metrics.' },
    { icon: '💼', title: 'Sales Deals', description: 'Kanban pipeline from prospect to close with revenue forecasting and quote builder.' },
    { icon: '🏢', title: 'Companies', description: 'Manage B2B relationships with linked contacts, deals, and health scores.' },
    { icon: '📊', title: 'Dashboard', description: 'Real-time business performance with KPIs, revenue tracking, and team leaderboards.' },
    { icon: '🎧', title: 'Service Desk', description: 'Simplified support with ticket management, priorities, SLAs, and live chat.' },
    { icon: '⚡', title: 'Automation', description: 'Workflow builder with triggers and actions to eliminate repetitive tasks.' },
    { icon: '💬', title: 'Conversations', description: 'Unified inbox for chat, email, SMS, WhatsApp, and social media DMs.' },
    { icon: '📈', title: 'Reports', description: 'Detailed insights with pipeline reports, revenue trends, and win/loss analysis.' },
    { icon: '🔧', title: 'Developments', description: 'Customize fields, manage integrations, API permissions, and beta features.' },
    { icon: '📉', title: 'Analytics', description: 'Advanced analytics with cohort analysis, attribution, and lifetime value.' },
    { icon: '🕒', title: 'Activities', description: 'Real-time team visibility with timeline of all CRM actions and task management.' },
  ];

  return (
    <section id="features" className="relative py-32 px-6 overflow-hidden">
      {/* Animated Blue-Black Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-900 via-accent-800 to-neutral-900">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary-900/40 via-primary-600/20 to-accent-900/40 animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }}></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '7s', animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '9s', animationDelay: '2s' }}></div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-900/50 to-accent-900/80 backdrop-blur-sm"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-20 animate-on-scroll opacity-0">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight drop-shadow-2xl">
            14 Powerful Modules
          </h2>
          <p className="text-xl text-neutral-200 max-w-2xl mx-auto font-light drop-shadow-lg">
            Everything you need to manage customers, close deals, and grow your business
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="animate-on-scroll opacity-0 group relative bg-white/10 backdrop-blur-md hover:bg-white/20 p-8 rounded-3xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-white/20 hover:border-primary-400/50"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-sm text-neutral-200 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Demo Video Section - Centered Card
const DemoVideo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlayClick = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <section id="demo" className="relative py-32 px-6 overflow-hidden">
      {/* Animated Blue-Black Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-900 via-accent-800 to-neutral-900">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary-900/40 via-primary-600/20 to-accent-900/40 animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }}></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '7s', animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '9s', animationDelay: '2s' }}></div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-900/50 to-accent-900/80 backdrop-blur-sm"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-on-scroll opacity-0">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight drop-shadow-2xl">
            See KabaHub in Action
          </h2>
          <p className="text-xl text-neutral-200 max-w-2xl mx-auto font-light drop-shadow-lg">
            Watch how teams close more deals and scale operations effortlessly
          </p>
        </div>

        <div className="animate-on-scroll opacity-0 relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-500 aspect-video group">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            controls
            playsInline
            preload="metadata"
          >
            <source src="/KabaHub/media/demo-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center z-10 bg-gradient-to-br from-primary-900/60 to-accent-900/60 cursor-pointer" onClick={handlePlayClick}>
              <button className="bg-white hover:bg-neutral-100 rounded-full p-8 shadow-2xl transition-all transform group-hover:scale-110 duration-300">
                <svg className="w-16 h-16 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// Pricing Section - Modern 3-Column Layout
const Pricing = ({ onWaitlistClick }) => {
  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for small teams',
      price: 'Coming Soon',
      features: ['Up to 5 users', 'Core CRM features', 'Email support', '5GB storage', 'Basic integrations'],
    },
    {
      name: 'Growth',
      description: 'For scaling businesses',
      price: 'Coming Soon',
      features: ['Up to 50 users', 'Advanced analytics', 'Priority support', '50GB storage', 'Custom integrations', 'Automation workflows'],
      highlighted: true,
    },
    {
      name: 'Enterprise',
      description: 'For large organizations',
      price: 'Custom',
      features: ['Unlimited users', 'Enterprise features', 'Dedicated support', 'Unlimited storage', 'Custom solutions', 'SLA guarantee'],
    },
  ];

  return (
    <section id="pricing" className="relative py-32 px-6 overflow-hidden">
      {/* Animated Blue-Black Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-900 via-accent-800 to-neutral-900">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary-900/40 via-primary-600/20 to-accent-900/40 animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }}></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '7s', animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '9s', animationDelay: '2s' }}></div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-900/50 to-accent-900/80 backdrop-blur-sm"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-20 animate-on-scroll opacity-0">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight drop-shadow-2xl">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-neutral-200 max-w-2xl mx-auto font-light drop-shadow-lg">
            Choose the plan that scales with your team
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`animate-on-scroll opacity-0 relative rounded-3xl p-10 transition-all duration-300 ${
                plan.highlighted
                  ? 'bg-gradient-to-br from-primary-600 to-accent-600 text-white shadow-2xl scale-105 hover:scale-110'
                  : 'bg-white/10 backdrop-blur-md border-2 border-white/20 hover:border-primary-400/50 hover:shadow-xl hover:bg-white/20'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-accent-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <h3 className={`text-2xl font-bold mb-2 ${plan.highlighted ? 'text-white' : 'text-white'}`}>
                {plan.name}
              </h3>
              <p className={`mb-8 ${plan.highlighted ? 'text-primary-100' : 'text-neutral-200'}`}>
                {plan.description}
              </p>

              <div className="mb-8">
                <span className={`text-5xl font-bold ${plan.highlighted ? 'text-white' : 'text-white'}`}>
                  {plan.price}
                </span>
              </div>

              <ul className="space-y-4 mb-10">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <svg
                      className={`w-6 h-6 flex-shrink-0 mt-0.5 ${plan.highlighted ? 'text-primary-200' : 'text-primary-400'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className={plan.highlighted ? 'text-primary-100' : 'text-neutral-200'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={onWaitlistClick}
                className={`w-full py-4 px-6 rounded-full font-semibold transition-all transform hover:scale-105 ${
                  plan.highlighted
                    ? 'bg-white text-primary-600 hover:bg-neutral-100 shadow-xl'
                    : 'bg-gradient-to-r from-primary-600 to-accent-600 text-white hover:from-primary-700 hover:to-accent-700 shadow-lg'
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


// About Us Section - Minimal
const AboutUs = () => {
  return (
    <section id="about-us" className="relative py-32 px-6 overflow-hidden">
      {/* Animated Blue-Black Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-900 via-accent-800 to-neutral-900">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary-900/40 via-primary-600/20 to-accent-900/40 animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }}></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '7s', animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '9s', animationDelay: '2s' }}></div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-900/50 to-accent-900/80 backdrop-blur-sm"></div>

      <div className="relative z-10 max-w-4xl mx-auto text-center animate-on-scroll opacity-0">
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 tracking-tight drop-shadow-2xl">
          Built for Growth
        </h2>
        <p className="text-xl text-neutral-200 leading-relaxed mb-8 font-light drop-shadow-lg">
          We're on a mission to empower teams with tools that build lasting customer relationships and drive sustainable growth.
        </p>
        <p className="text-xl text-neutral-200 leading-relaxed font-light drop-shadow-lg">
          Combining powerful features with intuitive design, KabaHub is transforming how thousands of teams manage customer relationships.
        </p>
      </div>
    </section>
  );
};

// Contact Section - Modern Form
const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      // Send email using EmailJS
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'kabahubteam@gmail.com',
        },
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      setSubmitStatus({
        type: 'success',
        message: 'Thank you! We\'ll get back to you soon.',
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Email send failed:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Oops! Something went wrong. Please try again or email us directly at kabahubteam@gmail.com',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden">
      {/* Animated Blue-Black Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-900 via-accent-800 to-neutral-900">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary-900/40 via-primary-600/20 to-accent-900/40 animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }}></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '7s', animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '9s', animationDelay: '2s' }}></div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-900/50 to-accent-900/80 backdrop-blur-sm"></div>

      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="text-center mb-16 animate-on-scroll opacity-0">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight drop-shadow-2xl">
            Get in Touch
          </h2>
          <p className="text-xl text-neutral-200 font-light drop-shadow-lg">
            Have questions? We'd love to hear from you
          </p>
        </div>

        <form onSubmit={handleSubmit} className="animate-on-scroll opacity-0 space-y-6">
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your name"
              className="w-full px-6 py-4 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl focus:border-primary-400 focus:ring-4 focus:ring-primary-500/30 outline-none transition-all text-white placeholder:text-neutral-300"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your.email@example.com"
              className="w-full px-6 py-4 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl focus:border-primary-400 focus:ring-4 focus:ring-primary-500/30 outline-none transition-all text-white placeholder:text-neutral-300"
            />
          </div>
          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="6"
              placeholder="Tell us how we can help..."
              className="w-full px-6 py-4 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl focus:border-primary-400 focus:ring-4 focus:ring-primary-500/30 outline-none transition-all resize-none text-white placeholder:text-neutral-300"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white py-5 px-6 rounded-2xl font-semibold transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>

          {submitStatus.message && (
            <div
              className={`p-4 rounded-xl ${
                submitStatus.type === 'success'
                  ? 'bg-green-500/20 border border-green-500/50 text-green-100'
                  : 'bg-red-500/20 border border-red-500/50 text-red-100'
              }`}
            >
              {submitStatus.message}
            </div>
          )}

          <p className="text-center text-neutral-200 pt-6 drop-shadow-lg">
            Or email us at{' '}
            <a href="mailto:kabahubteam@gmail.com" className="text-primary-400 hover:text-primary-300 font-semibold">
              kabahubteam@gmail.com
            </a>
          </p>
        </form>
      </div>
    </section>
  );
};

// Footer - Slim and Minimal
const Footer = ({ onWaitlistClick }) => {
  return (
    <footer className="relative bg-gradient-to-b from-accent-900 to-neutral-900 text-white py-16 px-6 overflow-hidden">
      {/* Subtle background effects */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Final CTA */}
        <div className="text-center mb-16 pb-16 border-b border-white/10">
          <h3 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight drop-shadow-xl">
            Be among the first 500 users
          </h3>
          <p className="text-xl text-neutral-300 mb-8 font-light drop-shadow-lg">
            Get exclusive early access and special launch pricing
          </p>
          <button
            onClick={onWaitlistClick}
            className="bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white px-10 py-5 rounded-full font-semibold transition-all transform hover:scale-105 shadow-xl">
            Join Waitlist Now →
          </button>
        </div>

        {/* Footer Links */}
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <h4 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
              KabaHub
            </h4>
            <p className="text-neutral-300 font-light leading-relaxed">
              The CRM built for growing teams. Manage clients, track sales, and scale operations seamlessly.
            </p>
          </div>
          <div>
            <h5 className="font-semibold mb-4 text-neutral-200">Product</h5>
            <ul className="space-y-3 text-neutral-400">
              <li><a href="#features" className="hover:text-neutral-200 transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-neutral-200 transition-colors">Pricing</a></li>
              <li><a href="#demo" className="hover:text-neutral-200 transition-colors">Demo</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-4 text-neutral-200">Company</h5>
            <ul className="space-y-3 text-neutral-400">
              <li><a href="#about-us" className="hover:text-neutral-200 transition-colors">About</a></li>
              <li><a href="#contact" className="hover:text-neutral-200 transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-neutral-400 text-sm">© 2025 KabaHub. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-neutral-400 hover:text-primary-400 transition-colors text-2xl">𝕏</a>
            <a href="#" className="text-neutral-400 hover:text-primary-400 transition-colors text-2xl">💼</a>
            <a href="#" className="text-neutral-400 hover:text-primary-400 transition-colors text-2xl">👨‍💻</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
function App() {
  useScrollAnimation();
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  const openWaitlist = () => setIsWaitlistOpen(true);
  const closeWaitlist = () => setIsWaitlistOpen(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent-900 to-neutral-900 antialiased">
      <Navbar onWaitlistClick={openWaitlist} />
      <Hero onWaitlistClick={openWaitlist} />
      <Features />
      <DemoVideo />
      <Pricing onWaitlistClick={openWaitlist} />
      <AboutUs />
      <Contact />
      <Footer onWaitlistClick={openWaitlist} />
      <WaitlistModal isOpen={isWaitlistOpen} onClose={closeWaitlist} />
    </div>
  );
}

export default App;
