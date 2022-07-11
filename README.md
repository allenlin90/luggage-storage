# App Target
1. Serving most of the backend tasks for operations. Users include
   1. Operators
   2. Merchants
   3. Drivers (delivery)
2. This project is mainly for UI and frontend components without business logic
3. Requires business logic to work with
4. Requires backend to work with
5. Optimized JS bundled size

# Getting Started
1. Install dependencies
   1. `npm run install` or 
   2. `yarn install`

# ENVs
1. Create LINE Login at [https://developers.line.biz/](https://developers.line.biz/)
2. Create MAPBOX_TOKEN at [https://www.mapbox.com](https://www.mapbox.com/)

```
LINE_ID=[get_this_from_LINE_developer]
LINE_SECRET=[get_this_from_LINE_developer]
NEXTAUTH_SECRET=[generate_random_string_for_hashing]
NEXTAUTH_URL=http://localhost:3000
MAPBOX_TOKEN=[get_this_from_MAPBOX]
APP_ENV=local
```

# Global features
1. [x] Redirect user to login when session expires
2. [ ] Data/Request handling `react-query` 
4. [ ] Backend data loading
5. Remeber user previous loction when redirecting
   1. [ ] Login
   2. [ ] Authentication with pincode

# Authentication
1. [x] Authentication by `next-auth`
   1. [x] LINE 
   1. [ ] Google
   2. [ ] Facebook
   3. [ ] User login (email/phone, OTP)

# Dashboard
1. [ ] Shows performance summary, metrics, etc. (Ant design or chart.js) and requires business logic

# Warehouse
1. [ ] Drag and drop items between columns (warehouses)
2. Manage (CRUD) warehouse/locations, required business logic 

# Orders/Tasks List
1. [ ] Autocomplete search (Fuse.js)
2. [ ] Data table
3. Order management single/multiple (CSV/Excel)
   1. [ ] General form to create/edit single order
   2. [ ] Drag and drop to upload files
   3. [ ] Edit uploaded table data

# Map
1. Setup map view with MapBox (or Google Maps)
   1. [x] Create map view
   2. [x] Customize geocoder UI `mapbox-geocoder.css` at `_app`
2. Tracking on user loction
   1. [ ] Silent tracking with battery saving (prevent draining)
   3. [ ] Showing historical records

# Scanner
1. [x] Full screen scanner, reading multiple types of codes and media

# Settings
1. App theme control
   1. [ ] Coloring
   2. [ ] Dark mode

# General Components
1. [x] Connection indicator, showing if the device is online/offline.
2. [x] Route loader triggers when switching between paths.
3. [x] Dialog controlled by 4 recoil states `open`, `title`, `body`, and `action`.
4. [x] Pin panel for 4 - 6 digits
5. [ ] Image processing (upload and preview)
6. Custom error fallback page
   1. [ ] 404
   2. [ ] 500
7. In app notification
   1. [x] UI
   2. [ ] Logical and control
8. Global order search
   1. [ ] Auto complete (orders)

# PWA 
1. [ ] Manifest
2. [ ] Splash screen
3. [ ] App icons
4. [ ] Offline mode
5. [ ] Service worker
6. [ ] Web worker
7. [ ] Push notification
8. [ ] IndexedDB

# Tests and performance
1. [ ] Unit test coverage > 80%
2. [ ] Lighthouse performance index, avg. 90

## CI/CD 
1. [x] Deploy to Vercel
2. Github actions
   1. [ ] Build breaker
   2. [ ] Dependbot
   3. [ ] Test coverage report
