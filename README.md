# Deploying React + Vite Website on GitHub Pages

To deploy your React application created with Vite on GitHub Pages, follow these steps:

## 1. Update `package.json`
   
Add the following line to your `package.json` file:
   ```json
   "homepage": "https://<GitHub username>.github.io/<repository name>"
   ```

Also, add the following scripts:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist",
   ```

## 2. Update `vite.config.js`
   
Add the `base` property inside the default export in your `vite.config.js` file:
   ```javascript
   export default {
     base: "./<repository name>/",
   };
   ```

## 3. Install `gh-pages` Package
   
Run the following command in your terminal to install `gh-pages` as a dev dependency:
   ```bash
   npm install --save-dev gh-pages
   ```

## 4. Build the App
   
Run the following command to build the app and generate the `dist` folder:
   ```bash
   npm run build
   ```

## 5. Deploy the App
   
Run the following command in your terminal:
   ```bash
   npm run deploy
   ```

## 6. Push Code to the Main Branch
   
Commit and push all your changes to the main branch of your GitHub repository.


## 7. Configure GitHub Pages
   
Go to your repository settings on GitHub:
   - Navigate to the `Settings` tab.
   - Under the `Pages` section, set the branch to `gh-pages`.


## 8. Wait and Verify
   
Wait for 3-5 minutes, then refresh the `Pages` section in your repository settings. At the top, you should see the URL of your live website.

Your website is now live on GitHub Pages! 🚀

