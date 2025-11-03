import { PrismaClient } from '@prisma/client';

async function testDatabaseConnection() {
  const prisma = new PrismaClient();
  
  try {
    console.log('Testing database connection...');
    
    // Test connection by querying the database
    await prisma.$connect();
    console.log('✅ Database connection successful!');
    
    // Try to query for schools
    const schools = await prisma.school.findMany();
    console.log(`Found ${schools.length} schools in the database`);
    
    // If no schools exist, create a demo school
    if (schools.length === 0) {
      console.log('Creating demo school...');
      const demoSchool = await prisma.school.create({
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
      console.log('✅ Demo school created:', demoSchool.name);
    }
    
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }
  } finally {
    await prisma.$disconnect();
    console.log('Database connection closed');
  }
}

testDatabaseConnection();