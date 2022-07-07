# Getting Started
Install dependencies
```bash
npm run install
# or
yarn install
```

# ENVs
```
LINE_ID=[get_this_from_LINE_developer]
LINE_SECRET=[get_this_from_LINE_developer]
NEXTAUTH_SECRET=[generate_random_string_for_hashing]
NEXTAUTH_URL=http://localhost:3000
APP_ENV=local
```

## Global features
1. Route loader triggers when switching between paths
2. Connection indicator
3. Dialog controlled by 4 recoil states `open`, `title`, `body`, and `action`

# Authentication
1. This app use `next-auth` with LINE OAuth.
