import { NextRequest, NextResponse } from 'next/server';

// Mock data for examinations
const mockExams = [
  {
    id: '1',
    title: 'Mathematics Unit Test 1',
    subject: 'Mathematics',
    class: '10th Grade',
    type: 'Unit Test',
    date: '2024-01-20',
    duration: '90 minutes',
    totalMarks: 100,
    status: 'Scheduled',
    questions: 25,
    studentsEnrolled: 45,
    createdBy: 'John Smith',
    description: 'First unit test covering algebra and geometry basics'
  },
  {
    id: '2',
    title: 'Science Mid-term Examination',
    subject: 'Science',
    class: '9th Grade',
    type: 'Mid-term',
    date: '2024-01-25',
    duration: '120 minutes',
    totalMarks: 150,
    status: 'In Progress',
    questions: 40,
    studentsEnrolled: 52,
    createdBy: 'Sarah Johnson',
    description: 'Mid-term examination covering physics, chemistry, and biology'
  },
  {
    id: '3',
    title: 'English Literature Final',
    subject: 'English',
    class: '11th Grade',
    type: 'Final',
    date: '2024-01-15',
    duration: '150 minutes',
    totalMarks: 200,
    status: 'Completed',
    questions: 30,
    studentsEnrolled: 38,
    createdBy: 'Emily Davis',
    description: 'Final examination covering poetry, prose, and drama'
  }
];

const mockQuestionBanks = [
  {
    id: '1',
    subject: 'Mathematics',
    topic: 'Algebra',
    difficulty: 'Medium',
    type: 'MCQ',
    question: 'What is the value of x in the equation 2x + 5 = 15?',
    options: ['3', '5', '7', '10'],
    correctAnswer: '5',
    marks: 2,
    explanation: 'Solve: 2x + 5 = 15, 2x = 10, x = 5',
    createdBy: 'John Smith',
    createdAt: '2024-01-10'
  },
  {
    id: '2',
    subject: 'Science',
    topic: 'Physics',
    difficulty: 'Hard',
    type: 'Essay',
    question: 'Explain Newton\'s three laws of motion with real-life examples.',
    options: [],
    correctAnswer: '',
    marks: 10,
    explanation: 'Comprehensive answer should cover all three laws with examples',
    createdBy: 'Sarah Johnson',
    createdAt: '2024-01-12'
  }
];

const mockResults = [
  {
    id: '1',
    examId: '3',
    studentId: 'S001',
    studentName: 'Alice Brown',
    class: '11th Grade',
    subject: 'English',
    marksObtained: 175,
    totalMarks: 200,
    percentage: 87.5,
    grade: 'A',
    rank: 1,
    status: 'Pass',
    submittedAt: '2024-01-15T14:30:00Z',
    timeTaken: '135 minutes'
  },
  {
    id: '2',
    examId: '3',
    studentId: 'S002',
    studentName: 'Bob Wilson',
    class: '11th Grade',
    subject: 'English',
    marksObtained: 162,
    totalMarks: 200,
    percentage: 81.0,
    grade: 'A',
    rank: 2,
    status: 'Pass',
    submittedAt: '2024-01-15T14:25:00Z',
    timeTaken: '142 minutes'
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const examId = searchParams.get('examId');
    const subject = searchParams.get('subject');

    switch (type) {
      case 'questions':
        const filteredQuestions = subject 
          ? mockQuestionBanks.filter(q => q.subject.toLowerCase().includes(subject.toLowerCase()))
          : mockQuestionBanks;
        return NextResponse.json({
          success: true,
          data: filteredQuestions,
          total: filteredQuestions.length
        });

      case 'results':
        const filteredResults = examId 
          ? mockResults.filter(r => r.examId === examId)
          : mockResults;
        return NextResponse.json({
          success: true,
          data: filteredResults,
          total: filteredResults.length
        });

      case 'analytics':
        return NextResponse.json({
          success: true,
          data: {
            totalExams: mockExams.length,
            completedExams: mockExams.filter(e => e.status === 'Completed').length,
            scheduledExams: mockExams.filter(e => e.status === 'Scheduled').length,
            inProgressExams: mockExams.filter(e => e.status === 'In Progress').length,
            averageScore: 84.25,
            passRate: 92.5,
            topPerformers: [
              { name: 'Alice Brown', score: 87.5, class: '11th Grade' },
              { name: 'Bob Wilson', score: 81.0, class: '11th Grade' }
            ],
            subjectPerformance: [
              { subject: 'Mathematics', avgScore: 78.5, passRate: 88 },
              { subject: 'Science', avgScore: 82.3, passRate: 95 },
              { subject: 'English', avgScore: 84.25, passRate: 92 }
            ]
          }
        });

      default:
        const filteredExams = subject 
          ? mockExams.filter(e => e.subject.toLowerCase().includes(subject.toLowerCase()))
          : mockExams;
        return NextResponse.json({
          success: true,
          data: filteredExams,
          total: filteredExams.length
        });
    }
  } catch (error) {
    console.error('Error fetching exams:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch exams' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, ...data } = body;

    switch (type) {
      case 'exam':
        const newExam = {
          id: (mockExams.length + 1).toString(),
          ...data,
          status: 'Scheduled',
          createdAt: new Date().toISOString(),
          studentsEnrolled: 0
        };
        mockExams.push(newExam);
        return NextResponse.json({
          success: true,
          message: 'Exam created successfully',
          data: newExam
        });

      case 'question':
        const newQuestion = {
          id: (mockQuestionBanks.length + 1).toString(),
          ...data,
          createdAt: new Date().toISOString()
        };
        mockQuestionBanks.push(newQuestion);
        return NextResponse.json({
          success: true,
          message: 'Question added successfully',
          data: newQuestion
        });

      case 'result':
        const newResult = {
          id: (mockResults.length + 1).toString(),
          ...data,
          submittedAt: new Date().toISOString()
        };
        mockResults.push(newResult);
        return NextResponse.json({
          success: true,
          message: 'Result recorded successfully',
          data: newResult
        });

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid request type' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error creating exam data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create exam data' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, id, ...updateData } = body;

    switch (type) {
      case 'exam':
        const examIndex = mockExams.findIndex(e => e.id === id);
        if (examIndex === -1) {
          return NextResponse.json(
            { success: false, error: 'Exam not found' },
            { status: 404 }
          );
        }
        mockExams[examIndex] = { ...mockExams[examIndex], ...updateData };
        return NextResponse.json({
          success: true,
          message: 'Exam updated successfully',
          data: mockExams[examIndex]
        });

      case 'question':
        const questionIndex = mockQuestionBanks.findIndex(q => q.id === id);
        if (questionIndex === -1) {
          return NextResponse.json(
            { success: false, error: 'Question not found' },
            { status: 404 }
          );
        }
        mockQuestionBanks[questionIndex] = { ...mockQuestionBanks[questionIndex], ...updateData };
        return NextResponse.json({
          success: true,
          message: 'Question updated successfully',
          data: mockQuestionBanks[questionIndex]
        });

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid request type' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error updating exam data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update exam data' },
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
      case 'exam':
        const examIndex = mockExams.findIndex(e => e.id === id);
        if (examIndex === -1) {
          return NextResponse.json(
            { success: false, error: 'Exam not found' },
            { status: 404 }
          );
        }
        mockExams.splice(examIndex, 1);
        return NextResponse.json({
          success: true,
          message: 'Exam deleted successfully'
        });

      case 'question':
        const questionIndex = mockQuestionBanks.findIndex(q => q.id === id);
        if (questionIndex === -1) {
          return NextResponse.json(
            { success: false, error: 'Question not found' },
            { status: 404 }
          );
        }
        mockQuestionBanks.splice(questionIndex, 1);
        return NextResponse.json({
          success: true,
          message: 'Question deleted successfully'
        });

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid request type' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error deleting exam data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete exam data' },
      { status: 500 }
    );
  }
}