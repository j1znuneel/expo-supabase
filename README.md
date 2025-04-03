# Expo Login App with Supabase

A modern authentication app built with Expo and Supabase, featuring user registration and role-based access.

## Features

- User authentication (Login/Register)
- Role-based user management (Manager/Staff)
- Protected routes
- Modern UI with React Native Elements

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a Supabase project at https://supabase.com

3. Copy your Supabase URL and anon key from your project settings

4. Create a `.env` file in the root directory and add your Supabase credentials:
```
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url_here
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

5. Start the development server:
```bash
npm start
```

## Dependencies

- Expo SDK
- React Navigation
- Supabase
- React Native Elements
- React Native Picker
- AsyncStorage

## Development

The app uses TypeScript for type safety and follows modern React best practices.
