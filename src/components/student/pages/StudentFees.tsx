"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useStudentFeeModals } from '@/contexts/StudentModalContext';
import { 
  CreditCard, 
  Download, 
  Eye, 
  AlertTriangle, 
  Calendar,
  Receipt,
  Search,
  Filter,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  FileText,
  Wallet,
  TrendingUp,
  History
} from 'lucide-react';

interface FeeItem {
  id: string;
  category: string;
  description: string;
  amount: number;
  paid: number;
  due: number;
  dueDate: string;
  status: 'paid' | 'partial' | 'overdue' | 'pending';
  installments?: {
    installmentNumber: number;
    amount: number;
    dueDate: string;
    status: 'paid' | 'pending' | 'overdue';
  }[];
}

interface PaymentRecord {
  id: string;
  transactionId: string;
  date: string;
  amount: number;
  feeCategory: string;
  paymentMethod: 'upi' | 'card' | 'netbanking' | 'cash' | 'cheque';
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  receiptUrl?: string;
  remarks?: string;
}

const StudentFees: React.FC = () => {
  const { viewFeeDetails, payFees, viewPaymentHistory } = useStudentFeeModals();
  const [feeStructure, setFeeStructure] = useState<FeeItem[]>([]);
  const [paymentHistory, setPaymentHistory] = useState<PaymentRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedSemester, setSelectedSemester] = useState<string>('current');
  const [viewMode, setViewMode] = useState<'overview' | 'detailed' | 'history'>('overview');

  // Mock data
  useEffect(() => {
    const mockFeeStructure: FeeItem[] = [
      {
        id: '1',
        category: 'Tuition Fee',
        description: 'Semester 1 - Academic Year 2024-25',
        amount: 50000,
        paid: 25000,
        due: 25000,
        dueDate: '2024-02-15',
        status: 'partial',
        installments: [
          { installmentNumber: 1, amount: 25000, dueDate: '2024-01-15', status: 'paid' },
          { installmentNumber: 2, amount: 25000, dueDate: '2024-02-15', status: 'pending' }
        ]
      },
      {
        id: '2',
        category: 'Laboratory Fee',
        description: 'Physics, Chemistry, Biology Labs',
        amount: 8000,
        paid: 8000,
        due: 0,
        dueDate: '2024-01-10',
        status: 'paid'
      },
      {
        id: '3',
        category: 'Library Fee',
        description: 'Annual library access and book deposit',
        amount: 3000,
        paid: 3000,
        due: 0,
        dueDate: '2024-01-05',
        status: 'paid'
      },
      {
        id: '4',
        category: 'Sports & Activities Fee',
        description: 'Sports equipment and activity participation',
        amount: 5000,
        paid: 0,
        due: 5000,
        dueDate: '2024-01-20',
        status: 'overdue'
      },
      {
        id: '5',
        category: 'Examination Fee',
        description: 'Mid-term and Final examinations',
        amount: 2500,
        paid: 0,
        due: 2500,
        dueDate: '2024-02-01',
        status: 'pending'
      },
      {
        id: '6',
        category: 'Transport Fee',
        description: 'Bus service for Semester 1',
        amount: 12000,
        paid: 6000,
        due: 6000,
        dueDate: '2024-02-10',
        status: 'partial'
      }
    ];

    const mockPaymentHistory: PaymentRecord[] = [
      {
        id: '1',
        transactionId: 'TXN001234567',
        date: '2024-01-15',
        amount: 25000,
        feeCategory: 'Tuition Fee - Installment 1',
        paymentMethod: 'upi',
        status: 'completed',
        receiptUrl: '/receipts/txn001234567.pdf'
      },
      {
        id: '2',
        transactionId: 'TXN001234568',
        date: '2024-01-10',
        amount: 8000,
        feeCategory: 'Laboratory Fee',
        paymentMethod: 'netbanking',
        status: 'completed',
        receiptUrl: '/receipts/txn001234568.pdf'
      },
      {
        id: '3',
        transactionId: 'TXN001234569',
        date: '2024-01-05',
        amount: 3000,
        feeCategory: 'Library Fee',
        paymentMethod: 'card',
        status: 'completed',
        receiptUrl: '/receipts/txn001234569.pdf'
      },
      {
        id: '4',
        transactionId: 'TXN001234570',
        date: '2024-01-12',
        amount: 6000,
        feeCategory: 'Transport Fee - Partial Payment',
        paymentMethod: 'upi',
        status: 'completed',
        receiptUrl: '/receipts/txn001234570.pdf'
      },
      {
        id: '5',
        transactionId: 'TXN001234571',
        date: '2024-01-08',
        amount: 1000,
        feeCategory: 'Late Fee Penalty',
        paymentMethod: 'cash',
        status: 'completed',
        remarks: 'Late payment penalty for previous semester'
      }
    ];

    setFeeStructure(mockFeeStructure);
    setPaymentHistory(mockPaymentHistory);
  }, []);

  const totalAmount = feeStructure.reduce((sum, fee) => sum + fee.amount, 0);
  const totalPaid = feeStructure.reduce((sum, fee) => sum + fee.paid, 0);
  const totalDue = feeStructure.reduce((sum, fee) => sum + fee.due, 0);
  const overdueAmount = feeStructure
    .filter(fee => fee.status === 'overdue')
    .reduce((sum, fee) => sum + fee.due, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'partial':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'pending':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'overdue':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'upi':
        return '📱';
      case 'card':
        return '💳';
      case 'netbanking':
        return '🏦';
      case 'cash':
        return '💵';
      case 'cheque':
        return '📝';
      default:
        return '💰';
    }
  };

  const filteredFees = feeStructure.filter(fee => {
    const matchesSearch = fee.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fee.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || fee.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Fee Management</h1>
          <p className="text-gray-600">Track your fees, make payments, and view payment history</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => viewPaymentHistory()}>
            <History className="mr-2 h-4 w-4" />
            Payment History
          </Button>
          {totalDue > 0 && (
            <Button onClick={() => payFees({ amount: totalDue })}>
              <CreditCard className="mr-2 h-4 w-4" />
              Pay Fees
            </Button>
          )}
        </div>
      </div>

      {/* View Mode Selector */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'overview' ? 'default' : 'outline'}
            onClick={() => setViewMode('overview')}
            size="sm"
          >
            <DollarSign className="h-4 w-4 mr-2" />
            Overview
          </Button>
          <Button
            variant={viewMode === 'detailed' ? 'default' : 'outline'}
            onClick={() => setViewMode('detailed')}
            size="sm"
          >
            <FileText className="h-4 w-4 mr-2" />
            Detailed
          </Button>
          <Button
            variant={viewMode === 'history' ? 'default' : 'outline'}
            onClick={() => setViewMode('history')}
            size="sm"
          >
            <History className="h-4 w-4 mr-2" />
            History
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedSemester} onValueChange={setSelectedSemester}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select Semester" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Current Semester</SelectItem>
              <SelectItem value="previous">Previous Semester</SelectItem>
              <SelectItem value="all">All Semesters</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {viewMode === 'overview' && (
        <>
          {/* Fee Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Fees</p>
                    <p className="text-2xl font-bold text-blue-600">₹{totalAmount.toLocaleString()}</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <DollarSign className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Amount Paid</p>
                    <p className="text-2xl font-bold text-green-600">₹{totalPaid.toLocaleString()}</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="mt-2">
                  <div className="text-xs text-gray-500">
                    {((totalPaid / totalAmount) * 100).toFixed(1)}% completed
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Outstanding</p>
                    <p className="text-2xl font-bold text-red-600">₹{totalDue.toLocaleString()}</p>
                  </div>
                  <div className="p-3 bg-red-100 rounded-full">
                    <XCircle className="h-6 w-6 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Overdue</p>
                    <p className="text-2xl font-bold text-orange-600">₹{overdueAmount.toLocaleString()}</p>
                  </div>
                  <div className="p-3 bg-orange-100 rounded-full">
                    <AlertTriangle className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Outstanding Fees Alert */}
          {overdueAmount > 0 && (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-red-800">Overdue Fees Alert</h3>
                    <p className="text-sm text-red-700">
                      You have ₹{overdueAmount.toLocaleString()} in overdue fees. Please pay immediately to avoid additional penalties.
                    </p>
                  </div>
                  <Button variant="destructive" onClick={() => payFees({ amount: overdueAmount, priority: 'overdue' })}>
                    Pay Overdue
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Fee Structure */}
          <Card>
            <CardHeader>
              <CardTitle>Fee Structure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {feeStructure.map((fee) => (
                  <div key={fee.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-medium">{fee.category}</h4>
                        <Badge variant="outline" className={getStatusColor(fee.status)}>
                          {fee.status.charAt(0).toUpperCase() + fee.status.slice(1)}
                        </Badge>
                        {isOverdue(fee.dueDate) && fee.due > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            Overdue
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{fee.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Total: ₹{fee.amount.toLocaleString()}</span>
                        <span>Paid: ₹{fee.paid.toLocaleString()}</span>
                        {fee.due > 0 && (
                          <span className="text-red-600">Due: ₹{fee.due.toLocaleString()}</span>
                        )}
                        <span>Due Date: {new Date(fee.dueDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-green-500"
                          style={{ width: `${(fee.paid / fee.amount) * 100}%` }}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => viewFeeDetails({ feeId: fee.id })}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Details
                        </Button>
                        {fee.due > 0 && (
                          <Button
                            size="sm"
                            onClick={() => payFees({ feeId: fee.id, amount: fee.due })}
                          >
                            <CreditCard className="h-4 w-4 mr-1" />
                            Pay
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {viewMode === 'detailed' && (
        <>
          {/* Search and Filter */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Search fees..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="partial">Partial</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Fee List */}
          <div className="space-y-4">
            {filteredFees.map((fee) => (
              <Card key={fee.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{fee.category}</h3>
                        <Badge variant="outline" className={getStatusColor(fee.status)}>
                          {fee.status.charAt(0).toUpperCase() + fee.status.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-2">{fee.description}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Total Amount:</span>
                          <div className="font-semibold">₹{fee.amount.toLocaleString()}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Paid:</span>
                          <div className="font-semibold text-green-600">₹{fee.paid.toLocaleString()}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Outstanding:</span>
                          <div className="font-semibold text-red-600">₹{fee.due.toLocaleString()}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Due Date:</span>
                          <div className={`font-semibold ${isOverdue(fee.dueDate) && fee.due > 0 ? 'text-red-600' : 'text-gray-900'}`}>
                            {new Date(fee.dueDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => viewFeeDetails({ feeId: fee.id })}>
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      {fee.due > 0 && (
                        <Button size="sm" onClick={() => payFees({ feeId: fee.id, amount: fee.due })}>
                          <CreditCard className="h-4 w-4 mr-1" />
                          Pay ₹{fee.due.toLocaleString()}
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Payment Progress</span>
                      <span>{((fee.paid / fee.amount) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${(fee.paid / fee.amount) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Installments */}
                  {fee.installments && (
                    <div>
                      <h4 className="font-medium mb-2">Installments</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {fee.installments.map((installment) => (
                          <div key={installment.installmentNumber} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <span className="text-sm font-medium">Installment {installment.installmentNumber}</span>
                              <div className="text-xs text-gray-500">Due: {new Date(installment.dueDate).toLocaleDateString()}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold">₹{installment.amount.toLocaleString()}</div>
                              <Badge variant="outline" className={getStatusColor(installment.status)} size="sm">
                                {installment.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      {viewMode === 'history' && (
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paymentHistory.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{getPaymentMethodIcon(payment.paymentMethod)}</div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-medium">{payment.feeCategory}</h4>
                        <Badge variant="outline" className={
                          payment.status === 'completed' ? 'bg-green-100 text-green-800' :
                          payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          payment.status === 'failed' ? 'bg-red-100 text-red-800' :
                          'bg-blue-100 text-blue-800'
                        }>
                          {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600">
                        <span>Transaction ID: {payment.transactionId}</span>
                        <span className="mx-2">•</span>
                        <span>{new Date(payment.date).toLocaleDateString()}</span>
                        <span className="mx-2">•</span>
                        <span className="capitalize">{payment.paymentMethod}</span>
                      </div>
                      {payment.remarks && (
                        <p className="text-xs text-blue-600 mt-1">{payment.remarks}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="font-bold text-lg">₹{payment.amount.toLocaleString()}</div>
                    </div>
                    {payment.receiptUrl && (
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Receipt
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StudentFees;