import React, { useState, useEffect } from 'react';
import { Save, X, Calculator, DollarSign, Calendar, User, CreditCard, AlertCircle, CheckCircle } from 'lucide-react';
import { Modal } from "../Modal";
import { Button } from '../Button';
import { Input } from '../Input';
import { Select, SelectItem } from '../Select';
import { Card } from '../Card';
import { Badge } from '../Badge';

interface FeeStructureData {
  id?: string;
  name: string;
  type: 'tuition' | 'transport' | 'hostel' | 'library' | 'sports' | 'lab' | 'exam' | 'admission' | 'other';
  amount: number;
  frequency: 'monthly' | 'quarterly' | 'yearly' | 'one_time';
  applicableGrades: string[];
  dueDate: string;
  lateFeePenalty: number;
  description: string;
  isActive: boolean;
}

interface PaymentRecord {
  id: string;
  studentId: string;
  studentName: string;
  feeStructureId: string;
  amount: number;
  paidAmount: number;
  balance: number;
  paymentDate?: string;
  dueDate: string;
  status: 'paid' | 'partial' | 'pending' | 'overdue';
  paymentMethod?: 'cash' | 'card' | 'upi' | 'bank_transfer' | 'cheque';
  transactionId?: string;
  remarks?: string;
}

interface FeeManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'fee_structure' | 'payment_collection' | 'payment_history' | 'fee_report';
  onSubmit: (data: any) => Promise<void>;
  initialData?: any;
  students?: any[];
  existingPayments?: PaymentRecord[];
}

const FEE_TYPES = [
  { value: 'tuition', label: 'Tuition Fee', icon: '📚' },
  { value: 'transport', label: 'Transport Fee', icon: '🚌' },
  { value: 'hostel', label: 'Hostel Fee', icon: '🏠' },
  { value: 'library', label: 'Library Fee', icon: '📖' },
  { value: 'sports', label: 'Sports Fee', icon: '⚽' },
  { value: 'lab', label: 'Laboratory Fee', icon: '🔬' },
  { value: 'exam', label: 'Exam Fee', icon: '📝' },
  { value: 'admission', label: 'Admission Fee', icon: '🎓' },
  { value: 'other', label: 'Other Fee', icon: '💰' }
];

const GRADES = ['Kindergarten', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];

const PAYMENT_METHODS = [
  { value: 'cash', label: 'Cash' },
  { value: 'card', label: 'Card Payment' },
  { value: 'upi', label: 'UPI' },
  { value: 'bank_transfer', label: 'Bank Transfer' },
  { value: 'cheque', label: 'Cheque' }
];

export const FeeManagementModal: React.FC<FeeManagementModalProps> = ({
  isOpen,
  onClose,
  mode,
  onSubmit,
  initialData = {},
  students = [],
  existingPayments = []
}) => {
  const [feeStructureData, setFeeStructureData] = useState<FeeStructureData>({
    name: '',
    type: 'tuition',
    amount: 0,
    frequency: 'monthly',
    applicableGrades: [],
    dueDate: '',
    lateFeePenalty: 0,
    description: '',
    isActive: true,
    ...initialData
  });

  const [paymentData, setPaymentData] = useState({
    studentId: '',
    studentName: '',
    feeStructureId: '',
    amount: 0,
    paidAmount: 0,
    paymentMethod: 'cash',
    transactionId: '',
    remarks: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [outstandingFees, setOutstandingFees] = useState<PaymentRecord[]>([]);

  useEffect(() => {
    if (isOpen) {
      if (mode === 'fee_structure') {
        setFeeStructureData({
          name: '',
          type: 'tuition',
          amount: 0,
          frequency: 'monthly',
          applicableGrades: [],
          dueDate: '',
          lateFeePenalty: 0,
          description: '',
          isActive: true,
          ...initialData
        });
      } else if (mode === 'payment_collection') {
        setPaymentData({
          studentId: '',
          studentName: '',
          feeStructureId: '',
          amount: 0,
          paidAmount: 0,
          paymentMethod: 'cash',
          transactionId: '',
          remarks: ''
        });
        setOutstandingFees(existingPayments.filter(p => p.status !== 'paid'));
      }
      setErrors({});
    }
  }, [isOpen, mode, initialData, existingPayments]);

  const validateFeeStructure = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!feeStructureData.name.trim()) {
      newErrors.name = 'Fee name is required';
    }

    if (feeStructureData.amount <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }

    if (feeStructureData.applicableGrades.length === 0) {
      newErrors.applicableGrades = 'At least one grade must be selected';
    }

    if (!feeStructureData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePayment = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!paymentData.studentId) {
      newErrors.studentId = 'Student selection is required';
    }

    if (paymentData.paidAmount <= 0) {
      newErrors.paidAmount = 'Payment amount must be greater than 0';
    }

    if (paymentData.paidAmount > paymentData.amount) {
      newErrors.paidAmount = 'Payment amount cannot exceed fee amount';
    }

    if (paymentData.paymentMethod === 'card' || paymentData.paymentMethod === 'upi' || paymentData.paymentMethod === 'bank_transfer') {
      if (!paymentData.transactionId.trim()) {
        newErrors.transactionId = 'Transaction ID is required for this payment method';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = false;
    if (mode === 'fee_structure') {
      isValid = validateFeeStructure();
    } else if (mode === 'payment_collection') {
      isValid = validatePayment();
    }

    if (!isValid) return;

    setIsSubmitting(true);

    try {
      if (mode === 'fee_structure') {
        await onSubmit(feeStructureData);
      } else if (mode === 'payment_collection') {
        const paymentRecord = {
          ...paymentData,
          id: `payment-${Date.now()}`,
          paymentDate: new Date().toISOString().split('T')[0],
          balance: paymentData.amount - paymentData.paidAmount,
          status: paymentData.paidAmount >= paymentData.amount ? 'paid' : 'partial',
          dueDate: new Date().toISOString().split('T')[0]
        };
        await onSubmit(paymentRecord);
      }
      onClose();
    } catch (error) {
      console.error('Failed to save:', error);
      setErrors({ submit: 'Failed to save. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStudentSelect = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    if (student) {
      setSelectedStudent(student);
      setPaymentData(prev => ({
        ...prev,
        studentId,
        studentName: student.name
      }));
      
      // Filter outstanding fees for this student
      const studentOutstandingFees = existingPayments.filter(
        p => p.studentId === studentId && p.status !== 'paid'
      );
      setOutstandingFees(studentOutstandingFees);
    }
  };

  const handleFeeSelect = (fee: PaymentRecord) => {
    setPaymentData(prev => ({
      ...prev,
      feeStructureId: fee.feeStructureId,
      amount: fee.amount,
      paidAmount: fee.balance
    }));
  };

  const getModalTitle = () => {
    switch (mode) {
      case 'fee_structure': return 'Fee Structure Management';
      case 'payment_collection': return 'Fee Collection';
      case 'payment_history': return 'Payment History';
      case 'fee_report': return 'Fee Reports';
      default: return 'Fee Management';
    }
  };

  const renderFeeStructureForm = () => (
    <div className="space-y-6">
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Calculator className="w-5 h-5" />
          Basic Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fee Name *
            </label>
            <Input
              type="text"
              value={feeStructureData.name}
              onChange={(e) => setFeeStructureData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g., Monthly Tuition Fee"
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fee Type *
            </label>
            <Select
              value={feeStructureData.type}
              onChange={(e) => setFeeStructureData(prev => ({ ...prev, type: e.target.value as any }))}
            >
              {FEE_TYPES.map(type => (
                <SelectItem key={type.value} value={type.value}>
                  {type.icon} {type.label}
                </SelectItem>
              ))}
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount (₹) *
            </label>
            <Input
              type="number"
              value={feeStructureData.amount}
              onChange={(e) => setFeeStructureData(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
              placeholder="0"
              min="0"
              step="0.01"
              className={errors.amount ? 'border-red-500' : ''}
            />
            {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Frequency
            </label>
            <Select
              value={feeStructureData.frequency}
              onChange={(e) => setFeeStructureData(prev => ({ ...prev, frequency: e.target.value as any }))}
            >
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
              <SelectItem value="one_time">One Time</SelectItem>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Due Date *
            </label>
            <Input
              type="date"
              value={feeStructureData.dueDate}
              onChange={(e) => setFeeStructureData(prev => ({ ...prev, dueDate: e.target.value }))}
              className={errors.dueDate ? 'border-red-500' : ''}
            />
            {errors.dueDate && <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Late Fee Penalty (₹)
            </label>
            <Input
              type="number"
              value={feeStructureData.lateFeePenalty}
              onChange={(e) => setFeeStructureData(prev => ({ ...prev, lateFeePenalty: parseFloat(e.target.value) || 0 }))}
              placeholder="0"
              min="0"
              step="0.01"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Applicable Grades *
          </label>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {GRADES.map(grade => (
              <label key={grade} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={feeStructureData.applicableGrades.includes(grade)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFeeStructureData(prev => ({
                        ...prev,
                        applicableGrades: [...prev.applicableGrades, grade]
                      }));
                    } else {
                      setFeeStructureData(prev => ({
                        ...prev,
                        applicableGrades: prev.applicableGrades.filter(g => g !== grade)
                      }));
                    }
                  }}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm">{grade}</span>
              </label>
            ))}
          </div>
          {errors.applicableGrades && <p className="text-red-500 text-sm mt-1">{errors.applicableGrades}</p>}
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={feeStructureData.description}
            onChange={(e) => setFeeStructureData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Additional details about this fee structure..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
        </div>

        <div className="mt-4 flex items-center">
          <input
            type="checkbox"
            id="isActive"
            checked={feeStructureData.isActive}
            onChange={(e) => setFeeStructureData(prev => ({ ...prev, isActive: e.target.checked }))}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="isActive" className="ml-2 text-sm font-medium text-gray-700">
            Active Fee Structure
          </label>
        </div>
      </Card>
    </div>
  );

  const renderPaymentCollectionForm = () => (
    <div className="space-y-6">
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <User className="w-5 h-5" />
          Student Selection
        </h3>
        <Select
          value={paymentData.studentId}
          onChange={(e) => handleStudentSelect(e.target.value)}
          className={errors.studentId ? 'border-red-500' : ''}
        >
          <SelectItem value="">Select Student</SelectItem>
          {students.map(student => (
            <SelectItem key={student.id} value={student.id}>
              {student.name} - {student.class || 'N/A'}
            </SelectItem>
          ))}
        </Select>
        {errors.studentId && <p className="text-red-500 text-sm mt-1">{errors.studentId}</p>}
      </Card>

      {selectedStudent && outstandingFees.length > 0 && (
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-orange-500" />
            Outstanding Fees
          </h3>
          <div className="space-y-3">
            {outstandingFees.map(fee => (
              <div
                key={fee.id}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                onClick={() => handleFeeSelect(fee)}
              >
                <div>
                  <div className="font-medium">{FEE_TYPES.find(t => t.value === fee.feeStructureId)?.label || 'Unknown Fee'}</div>
                  <div className="text-sm text-gray-500">Due: {fee.dueDate}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">₹{fee.balance.toLocaleString()}</div>
                  <Badge variant={fee.status === 'overdue' ? 'destructive' : 'warning'} size="sm">
                    {fee.status.charAt(0).toUpperCase() + fee.status.slice(1)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Payment Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fee Amount (₹)
            </label>
            <Input
              type="number"
              value={paymentData.amount}
              onChange={(e) => setPaymentData(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
              placeholder="0"
              min="0"
              step="0.01"
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Amount (₹) *
            </label>
            <Input
              type="number"
              value={paymentData.paidAmount}
              onChange={(e) => setPaymentData(prev => ({ ...prev, paidAmount: parseFloat(e.target.value) || 0 }))}
              placeholder="0"
              min="0"
              max={paymentData.amount}
              step="0.01"
              className={errors.paidAmount ? 'border-red-500' : ''}
            />
            {errors.paidAmount && <p className="text-red-500 text-sm mt-1">{errors.paidAmount}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Method *
            </label>
            <Select
              value={paymentData.paymentMethod}
              onChange={(e) => setPaymentData(prev => ({ ...prev, paymentMethod: e.target.value as any }))}
            >
              {PAYMENT_METHODS.map(method => (
                <SelectItem key={method.value} value={method.value}>
                  {method.label}
                </SelectItem>
              ))}
            </Select>
          </div>

          {(paymentData.paymentMethod !== 'cash') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Transaction ID *
              </label>
              <Input
                type="text"
                value={paymentData.transactionId}
                onChange={(e) => setPaymentData(prev => ({ ...prev, transactionId: e.target.value }))}
                placeholder="Enter transaction ID"
                className={errors.transactionId ? 'border-red-500' : ''}
              />
              {errors.transactionId && <p className="text-red-500 text-sm mt-1">{errors.transactionId}</p>}
            </div>
          )}

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Remarks
            </label>
            <Input
              type="text"
              value={paymentData.remarks}
              onChange={(e) => setPaymentData(prev => ({ ...prev, remarks: e.target.value }))}
              placeholder="Additional notes (optional)"
            />
          </div>
        </div>

        {paymentData.amount > 0 && paymentData.paidAmount > 0 && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span>Balance After Payment:</span>
              <span className="font-semibold">₹{(paymentData.amount - paymentData.paidAmount).toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-1">
              <span>Payment Status:</span>
              <Badge variant={paymentData.paidAmount >= paymentData.amount ? 'success' : 'warning'} size="sm">
                {paymentData.paidAmount >= paymentData.amount ? 'Fully Paid' : 'Partial Payment'}
              </Badge>
            </div>
          </div>
        )}
      </Card>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      title={getModalTitle()}
      icon={<Calculator className="w-6 h-6 text-green-500" />}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {errors.submit && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <div className="text-red-800 text-sm">{errors.submit}</div>
          </div>
        )}

        {mode === 'fee_structure' && renderFeeStructureForm()}
        {mode === 'payment_collection' && renderPaymentCollectionForm()}

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                {mode === 'fee_structure' ? 'Save Fee Structure' : 'Process Payment'}
              </>
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
};