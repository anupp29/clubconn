# ClubConn Database Setup Guide for Windows 11

## Overview

ClubConn uses a **hybrid database architecture**:
- **MySQL** for structured, relational data (users, clubs, events)
- **MongoDB** for unstructured event reports and analytics

---

## Windows 11 Installation

### MySQL Installation

#### Download & Install
1. Download [MySQL Installer](https://dev.mysql.com/downloads/installer/) (`mysql-installer-community-8.0.x.msi`)
2. Run installer → Choose **"Custom"** installation
3. Select: MySQL Server 8.0.x, MySQL Workbench, MySQL Shell
4. Configure:
   - Port: `3306`
   - Set root password
   - Create user: `clubconn_user` / `YourPassword123!`
   - Enable "Start MySQL Server at System Startup"
5. Add to PATH: `C:\Program Files\MySQL\MySQL Server 8.0\bin`

#### Verify Installation
```bash
mysql --version
mysql -u root -p
```

---

### MongoDB Installation

#### Download & Install
1. Download [MongoDB Community Server](https://www.mongodb.com/try/download/community) (`.msi`)
2. Run installer → **"Complete"** installation
3. Configure:
   - Install as Windows Service
   - Service Name: `MongoDB`
   - Data: `C:\Program Files\MongoDB\Server\8.0\data\`
   - Install MongoDB Compass (GUI)
4. Add to PATH: `C:\Program Files\MongoDB\Server\8.0\bin`

#### Verify Installation
```bash
mongod --version
mongosh
```

---

## Database Setup

### MySQL Setup

```bash
# Login as root
mysql -u root -p

# Create database and user
CREATE DATABASE clubconn CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'clubconn_user'@'localhost' IDENTIFIED BY 'YourPassword123!';
GRANT ALL PRIVILEGES ON clubconn.* TO 'clubconn_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;

# Run schema files
mysql -u clubconn_user -p clubconn < database/mysql/01_schema.sql
mysql -u clubconn_user -p clubconn < database/mysql/02_indexes.sql
mysql -u clubconn_user -p clubconn < database/mysql/03_views.sql
mysql -u clubconn_user -p clubconn < database/mysql/04_procedures.sql
mysql -u clubconn_user -p clubconn < database/mysql/05_functions.sql
mysql -u clubconn_user -p clubconn < database/mysql/06_triggers.sql
```

---

### MongoDB Setup

```javascript
// Connect to MongoDB
mongosh

// Create database and collection
use clubconn_reports

db.createCollection("event_reports", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["event_id", "club_id", "created_by", "created_at"],
      properties: {
        event_id: { bsonType: "int" },
        club_id: { bsonType: "int" },
        created_by: { bsonType: "int" },
        title: { bsonType: "string" },
        created_at: { bsonType: "date" }
      }
    }
  }
})

// Create indexes
db.event_reports.createIndex({ "event_id": 1 })
db.event_reports.createIndex({ "club_id": 1 })
db.event_reports.createIndex({ "created_at": -1 })

exit
```

---

## Connection Configuration

### Environment Variables (`.env`)

```env
# MySQL
DB_HOST=localhost
DB_PORT=3306
DB_NAME=clubconn
DB_USER=clubconn_user
DB_PASSWORD=YourPassword123!

# MongoDB
MONGODB_URI=mongodb://localhost:27017/clubconn_reports
```

---

### Node.js Connection

```javascript
// MySQL Connection (mysql2)
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 20
});

// MongoDB Connection (mongoose)
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
  maxPoolSize: 10
});
```

---

### Python Connection

```python
# MySQL (mysql-connector-python)
import mysql.connector

conn = mysql.connector.connect(
    host='localhost',
    port=3306,
    database='clubconn',
    user='clubconn_user',
    password='YourPassword123!'
)

# MongoDB (pymongo)
from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017/')
db = client.clubconn_reports
```

---

## Firewall Configuration

```powershell
# Run as Administrator
New-NetFirewallRule -DisplayName "MySQL" -Direction Inbound -Protocol TCP -LocalPort 3306 -Action Allow
New-NetFirewallRule -DisplayName "MongoDB" -Direction Inbound -Protocol TCP -LocalPort 27017 -Action Allow
```

---

## Database Features

### MySQL (clubconn)
- **Views**: User stats, leaderboards, event dashboards
- **Stored Procedures**: Event registration, attendance, badges
- **Functions**: Level calculation, capacity status
- **Triggers**: Auto-notifications, audit logging
- **ACID Compliance**: Transactions with rollback

### MongoDB (clubconn_reports)
- **Flexible Schema**: Dynamic event reports
- **Rich Media**: Photos, videos, feedback
- **Text Search**: Full-text search on content
- **Nested Data**: Complex document structures

---

## Backup Scripts

### MySQL Backup
```bash
mysqldump -u clubconn_user -p clubconn > backup_%date:~-4,4%%date:~-10,2%%date:~-7,2%.sql
```

### MongoDB Backup
```bash
mongodump --db clubconn_reports --out backup_%date:~-4,4%%date:~-10,2%%date:~-7,2%
```

---

## Testing Connection

```bash
# MySQL
mysql -u clubconn_user -p clubconn -e "SHOW TABLES;"

# MongoDB
mongosh clubconn_reports --eval "db.event_reports.countDocuments()"
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Can't connect to MySQL | Check service: `net start MySQL80` |
| Can't connect to MongoDB | Check service: `net start MongoDB` |
| Access denied | Verify username/password in `.env` |
| Port already in use | Change port in config files |

---

## Quick Start Checklist

- [ ] Install MySQL and create `clubconn` database
- [ ] Install MongoDB and create `clubconn_reports` database
- [ ] Run all MySQL schema files (01-06)
- [ ] Create MongoDB collection with indexes
- [ ] Configure `.env` file with credentials
- [ ] Test connections from your application
- [ ] Set up firewall rules
- [ ] Configure automated backups

---

**Need Help?** Contact the development team or check the full documentation.