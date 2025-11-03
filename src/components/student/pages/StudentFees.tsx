"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Download, Eye, AlertTriangle } from 'lucide-react';

const StudentFees: React.FC = () => {
  const feeStructure = [
    { category: 'Tuition Fee', amount: 50000, paid: 25000, due: 25000 },
    { category: 'Lab Fee', amount: 5000, paid: 5000, due: 0 },
    { category: 'Library Fee', amount: 2000, paid: 2000, due: 0 },
    { category: 'Sports Fee', amount: 3000, paid: 0, due: 3000 }
  ];

  const paymentHistory = [
    { id: '1', date: '2024-08-15', amount: 25000, type: 'Tuition Fee', method: 'UPI', status: 'Completed' },
    { id: '2', date: '2024-07-10', amount: 7000, type: 'Lab & Library Fee', method: 'Bank Transfer', status: 'Completed' }
  ];

  const totalDue = feeStructure.reduce((sum, item) => sum + item.due, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Fee Management</h1>
          <p className="text-muted-foreground">Track and pay your fees</p>
        </div>
        {totalDue > 0 && (
          <Button>
            <CreditCard className="h-4 w-4 mr-2" />
            Pay Now
          </Button>
        )}
      </div>

      {/* Fee Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">₹60,000</div>
            <p className="text-sm text-muted-foreground">Total Fees</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">₹32,000</div>
            <p className="text-sm text-muted-foreground">Paid</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">₹{totalDue.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Outstanding</p>
          </CardContent>
        </Card>
      </div>

      {/* Outstanding Fees Alert */}
      {totalDue > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <h3 className="font-semibold text-red-800">Outstanding Fees</h3>
                <p className="text-sm text-red-700">
                  You have ₹{totalDue.toLocaleString()} in outstanding fees. Please pay by the due date to avoid late charges.
                </p>
              </div>
              <Button variant="destructive" size="sm">Pay Now</Button>
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
            {feeStructure.map((fee, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{fee.category}</h4>
                  <p className="text-sm text-muted-foreground">
                    Paid: ₹{fee.paid.toLocaleString()} / Total: ₹{fee.amount.toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  {fee.due > 0 ? (
                    <Badge variant="destructive">
                      Due: ₹{fee.due.toLocaleString()}
                    </Badge>
                  ) : (
                    <Badge className="bg-green-100 text-green-800">
                      Paid
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paymentHistory.map(payment => (
              <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{payment.type}</h4>
                  <p className="text-sm text-muted-foreground">
                    {new Date(payment.date).toLocaleDateString()} • {payment.method}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="font-bold">₹{payment.amount.toLocaleString()}</div>
                    <Badge className="bg-green-100 text-green-800">
                      {payment.status}
                    </Badge>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Receipt
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentFees;