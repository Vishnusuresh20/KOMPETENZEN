import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings as SettingsIcon, 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Save, 
  Loader2, 
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import api from '../lib/axios';
import { cn } from '../lib/utils';

const COLORS = ['#6366f1', '#10b981', '#8b5cf6', '#f59e0b', '#06b6d4'];

export default function Settings() {
  const [settings, setSettings] = useState({
    institutionName: 'Kompetenzen Technologies',
    email: 'admin@kompetenzen.in',
    phone: '+91 484 000 0000',
    location: 'Vyttila, Ernakulam - 682019',
    address: 'Sreehari Building, Third Floor, Metro Pillar No: 851, Sahodaran Ayyappan Road, Vyttila, Ernakulam-682019, Kerala',
    feeDueDate: '5',
    enableNotifications: 'true',
    enableReminders: 'true'
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await api.get('/settings');
      if (Object.keys(response.data).length > 0) {
        setSettings(prev => ({ ...prev, ...response.data }));
      }
    } catch (err) {
      console.error("Failed to load settings", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await api.post('/settings', settings);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to save settings", err);
      alert("Failed to save settings. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 text-indigo-400 animate-spin" />
        <p className="text-muted-foreground font-medium text-sm">Loading system configuration...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 animate-in pb-10"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight flex items-center gap-3">
            <SettingsIcon className="w-8 h-8 text-indigo-400" />
            System Settings
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">Manage your institutional identity and automated rules</p>
        </div>
        
        <div className="flex items-center gap-3">
          {showSuccess && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-emerald-400 text-sm font-bold bg-emerald-500/10 px-4 py-2 rounded-xl border border-emerald-500/20">
              <CheckCircle2 className="w-4 h-4" />
              Settings Saved Successfully
            </motion.div>
          )}
          <Button 
            disabled={isSaving} 
            onClick={handleSave} 
            className="rounded-xl gradient-indigo text-white gap-2 shadow-lg shadow-indigo-500/20 px-8 h-12"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {isSaving ? 'Saving...' : 'Save All Changes'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Institution Info */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-xl shadow-xl">
            <CardContent className="p-8">
              <h3 className="text-lg font-bold text-foreground mb-8 flex items-center gap-3">
                <Building2 className="w-5 h-5 text-indigo-400" />
                Institution Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1 mb-2 block">Institution Name</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400" />
                    <input
                      value={settings.institutionName}
                      onChange={(e) => handleInputChange('institutionName', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-sm bg-background border border-border outline-none focus:border-indigo-500 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1 mb-2 block">Official Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400" />
                    <input
                      value={settings.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-sm bg-background border border-border outline-none focus:border-indigo-500 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1 mb-2 block">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400" />
                    <input
                      value={settings.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-sm bg-background border border-border outline-none focus:border-indigo-500 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1 mb-2 block">Region/City</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400" />
                    <input
                      value={settings.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-sm bg-background border border-border outline-none focus:border-indigo-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1 mb-2 block">Full Postal Address</label>
                <textarea
                  value={settings.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl text-sm bg-background border border-border outline-none focus:border-indigo-500 transition-all resize-none"
                />
              </div>
            </CardContent>
          </Card>

          {/* Financial Rules */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-xl shadow-xl">
            <CardContent className="p-8">
              <h3 className="text-lg font-bold text-foreground mb-8 flex items-center gap-3">
                <Calendar className="w-5 h-5 text-emerald-400" />
                Financial Rules & Automation
              </h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-6 rounded-2xl bg-muted/30 border border-border">
                  <div className="max-w-md">
                    <p className="text-sm font-bold text-foreground">Monthly Fee Due Date</p>
                    <p className="text-xs text-muted-foreground mt-1">Set the fixed day of the month when student fees become due.</p>
                  </div>
                  <div className="flex items-center gap-3 bg-background border border-border rounded-xl p-2">
                    <span className="text-xs font-bold text-muted-foreground uppercase ml-2">Day:</span>
                    <input 
                      type="number" 
                      min="1" max="31"
                      value={settings.feeDueDate}
                      onChange={(e) => handleInputChange('feeDueDate', e.target.value)}
                      className="w-16 h-10 text-center font-bold text-lg bg-indigo-500/10 text-indigo-400 rounded-lg outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10">
                      <div className="flex items-center gap-3 mb-2">
                        <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                        <span className="text-xs font-bold text-indigo-400 uppercase">Auto-Reminders</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">Students will receive automatic reminders 2 days before the due date.</p>
                   </div>
                   <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                      <div className="flex items-center gap-3 mb-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-bold text-emerald-400 uppercase">GST Invoicing</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">Automatically calculate and append tax information to all new invoices.</p>
                   </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
           {/* Account Status */}
           <Card className="border-border/50 bg-card/50 backdrop-blur-xl shadow-xl overflow-hidden group">
             <div className="h-2 w-full gradient-indigo" />
             <CardContent className="p-8 text-center">
                <div className="w-20 h-20 rounded-3xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto mb-4 border border-indigo-500/20 group-hover:scale-110 transition-transform duration-500">
                  <SettingsIcon className="w-10 h-10" />
                </div>
                <h4 className="text-lg font-bold text-foreground">Admin Portal</h4>
                <p className="text-xs text-muted-foreground mt-1">v2.4.0 (Enterprise)</p>
                <div className="mt-6 pt-6 border-t border-border">
                   <Badge variant="success" className="rounded-full">System Healthy</Badge>
                </div>
             </CardContent>
           </Card>

           {/* Quick Support */}
           <Card className="border-emerald-500/20 bg-emerald-500/5 backdrop-blur-xl shadow-xl">
             <CardContent className="p-8">
                <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-4">Technical Support</h4>
                <p className="text-xs text-foreground/80 leading-relaxed">Need help with custom reports or multi-branch setup?</p>
                <Button variant="outline" className="w-full mt-6 rounded-xl border-emerald-500/30 hover:bg-emerald-500/20 text-emerald-400 gap-2">
                   <Mail className="w-4 h-4" /> Contact Support
                </Button>
             </CardContent>
           </Card>
        </div>
      </div>
    </motion.div>
  );
}
