const fs = require('fs');
const glob = require('glob');
const path = require('path');

const files = fs.readdirSync('src/components').filter(f => f.endsWith('.tsx'));
for (const file of files) {
  const filePath = path.join('src/components', file);
  let content = fs.readFileSync(filePath, 'utf-8');
  // Add glassmorphism to main containers
  content = content.replace(/bg-surface border border-border/g, 'bg-surface/70 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.04)]');
  // Also add it to TopBar/Sidebar if they aren't using it yet
  fs.writeFileSync(filePath, content);
}

// Update dashboard features as well
const dashPath = 'src/features/dashboard/Dashboard.tsx';
if(fs.existsSync(dashPath)) {
  let dashContent = fs.readFileSync(dashPath, 'utf-8');
  dashContent = dashContent.replace(/bg-surface border border-border/g, 'bg-surface/70 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.04)]');
  fs.writeFileSync(dashPath, dashContent);
}

console.log("Glassmorphism added!");
