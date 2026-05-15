import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Users,
  GraduationCap,
  Sparkles,
  Zap,
  Shield,
  BarChart3,
  Globe,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ChevronRight,
  Building2,
  CheckCircle2,
  Sun,
  Moon,
  CreditCard,
  X
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { cn } from '../lib/utils';
import { useTheme } from '../context/ThemeContext';

// --- Sub-components ---

const Counter = ({ value, label, suffix = "" }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const end = parseInt(value);
    if (start === end) return;
    
    let timer = setInterval(() => {
      start += Math.ceil(end / 50);
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 30);
    
    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{label}</p>
    </div>
  );
};

const SectionHeader = ({ title, subtitle, badge }) => (
  <div className="text-center max-w-3xl mx-auto mb-16">
    {badge && (
      <Badge variant="secondary" className="mb-4 px-4 py-1.5 rounded-full glass-indigo text-indigo-400 border-indigo-500/20">
        {badge}
      </Badge>
    )}
    <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
      {title}
    </h2>
    <p className="text-lg text-muted-foreground leading-relaxed">
      {subtitle}
    </p>
  </div>
);

// --- Main Page ---

export default function Landing() {
  const { isDark, toggleTheme } = useTheme();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [showDemo, setShowDemo] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-indigo-500/30">
      {/* Video Modal */}
      <AnimatePresence>
        {showDemo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 bg-background/80 backdrop-blur-2xl"
            onClick={() => setShowDemo(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setShowDemo(false)}
                className="absolute top-4 right-4 z-[210] w-12 h-12 rounded-full bg-black/40 backdrop-blur-xl flex items-center justify-center text-white hover:bg-rose-500 transition-all hover:rotate-90 shadow-2xl border border-white/10"
              >
                <X className="w-6 h-6" />
              </button>
              
              <video 
                className="w-full h-full object-contain"
                controls 
                autoPlay
                src="/videos/Demo.mp4"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-emerald-500 origin-left z-[100]" style={{ scaleX }} />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl gradient-indigo flex items-center justify-center shadow-lg">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight gradient-text">Kompetenzen</span>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            {['Features', 'Stats', 'Testimonials', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-sm font-medium text-muted-foreground hover:text-indigo-400 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-xl w-10 h-10 border border-border/50"
            >
              <AnimatePresence mode="wait">
                {isDark ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="w-4 h-4 text-amber-400" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="w-4 h-4 text-indigo-400" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
            
            <div className="hidden md:flex items-center gap-2">
              <Link to="/auth/student-login">
                <Button variant="ghost" className="rounded-full px-5 text-emerald-500 hover:text-emerald-400 hover:bg-emerald-500/10">
                  Student Login
                </Button>
              </Link>
              <Link to="/auth/admin-login">
                <Button variant="outline" className="rounded-full px-6 border-indigo-500/20 hover:bg-indigo-500/10 text-indigo-400">
                  Admin Portal
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse delay-700" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/5 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-left md:text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="secondary" className="mb-6 px-4 py-1.5 rounded-full glass-indigo text-indigo-400 border-indigo-500/20">
                <Sparkles className="w-3.5 h-3.5 mr-2" />
                The Future of Institution Management
              </Badge>
              <h1 className="text-5xl md:text-7xl font-extrabold text-foreground mb-8 tracking-tight leading-[1.1]">
                Empower <span className="gradient-text">Students</span> with Next-Gen Technology
              </h1>
              <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto md:mx-auto leading-relaxed">
                Streamline admissions, manage faculty, and track student success with the most advanced management system designed for Kompetenzen Technologies.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/auth/admin-login">
                  <Button size="lg" className="rounded-full px-10 h-14 text-base font-semibold gradient-indigo shadow-xl shadow-indigo-500/25 w-full sm:w-auto">
                    Manage Institution
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/auth/student-login">
                  <Button size="lg" variant="outline" className="rounded-full px-10 h-14 text-base font-semibold border-emerald-500/20 bg-emerald-500/5 text-emerald-500 hover:bg-emerald-500/10 w-full sm:w-auto">
                    Student Access
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
            <Counter value="1500" label="Active Students" suffix="+" />
            <Counter value="20" label="Expert Faculty" />
            <Counter value="98" label="Success Rate" suffix="%" />
            <Counter value="15" label="Industry Awards" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader 
            badge="Powerhouse Features"
            title="Everything you need to scale your institution"
            subtitle="Our comprehensive suite of tools ensures that every aspect of your educational business is optimized for growth and efficiency."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: 'Smart Admissions', 
                desc: 'Automate student enrollments and document processing with ease.', 
                icon: Zap,
                color: 'indigo'
              },
              { 
                title: 'Student Portals', 
                desc: 'Dedicated dashboards for students to track their courses and daily schedules.', 
                icon: GraduationCap,
                color: 'emerald'
              },
              { 
                title: 'Advanced Analytics', 
                desc: 'Real-time revenue reports and student progress dashboards.', 
                icon: BarChart3,
                color: 'violet'
              },
              { 
                title: 'Fee Lifecycle', 
                desc: 'End-to-end tracking of student payments, installments, and pending dues.', 
                icon: CreditCard,
                color: 'rose'
              },
              { 
                title: 'Cloud Access', 
                desc: 'Access your institution data from anywhere in the world.', 
                icon: Globe,
                color: 'amber'
              },
              { 
                title: 'Student Success', 
                desc: 'Track grades, attendance and placement progress in one place.', 
                icon: Users,
                color: 'indigo'
              },
            ].map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-border/50 hover:border-indigo-500/30 transition-all duration-300 group hover-lift bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300",
                      `bg-${feature.color}-500/10`
                    )}>
                      <feature.icon className={cn("w-7 h-7", `text-${feature.color}-400`)} />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section id="testimonials" className="py-32 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader 
            badge="Student Success"
            title="Trusted by thousands of professionals"
            subtitle="See how Kompetenzen Technologies has transformed the careers of our students and the operations of our partner institutions."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "Rahul Krishnan",
                role: "Senior Full Stack Dev @ Google",
                text: "The training and placement support I received was top-notch. The system made it so easy to track my progress and attendance.",
                avatar: "RK",
                gradient: "gradient-indigo"
              },
              {
                name: "Anjali Menon",
                role: "UI/UX Designer @ Adobe",
                text: "Managing my course fees and getting instant receipts was a breeze. The portal is so modern and easy to use.",
                avatar: "AM",
                gradient: "gradient-emerald"
              }
            ].map((testimonial, idx) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, x: idx === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Card className="border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden">
                  <CardContent className="p-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg", testimonial.gradient)}>
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                        <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground italic leading-relaxed">
                      "{testimonial.text}"
                    </p>
                    <div className="mt-6 flex gap-1">
                      {[1,2,3,4,5].map(s => <Sparkles key={s} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Map Section */}
      <section id="contact" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Badge variant="secondary" className="mb-6 px-4 py-1.5 rounded-full glass-indigo text-indigo-400 border-indigo-500/20">
                Contact Us
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8 tracking-tight">
                Get in touch with <br/><span className="gradient-text">Our Experts</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-12">
                Have questions about our programs or want a custom demo for your institution? Our team is here to help you 24/7.
              </p>

              <div className="space-y-6">
                {[
                  { icon: Mail, label: 'Email', value: 'hr@kompetenzen.in', color: 'indigo' },
                  { icon: Phone, label: 'Phone', value: '+91 8921168382', color: 'emerald' },
                  { icon: MapPin, label: 'Location', value: 'Vyttila, Ernakulam, Kerala', color: 'violet' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-4 p-4 rounded-2xl bg-muted/50 border border-border/50">
                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shadow-md", `bg-${item.color}-500/10`)}>
                      <item.icon className={cn("w-5 h-5", `text-${item.color}-400`)} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{item.label}</p>
                      <p className="text-sm font-semibold text-foreground">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden border border-border shadow-2xl h-[500px] bg-muted relative group flex items-center justify-center p-12 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-background to-emerald-500/5" />
                <div className="absolute inset-0 opacity-10 bg-grid" />
                
                {/* Abstract Map Art */}
                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center space-y-6">
                   <div className="w-24 h-24 rounded-full bg-indigo-500/10 flex items-center justify-center relative">
                      <div className="absolute inset-0 rounded-full bg-indigo-500/20 animate-ping" />
                      <MapPin className="w-10 h-10 text-indigo-400 relative z-10" />
                   </div>
                   <div>
                      <h3 className="text-2xl font-bold text-foreground">Visit Our Campus</h3>
                      <p className="text-muted-foreground mt-2 max-w-xs mx-auto italic">"Developing Skills, Building Futures"</p>
                   </div>
                   <div className="p-6 rounded-2xl bg-card/50 border border-border backdrop-blur-xl shadow-xl max-w-sm">
                      <p className="text-sm font-bold text-foreground">Sahodaran Ayyappan Road</p>
                      <p className="text-xs text-muted-foreground mt-1">Vyttila, Ernakulam, Kerala 682019</p>
                      <a 
                        href="https://www.google.com/maps/search/?api=1&query=Kompetenzen+Technologies+Vyttila+Ernakulam+Kerala" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <Button variant="link" className="text-indigo-400 p-0 h-auto mt-4 text-xs font-bold gap-1 uppercase tracking-widest hover:text-indigo-300">
                           Open in Google Maps <ArrowRight className="w-3 h-3" />
                        </Button>
                      </a>
                   </div>
                </div>

                {/* Decorative background elements */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative rounded-[3rem] overflow-hidden gradient-indigo p-12 md:p-20 text-center">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-grid pointer-events-none" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-6xl font-bold text-white mb-8 tracking-tight">
                Ready to revolutionize <br/>your institution?
              </h2>
              <p className="text-white/80 text-lg mb-12 max-w-2xl mx-auto">
                Join 500+ educational institutions that are growing faster with Kompetenzen Technologies IMS.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link to="/auth/admin-login">
                  <button className="px-12 h-16 rounded-full bg-white text-[#4338ca] text-lg font-extrabold shadow-2xl hover:scale-105 active:scale-95 transition-all">
                    Get Started Now
                  </button>
                </Link>
                <button 
                  onClick={() => setShowDemo(true)}
                  className="px-12 h-16 rounded-full border-2 border-white/40 bg-white/10 text-white text-lg font-bold backdrop-blur-md hover:bg-white/20 transition-all hover:scale-105 active:scale-95"
                >
                  Live Demo
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modern Footer */}
      <footer className="py-12 border-t border-border/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg gradient-indigo flex items-center justify-center shadow-md">
                  <Building2 className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-lg tracking-tight gradient-text">Kompetenzen</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Empowering institutions with cutting-edge management tools since 2026.
              </p>
            </div>

            {[
              { title: 'Product', links: ['Features', 'Pricing', 'Demo', 'Docs'], mobileHidden: true },
              { title: 'Company', links: ['About', 'Team', 'Blog', 'Contact'], mobileHidden: false },
              { title: 'Legal', links: ['Privacy', 'Terms', 'Cookies', 'Security'], mobileHidden: false },
            ].map((col) => (
              <div key={col.title} className={cn("col-span-1", col.mobileHidden ? "hidden md:block" : "block")}>
                <h4 className="font-bold text-foreground mb-6 text-sm uppercase tracking-widest">{col.title}</h4>
                <ul className="space-y-4">
                  {col.links.map(link => (
                    <li key={link}>
                      <a href="#" className="text-sm text-muted-foreground hover:text-indigo-400 transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-xs text-muted-foreground">
              © 2026 Kompetenzen Technologies. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {['Twitter', 'LinkedIn', 'Instagram', 'GitHub'].map(s => (
                <a key={s} href="#" className="text-xs font-medium text-muted-foreground hover:text-indigo-400 transition-colors">{s}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
