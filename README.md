
# 🚀 React + Vite + TypeScript Project

Welcome to the **React + Vite + TypeScript** project! This guide will help you  deploy your project on **GitHub Pages** using `gh-pages`.  

## 🌐 GitHub Pages Deployment
### 5️⃣ Add GitHub Pages Configuration
In `vite.config.ts`, add the following:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/REPOSITORY_NAME/', // 👈 Add this line
})
```

---

### 6️⃣ Build the Project
Generate the production build:

```bash
npm run build
```

---

### 7️⃣ Deploy to GitHub Pages
1. Install `gh-pages`:

```bash
npm install gh-pages --save-dev
```

2. Add these scripts to **`package.json`**:

```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

3. Deploy:

```bash
npm run deploy
```

---

### 8️⃣ GitHub Pages Settings
1. Go to **Settings → Pages**  
2. Set branch to **`gh-pages`** and directory to **`/ (root)`**  
3. Save changes  

---

## 🎯 Access the Site
🌍 Your project will be live at:  
➡️ **https://USERNAME.github.io/REPOSITORY_NAME/**  

---

## 💡 Update and Redeploy
To update and redeploy after making changes:

```bash
git add .
git commit -m "Updated changes"
git push origin main
npm run deploy
```

---

## 🛠️ Tech Stack
- ⚛️ **React** – Frontend framework  
- 🚀 **Vite** – Build tool  
- 🏆 **TypeScript** – Type safety  
- 🌍 **GitHub Pages** – Hosting  

---

## 🤝 Contributing
Feel free to submit pull requests or raise issues! 😊  

---

## ⭐ Show Your Support
If you found this helpful, please ⭐ the repository!  
