import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  KeyRound, 
  ArrowLeft
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';

export default function ForgotPassword() {
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
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Access Portal</h1>
          <p className="text-muted-foreground text-sm">Please return to the login page to enter your credentials</p>
        </div>

        <Card className="border-border/50 bg-card/50 backdrop-blur-xl shadow-2xl overflow-hidden">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Automated password recovery is not available. Please contact the management team if you are unable to access your account.
              </p>
              
              <Button
                asChild
                className="w-full h-12 rounded-xl font-bold gradient-indigo shadow-lg shadow-indigo-500/25"
              >
                <Link to="/auth/admin-login">
                  Return to Login
                </Link>
              </Button>
            </div>
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
