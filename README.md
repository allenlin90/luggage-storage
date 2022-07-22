- [App Target](#app-target)
- [Getting Started](#getting-started)
- [ENVs](#envs)
- [Global features](#global-features)
- [Authentication](#authentication)
- [Dashboard](#dashboard)
- [Warehouse](#warehouse)
- [Orders/Tasks List](#orderstasks-list)
- [Map](#map)
- [Scanner](#scanner)
- [Settings](#settings)
- [General UI Components](#general-ui-components)
- [PWA](#pwa)
- [Performance](#performance)
- [Tests and performance](#tests-and-performance)
  - [CI/CD](#cicd)
- [Reference and terminology](#reference-and-terminology)

# App Target
1. Serving most of the backend tasks for operations. Users include
   1. Helpers,
   2. Operators,
   3. Merchants, and
   4. Drivers (delivery)
2. This project is mainly for UI and frontend components without business logic
   1. Requires business logic to work with
   2. Requires backend to work with
3. Optimization
   1. JS bundled size 
   2. Loading time

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
# change to hosting domain
NEXTAUTH_URL=http://localhost:3000 
MAPBOX_TOKEN=[get_this_from_MAPBOX]
APP_ENV=local
```

# Global features
1. [x] Redirect user to login when session expires 
2. [ ] Data/Request handling with `react-query`
4. [ ] Background data loading
5. [ ] Error boundary
6. [ ] SEO
7. [ ] Route loader
8. [ ] Image placeholder (shimmer)
9. Remeber user previous loction when redirecting
   1. [ ] Login
   2. [ ] Authentication with pincode
10. [ ] In app notification - long polling/websocket

# Authentication
1. [x] Authentication by `next-auth`
   1. [x] LINE 
   1. [ ] Google
   2. [ ] Facebook
   3. [ ] User login (email/phone, OTP)

# Dashboard
1. [ ] Shows performance summary, metrics, etc. (Ant design or chart.js) and requires business logic

# Warehouse
1. [x] Drag and drop items between columns (warehouses)
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

# General UI Components
1. [x] Connection indicator, showing if the device is online/offline.
2. [x] Route loader triggers when switching between paths.
3. [x] Dialog controlled by 4 recoil states `open`, `title`, `body`, and `action`.
4. [x] Pin panel for 4 - 6 digits (or more)
5. Image processing 
   1. [ ] Upload and preview
   2. [ ] Drag and drop
   3. [ ] Multiple select
6. Custom error fallback page
   1. [ ] 404
   2. [ ] 403
   3. [ ] 500
7. In app notification
   1. [x] UI
   2. [ ] Logical and control
8. Global search
   1. [ ] Autocomplete (with fuzzy/full-text search)
9. AR direction instruction
   1. Getting user meta data
      1. [ ] Indoor location
      2. [ ] Moving speed
      3. [ ] Distance to target
   2. [ ] Image detection and tracking
   3. Balancing tracking performance and precision
      1. [ ] Optimize calculation speed (multi-threading)
      2. [ ] Enhance with machine learning solutions

# PWA 
1. [ ] Manifest
2. [ ] Splash screen
3. [ ] App icons
4. Offline mode
   1. [ ] Offline fallback page
5. [ ] Service worker
6. [ ] Push notification

# Performance
1. [ ] Lighthouse performance index, avg. 90
2. [ ] Web worker(s) (comlink)
3. [ ] IndexedDB

# Tests and performance
1. [ ] Story book integration
2. [ ] Unit test coverage > 80%

## CI/CD 
1. [x] Deploy to Vercel
2. Github actions
   1. [x] Test coverage report
   2. [ ] Build breaker
   3. [ ] Dependbot

# Reference and terminology
1. Global search
   1. Full-text-search
   2. Fuzzy search
2. Libraries for DND and drag select
   1. [react-beautiful-dnd](https://www.npmjs.com/package/react-beautiful-dnd)
   2. [dragselect](https://www.npmjs.com/package/dragselect)
   3. [interactjs](https://www.npmjs.com/package/interactjs)
3. Multi-threading
