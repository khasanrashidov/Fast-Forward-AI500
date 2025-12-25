# Fast Forward - Production Deployment Guide 🚀

This guide walks you through deploying the Fast Forward API on a Linux server (Ubuntu/Debian) using Gunicorn + Nginx.

---

## Prerequisites

- Ubuntu 20.04+ or Debian 11+ server
- Python 3.10+
- PostgreSQL database (if using)
- Root/sudo access

---

## Step 1: Install System Dependencies

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y python3 python3-pip python3-venv nginx git
```

---

## Step 2: Clone and Setup the Project

```bash
# Navigate to home directory
cd /home/khusanrashidov

# Clone the repository (adjust URL as needed)
git clone <your-repo-url> Fast-Forward
cd Fast-Forward

# Create virtual environment
python3 -m venv .venv

# Activate virtual environment
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

---

## Step 3: Configure Environment Variables

Create a `.env` file in the project root:

```bash
nano /home/khusanrashidov/Fast-Forward/.env
```

Add your environment variables:

```env
FLASK_APP=app.py
FLASK_ENV=production
DATABASE_URL=postgresql://user:password@localhost:5432/fastforward
OPENAI_API_KEY=your-api-key-here
# Add other required env variables
```

---

## Step 4: Run Database Migrations

```bash
cd /home/khusanrashidov/Fast-Forward/src
source ../.venv/bin/activate
flask db upgrade
```

---

## Step 5: Setup Gunicorn as a Systemd Service

### Create log directory

```bash
sudo mkdir -p /var/log/gunicorn
sudo chown khusanrashidov:www-data /var/log/gunicorn
```

### Copy the service file

```bash
sudo cp /home/khusanrashidov/Fast-Forward/deploy/fastforward.service /etc/systemd/system/
```

### Edit the service file if needed

```bash
sudo nano /etc/systemd/system/fastforward.service
```

**Important:** Update these values in the service file:

- `User=khusanrashidov` → your actual username
- `WorkingDirectory` → your actual project path
- `Environment="PATH=..."` → path to your .venv/bin

### Enable and start the service

```bash
sudo systemctl daemon-reload
sudo systemctl enable fastforward
sudo systemctl start fastforward
```

### Check status

```bash
sudo systemctl status fastforward
```

### View logs

```bash
sudo journalctl -u fastforward -f
# Or check Gunicorn logs
tail -f /var/log/gunicorn/error.log
```

---

## Step 6: Configure Nginx

### Copy the Nginx config

```bash
sudo cp /home/khusanrashidov/Fast-Forward/deploy/nginx-fastforward.conf /etc/nginx/sites-available/fastforward
```

### Edit if needed (set your domain/IP)

```bash
sudo nano /etc/nginx/sites-available/fastforward
```

Replace `server_name _;` with your domain or IP:

```nginx
server_name yourdomain.com;
# or
server_name 123.456.789.0;
```

### Enable the site

```bash
sudo ln -s /etc/nginx/sites-available/fastforward /etc/nginx/sites-enabled/
```

### Remove default site (optional)

```bash
sudo rm /etc/nginx/sites-enabled/default
```

### Test and restart Nginx

```bash
sudo nginx -t
sudo systemctl restart nginx
```

---

## Step 7: Configure Firewall

```bash
# Allow HTTP and HTTPS
sudo ufw allow 'Nginx Full'
sudo ufw enable
sudo ufw status
```

---

## Step 8: Verify Deployment

Test your API:

```bash
curl http://YOUR_SERVER_IP/
curl http://YOUR_SERVER_IP/health
```

You should see:

```json
{"message": "Hello World! 🚀", "status": "success", ...}
```

---

## Optional: Setup SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate (replace with your domain)
sudo certbot --nginx -d yourdomain.com

# Auto-renewal is set up automatically, test it:
sudo certbot renew --dry-run
```

---

## Maintenance Commands

### Restart the API

```bash
sudo systemctl restart fastforward
```

### Stop the API

```bash
sudo systemctl stop fastforward
```

### View real-time logs

```bash
sudo journalctl -u fastforward -f
```

### Update the application

```bash
cd /home/khusanrashidov/Fast-Forward
git pull
source .venv/bin/activate
pip install -r requirements.txt
cd src
flask db upgrade
sudo systemctl restart fastforward
```

---

## Troubleshooting

### Check if Gunicorn is running

```bash
sudo systemctl status fastforward
ps aux | grep gunicorn
```

### Check if Nginx is running

```bash
sudo systemctl status nginx
```

### Check port binding

```bash
sudo netstat -tlnp | grep -E ':(80|5000)'
```

### View Nginx error logs

```bash
sudo tail -f /var/log/nginx/error.log
```

### Permission issues

```bash
# Ensure www-data can access the project
sudo chown -R ubuntu:www-data /home/khusanrashidov/Fast-Forward
sudo chmod -R 755 /home/khusanrashidov/Fast-Forward
```

---

## Architecture Overview

```
                    ┌─────────────────────────────────────────┐
                    │              Internet                   │
                    └────────────────┬────────────────────────┘
                                     │
                                     ▼
                    ┌─────────────────────────────────────────┐
                    │            Nginx (Port 80/443)          │
                    │         - Reverse Proxy                 │
                    │         - SSL Termination               │
                    │         - Load Balancing                │
                    └────────────────┬────────────────────────┘
                                     │
                                     ▼
                    ┌─────────────────────────────────────────┐
                    │         Gunicorn (Port 5000)            │
                    │         - WSGI Server                   │
                    │         - 4 Worker Processes            │
                    └────────────────┬────────────────────────┘
                                     │
                                     ▼
                    ┌─────────────────────────────────────────┐
                    │           Flask Application             │
                    │           Fast Forward API              │
                    └─────────────────────────────────────────┘
```

---

## Quick Reference

| Command                              | Description       |
| ------------------------------------ | ----------------- |
| `sudo systemctl start fastforward`   | Start the API     |
| `sudo systemctl stop fastforward`    | Stop the API      |
| `sudo systemctl restart fastforward` | Restart the API   |
| `sudo systemctl status fastforward`  | Check API status  |
| `sudo journalctl -u fastforward -f`  | View API logs     |
| `sudo systemctl restart nginx`       | Restart Nginx     |
| `sudo nginx -t`                      | Test Nginx config |
