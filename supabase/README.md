# Supabase Database Setup

## Running Migrations

To apply the database schema and RLS policies to your Supabase project:

1. Go to your Supabase project dashboard: https://sxhehetvcicpbycgpyyu.supabase.co
2. Navigate to the SQL Editor
3. Copy the contents of `migrations/00001_create_cvs_table.sql`
4. Paste and run the SQL in the SQL Editor

Alternatively, if you have the Supabase CLI installed:

```bash
supabase db push
```

## Schema Overview

### `cvs` Table
- `id`: UUID (Primary Key)
- `user_id`: UUID (Foreign Key to auth.users)
- `title`: VARCHAR(255) - CV title
- `data`: JSONB - CV content (personal info, experience, education, skills)
- `theme`: JSONB - Theme configuration (colors, fonts, layout)
- `created_at`: TIMESTAMPTZ
- `updated_at`: TIMESTAMPTZ (auto-updated on changes)

### RLS Policies
- Users can only view, create, update, and delete their own CVs
- All operations are scoped to the authenticated user via `auth.uid()`
