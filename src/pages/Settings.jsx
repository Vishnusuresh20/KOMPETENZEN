import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Building2, MapPin, Phone, Mail, Save } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

export default function Settings() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold text-[rgb(var(--foreground))] flex items-center gap-2">
          <SettingsIcon className="w-6 h-6 text-indigo-400" />
          Settings
        </h1>
        <p className="text-sm text-[rgb(var(--muted-foreground))] mt-0.5">Institution configuration and preferences</p>
      </div>

      {/* Institution Info */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-base font-bold text-[rgb(var(--foreground))] mb-5 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-indigo-400" />
            Institution Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'Institution Name', value: 'Kompetenzen Technologies', icon: Building2 },
              { label: 'Email', value: 'admin@kompetenzen.in', icon: Mail },
              { label: 'Phone', value: '+91 484 000 0000', icon: Phone },
              { label: 'Location', value: 'Vyttila, Ernakulam - 682019', icon: MapPin },
            ].map((field) => (
              <div key={field.label}>
                <label className="text-xs font-semibold text-[rgb(var(--muted-foreground))] uppercase tracking-wider mb-1.5 block">
                  {field.label}
                </label>
                <div className="relative">
                  <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400" />
                  <input
                    defaultValue={field.value}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm bg-[rgb(var(--muted))] border border-[rgb(var(--border))] text-[rgb(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/40 transition-all duration-200"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <label className="text-xs font-semibold text-[rgb(var(--muted-foreground))] uppercase tracking-wider mb-1.5 block">
              Full Address
            </label>
            <textarea
              defaultValue="Sreehari Building, Third Floor, Metro Pillar No: 851, Sahodaran Ayyappan Road, Vyttila, Ernakulam-682019, Kerala"
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl text-sm bg-[rgb(var(--muted))] border border-[rgb(var(--border))] text-[rgb(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/40 transition-all duration-200 resize-none"
            />
          </div>

          <div className="mt-5 flex justify-end">
            <Button className="gap-2 px-8 shadow-indigo-500/25">
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-base font-bold text-[rgb(var(--foreground))] mb-5">System Preferences</h3>
          <div className="space-y-4">
            {[
              { label: 'Email Notifications', desc: 'Receive email alerts for new enrollments and fee payments', on: true },
              { label: 'Auto Fee Reminders', desc: 'Send automated reminders 3 days before fee due date', on: true },
              { label: 'Monthly Reports', desc: 'Auto-generate and email monthly revenue reports', on: false },
            ].map((pref) => (
              <div key={pref.label} className="flex items-start justify-between gap-4 p-4 rounded-xl bg-[rgb(var(--muted))]/50 border border-[rgb(var(--border))]">
                <div>
                  <p className="text-sm font-semibold text-[rgb(var(--foreground))]">{pref.label}</p>
                  <p className="text-xs text-[rgb(var(--muted-foreground))] mt-0.5">{pref.desc}</p>
                </div>
                <div
                  className={`w-10 h-5 rounded-full flex-shrink-0 flex items-center px-0.5 cursor-pointer transition-colors duration-200 ${pref.on ? 'bg-indigo-500' : 'bg-[rgb(var(--border))]'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${pref.on ? 'translate-x-5' : 'translate-x-0'}`} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
