# MySQL Database Setup for BeyondNine ERP

## Prerequisites

1. MySQL Server (version 8.0 or higher recommended)
2. Node.js (version 16 or higher)
3. npm or yarn package manager

## Database Installation

### Windows

1. Download MySQL Installer from [mysql.com](https://dev.mysql.com/downloads/installer/)
2. Run the installer and select "Server only" or "Developer Default"
3. Follow the installation wizard
4. Set a root password during installation

### macOS

```bash
# Using Homebrew
brew install mysql
brew services start mysql

# Secure MySQL installation
mysql_secure_installation
```

### Linux (Ubuntu/Debian)

```bash
# Update package list
sudo apt update

# Install MySQL server
sudo apt install mysql-server

# Start MySQL service
sudo systemctl start mysql
sudo systemctl enable mysql

# Secure MySQL installation
sudo mysql_secure_installation
```

## Database Configuration

### 1. Create Database

Connect to MySQL as root:

```bash
mysql -u root -p
```

Create the database:

```sql
CREATE DATABASE beyondnine_erp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2. Create Database User (Optional but Recommended)

```sql
CREATE USER 'beyondnine'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON beyondnine_erp.* TO 'beyondnine'@'localhost';
FLUSH PRIVILEGES;
```

### 3. Update Environment Variables

Update the `.env` file in your project root:

```env
# For root user (default)
DATABASE_URL="mysql://root:your_root_password@localhost:3306/beyondnine_erp"

# Or for dedicated user (recommended)
DATABASE_URL="mysql://beyondnine:your_secure_password@localhost:3306/beyondnine_erp"
```

## Prisma Setup

### 1. Generate Prisma Client

```bash
npx prisma generate
```

### 2. Run Database Migrations

```bash
npx prisma migrate dev --name init
```

This will:
- Create database tables based on your Prisma schema
- Generate the initial migration

### 3. Seed Database (Optional)

Create a seed script in `prisma/seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create demo school
  const school = await prisma.school.create({
    data: {
      name: 'BeyondNine Demo School',
      code: 'BNDS001',
      address: '123 Education Street',
      city: 'Learning City',
      state: 'Knowledge State',
      country: 'India',
      pincode: '123456',
      phone: '+91 9876543210',
      email: 'admin@beyondninedemo.com',
      academicYearStart: new Date(new Date().getFullYear(), 4, 1), // May 1
      academicYearEnd: new Date(new Date().getFullYear() + 1, 3, 30), // April 30 next year
      workingDays: JSON.stringify({
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: false,
        sunday: false
      }),
      schoolTimings: JSON.stringify({
        start: '08:00',
        end: '15:00'
      })
    }
  });

  console.log('Created school:', school.name);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

Update `package.json` to include the seed script:

```json
{
  "prisma": {
    "seed": "ts-node prisma/seed.ts"
  }
}
```

Run the seed:

```bash
npx prisma db seed
```

## Testing Database Connection

### 1. Using the Test API Endpoint

Visit `/api/db-test` in your browser or make a GET request to test the connection.

### 2. Using Prisma Studio

```bash
npx prisma studio
```

This opens a visual database browser at `http://localhost:5555`.

## Troubleshooting

### Common Issues

1. **Authentication Failed**: 
   - Check that MySQL is running
   - Verify username and password in `.env`
   - Ensure the database exists

2. **Connection Refused**:
   - Check that MySQL service is running
   - Verify the port (default is 3306)

3. **Prisma Client Not Generated**:
   ```bash
   npx prisma generate
   ```

4. **Migration Errors**:
   ```bash
   # Reset migrations (⚠️ This will delete all data)
   npx prisma migrate reset
   
   # Or create a new migration
   npx prisma migrate dev --name migration_name
   ```

### Checking MySQL Status

```bash
# Windows
net start mysql

# macOS/Linux
sudo systemctl status mysql
# or
brew services list | grep mysql
```

## Database Schema Overview

The BeyondNine ERP system includes the following main entities:

- **School**: Multi-tenant school management
- **User**: Role-based user management (Super Admin, School Admin, Teacher, Student, Parent, etc.)
- **Student**: Extended student profiles with academic info
- **Teacher**: Extended teacher profiles with professional info
- **Parent**: Parent profiles with children relationships
- **Class**: Academic class structure
- **Subject**: Subject management
- **Attendance**: Student and teacher attendance tracking
- **Fee Management**: Fee structures and payment records
- **Examination**: Exam scheduling and result management
- **Events**: School events and registrations
- **Communication**: Announcements and notifications

For detailed schema information, refer to `prisma/schema.prisma`.