import { NextRequest, NextResponse } from 'next/server';

// Mock data for library management
const mockBooks = [
  {
    id: '1',
    isbn: '978-0-123456-78-9',
    title: 'Advanced Mathematics for Class 12',
    author: 'Dr. R.K. Sharma',
    publisher: 'Educational Publications',
    category: 'Mathematics',
    subject: 'Mathematics',
    class: '12th',
    totalCopies: 50,
    availableCopies: 42,
    issuedCopies: 8,
    price: 450,
    edition: '5th Edition',
    publicationYear: 2023,
    language: 'English',
    pages: 684,
    location: 'Section A, Shelf 1',
    status: 'Available',
    addedDate: '2023-03-15',
    lastUpdated: '2024-01-10'
  },
  {
    id: '2',
    isbn: '978-0-987654-32-1',
    title: 'Physics Fundamentals',
    author: 'Prof. S.C. Gupta',
    publisher: 'Science Publishers',
    category: 'Science',
    subject: 'Physics',
    class: '11th',
    totalCopies: 35,
    availableCopies: 28,
    issuedCopies: 7,
    price: 380,
    edition: '3rd Edition',
    publicationYear: 2022,
    language: 'English',
    pages: 512,
    location: 'Section B, Shelf 3',
    status: 'Available',
    addedDate: '2023-04-20',
    lastUpdated: '2024-01-08'
  },
  {
    id: '3',
    isbn: '978-0-456789-12-3',
    title: 'English Literature Anthology',
    author: 'Multiple Authors',
    publisher: 'Literary House',
    category: 'Literature',
    subject: 'English',
    class: '10th',
    totalCopies: 40,
    availableCopies: 35,
    issuedCopies: 5,
    price: 320,
    edition: '2nd Edition',
    publicationYear: 2023,
    language: 'English',
    pages: 428,
    location: 'Section C, Shelf 2',
    status: 'Available',
    addedDate: '2023-05-10',
    lastUpdated: '2024-01-12'
  }
];

const mockIssuedBooks = [
  {
    id: '1',
    bookId: '1',
    bookTitle: 'Advanced Mathematics for Class 12',
    isbn: '978-0-123456-78-9',
    studentId: 'S001',
    studentName: 'Rahul Kumar',
    class: '12th A',
    rollNo: '12A001',
    issueDate: '2024-01-05',
    dueDate: '2024-01-19',
    returnDate: null,
    status: 'Issued',
    fineAmount: 0,
    renewalCount: 0,
    maxRenewals: 2,
    issuedBy: 'Librarian Ms. Sharma'
  },
  {
    id: '2',
    bookId: '2',
    bookTitle: 'Physics Fundamentals',
    isbn: '978-0-987654-32-1',
    studentId: 'S002',
    studentName: 'Priya Singh',
    class: '11th B',
    rollNo: '11B015',
    issueDate: '2024-01-03',
    dueDate: '2024-01-17',
    returnDate: null,
    status: 'Overdue',
    fineAmount: 10,
    renewalCount: 1,
    maxRenewals: 2,
    issuedBy: 'Librarian Ms. Sharma'
  },
  {
    id: '3',
    bookId: '3',
    bookTitle: 'English Literature Anthology',
    isbn: '978-0-456789-12-3',
    studentId: 'S003',
    studentName: 'Amit Patel',
    class: '10th C',
    rollNo: '10C022',
    issueDate: '2023-12-20',
    dueDate: '2024-01-03',
    returnDate: '2024-01-02',
    status: 'Returned',
    fineAmount: 0,
    renewalCount: 0,
    maxRenewals: 2,
    issuedBy: 'Librarian Ms. Sharma'
  }
];

const mockMembers = [
  {
    id: 'S001',
    name: 'Rahul Kumar',
    type: 'Student',
    class: '12th A',
    rollNo: '12A001',
    membershipId: 'LIB001',
    joinDate: '2023-04-01',
    status: 'Active',
    booksIssued: 1,
    maxBooksAllowed: 3,
    fineAmount: 0,
    phone: '+91-9876543240',
    email: 'rahul.s001@school.com',
    address: '123 Student Street, Delhi'
  },
  {
    id: 'T001',
    name: 'Ms. Priya Sharma',
    type: 'Teacher',
    department: 'Mathematics',
    employeeId: 'EMP001',
    membershipId: 'LIB101',
    joinDate: '2022-06-15',
    status: 'Active',
    booksIssued: 2,
    maxBooksAllowed: 5,
    fineAmount: 0,
    phone: '+91-9876543241',
    email: 'priya.teacher@school.com',
    address: '456 Teacher Colony, Delhi'
  }
];

const mockDigitalResources = [
  {
    id: '1',
    title: 'Interactive Mathematics Videos',
    type: 'Video Course',
    subject: 'Mathematics',
    class: '12th',
    provider: 'EduTech Solutions',
    url: 'https://edutech.example.com/math-12',
    accessType: 'Subscription',
    validUntil: '2024-12-31',
    downloads: 245,
    rating: 4.8,
    description: 'Comprehensive video course covering all mathematics topics for class 12'
  },
  {
    id: '2',
    title: 'Physics Simulation Lab',
    type: 'Interactive Software',
    subject: 'Physics',
    class: '11th-12th',
    provider: 'SciLab Digital',
    url: 'https://scilab.example.com/physics-sim',
    accessType: 'Licensed',
    validUntil: '2025-03-31',
    downloads: 189,
    rating: 4.6,
    description: 'Virtual physics laboratory with interactive simulations'
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const category = searchParams.get('category');
    const subject = searchParams.get('subject');
    const studentId = searchParams.get('studentId');
    const search = searchParams.get('search');

    switch (type) {
      case 'issued':
        let filteredIssued = mockIssuedBooks;
        if (studentId) {
          filteredIssued = filteredIssued.filter(book => book.studentId === studentId);
        }
        return NextResponse.json({
          success: true,
          data: filteredIssued,
          total: filteredIssued.length
        });

      case 'members':
        return NextResponse.json({
          success: true,
          data: mockMembers,
          total: mockMembers.length
        });

      case 'digital':
        let filteredDigital = mockDigitalResources;
        if (subject) {
          filteredDigital = filteredDigital.filter(r => r.subject.toLowerCase().includes(subject.toLowerCase()));
        }
        return NextResponse.json({
          success: true,
          data: filteredDigital,
          total: filteredDigital.length
        });

      case 'analytics':
        return NextResponse.json({
          success: true,
          data: {
            totalBooks: mockBooks.reduce((sum, book) => sum + book.totalCopies, 0),
            availableBooks: mockBooks.reduce((sum, book) => sum + book.availableCopies, 0),
            issuedBooks: mockBooks.reduce((sum, book) => sum + book.issuedCopies, 0),
            totalMembers: mockMembers.length,
            activeMembers: mockMembers.filter(m => m.status === 'Active').length,
            overdueBooks: mockIssuedBooks.filter(b => b.status === 'Overdue').length,
            totalFines: mockIssuedBooks.reduce((sum, book) => sum + book.fineAmount, 0),
            popularBooks: [
              { title: 'Advanced Mathematics for Class 12', issues: 45 },
              { title: 'Physics Fundamentals', issues: 38 },
              { title: 'English Literature Anthology', issues: 32 }
            ],
            categoryStats: [
              { category: 'Mathematics', books: 25, issued: 18 },
              { category: 'Science', books: 32, issued: 24 },
              { category: 'Literature', books: 28, issued: 15 }
            ],
            monthlyTrends: [
              { month: 'Jan', issued: 156, returned: 142 },
              { month: 'Dec', issued: 134, returned: 138 },
              { month: 'Nov', issued: 128, returned: 125 }
            ]
          }
        });

      default:
        let filteredBooks = mockBooks;
        if (category) {
          filteredBooks = filteredBooks.filter(book => book.category.toLowerCase().includes(category.toLowerCase()));
        }
        if (subject) {
          filteredBooks = filteredBooks.filter(book => book.subject.toLowerCase().includes(subject.toLowerCase()));
        }
        if (search) {
          filteredBooks = filteredBooks.filter(book => 
            book.title.toLowerCase().includes(search.toLowerCase()) ||
            book.author.toLowerCase().includes(search.toLowerCase()) ||
            book.isbn.includes(search)
          );
        }
        return NextResponse.json({
          success: true,
          data: filteredBooks,
          total: filteredBooks.length
        });
    }
  } catch (error) {
    console.error('Error fetching library data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch library data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, ...data } = body;

    switch (type) {
      case 'book':
        const newBook = {
          id: (mockBooks.length + 1).toString(),
          ...data,
          availableCopies: data.totalCopies || 0,
          issuedCopies: 0,
          status: 'Available',
          addedDate: new Date().toISOString().split('T')[0],
          lastUpdated: new Date().toISOString().split('T')[0]
        };
        mockBooks.push(newBook);
        return NextResponse.json({
          success: true,
          message: 'Book added successfully',
          data: newBook
        });

      case 'issue':
        // Check if book is available
        const book = mockBooks.find(b => b.id === data.bookId);
        if (!book || book.availableCopies <= 0) {
          return NextResponse.json(
            { success: false, error: 'Book not available' },
            { status: 400 }
          );
        }

        // Check if student exists and can issue more books
        const member = mockMembers.find(m => m.id === data.studentId);
        if (!member) {
          return NextResponse.json(
            { success: false, error: 'Member not found' },
            { status: 404 }
          );
        }

        if (member.booksIssued >= member.maxBooksAllowed) {
          return NextResponse.json(
            { success: false, error: 'Maximum book limit reached' },
            { status: 400 }
          );
        }

        const issueDate = new Date();
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 14); // 14 days loan period

        const newIssue = {
          id: (mockIssuedBooks.length + 1).toString(),
          bookId: data.bookId,
          bookTitle: book.title,
          isbn: book.isbn,
          studentId: data.studentId,
          studentName: member.name,
          class: member.class || member.department || 'Unknown',
          rollNo: member.rollNo || member.employeeId || 'N/A',
          issueDate: issueDate.toISOString().split('T')[0],
          dueDate: dueDate.toISOString().split('T')[0],
          returnDate: null,
          status: 'Issued' as const,
          fineAmount: 0,
          renewalCount: 0,
          maxRenewals: 2,
          issuedBy: data.issuedBy || 'Librarian'
        };

        mockIssuedBooks.push(newIssue);

        // Update book and member counts
        book.availableCopies--;
        book.issuedCopies++;
        member.booksIssued++;

        return NextResponse.json({
          success: true,
          message: 'Book issued successfully',
          data: newIssue
        });

      case 'return':
        const issueRecord = mockIssuedBooks.find(record => record.id === data.issueId);
        if (!issueRecord || issueRecord.status === 'Returned') {
          return NextResponse.json(
            { success: false, error: 'Issue record not found or already returned' },
            { status: 404 }
          );
        }

        const returnDate = new Date();
        const dueDate_return = new Date(issueRecord.dueDate);
        let fineAmount = 0;

        // Calculate fine for overdue books (₹2 per day)
        if (returnDate > dueDate_return) {
          const daysOverdue = Math.ceil((returnDate.getTime() - dueDate_return.getTime()) / (1000 * 60 * 60 * 24));
          fineAmount = daysOverdue * 2;
        }

        // Update issue record
        issueRecord.returnDate = returnDate.toISOString().split('T')[0];
        issueRecord.status = 'Returned';
        issueRecord.fineAmount = fineAmount;

        // Update book and member counts
        const returnBook = mockBooks.find(b => b.id === issueRecord.bookId);
        const returnMember = mockMembers.find(m => m.id === issueRecord.studentId);
        
        if (returnBook) {
          returnBook.availableCopies++;
          returnBook.issuedCopies--;
        }
        
        if (returnMember) {
          returnMember.booksIssued--;
          returnMember.fineAmount += fineAmount;
        }

        return NextResponse.json({
          success: true,
          message: `Book returned successfully${fineAmount > 0 ? ` with fine ₹${fineAmount}` : ''}`,
          data: issueRecord
        });

      case 'member':
        const newMember = {
          id: data.type === 'Student' ? `S${(mockMembers.filter(m => m.type === 'Student').length + 1).toString().padStart(3, '0')}` : `T${(mockMembers.filter(m => m.type === 'Teacher').length + 1).toString().padStart(3, '0')}`,
          ...data,
          membershipId: `LIB${(mockMembers.length + 1).toString().padStart(3, '0')}`,
          joinDate: new Date().toISOString().split('T')[0],
          status: 'Active',
          booksIssued: 0,
          fineAmount: 0
        };
        mockMembers.push(newMember);
        return NextResponse.json({
          success: true,
          message: 'Member added successfully',
          data: newMember
        });

      case 'digital':
        const newDigitalResource = {
          id: (mockDigitalResources.length + 1).toString(),
          ...data,
          downloads: 0,
          rating: 0
        };
        mockDigitalResources.push(newDigitalResource);
        return NextResponse.json({
          success: true,
          message: 'Digital resource added successfully',
          data: newDigitalResource
        });

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid request type' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error creating library data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create library data' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, id, ...updateData } = body;

    switch (type) {
      case 'book':
        const bookIndex = mockBooks.findIndex(b => b.id === id);
        if (bookIndex === -1) {
          return NextResponse.json(
            { success: false, error: 'Book not found' },
            { status: 404 }
          );
        }
        mockBooks[bookIndex] = { 
          ...mockBooks[bookIndex], 
          ...updateData,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
        return NextResponse.json({
          success: true,
          message: 'Book updated successfully',
          data: mockBooks[bookIndex]
        });

      case 'member':
        const memberIndex = mockMembers.findIndex(m => m.id === id);
        if (memberIndex === -1) {
          return NextResponse.json(
            { success: false, error: 'Member not found' },
            { status: 404 }
          );
        }
        mockMembers[memberIndex] = { ...mockMembers[memberIndex], ...updateData };
        return NextResponse.json({
          success: true,
          message: 'Member updated successfully',
          data: mockMembers[memberIndex]
        });

      case 'renew':
        const renewRecord = mockIssuedBooks.find(record => record.id === id);
        if (!renewRecord || renewRecord.status !== 'Issued') {
          return NextResponse.json(
            { success: false, error: 'Issue record not found or not eligible for renewal' },
            { status: 404 }
          );
        }

        if (renewRecord.renewalCount >= renewRecord.maxRenewals) {
          return NextResponse.json(
            { success: false, error: 'Maximum renewals reached' },
            { status: 400 }
          );
        }

        const newDueDate = new Date(renewRecord.dueDate);
        newDueDate.setDate(newDueDate.getDate() + 14); // Extend by 14 days

        renewRecord.dueDate = newDueDate.toISOString().split('T')[0];
        renewRecord.renewalCount++;

        return NextResponse.json({
          success: true,
          message: 'Book renewed successfully',
          data: renewRecord
        });

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid request type' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error updating library data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update library data' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID is required' },
        { status: 400 }
      );
    }

    switch (type) {
      case 'book':
        const bookIndex = mockBooks.findIndex(b => b.id === id);
        if (bookIndex === -1) {
          return NextResponse.json(
            { success: false, error: 'Book not found' },
            { status: 404 }
          );
        }

        // Check if book has issued copies
        if (mockBooks[bookIndex].issuedCopies > 0) {
          return NextResponse.json(
            { success: false, error: 'Cannot delete book with issued copies' },
            { status: 400 }
          );
        }

        mockBooks.splice(bookIndex, 1);
        return NextResponse.json({
          success: true,
          message: 'Book deleted successfully'
        });

      case 'member':
        const memberIndex = mockMembers.findIndex(m => m.id === id);
        if (memberIndex === -1) {
          return NextResponse.json(
            { success: false, error: 'Member not found' },
            { status: 404 }
          );
        }

        // Check if member has issued books
        if (mockMembers[memberIndex].booksIssued > 0) {
          return NextResponse.json(
            { success: false, error: 'Cannot delete member with issued books' },
            { status: 400 }
          );
        }

        mockMembers.splice(memberIndex, 1);
        return NextResponse.json({
          success: true,
          message: 'Member deleted successfully'
        });

      case 'digital':
        const digitalIndex = mockDigitalResources.findIndex(d => d.id === id);
        if (digitalIndex === -1) {
          return NextResponse.json(
            { success: false, error: 'Digital resource not found' },
            { status: 404 }
          );
        }
        mockDigitalResources.splice(digitalIndex, 1);
        return NextResponse.json({
          success: true,
          message: 'Digital resource deleted successfully'
        });

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid request type' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error deleting library data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete library data' },
      { status: 500 }
    );
  }
}