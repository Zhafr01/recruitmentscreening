import React from 'react';
import { slaMetrics } from '../data';
import { motion } from 'framer-motion';
import { BarChart2, TrendingUp, AlertTriangle, ArrowUpRight, ArrowDownRight, Clock, Target } from 'lucide-react';

export default function SLAReports() {
  return (
    <div className="flex flex-col gap-6 h-full max-w-[1400px] mx-auto animate-fade-in overflow-y-auto pb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">SLA Reports & Analytics</h1>
          <p className="text-text-muted text-sm mt-1">Platform-wide compliance, cycle times, and operational metrics.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-surface text-text-ink border border-border hover:bg-surface-raised px-4 py-2 text-sm font-medium rounded-md shadow-sm transition-colors">
            Last 30 Days
          </button>
          <button className="bg-accent text-white hover:bg-accent/90 px-4 py-2 text-sm font-medium rounded-md shadow-sm transition-colors flex items-center gap-2">
            <BarChart2 size={16} /> Export PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Personal Compliance', value: `${slaMetrics.personalCompliance}%`, trend: '+2.1%', up: true, icon: Target, color: 'text-success' },
          { label: 'Team Compliance', value: `${slaMetrics.teamCompliance}%`, trend: '-0.5%', up: false, icon: Target, color: 'text-warning' },
          { label: 'Avg Cycle Time', value: slaMetrics.avgCycleTime, trend: '-1.2h', up: true, icon: Clock, color: 'text-info' },
          { label: 'Bottleneck Dept', value: slaMetrics.bottleneckDept, sub: `Avg: ${slaMetrics.bottleneckAvg}`, icon: AlertTriangle, color: 'text-breach' },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="bg-surface border border-border rounded-xl p-5 shadow-sm"
          >
            <div className="flex items-start justify-between mb-2">
              <span className="text-sm font-medium text-text-muted">{stat.label}</span>
              <div className={`p-1.5 rounded-lg bg-surface-overlay border border-border ${stat.color}`}>
                <stat.icon size={16} />
              </div>
            </div>
            <div className="text-2xl font-semibold text-text-ink mb-1">{stat.value}</div>
            {stat.trend && (
              <div className={`text-xs font-medium flex items-center gap-1 ${stat.up ? 'text-success' : 'text-breach'}`}>
                {stat.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {stat.trend} vs last month
              </div>
            )}
            {stat.sub && (
              <div className="text-xs text-text-muted mt-1">{stat.sub}</div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-surface border border-border rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-text-ink">Department Performance</h3>
            <button className="text-sm text-accent hover:underline font-medium">View All</button>
          </div>
          <div className="space-y-5">
            {slaMetrics.byDepartment.map(dept => (
              <div key={dept.dept}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium text-text-ink">{dept.dept}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-text-muted text-xs">Avg: {dept.avg}</span>
                    <span className="font-semibold w-10 text-right">{dept.compliance}%</span>
                  </div>
                </div>
                <div className="h-2 bg-surface-overlay border border-border rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${dept.compliance >= 90 ? 'bg-success' : dept.compliance >= 80 ? 'bg-warning' : 'bg-breach'}`}
                    style={{ width: `${dept.compliance}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="bg-surface border border-border rounded-xl p-6 shadow-sm flex flex-col"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-text-ink">Monthly Trend (Last 12 Months)</h3>
            <span className="text-xs font-medium text-success bg-success-surface border border-success/20 px-2 py-1 rounded flex items-center gap-1">
              <TrendingUp size={12} /> Target: 90%
            </span>
          </div>
          <div className="flex-1 flex items-end justify-between gap-2 pt-4 relative">
            <div className="absolute top-1/2 left-0 right-0 border-t border-dashed border-success/30 -translate-y-1/2 z-0"></div>
            {slaMetrics.monthlyTrend.map((val, i) => (
              <div key={i} className="w-full relative z-10 flex flex-col items-center justify-end h-full group">
                <div className="absolute -top-8 bg-accent text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {val}%
                </div>
                <div 
                  className={`w-full rounded-t-sm transition-colors ${val >= 90 ? 'bg-accent/80 group-hover:bg-accent' : val >= 85 ? 'bg-warning/80 group-hover:bg-warning' : 'bg-breach/80 group-hover:bg-breach'}`} 
                  style={{ height: `${val}%` }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-3 text-[10px] text-text-faint font-medium">
            <span>Oct</span>
            <span>Dec</span>
            <span>Feb</span>
            <span>Apr</span>
            <span>Jun</span>
            <span>Aug</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
