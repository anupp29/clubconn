# MongoDB Setup for ClubConn

## Environment Variables

Add the following environment variable to your project:

\`\`\`bash
MONGODB_URI=mongodb://localhost:27017
\`\`\`

Or for MongoDB Atlas:

\`\`\`bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/clubconn_reports?retryWrites=true&w=majority
\`\`\`

## Local Setup

1. **Install MongoDB** (if not already installed):
   \`\`\`bash
   # macOS
   brew install mongodb-community
   
   # Ubuntu
   sudo apt-get install mongodb
   
   # Windows
   # Download from https://www.mongodb.com/try/download/community
   \`\`\`

2. **Start MongoDB**:
   \`\`\`bash
   # macOS/Linux
   mongod --dbpath /path/to/data/directory
   
   # Or use brew services (macOS)
   brew services start mongodb-community
   \`\`\`

3. **Seed the Database**:
   \`\`\`bash
   mongosh clubconn_reports < database/mongodb/seed_event_reports.js
   \`\`\`

4. **Verify Seeding**:
   \`\`\`bash
   mongosh clubconn_reports < database/mongodb/verify_event_reports.js
   \`\`\`

## MongoDB Atlas Setup (Cloud)

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster (free tier available)
3. Create a database user
4. Whitelist your IP address
5. Get connection string and add to `.env.local`
6. Seed using the connection string:
   \`\`\`bash
   mongosh "your-connection-string" < database/mongodb/seed_event_reports.js
   \`\`\`

## Verification

Run this command to verify everything is working:

\`\`\`bash
mongosh clubconn_reports --eval "db.event_reports.countDocuments()"
\`\`\`

Should return: `7` (number of seeded reports)
