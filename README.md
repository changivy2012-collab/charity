# Charity Project Creator with Supabase Integration

This project demonstrates how to integrate Supabase with a simple charity project creator web application.

## Setup Instructions

1. **Create a Supabase Account and Project**
   - Go to [Supabase](https://supabase.io/) and create an account
   - Create a new project

2. **Get Your Supabase Credentials**
   - In your Supabase project dashboard, go to "Project Settings" > "API"
   - Copy your Project URL and Anonymous Key

3. **Configure the Application**
   - Open `supabase.js` in your project
   - Replace `YOUR_SUPABASE_URL` with your actual Project URL
   - Replace `YOUR_SUPABASE_ANON_KEY` with your actual Anonymous Key

4. **Create the Database Table**
   - In your Supabase project, go to the SQL editor
   - Run the following SQL to create the projects table:

```sql
CREATE TABLE projects (
  id bigint PRIMARY KEY,
  name text,
  interests text,
  cause text,
  targetAudience text,
  description text,
  createdAt timestamp with time zone,
  donations integer
);
```

5. **Test the Application**
   - Open `index.html` in your browser
   - Create a new charity project using the form
   - Check your Supabase table to see the saved data

## How It Works

- When a user creates a new project, the data is saved to the browser's local storage for immediate display
- The same data is also sent to Supabase for persistent storage
- The application uses the Supabase JavaScript client to perform the database operations

## Files

- `index.html`: The main application interface
- `supabase.js`: Contains the Supabase client initialization and data saving functions
- `README.md`: This file

## Security Note

For production applications, you should use Supabase service roles and Row Level Security (RLS) to protect your data. This example uses the anonymous key for simplicity, which is not recommended for production use.