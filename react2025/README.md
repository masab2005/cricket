CreaseCode - Cricket Player Guessing Game
Description

CreaseCode is an interactive cricket player guessing game where users can test their cricket knowledge by identifying players based on hints. The game features a hint-based scoring system, user authentication, and a global leaderboard to compete with other cricket enthusiasts.

Features

- **User Authentication**: Secure signup and login functionality powered by Appwrite
- **Hint-Based Gameplay**: Reveal hints strategically to identify cricket players
- **Scoring System**: Score points based on how few hints you use
- **Leaderboard**: Compete with other players on a global leaderboard
- **Responsive Design**: Beautiful UI that works across desktop and mobile devices
- **Game State Persistence**: Continue your game where you left off
- **Protected Routes**: Secure access to game features for authenticated users only

Tech Stack

- **Frontend**: React 19 with Redux Toolkit for state management
- **Styling**: TailwindCSS for responsive and modern UI
- **Authentication & Backend**: Appwrite Cloud
- **Build Tool**: Vite
- **Routing**: React Router DOM v7
- **State Persistence**: Redux Persist
Project Structure

```
react2025/
├── public/
│   └── vite.svg
├── src/
│   ├── account/            # Authentication components
│   │   ├── LoggedIn.jsx
│   │   ├── Login.jsx
│   │   ├── LogOutBtn.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── Signup.jsx
│   ├── appwrite/           # Appwrite configuration and services
│   │   ├── auth.js
│   │   └── conf.js
│   ├── assets/
│   │   └── react.svg
│   ├── config/
│   │   └── config.js       # Environment configuration
│   ├── game/               # Game components
│   │   ├── End.jsx
│   │   ├── Game.jsx
│   │   ├── GameWrapper.jsx
│   │   └── Result.jsx
│   ├── navBar/             # Navigation components
│   │   ├── Leaderboard.jsx
│   │   └── Nav.jsx
│   ├── store/              # Redux store setup
│   │   ├── authSlice.js
│   │   └── store.js
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   ├── LoadingSpinner.jsx
│   └── main.jsx
├── .eslintrc.json
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vercel.json
└── vite.config.js
```

 How to Play

1. **Sign Up/Login**: Create an account or log in to start playing
2. **Guess the Player**: You'll be presented with a cricket player to identify
3. **Reveal Hints**: Click on hint cards to reveal information about the player
4. **Make Your Guess**: Type your guess in the input field and submit
5. **Score Points**: The fewer hints you use, the more points you earn
6. **Climb the Leaderboard**: Compete with other players to reach the top

Game Rules

- You have 6 attempts to guess each player correctly
- Each revealed hint reduces your potential score by 10 points
- Maximum score per player is 100 points (if guessed without any hints)
- Your progress is automatically saved if you leave the game

## 🔧 Appwrite Setup

1. Create an Appwrite project
2. Set up the following collections:
   - `users`: To store user profiles and scores
   - `players`: To store cricket player data and hints
3. Create a storage bucket for player images
4. Set up the appropriate attributes and indexes for each collection

### Players Collection Structure

Each player document should have:
- `playerName`: Name of the cricket player
- `hints`: Array of hint values [Country, Role, Debut Year, Total Matches, Franchise, Born, Retired?]
- `imageID`: ID of the player's image in the storage bucket
- `index`: Unique index number for the player

### Users Collection Structure

Each user document should have:
- `username`: User's display name
- `score`: User's total score
- `currentIndex`: Current player index the user is on
Deployment

This project is configured for deployment on Vercel. The `vercel.json` file includes the necessary configuration for proper routing with React Router.

Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve the game.
