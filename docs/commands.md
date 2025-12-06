# Terminal Commands Cheat Sheet

## Development

### Start the Project (Run in separate terminals)
1.  **Backend:**
    ```bash
    cd backend
    npm run dev
    ```
    *Starts the Express server on port 5001 with Nodemon.*

2.  **Frontend:**
    ```bash
    cd frontend
    npm run dev
    ```
    *Starts the Next.js dev server on port 3000.*

## Database Management (Prisma)

### Sync Schema to DB
```bash
cd backend
npx prisma db push
```
*Updates the MongoDB schema to match your `schema.prisma` file. Run this after changing the schema.*

### View Data (GUI)
```bash
cd backend
npx prisma studio
```
*Opens a web interface to view and edit your database content manually.*

## Deployment (Git)

### Push Changes
```bash
git add .
git commit -m "your message here"
git push origin main
```
*Saves your changes and uploads them to GitHub. This triggers automatic deployments on Vercel and Render.*

## Troubleshooting

### Install Dependencies
If you see "module not found" errors:
```bash
cd frontend && npm install
cd backend && npm install
```

### Check Node Version
```bash
node -v
```
*Should be v18 or higher.*

