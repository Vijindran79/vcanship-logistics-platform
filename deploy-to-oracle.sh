#!/bin/bash

# VCanship Deployment Script for Oracle Cloud VPS
# Simple one-command deployment to www.vcanresources.com

echo "🚀 VCanship Deployment to Oracle Cloud VPS"
echo "=========================================="

# Configuration
ORACLE_IP="84.8.150.247"
ORACLE_USER="ubuntu"
LOCAL_FILES="/home/ubuntu/vcanship-platform/dist/*"
REMOTE_PATH="/var/www/vcanresources"

echo "📦 Deploying to: $ORACLE_USER@$ORACLE_IP:$REMOTE_PATH"
echo "📁 Source files: $LOCAL_FILES"
echo ""

# Step 1: Create remote directory
echo "1️⃣ Creating remote directory..."
ssh -o StrictHostKeyChecking=no $ORACLE_USER@$ORACLE_IP "sudo mkdir -p $REMOTE_PATH && sudo chown -R $ORACLE_USER:$ORACLE_USER $REMOTE_PATH"

# Step 2: Copy files
echo "2️⃣ Copying website files..."
scp -o StrictHostKeyChecking=no -r $LOCAL_FILES $ORACLE_USER@$ORACLE_IP:$REMOTE_PATH/

# Step 3: Set permissions
echo "3️⃣ Setting proper permissions..."
ssh -o StrictHostKeyChecking=no $ORACLE_USER@$ORACLE_IP "sudo chown -R www-data:www-data $REMOTE_PATH && sudo chmod -R 755 $REMOTE_PATH"

# Step 4: Test deployment
echo "4️⃣ Testing deployment..."
ssh -o StrictHostKeyChecking=no $ORACLE_USER@$ORACLE_IP "ls -la $REMOTE_PATH"

echo ""
echo "✅ Deployment completed!"
echo "🌐 Your website should be live at: https://www.vcanresources.com"
echo ""
echo "Next steps:"
echo "- Configure nginx (see IONOS_DEPLOYMENT_GUIDE.md)"
echo "- Set up SSL certificate"
echo "- Configure DNS in IONOS"
