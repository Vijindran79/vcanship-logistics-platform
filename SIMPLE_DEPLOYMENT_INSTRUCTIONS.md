# 🚀 Simple VCanship Deployment to Oracle Cloud VPS

## Quick Deployment (5 Minutes)

### Step 1: Download Your Website Files
Download this entire folder: `/home/ubuntu/vcanship-platform/dist/`

**Files you need:**
- `index.html` (main website file)
- `assets/` folder (contains CSS and JavaScript)
- `sitemap.xml` (for SEO)
- `robots.txt` (for search engines)

### Step 2: Upload to Your Oracle VPS
Use any FTP client or command line:

**Option A: Using SCP (Command Line)**
```bash
scp -r dist/* ubuntu@84.8.150.247:/var/www/vcanresources/
```

**Option B: Using FileZilla (GUI)**
1. Host: `84.8.150.247`
2. Username: `ubuntu`
3. Port: `22`
4. Protocol: `SFTP`
5. Upload all files from `dist/` folder to `/var/www/vcanresources/`

**Option C: Using WinSCP (Windows)**
1. New Session → SFTP
2. Host: `84.8.150.247`
3. Username: `ubuntu`
4. Upload `dist/` contents to `/var/www/vcanresources/`

### Step 3: Set Up Nginx (On Your Oracle VPS)
SSH into your Oracle VPS and run:

```bash
# Install nginx
sudo apt update
sudo apt install nginx -y

# Create nginx configuration
sudo nano /etc/nginx/sites-available/vcanresources
```

Copy this configuration:
```nginx
server {
    listen 80;
    server_name vcanresources.com www.vcanresources.com;
    root /var/www/vcanresources;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/vcanresources /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Step 4: Configure DNS in IONOS
In your IONOS control panel, set:

```
Type: A
Name: @
Value: 84.8.150.247

Type: A  
Name: www
Value: 84.8.150.247
```

### Step 5: Add SSL Certificate
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d vcanresources.com -d www.vcanresources.com
```

## ✅ That's It!

Your website will be live at:
- http://www.vcanresources.com (HTTP)
- https://www.vcanresources.com (HTTPS after SSL)

## 🎯 What You Get

✅ **208+ Countries** with flags and currencies
✅ **132+ Languages** with automatic switching  
✅ **Dark/Light Mode** toggle
✅ **Mobile Responsive** design
✅ **SEO Optimized** with structured data
✅ **Professional Design** ready for customers

## 🆘 Need Help?

If you get stuck:
1. Check nginx is running: `sudo systemctl status nginx`
2. Check files are uploaded: `ls -la /var/www/vcanresources/`
3. Check DNS propagation: `nslookup www.vcanresources.com`

Your VCanship platform is ready to compete with major logistics companies worldwide! 🌍
