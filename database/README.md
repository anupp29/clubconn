# ClubConn Database Documentation

## Overview

ClubConn uses a **hybrid database architecture**:
- **MySQL** for structured, relational data (users, clubs, events, etc.)
- **MongoDB** for unstructured event reports and analytics

This design ensures:
- **ACID compliance** for critical transactional data
- **Flexibility** for complex, document-based event reports
- **Optimal performance** for different data access patterns

## Database Architecture

### MySQL Database: `clubconn`

**Normalization**: All tables are in **Third Normal Form (3NF)**
- No partial dependencies
- No transitive dependencies
- Proper foreign key relationships

**Key Features**:
- ✅ Referential integrity with foreign keys
- ✅ Cascading updates and deletes where appropriate
- ✅ Optimized indexes for query performance
- ✅ Triggers for automated data management
- ✅ Stored procedures for complex business logic
- ✅ Views for simplified data access
- ✅ Functions for reusable calculations

### MongoDB Database: `clubconn_reports`

**Collection**: `event_reports`

**Purpose**: Store rich, unstructured event reports with:
- Multiple media types (photos, videos)
- Flexible feedback structures
- Dynamic sections and content
- Complex nested data

## Setup Instructions

### MySQL Setup

1. **Create Database**:
\`\`\`bash
mysql -u root -p < database/mysql/01_schema.sql
\`\`\`

2. **Create Indexes**:
\`\`\`bash
mysql -u root -p clubconn < database/mysql/02_indexes.sql
\`\`\`

3. **Create Views**:
\`\`\`bash
mysql -u root -p clubconn < database/mysql/03_views.sql
\`\`\`

4. **Create Procedures**:
\`\`\`bash
mysql -u root -p clubconn < database/mysql/04_procedures.sql
\`\`\`

5. **Create Functions**:
\`\`\`bash
mysql -u root -p clubconn < database/mysql/05_functions.sql
\`\`\`

6. **Create Triggers**:
\`\`\`bash
mysql -u root -p clubconn < database/mysql/06_triggers.sql
\`\`\`

7. **Load Sample Data** (optional):
\`\`\`bash
mysql -u root -p clubconn < database/mysql/07_sample_data.sql
\`\`\`

### MongoDB Setup

1. **Start MongoDB**:
\`\`\`bash
mongod --dbpath /path/to/data
\`\`\`

2. **Create Database and Collection**:
\`\`\`bash
mongosh < database/mongodb/event_reports_schema.js
\`\`\`

## Database Concepts Implemented

### 1. **CRUD Operations**
All tables support full Create, Read, Update, Delete operations with proper constraints.

### 2. **Indexes**
- **Primary Indexes**: On all primary keys
- **Foreign Key Indexes**: On all foreign key columns
- **Composite Indexes**: For common multi-column queries
- **Fulltext Indexes**: For search functionality
- **Covering Indexes**: For leaderboard and performance-critical queries

### 3. **Views**
- `v_active_events`: Active events with club and community info
- `v_leaderboard`: User rankings with statistics
- `v_club_stats`: Club statistics and metrics
- `v_user_activity_summary`: User activity overview
- `v_event_participation`: Event participation details
- `v_upcoming_events_dashboard`: Dashboard view of upcoming events

### 4. **Stored Procedures**
- `sp_register_for_event`: Handle event registration with validation
- `sp_mark_attendance`: Mark attendance and award points
- `sp_award_badge`: Award badges to users
- `sp_issue_certificate`: Issue certificates with verification
- `sp_get_user_dashboard_stats`: Get comprehensive user statistics

### 5. **Functions**
- `fn_calculate_user_level`: Calculate user level from points
- `fn_event_capacity_status`: Get event capacity status
- `fn_calculate_badge_progress`: Calculate badge progress
- `fn_generate_event_slug`: Generate unique event slugs
- `fn_event_attendance_rate`: Calculate attendance rate

### 6. **Triggers**
- **After Insert/Update/Delete**: Maintain denormalized counts
- **Badge Auto-Award**: Automatically award badges when criteria met
- **Notifications**: Create notifications for important events
- **Audit Logging**: Track all data changes
- **Data Validation**: Prevent invalid operations

### 7. **ACID Properties**

#### Atomicity
- All stored procedures use transactions
- Operations either complete fully or rollback entirely

#### Consistency
- Foreign key constraints ensure referential integrity
- Triggers maintain data consistency across tables
- Check constraints validate data

#### Isolation
- `FOR UPDATE` locks prevent race conditions
- Transaction isolation levels properly configured

#### Durability
- InnoDB engine ensures data persistence
- Binary logging enabled for point-in-time recovery

## Performance Optimization

### Indexing Strategy
1. **Primary Keys**: Clustered indexes on all tables
2. **Foreign Keys**: Indexed for join performance
3. **Search Columns**: Indexed for WHERE clauses
4. **Sort Columns**: Indexed for ORDER BY operations
5. **Composite Indexes**: For multi-column queries

### Query Optimization
- Views for complex, frequently-used queries
- Stored procedures to reduce network overhead
- Proper use of EXPLAIN to analyze query plans

### Caching Strategy
- Application-level caching for leaderboard
- Query result caching for static data
- Redis integration for session management

## Security Considerations

### MySQL Security
- Separate user accounts with minimal privileges
- Encrypted connections (SSL/TLS)
- Password hashing with bcrypt
- SQL injection prevention through prepared statements

### MongoDB Security
- Authentication enabled
- Role-based access control
- Encrypted connections
- Field-level encryption for sensitive data

## Backup Strategy

### MySQL Backups
\`\`\`bash
# Full backup
mysqldump -u root -p clubconn > backup_$(date +%Y%m%d).sql

# Incremental backup using binary logs
mysqlbinlog --start-datetime="2025-01-01 00:00:00" /var/log/mysql/mysql-bin.000001 > incremental.sql
\`\`\`

### MongoDB Backups
\`\`\`bash
# Full backup
mongodump --db clubconn_reports --out /backup/$(date +%Y%m%d)

# Restore
mongorestore --db clubconn_reports /backup/20250101/clubconn_reports
\`\`\`

## Monitoring and Maintenance

### Performance Monitoring
- Slow query log analysis
- Index usage statistics
- Table size monitoring
- Connection pool monitoring

### Regular Maintenance
- Analyze and optimize tables monthly
- Update statistics for query optimizer
- Archive old data
- Rebuild indexes if fragmented

## Integration with Application

### Environment Variables
\`\`\`env
# MySQL
DB_HOST=localhost
DB_PORT=3306
DB_NAME=clubconn
DB_USER=clubconn_user
DB_PASSWORD=secure_password

# MongoDB
MONGODB_URI=mongodb://localhost:27017/clubconn_reports
\`\`\`

### Connection Pooling
- MySQL: Use connection pool with max 20 connections
- MongoDB: Use connection pool with max 10 connections

## Testing

### Unit Tests
- Test all stored procedures
- Test all triggers
- Test all functions
- Validate constraints

### Integration Tests
- Test cross-database operations
- Test transaction rollbacks
- Test concurrent access

### Performance Tests
- Load testing with 1000+ concurrent users
- Query performance benchmarks
- Index effectiveness analysis

## Migration Strategy

### Version Control
- All schema changes tracked in migration files
- Numbered migration files (001_initial.sql, 002_add_indexes.sql)
- Rollback scripts for each migration

### Deployment Process
1. Backup current database
2. Run migration scripts
3. Verify data integrity
4. Update application code
5. Monitor for issues

## Troubleshooting

### Common Issues

**Issue**: Slow queries
**Solution**: Check EXPLAIN plan, add indexes, optimize query

**Issue**: Deadlocks
**Solution**: Review transaction isolation levels, optimize lock order

**Issue**: Connection pool exhaustion
**Solution**: Increase pool size, check for connection leaks

**Issue**: Disk space
**Solution**: Archive old data, optimize tables, increase storage

## Contact

For database-related questions or issues, contact the development team.
