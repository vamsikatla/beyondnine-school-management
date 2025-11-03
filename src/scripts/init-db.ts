import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function initializeDatabase() {
  try {
    console.log('Initializing database...');

    // Create a default school if none exists
    const schoolCount = await prisma.school.count();
    if (schoolCount === 0) {
      console.log('Creating default school...');
      await prisma.school.create({
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
      console.log('Default school created successfully');
    } else {
      console.log(`Found ${schoolCount} existing schools`);
    }

    // Create demo users if none exist
    const userCount = await prisma.user.count();
    if (userCount === 0) {
      console.log('Creating demo users...');
      
      const school = await prisma.school.findFirst();
      if (!school) {
        throw new Error('No school found to associate users with');
      }

      // Create demo users for each role
      const demoUsers = [
        {
          email: 'admin@beyondnine.com',
          username: 'admin',
          password: 'admin123', // In production, this should be properly hashed
          firstName: 'Super',
          lastName: 'Admin',
          role: 'SUPER_ADMIN',
          schoolId: school.id
        },
        {
          email: 'school@beyondnine.com',
          username: 'school_admin',
          password: 'school123',
          firstName: 'School',
          lastName: 'Admin',
          role: 'SCHOOL_ADMIN',
          schoolId: school.id
        },
        {
          email: 'teacher@beyondnine.com',
          username: 'teacher',
          password: 'teacher123',
          firstName: 'Demo',
          lastName: 'Teacher',
          role: 'TEACHER',
          schoolId: school.id
        },
        {
          email: 'student@beyondnine.com',
          username: 'student',
          password: 'student123',
          firstName: 'Demo',
          lastName: 'Student',
          role: 'STUDENT',
          schoolId: school.id
        },
        {
          email: 'parent@beyondnine.com',
          username: 'parent',
          password: 'parent123',
          firstName: 'Demo',
          lastName: 'Parent',
          role: 'PARENT',
          schoolId: school.id
        }
      ];

      for (const userData of demoUsers) {
        await prisma.user.create({
          data: userData
        });
        console.log(`Created demo user: ${userData.email}`);
      }
    } else {
      console.log(`Found ${userCount} existing users`);
    }

    console.log('Database initialization completed successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the initialization
initializeDatabase().catch((error) => {
  console.error('Fatal error during database initialization:', error);
  process.exit(1);
});