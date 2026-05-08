import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  KeyRound, 
  Mail, 
  ArrowLeft, 
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { useTheme } from '../../context/ThemeContext';

export default function ForgotPassword() {
  const { isDark } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call for password reset
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (email.includes('@')) {
        setIsSent(true);
      } else {
        setError('Please enter a valid institutional email address.');
      }
    } catch (err) {
      setError('Could not process request. Please contact the technical department.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-grid opacity-20 pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 shadow-xl mb-6">
            <KeyRound className="w-8 h-8 text-indigo-400" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Recover Password</h1>
          <p className="text-muted-foreground text-sm">We'll send you a secure link to reset your access</p>
        </div>

        <Card className="border-border/50 bg-card/50 backdrop-blur-xl shadow-2xl overflow-hidden">
          <CardContent className="p-8">
            <AnimatePresence mode="wait">
              {!isSent ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {error && (
                    <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                      <p className="text-xs font-medium text-rose-500 leading-relaxed">{error}</p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Email Address</label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-indigo-400 transition-colors">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all placeholder:text-muted-foreground/50"
                        placeholder="admin@kompetenzen.in"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 rounded-xl font-bold gradient-indigo shadow-lg shadow-indigo-500/25"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <span>Send Recovery Link</span>
                        <Send className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Reset Link Sent</h3>
                  <p className="text-sm text-muted-foreground mb-8">
                    We've sent a password reset link to <br/>
                    <span className="font-bold text-foreground">{email}</span>
                  </p>
                  <Button
                    onClick={() => setIsSent(false)}
                    variant="outline"
                    className="w-full rounded-xl"
                  >
                    Try another email
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
          <div className="px-8 py-4 bg-muted/30 border-t border-border/50 text-center">
            <Link to="/auth/admin-login" className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-indigo-400 transition-colors">
              <ArrowLeft className="w-3 h-3" />
              Back to Login
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
