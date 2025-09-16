# VCanship Platform - IONOS Deployment Guide
## Domain: www.vcanresources.com

## Overview
This guide provides specific instructions for deploying your enhanced VCanship platform to your Oracle Cloud VPS with IONOS domain management for www.vcanresources.com.

## Pre-Deployment Checklist
- ✅ Oracle Cloud VPS is running and accessible
- ✅ Domain www.vcanresources.com is registered with IONOS
- ✅ SSH access to your Oracle Cloud VPS
- ✅ Production build is ready in `/dist` folder

## Step 1: Oracle Cloud VPS Setup

### 1.1 Connect to Your VPS
```bash
ssh opc@your-oracle-vps-ip
# or
ssh ubuntu@your-oracle-vps-ip
```

### 1.2 Update System and Install Dependencies
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18+ (if not already installed)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install nginx
sudo apt install nginx -y

# Install certbot for SSL
sudo apt install certbot python3-certbot-nginx -y

# Create web directory
sudo mkdir -p /var/www/vcanresources
sudo chown -R $USER:$USER /var/www/vcanresources
```

## Step 2: Deploy Application Files

### 2.1 Upload Production Build
```bash
# From your local machine, upload the dist folder contents
scp -r /home/ubuntu/vcanship-platform/dist/* username@your-oracle-vps-ip:/var/www/vcanresources/

# Or if building on server:
# Upload source code and build
scp -r /home/ubuntu/vcanship-platform/ username@your-oracle-vps-ip:~/
ssh username@your-oracle-vps-ip
cd vcanship-platform
npm install -g pnpm
pnpm install
pnpm run build
sudo cp -r dist/* /var/www/vcanresources/
```

### 2.2 Set Proper Permissions
```bash
sudo chown -R www-data:www-data /var/www/vcanresources
sudo chmod -R 755 /var/www/vcanresources
```

## Step 3: Configure Nginx for www.vcanresources.com

### 3.1 Create Nginx Configuration
```bash
sudo nano /etc/nginx/sites-available/vcanresources
```

Add the following configuration:
```nginx
server {
    listen 80;
    server_name vcanresources.com www.vcanresources.com;
    root /var/www/vcanresources;
    index index.html;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # Enable gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/javascript
        application/xml+rss
        application/json;

    # Handle React Router (SPA routing)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Cache HTML files for shorter time
    location ~* \.html$ {
        expires 1h;
        add_header Cache-Control "public";
    }

    # Security: Hide nginx version
    server_tokens off;

    # Prevent access to hidden files
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }
}
```

### 3.2 Enable the Site
```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/vcanresources /etc/nginx/sites-enabled/

# Remove default site if exists
sudo rm -f /etc/nginx/sites-enabled/default

# Test nginx configuration
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
sudo systemctl enable nginx
```

## Step 4: IONOS DNS Configuration

### 4.1 Configure DNS Records in IONOS
Log into your IONOS control panel and set up the following DNS records:

```
Type    Name    Value                           TTL
A       @       your-oracle-vps-ip-address      3600
A       www     your-oracle-vps-ip-address      3600
CNAME   *       vcanresources.com               3600
```

### 4.2 Verify DNS Propagation
```bash
# Check if DNS is pointing to your server
nslookup www.vcanresources.com
dig www.vcanresources.com

# Test HTTP access
curl -I http://www.vcanresources.com
```

## Step 5: SSL Certificate Setup

### 5.1 Install SSL Certificate with Let's Encrypt
```bash
# Get SSL certificate for both domain variants
sudo certbot --nginx -d vcanresources.com -d www.vcanresources.com

# Follow the prompts:
# - Enter email address
# - Agree to terms
# - Choose to redirect HTTP to HTTPS (recommended)
```

### 5.2 Verify SSL Installation
```bash
# Test HTTPS access
curl -I https://www.vcanresources.com

# Check certificate details
openssl s_client -connect www.vcanresources.com:443 -servername www.vcanresources.com
```

### 5.3 Set Up Auto-Renewal
```bash
# Test auto-renewal
sudo certbot renew --dry-run

# Add to crontab for automatic renewal
sudo crontab -e
# Add this line:
0 12 * * * /usr/bin/certbot renew --quiet
```

## Step 6: Oracle Cloud Security Configuration

### 6.1 Configure Security Lists
In Oracle Cloud Console:
1. Go to Networking → Virtual Cloud Networks
2. Select your VCN → Security Lists
3. Add ingress rules:
   - Source: 0.0.0.0/0, Protocol: TCP, Port: 80
   - Source: 0.0.0.0/0, Protocol: TCP, Port: 443
   - Source: 0.0.0.0/0, Protocol: TCP, Port: 22 (SSH)

### 6.2 Configure Firewall (if applicable)
```bash
# If using ufw firewall
sudo ufw allow 'Nginx Full'
sudo ufw allow ssh
sudo ufw enable
```

## Step 7: Performance Optimization

### 7.1 Enable HTTP/2
Add to your nginx configuration:
```nginx
listen 443 ssl http2;
```

### 7.2 Set Up Log Rotation
```bash
sudo nano /etc/logrotate.d/nginx
```

### 7.3 Monitor Performance
```bash
# Install monitoring tools
sudo apt install htop iotop nethogs

# Monitor nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

## Step 8: Final Testing

### 8.1 Test All Functionality
1. Visit https://www.vcanresources.com
2. Test country/language switching
3. Test dark mode toggle
4. Test responsive design on mobile
5. Test all service cards and buttons
6. Verify SSL certificate is working

### 8.2 Performance Testing
```bash
# Test page load speed
curl -w "@curl-format.txt" -o /dev/null -s https://www.vcanresources.com

# Create curl-format.txt:
echo "     time_namelookup:  %{time_namelookup}\n
        time_connect:  %{time_connect}\n
     time_appconnect:  %{time_appconnect}\n
    time_pretransfer:  %{time_pretransfer}\n
       time_redirect:  %{time_redirect}\n
  time_starttransfer:  %{time_starttransfer}\n
                     ----------\n
          time_total:  %{time_total}\n" > curl-format.txt
```

## Step 9: Backup and Maintenance

### 9.1 Set Up Automated Backups
```bash
# Create backup script
sudo nano /usr/local/bin/backup-vcanresources.sh

#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
tar -czf /backup/vcanresources_$DATE.tar.gz /var/www/vcanresources
find /backup -name "vcanresources_*.tar.gz" -mtime +7 -delete

# Make executable
sudo chmod +x /usr/local/bin/backup-vcanresources.sh

# Add to crontab
sudo crontab -e
# Add: 0 2 * * * /usr/local/bin/backup-vcanresources.sh
```

### 9.2 Update Procedures
```bash
# To update the application:
# 1. Build new version
# 2. Backup current version
# 3. Deploy new files
# 4. Test functionality
```

## Troubleshooting

### Common Issues and Solutions

1. **502 Bad Gateway**: Check nginx configuration and restart nginx
2. **SSL Certificate Issues**: Verify DNS propagation and re-run certbot
3. **404 Errors**: Ensure React Router configuration is correct
4. **Slow Loading**: Check gzip compression and caching headers

### Log Locations
- Nginx access logs: `/var/log/nginx/access.log`
- Nginx error logs: `/var/log/nginx/error.log`
- Certbot logs: `/var/log/letsencrypt/letsencrypt.log`

## Support Contacts
- IONOS Support: For domain and DNS issues
- Oracle Cloud Support: For VPS infrastructure issues
- Application Issues: Check browser console and nginx logs

## Success Checklist
- [ ] VPS is accessible and updated
- [ ] Application files deployed to `/var/www/vcanresources`
- [ ] Nginx configured and running
- [ ] DNS records pointing to VPS IP
- [ ] SSL certificate installed and working
- [ ] All functionality tested
- [ ] Backups configured
- [ ] Monitoring set up

Your VCanship platform is now live at https://www.vcanresources.com! 🚀

