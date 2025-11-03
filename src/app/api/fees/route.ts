import { NextRequest, NextResponse } from 'next/server';

// Mock fee data for demonstration
const mockFees = [
  {
    id: "FEE001",
    studentId: "ST001",
    studentName: "Aarav Sharma",
    class: "10th A",
    rollNumber: "101",
    feeType: "Tuition Fee",
    amount: 25000,
    dueDate: "2024-01-31",
    status: "Paid",
    paidDate: "2024-01-15",
    paidAmount: 25000,
    paymentMethod: "Online",
    receiptNo: "RCP001",
    late_fee: 0,
    discount: 0,
    academic_year: "2023-2024",
    term: "Q3",
    description: "Quarterly tuition fee for 10th grade"
  },
  {
    id: "FEE002",
    studentId: "ST002",
    studentName: "Priya Patel",
    class: "9th B",
    rollNumber: "205",
    feeType: "Tuition Fee",
    amount: 22000,
    dueDate: "2024-01-31",
    status: "Pending",
    paidDate: null,
    paidAmount: 0,
    paymentMethod: null,
    receiptNo: null,
    late_fee: 500,
    discount: 0,
    academic_year: "2023-2024",
    term: "Q3",
    description: "Quarterly tuition fee for 9th grade"
  },
  {
    id: "FEE003",
    studentId: "ST003",
    studentName: "Arjun Singh",
    class: "11th A",
    rollNumber: "301",
    feeType: "Transport Fee",
    amount: 5000,
    dueDate: "2024-01-31",
    status: "Paid",
    paidDate: "2024-01-20",
    paidAmount: 5000,
    paymentMethod: "Cash",
    receiptNo: "RCP002",
    late_fee: 0,
    discount: 500,
    academic_year: "2023-2024",
    term: "Q3",
    description: "Quarterly transport fee"
  },
  {
    id: "FEE004",
    studentId: "ST001",
    studentName: "Aarav Sharma",
    class: "10th A",
    rollNumber: "101",
    feeType: "Library Fee",
    amount: 2000,
    dueDate: "2024-02-15",
    status: "Overdue",
    paidDate: null,
    paidAmount: 0,
    paymentMethod: null,
    receiptNo: null,
    late_fee: 200,
    discount: 0,
    academic_year: "2023-2024",
    term: "Q3",
    description: "Library and laboratory fee"
  }
];

const mockFeeStructures = [
  {
    id: "FS001",
    name: "Tuition Fee",
    class: "10th Grade",
    amount: 25000,
    frequency: "Quarterly",
    dueDate: "Last day of each quarter",
    isOptional: false,
    description: "Regular tuition fee for 10th grade students"
  },
  {
    id: "FS002",
    name: "Transport Fee",
    class: "All Classes",
    amount: 5000,
    frequency: "Quarterly",
    dueDate: "Last day of each quarter",
    isOptional: true,
    description: "School bus transportation fee"
  },
  {
    id: "FS003",
    name: "Hostel Fee",
    class: "All Classes",
    amount: 15000,
    frequency: "Quarterly",
    dueDate: "1st day of each quarter",
    isOptional: true,
    description: "Hostel accommodation and meals"
  }
];

// GET - Fetch fees with filtering and pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // 'fees' or 'structures'
    const studentId = searchParams.get('studentId');
    const class_filter = searchParams.get('class');
    const status = searchParams.get('status');
    const feeType = searchParams.get('feeType');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    if (type === 'structures') {
      // Return fee structures
      let filteredStructures = [...mockFeeStructures];
      
      if (class_filter && class_filter !== 'All Classes') {
        filteredStructures = filteredStructures.filter(s => s.class === class_filter);
      }

      return NextResponse.json({
        success: true,
        data: {
          feeStructures: filteredStructures,
          total: filteredStructures.length
        },
        message: 'Fee structures retrieved successfully'
      });
    }

    // Return fee records
    let filteredFees = [...mockFees];

    // Apply filters
    if (studentId) {
      filteredFees = filteredFees.filter(fee => fee.studentId === studentId);
    }

    if (class_filter) {
      filteredFees = filteredFees.filter(fee => fee.class === class_filter);
    }

    if (status) {
      filteredFees = filteredFees.filter(fee => fee.status === status);
    }

    if (feeType) {
      filteredFees = filteredFees.filter(fee => fee.feeType === feeType);
    }

    if (startDate && endDate) {
      filteredFees = filteredFees.filter(fee => {
        const feeDate = new Date(fee.dueDate);
        return feeDate >= new Date(startDate) && feeDate <= new Date(endDate);
      });
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedFees = filteredFees.slice(startIndex, endIndex);

    // Calculate summary statistics
    const totalAmount = filteredFees.reduce((sum, fee) => sum + fee.amount, 0);
    const paidAmount = filteredFees
      .filter(fee => fee.status === 'Paid')
      .reduce((sum, fee) => sum + fee.paidAmount, 0);
    const pendingAmount = filteredFees
      .filter(fee => fee.status === 'Pending')
      .reduce((sum, fee) => sum + fee.amount, 0);
    const overdueAmount = filteredFees
      .filter(fee => fee.status === 'Overdue')
      .reduce((sum, fee) => sum + (fee.amount + fee.late_fee), 0);

    const summary = {
      totalFees: filteredFees.length,
      totalAmount,
      paidAmount,
      pendingAmount,
      overdueAmount,
      collectionRate: totalAmount > 0 ? Math.round((paidAmount / totalAmount) * 100) : 0,
      pendingCount: filteredFees.filter(fee => fee.status === 'Pending').length,
      overdueCount: filteredFees.filter(fee => fee.status === 'Overdue').length,
      paidCount: filteredFees.filter(fee => fee.status === 'Paid').length
    };

    return NextResponse.json({
      success: true,
      data: {
        fees: paginatedFees,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(filteredFees.length / limit),
          totalFees: filteredFees.length,
          feesPerPage: limit
        },
        summary
      },
      message: 'Fees retrieved successfully'
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch fees',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
}

// POST - Create new fee record or fee structure
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type } = body;

    if (type === 'structure') {
      // Create fee structure
      const requiredFields = ['name', 'class', 'amount', 'frequency'];
      for (const field of requiredFields) {
        if (!body[field]) {
          return NextResponse.json(
            {
              success: false,
              error: `Missing required field: ${field}`,
              message: 'Please provide all required fields for fee structure'
            },
            { status: 400 }
          );
        }
      }

      const newStructure = {
        id: `FS${String(mockFeeStructures.length + 1).padStart(3, '0')}`,
        name: body.name,
        class: body.class,
        amount: parseFloat(body.amount),
        frequency: body.frequency,
        dueDate: body.dueDate || 'End of term',
        isOptional: body.isOptional || false,
        description: body.description || ''
      };

      mockFeeStructures.push(newStructure);

      return NextResponse.json(
        {
          success: true,
          data: newStructure,
          message: 'Fee structure created successfully'
        },
        { status: 201 }
      );
    } else {
      // Create fee record
      const requiredFields = ['studentId', 'feeType', 'amount', 'dueDate'];
      for (const field of requiredFields) {
        if (!body[field]) {
          return NextResponse.json(
            {
              success: false,
              error: `Missing required field: ${field}`,
              message: 'Please provide all required fields for fee record'
            },
            { status: 400 }
          );
        }
      }

      const newFee = {
        id: `FEE${String(mockFees.length + 1).padStart(3, '0')}`,
        studentId: body.studentId,
        studentName: body.studentName || 'Unknown Student',
        class: body.class || 'Unknown Class',
        rollNumber: body.rollNumber || 'N/A',
        feeType: body.feeType,
        amount: parseFloat(body.amount),
        dueDate: body.dueDate,
        status: 'Pending',
        paidDate: null,
        paidAmount: 0,
        paymentMethod: null,
        receiptNo: null,
        late_fee: 0,
        discount: parseFloat(body.discount) || 0,
        academic_year: body.academic_year || new Date().getFullYear() + '-' + (new Date().getFullYear() + 1),
        term: body.term || 'Q1',
        description: body.description || ''
      };

      mockFees.push(newFee);

      return NextResponse.json(
        {
          success: true,
          data: newFee,
          message: 'Fee record created successfully'
        },
        { status: 201 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create fee record',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
}

// PUT - Update fee record (mark as paid, apply discount, etc.)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { feeId, action, ...updates } = body;

    if (!feeId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Fee ID is required',
          message: 'Please provide fee ID for update'
        },
        { status: 400 }
      );
    }

    const feeIndex = mockFees.findIndex(fee => fee.id === feeId);
    if (feeIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: 'Fee record not found',
          message: 'Fee record with provided ID does not exist'
        },
        { status: 404 }
      );
    }

    const fee = mockFees[feeIndex];

    if (action === 'mark_paid') {
      // Mark fee as paid
      fee.status = 'Paid';
      fee.paidDate = new Date().toISOString().split('T')[0];
      fee.paidAmount = updates.paidAmount || fee.amount;
      fee.paymentMethod = updates.paymentMethod || 'Online';
      fee.receiptNo = updates.receiptNo || `RCP${String(Date.now()).slice(-6)}`;
    } else if (action === 'apply_discount') {
      // Apply discount
      fee.discount = updates.discount || 0;
      fee.amount = fee.amount - fee.discount;
    } else if (action === 'add_late_fee') {
      // Add late fee for overdue payments
      fee.late_fee = updates.late_fee || 0;
      fee.status = 'Overdue';
    } else {
      // General update
      Object.keys(updates).forEach(key => {
        if (updates[key] !== undefined) {
          (fee as any)[key] = updates[key];
        }
      });
    }

    return NextResponse.json({
      success: true,
      data: fee,
      message: 'Fee record updated successfully'
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update fee record',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete fee record
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const feeId = searchParams.get('feeId');

    if (!feeId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Fee ID is required',
          message: 'Please provide fee ID for deletion'
        },
        { status: 400 }
      );
    }

    const feeIndex = mockFees.findIndex(fee => fee.id === feeId);
    if (feeIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: 'Fee record not found',
          message: 'Fee record with provided ID does not exist'
        },
        { status: 404 }
      );
    }

    const deletedFee = mockFees.splice(feeIndex, 1)[0];

    return NextResponse.json({
      success: true,
      data: deletedFee,
      message: 'Fee record deleted successfully'
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete fee record',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
}