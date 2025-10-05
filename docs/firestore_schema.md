# ClubConn Firestore Schema

## Overview
This document defines the complete Firestore database schema for ClubConn, a campus club management platform supporting city-level communities, college-level clubs, events, hall bookings, and role-based access control.

## Design Principles
1. **Security First**: All access controlled via Firestore Security Rules
2. **Minimize Reads**: Denormalize frequently accessed data
3. **Scalability**: Use subcollections for large datasets (members, events)
4. **Audit Trail**: Log all administrative actions
5. **RBAC + ABAC**: Role-based + Attribute-based (college) access control

---

## Collections

### 1. `users` Collection
**Path**: `/users/{uid}`

Stores user profiles and authentication data.

\`\`\`typescript
{
  uid: string;                    // Firebase Auth UID (document ID)
  email: string;
  displayName: string;
  username: string;               // Unique username
  photoURL?: string;
  bio?: string;
  college_id?: string;            // Reference to college
  college_name?: string;          // Denormalized for quick access
  year?: number;                  // Academic year (1-4)
  branch?: string;                // Engineering branch
  phone?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  
  // Platform role
  platform_role: 'platform_admin' | 'user';
  
  // Metadata
  created_at: Timestamp;
  updated_at: Timestamp;
  last_login?: Timestamp;
  is_active: boolean;
  email_verified: boolean;
}
\`\`\`

**Indexes**:
- `username` (unique via separate collection)
- `college_id` + `is_active`
- `email` (automatic)

---

### 2. `usernames` Collection
**Path**: `/usernames/{username}`

Maps usernames to UIDs for uniqueness enforcement.

\`\`\`typescript
{
  username: string;               // Document ID
  uid: string;                    // User's Firebase UID
  created_at: Timestamp;
}
\`\`\`

---

### 3. `colleges` Collection
**Path**: `/colleges/{college_id}`

Stores college/institution information.

\`\`\`typescript
{
  college_id: string;             // Document ID (auto-generated)
  name: string;                   // "K. K. Wagh Institute of Engineering Education and Research"
  short_name: string;             // "KKWIEER"
  city: string;
  state: string;
  country: string;
  
  // Contact
  email?: string;
  phone?: string;
  website?: string;
  address?: string;
  
  // Metadata
  logo_url?: string;
  established_year?: number;
  is_active: boolean;
  created_at: Timestamp;
  updated_at: Timestamp;
  
  // Stats (updated via Cloud Functions)
  total_clubs: number;
  total_students: number;
}
\`\`\`

**Indexes**:
- `short_name`
- `city` + `is_active`

---

### 4. `city_communities` Collection
**Path**: `/city_communities/{community_id}`

City-level tech communities (e.g., "Nashik FOSS Community").

\`\`\`typescript
{
  community_id: string;           // Document ID
  name: string;                   // "Nashik Tech Community"
  slug: string;                   // "nashik-tech" (for URLs)
  description: string;
  city: string;
  state: string;
  
  // Associated colleges (only members from these colleges can edit)
  associated_college_ids: string[];
  
  // Branding
  logo_url?: string;
  banner_url?: string;
  website?: string;
  
  // Social links
  github?: string;
  twitter?: string;
  linkedin?: string;
  discord?: string;
  telegram?: string;
  
  // Metadata
  is_active: boolean;
  created_at: Timestamp;
  updated_at: Timestamp;
  created_by: string;             // UID of creator
  
  // Stats
  total_members: number;
  total_events: number;
}
\`\`\`

**Subcollection**: `/city_communities/{community_id}/members/{uid}`

\`\`\`typescript
{
  uid: string;                    // Document ID
  user_college_id: string;        // Denormalized for security rules
  role: 'lead' | 'co-lead' | 'member';
  joined_at: Timestamp;
  added_by: string;               // UID of admin who added
}
\`\`\`

**Indexes**:
- `slug` (unique)
- `city` + `is_active`
- `associated_college_ids` (array-contains)

---

### 5. `clubs` Collection
**Path**: `/clubs/{club_id}`

College-level clubs (e.g., "CSI KKWIEER", "FOSS KKWIEER").

\`\`\`typescript
{
  club_id: string;                // Document ID
  name: string;                   // "Computer Society of India - KKWIEER"
  short_name: string;             // "CSI"
  slug: string;                   // "csi-kkwieer" (for URLs)
  description: string;
  college_id: string;             // Parent college
  college_name: string;           // Denormalized
  
  // Club type
  category: 'technical' | 'cultural' | 'sports' | 'social' | 'other';
  tags: string[];                 // ["coding", "hackathons", "workshops"]
  
  // Branding
  logo_url?: string;
  banner_url?: string;
  official_logo_url?: string;     // Approved official logo
  website?: string;
  
  // Social links
  github?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  discord?: string;
  
  // Metadata
  is_active: boolean;
  is_verified: boolean;           // Verified by platform admin
  created_at: Timestamp;
  updated_at: Timestamp;
  created_by: string;
  
  // Stats
  total_members: number;
  total_events: number;
}
\`\`\`

**Subcollection**: `/clubs/{club_id}/members/{uid}`

\`\`\`typescript
{
  uid: string;                    // Document ID
  user_college_id: string;        // Denormalized for security rules
  role: 'club_coordinator' | 'lead' | 'co-lead' | 'secretary' | 
        'joint-secretary' | 'creative' | 'social' | 'member';
  joined_at: Timestamp;
  added_by: string;
  is_active: boolean;
}
\`\`\`

**Indexes**:
- `slug` (unique)
- `college_id` + `is_active`
- `category` + `is_active`

---

### 6. `events` Collection
**Path**: `/events/{event_id}`

Events organized by clubs or city communities.

\`\`\`typescript
{
  event_id: string;               // Document ID
  title: string;
  description: string;
  
  // Organizer (club or city community)
  organizer_type: 'club' | 'city_community';
  organizer_id: string;           // club_id or community_id
  organizer_name: string;         // Denormalized
  college_id?: string;            // If club event
  
  // Event details
  event_type: 'workshop' | 'hackathon' | 'meetup' | 'conference' | 
              'competition' | 'seminar' | 'social' | 'other';
  mode: 'online' | 'offline' | 'hybrid';
  
  // Timing
  start_date: Timestamp;
  end_date: Timestamp;
  registration_start: Timestamp;
  registration_end: Timestamp;
  
  // Location
  venue?: string;
  hall_id?: string;               // If hall booking required
  city?: string;
  online_link?: string;           // Zoom/Meet link
  
  // Capacity
  max_participants?: number;
  current_participants: number;   // Updated via Cloud Function
  
  // Registration
  requires_registration: boolean;
  registration_fee?: number;
  external_registration_link?: string;
  
  // Content
  banner_url?: string;
  tags: string[];
  
  // Status
  status: 'draft' | 'published' | 'ongoing' | 'completed' | 'cancelled';
  is_featured: boolean;
  is_must_attend: boolean;
  
  // Metadata
  created_at: Timestamp;
  updated_at: Timestamp;
  created_by: string;
  
  // Stats
  total_rsvps: number;
  total_attended: number;
}
\`\`\`

**Subcollection**: `/events/{event_id}/participants/{uid}`

\`\`\`typescript
{
  uid: string;                    // Document ID
  rsvp_status: 'going' | 'interested' | 'not_going';
  registered_at: Timestamp;
  attended: boolean;
  attendance_marked_at?: Timestamp;
  attendance_marked_by?: string;
  
  // If submission required
  submission_id?: string;
  submission_status?: 'pending' | 'submitted' | 'evaluated';
}
\`\`\`

**Indexes**:
- `organizer_id` + `status` + `start_date`
- `college_id` + `status` + `start_date`
- `event_type` + `status` + `start_date`
- `is_featured` + `start_date`

---

### 7. `submissions` Collection
**Path**: `/submissions/{submission_id}`

Submissions for events (hackathons, competitions).

\`\`\`typescript
{
  submission_id: string;          // Document ID
  event_id: string;
  event_title: string;            // Denormalized
  
  // Submitter
  submitted_by: string;           // UID
  submitter_name: string;         // Denormalized
  team_members?: string[];        // Array of UIDs
  
  // Submission content
  title: string;
  description: string;
  submission_url?: string;        // GitHub, Drive, etc.
  attachments?: string[];         // Array of file URLs
  
  // Evaluation
  status: 'pending' | 'under_review' | 'accepted' | 'rejected';
  score?: number;
  feedback?: string;
  evaluated_by?: string;
  evaluated_at?: Timestamp;
  
  // Metadata
  submitted_at: Timestamp;
  updated_at: Timestamp;
}
\`\`\`

**Indexes**:
- `event_id` + `status`
- `submitted_by` + `submitted_at`

---

### 8. `hall_requests` Collection
**Path**: `/hall_requests/{request_id}`

Hall booking requests for events.

\`\`\`typescript
{
  request_id: string;             // Document ID
  event_id: string;
  event_title: string;            // Denormalized
  club_id: string;
  club_name: string;              // Denormalized
  college_id: string;
  
  // Hall details
  hall_name: string;              // "Seminar Hall A", "Auditorium"
  requested_date: Timestamp;
  start_time: Timestamp;
  end_time: Timestamp;
  expected_attendees: number;
  
  // Requirements
  equipment_needed?: string[];    // ["projector", "mic", "speakers"]
  special_requirements?: string;
  
  // Approval workflow
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  requested_by: string;           // UID
  requested_at: Timestamp;
  
  approved_by?: string;           // hall_coordinator or platform_admin UID
  approved_at?: Timestamp;
  rejection_reason?: string;
  
  // Metadata
  updated_at: Timestamp;
}
\`\`\`

**Indexes**:
- `college_id` + `status` + `requested_date`
- `club_id` + `status`
- `status` + `requested_date`

---

### 9. `messages` Collection
**Path**: `/messages/{message_id}`

Internal messaging system for club communications.

\`\`\`typescript
{
  message_id: string;             // Document ID
  
  // Sender
  from_uid: string;
  from_name: string;              // Denormalized
  
  // Recipient
  to_uid: string;
  to_name: string;                // Denormalized
  
  // Content
  subject: string;
  body: string;
  attachments?: string[];
  
  // Context (optional - if related to club/event)
  context_type?: 'club' | 'event' | 'hall_request';
  context_id?: string;
  
  // Status
  is_read: boolean;
  read_at?: Timestamp;
  is_archived: boolean;
  
  // Metadata
  sent_at: Timestamp;
}
\`\`\`

**Indexes**:
- `to_uid` + `is_read` + `sent_at`
- `from_uid` + `sent_at`

---

### 10. `audit_logs` Collection
**Path**: `/audit_logs/{log_id}`

Audit trail for all administrative actions.

\`\`\`typescript
{
  log_id: string;                 // Document ID (auto-generated)
  
  // Actor
  actor_uid: string;
  actor_name: string;             // Denormalized
  actor_role: string;             // Role at time of action
  
  // Action
  action: 'create' | 'update' | 'delete' | 'approve' | 'reject' | 
          'role_change' | 'status_change';
  resource_type: 'user' | 'club' | 'event' | 'hall_request' | 
                 'city_community' | 'membership';
  resource_id: string;
  
  // Details
  changes?: {
    field: string;
    old_value: any;
    new_value: any;
  }[];
  
  // Context
  college_id?: string;
  club_id?: string;
  ip_address?: string;
  user_agent?: string;
  
  // Metadata
  timestamp: Timestamp;
}
\`\`\`

**Indexes**:
- `resource_type` + `resource_id` + `timestamp`
- `actor_uid` + `timestamp`
- `college_id` + `timestamp`

---

### 11. `role_types` Collection
**Path**: `/role_types/{role_id}`

Defines available roles and their permissions (read-only reference data).

\`\`\`typescript
{
  role_id: string;                // Document ID
  name: string;                   // "Club Coordinator"
  slug: string;                   // "club_coordinator"
  description: string;
  
  // Permissions
  permissions: {
    can_manage_members: boolean;
    can_create_events: boolean;
    can_edit_club: boolean;
    can_delete_events: boolean;
    can_approve_halls: boolean;
    can_view_analytics: boolean;
    can_manage_roles: boolean;
  };
  
  // Hierarchy
  level: number;                  // 1 (highest) to 10 (lowest)
  scope: 'platform' | 'college' | 'club' | 'city_community';
}
\`\`\`

---

### 12. `notifications` Collection
**Path**: `/notifications/{notification_id}`

User notifications for events, approvals, mentions, etc.

\`\`\`typescript
{
  notification_id: string;        // Document ID
  user_id: string;                // Recipient UID
  
  // Content
  type: 'event_invite' | 'role_change' | 'hall_approved' | 
        'hall_rejected' | 'mention' | 'announcement';
  title: string;
  body: string;
  
  // Action
  action_url?: string;            // Deep link to relevant page
  action_label?: string;          // "View Event", "See Details"
  
  // Context
  related_type?: 'event' | 'club' | 'hall_request';
  related_id?: string;
  
  // Status
  is_read: boolean;
  read_at?: Timestamp;
  
  // Metadata
  created_at: Timestamp;
}
\`\`\`

**Indexes**:
- `user_id` + `is_read` + `created_at`

---

## Security Considerations

1. **Denormalization for Security**: Cache `user_college_id` in membership documents to enable efficient security rule checks without additional reads.

2. **Subcollections**: Use subcollections for members and participants to avoid document size limits and enable granular security rules.

3. **Audit Logging**: All administrative actions trigger Cloud Functions that write to `audit_logs`.

4. **Role Hierarchy**: Enforce role hierarchy in security rules (e.g., club_coordinator > lead > member).

5. **College-Based Access**: City community editing restricted to members whose `user_college_id` is in `associated_college_ids`.

---

## Cloud Functions Triggers

1. **onUserCreate**: Initialize user profile, send welcome email
2. **onMembershipChange**: Update cached `user_college_id`, update stats
3. **onEventCreate**: Send notifications to club members
4. **onRSVPCreate**: Update event participant count
5. **onHallRequestApprove**: Send notification, create audit log
6. **onRoleChange**: Create audit log, update permissions cache
7. **onCollegeChange**: Cascade update to all user's memberships

---

## Migration Strategy

1. Export SQL data to JSON
2. Transform relational joins into denormalized documents
3. Create subcollections for one-to-many relationships
4. Batch write to Firestore (500 docs per batch)
5. Verify data integrity
6. Update security rules
7. Deploy Cloud Functions
8. Test access control

---

## Performance Optimization

1. **Composite Indexes**: Create for common query patterns
2. **Denormalization**: Cache frequently accessed data
3. **Pagination**: Use `startAfter` for large result sets
4. **Caching**: Implement client-side caching for static data
5. **Batch Operations**: Use batch writes for bulk updates

---

## Backup and Recovery

1. **Daily Backups**: Automated Firestore exports to Cloud Storage
2. **Point-in-Time Recovery**: Maintain 30-day backup retention
3. **Disaster Recovery**: Cross-region replication for critical data
