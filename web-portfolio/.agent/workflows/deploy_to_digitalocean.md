---
description: Deploy the portfolio website to DigitalOcean
---

# Deploying to DigitalOcean

This guide covers two methods to deploy your portfolio:
1.  **App Platform (Recommended)**: Easiest, automated deployments from GitHub, free tier available for static sites.
2.  **Droplet (Virtual Machine)**: Full control, requires manual server configuration (Nginx).

## Prerequisites

-   A [DigitalOcean Account](https://www.digitalocean.com/)
-   A [GitHub Account](https://github.com/)

## Method 1: App Platform (Static Site)

This is the best option for a Vite/React application.

### Step 1: Push your code to GitHub

Since your project is not yet a git repository, you need to initialize it and push it to GitHub.

1.  Create a new **empty** repository on GitHub (do not add README or .gitignore yet).
2.  Initialize git locally and push:

```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Rename branch to main
git branch -M main

# Add remote (replace <YOUR_REPO_URL> with the URL from step 1)
git remote add origin <YOUR_REPO_URL>

# Push
git push -u origin main
```

### Step 2: Create App in DigitalOcean

1.  Log in to DigitalOcean Control Panel.
2.  Click **Create** -> **Apps**.
3.  Choose **GitHub** as your source.
4.  Authorize DigitalOcean to access your GitHub account if prompted.
5.  Select the repository you just created (`web-portfolio`).
6.  Click **Next**.

### Step 3: Configure App

DigitalOcean should auto-detect that this is a static site.

-   **Resources**:
    -   It should detect a **Static Site**.
    -   **Source Directory**: `/` (default is usually fine).
    -   **Build Command**: `npm run build`
    -   **Output Directory**: `dist`
-   **Environment Variables**: You likely don't need any for this static portfolio unless you added custom ones.

Click **Next**.

### Step 4: Review and Deploy

1.  Select a plan. The **Starter** plan is often **free** for static sites (up to 3 sites).
2.  Click **Create Resources**.

DigitalOcean will now build and deploy your site. Once finished, you will get a live URL (e.g., `sea-lion-app-xxxxx.ondigitalocean.app`).

### Step 5: Custom Domain (Optional)

1.  Go to your App settings.
2.  Click **Settings** -> **Domains**.
3.  Add your domain (e.g., `silashowe.com`).
4.  Follow the instructions to update your DNS records (CNAME).

---

## Method 2: Droplet (Nginx)

Use this if you want full control over a Linux server.

1.  **Create a Droplet**:
    -   Choose an image (e.g., Ubuntu 22.04).
    -   Choose a plan (Basic, $4/mo or $6/mo is sufficient).
2.  **SSH into Droplet**: `ssh root@<DROPLET_IP>`
3.  **Install Nginx**:
    ```bash
    apt update
    apt install nginx -y
    ```
4.  **Build Locally & Transfer**:
    -   Run `npm run build` on your machine.
    -   Copy the `dist` folder to the droplet:
        ```bash
        scp -r dist/* root@<DROPLET_IP>:/var/www/html/
        ```
5.  **Configure Nginx**:
    -   Ensure Nginx is serving `/var/www/html`.
    -   Set up SSL with Certbot (LetsEncrypt) for HTTPS.

*Note: Method 1 is significantly easier for maintenance.*
