import React, { useState } from 'react';
import { Download, Upload, FileText, FileSpreadsheet, Database, CheckCircle, X, AlertTriangle, Info, Clock } from 'lucide-react';
import { Modal } from '../Modal';
import { Button } from '../Button';
import { Select, SelectItem } from '../Select';
import { Card } from '../Card';
import { Badge } from '../Badge';

// Data Export Modal
interface ExportOptions {
  dataType: 'students' | 'teachers' | 'classes' | 'attendance' | 'grades' | 'fees' | 'events' | 'all';
  format: 'csv' | 'xlsx' | 'json' | 'pdf';
  dateRange: 'all' | 'current_semester' | 'current_year' | 'custom';
  customStartDate?: string;
  customEndDate?: string;
  includeArchived: boolean;
  filters?: {
    grade?: string;
    section?: string;
    status?: string;
  };
}

interface DataExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (options: ExportOptions) => Promise<void>;
}

export const DataExportModal: React.FC<DataExportModalProps> = ({
  isOpen,
  onClose,
  onExport
}) => {
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    dataType: 'students',
    format: 'csv',
    dateRange: 'current_semester',
    includeArchived: false
  });
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

  const dataTypes = [
    { value: 'students', label: 'Students', icon: FileText },
    { value: 'teachers', label: 'Teachers', icon: FileText },
    { value: 'classes', label: 'Classes', icon: FileText },
    { value: 'attendance', label: 'Attendance Records', icon: FileSpreadsheet },
    { value: 'grades', label: 'Grades', icon: FileSpreadsheet },
    { value: 'fees', label: 'Fee Records', icon: FileSpreadsheet },
    { value: 'events', label: 'Events', icon: FileText },
    { value: 'all', label: 'All Data', icon: Database }
  ];

  const formatOptions = [
    { value: 'csv', label: 'CSV', description: 'Comma-separated values' },
    { value: 'xlsx', label: 'Excel', description: 'Microsoft Excel format' },
    { value: 'json', label: 'JSON', description: 'JavaScript Object Notation' },
    { value: 'pdf', label: 'PDF', description: 'Portable Document Format' }
  ];

  const handleExport = async () => {
    setIsExporting(true);
    setExportProgress(0);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + 10;
      });
    }, 200);

    try {
      await onExport(exportOptions);
      setExportProgress(100);
      setTimeout(() => {
        setIsExporting(false);
        setExportProgress(0);
        onClose();
      }, 1000);
    } catch (error) {
      setIsExporting(false);
      setExportProgress(0);
      clearInterval(progressInterval);
    }
  };

  const selectedDataType = dataTypes.find(type => type.value === exportOptions.dataType);
  const selectedFormat = formatOptions.find(format => format.value === exportOptions.format);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="flex items-center justify-between p-6 border-b">
        <div className="flex items-center space-x-2">
          <Download className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Export Data</h2>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="p-1 hover:bg-gray-100"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Select Data Type</label>
          <div className="grid grid-cols-2 gap-3">
            {dataTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.value}
                  onClick={() => setExportOptions(prev => ({ ...prev, dataType: type.value as any }))}
                  className={`p-3 border rounded-lg text-left transition-colors ${
                    exportOptions.dataType === type.value
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{type.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Export Format</label>
          <div className="grid grid-cols-2 gap-3">
            {formatOptions.map((format) => (
              <button
                key={format.value}
                onClick={() => setExportOptions(prev => ({ ...prev, format: format.value as any }))}
                className={`p-3 border rounded-lg text-left transition-colors ${
                  exportOptions.format === format.value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="font-medium text-sm">{format.label}</div>
                <div className="text-xs text-gray-500">{format.description}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
          <Select
            value={exportOptions.dateRange}
            onChange={(e) => setExportOptions(prev => ({ ...prev, dateRange: e.target.value as any }))}
          >
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="current_semester">Current Semester</SelectItem>
            <SelectItem value="current_year">Current Academic Year</SelectItem>
            <SelectItem value="custom">Custom Range</SelectItem>
          </Select>

          {exportOptions.dateRange === 'custom' && (
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Start Date</label>
                <input
                  type="date"
                  value={exportOptions.customStartDate || ''}
                  onChange={(e) => setExportOptions(prev => ({ ...prev, customStartDate: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">End Date</label>
                <input
                  type="date"
                  value={exportOptions.customEndDate || ''}
                  onChange={(e) => setExportOptions(prev => ({ ...prev, customEndDate: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label className="block text-sm font-medium text-gray-700">Include Archived Records</label>
            <p className="text-sm text-gray-500">Include inactive/archived records in export</p>
          </div>
          <input
            type="checkbox"
            checked={exportOptions.includeArchived}
            onChange={(e) => setExportOptions(prev => ({ ...prev, includeArchived: e.target.checked }))}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
        </div>

        {isExporting && (
          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <div className="animate-spin">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">Exporting {selectedDataType?.label}...</div>
                <div className="text-xs text-gray-500">Format: {selectedFormat?.label}</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${exportProgress}%` }}
                  />
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>

      <div className="flex justify-between items-center p-6 border-t bg-gray-50">
        <div className="text-sm text-gray-500">
          <Info className="w-4 h-4 inline mr-1" />
          Export will be downloaded to your device
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={onClose} disabled={isExporting}>
            Cancel
          </Button>
          <Button 
            onClick={handleExport} 
            disabled={isExporting}
            className="flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? 'Exporting...' : 'Export Data'}</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
};

// Data Import Modal
interface ImportOptions {
  dataType: 'students' | 'teachers' | 'classes' | 'attendance' | 'grades' | 'fees' | 'events';
  importMode: 'create' | 'update' | 'create_update';
  skipDuplicates: boolean;
  validateOnly: boolean;
}

interface ImportResult {
  total: number;
  created: number;
  updated: number;
  errors: number;
  warnings: string[];
  errorDetails: { row: number; message: string }[];
}

interface DataImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (file: File, options: ImportOptions) => Promise<ImportResult>;
}

export const DataImportModal: React.FC<DataImportModalProps> = ({
  isOpen,
  onClose,
  onImport
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [importOptions, setImportOptions] = useState<ImportOptions>({
    dataType: 'students',
    importMode: 'create_update',
    skipDuplicates: true,
    validateOnly: false
  });
  const [isImporting, setIsImporting] = useState(false);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleImport = async () => {
    if (!selectedFile) return;

    setIsImporting(true);
    setImportResult(null);

    try {
      const result = await onImport(selectedFile, importOptions);
      setImportResult(result);
      if (!importOptions.validateOnly) {
        setTimeout(() => {
          onClose();
        }, 3000);
      }
    } catch (error) {
      console.error('Import failed:', error);
    } finally {
      setIsImporting(false);
    }
  };

  const resetModal = () => {
    setSelectedFile(null);
    setImportResult(null);
    setIsImporting(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="lg">
      <div className="flex items-center justify-between p-6 border-b">
        <div className="flex items-center space-x-2">
          <Upload className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Import Data</h2>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClose}
          className="p-1 hover:bg-gray-100"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="p-6 space-y-6">
        {!importResult && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Data Type</label>
              <Select
                value={importOptions.dataType}
                onChange={(e) => setImportOptions(prev => ({ ...prev, dataType: e.target.value as any }))}
              >
                <SelectItem value="students">Students</SelectItem>
                <SelectItem value="teachers">Teachers</SelectItem>
                <SelectItem value="classes">Classes</SelectItem>
                <SelectItem value="attendance">Attendance Records</SelectItem>
                <SelectItem value="grades">Grades</SelectItem>
                <SelectItem value="fees">Fee Records</SelectItem>
                <SelectItem value="events">Events</SelectItem>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Import Mode</label>
              <Select
                value={importOptions.importMode}
                onChange={(e) => setImportOptions(prev => ({ ...prev, importMode: e.target.value as any }))}
              >
                <SelectItem value="create">Create Only (Skip existing records)</SelectItem>
                <SelectItem value="update">Update Only (Update existing records)</SelectItem>
                <SelectItem value="create_update">Create & Update (Recommended)</SelectItem>
              </Select>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Skip Duplicates</label>
                  <p className="text-sm text-gray-500">Skip records that already exist</p>
                </div>
                <input
                  type="checkbox"
                  checked={importOptions.skipDuplicates}
                  onChange={(e) => setImportOptions(prev => ({ ...prev, skipDuplicates: e.target.checked }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Validate Only</label>
                  <p className="text-sm text-gray-500">Check data without importing</p>
                </div>
                <input
                  type="checkbox"
                  checked={importOptions.validateOnly}
                  onChange={(e) => setImportOptions(prev => ({ ...prev, validateOnly: e.target.checked }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload File</label>
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                  dragActive
                    ? 'border-blue-500 bg-blue-50'
                    : selectedFile
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {selectedFile ? (
                  <div className="space-y-2">
                    <CheckCircle className="w-8 h-8 text-green-600 mx-auto" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
                      <p className="text-xs text-gray-500">
                        {(selectedFile.size / 1024).toFixed(2)} KB • {selectedFile.type || 'Unknown type'}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedFile(null)}
                      className="mt-2"
                    >
                      Remove File
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto" />
                    <div>
                      <p className="text-sm text-gray-600">
                        Drag and drop your file here, or{' '}
                        <label className="text-blue-600 hover:text-blue-700 cursor-pointer">
                          browse
                          <input
                            type="file"
                            className="hidden"
                            accept=".csv,.xlsx,.xls"
                            onChange={handleFileSelect}
                          />
                        </label>
                      </p>
                      <p className="text-xs text-gray-500">Supports CSV and Excel files</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {isImporting && (
          <Card className="p-6 text-center">
            <div className="animate-spin mx-auto mb-4">
              <Upload className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-sm font-medium">
              {importOptions.validateOnly ? 'Validating data...' : 'Importing data...'}
            </div>
            <div className="text-xs text-gray-500 mt-1">Please wait while we process your file</div>
          </Card>
        )}

        {importResult && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{importResult.created}</div>
                <div className="text-sm text-gray-500">Created</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{importResult.updated}</div>
                <div className="text-sm text-gray-500">Updated</div>
              </Card>
            </div>

            {importResult.errors > 0 && (
              <Card className="p-4 border-red-200 bg-red-50">
                <div className="flex items-center space-x-2 text-red-700 mb-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="font-medium">{importResult.errors} errors found</span>
                </div>
                <div className="space-y-1 text-sm">
                  {importResult.errorDetails.slice(0, 5).map((error, index) => (
                    <div key={index} className="text-red-600">
                      Row {error.row}: {error.message}
                    </div>
                  ))}
                  {importResult.errorDetails.length > 5 && (
                    <div className="text-red-600 font-medium">
                      ... and {importResult.errorDetails.length - 5} more errors
                    </div>
                  )}
                </div>
              </Card>
            )}

            {importResult.warnings.length > 0 && (
              <Card className="p-4 border-yellow-200 bg-yellow-50">
                <div className="flex items-center space-x-2 text-yellow-700 mb-2">
                  <Info className="w-4 h-4" />
                  <span className="font-medium">Warnings</span>
                </div>
                <div className="space-y-1 text-sm text-yellow-600">
                  {importResult.warnings.map((warning, index) => (
                    <div key={index}>{warning}</div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-3 p-6 border-t bg-gray-50">
        {!importResult && (
          <>
            <Button variant="outline" onClick={handleClose} disabled={isImporting}>
              Cancel
            </Button>
            <Button 
              onClick={handleImport} 
              disabled={!selectedFile || isImporting}
              className="flex items-center space-x-2"
            >
              <Upload className="w-4 h-4" />
              <span>{importOptions.validateOnly ? 'Validate' : 'Import'}</span>
            </Button>
          </>
        )}
        {importResult && (
          <Button onClick={handleClose}>
            Close
          </Button>
        )}
      </div>
    </Modal>
  );
};

// Bulk Operations Modal
interface BulkOperation {
  type: 'delete' | 'update_status' | 'assign_class' | 'update_grade' | 'mark_attendance';
  label: string;
  description: string;
  fields?: { name: string; label: string; type: 'text' | 'select' | 'date'; options?: string[] }[];
}

interface BulkOperationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItems: any[];
  dataType: string;
  onExecute: (operation: string, data: any) => Promise<void>;
}

export const BulkOperationsModal: React.FC<BulkOperationsModalProps> = ({
  isOpen,
  onClose,
  selectedItems,
  dataType,
  onExecute
}) => {
  const [selectedOperation, setSelectedOperation] = useState<string>('');
  const [operationData, setOperationData] = useState<Record<string, any>>({});
  const [isExecuting, setIsExecuting] = useState(false);

  const operations: Record<string, BulkOperation[]> = {
    students: [
      { type: 'delete', label: 'Delete Students', description: 'Permanently delete selected students' },
      { 
        type: 'update_status', 
        label: 'Update Status', 
        description: 'Change status of selected students',
        fields: [{ name: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive', 'Graduated'] }]
      },
      {
        type: 'assign_class',
        label: 'Assign to Class',
        description: 'Assign selected students to a class',
        fields: [{ name: 'classId', label: 'Class', type: 'select', options: ['Class A', 'Class B', 'Class C'] }]
      }
    ],
    teachers: [
      { type: 'delete', label: 'Delete Teachers', description: 'Permanently delete selected teachers' },
      { 
        type: 'update_status', 
        label: 'Update Status', 
        description: 'Change status of selected teachers',
        fields: [{ name: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive', 'On Leave'] }]
      }
    ]
  };

  const availableOperations = operations[dataType] || [];
  const selectedOp = availableOperations.find(op => op.type === selectedOperation);

  const handleExecute = async () => {
    if (!selectedOperation) return;

    setIsExecuting(true);
    try {
      await onExecute(selectedOperation, operationData);
      onClose();
    } catch (error) {
      console.error('Bulk operation failed:', error);
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <div className="flex items-center justify-between p-6 border-b">
        <div className="flex items-center space-x-2">
          <Database className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Bulk Operations</h2>
          <Badge variant="secondary">{selectedItems.length} selected</Badge>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="p-1 hover:bg-gray-100"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Operation</label>
          <div className="space-y-2">
            {availableOperations.map((operation) => (
              <button
                key={operation.type}
                onClick={() => setSelectedOperation(operation.type)}
                className={`w-full p-3 text-left border rounded-lg transition-colors ${
                  selectedOperation === operation.type
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="font-medium text-sm">{operation.label}</div>
                <div className="text-xs text-gray-500">{operation.description}</div>
              </button>
            ))}
          </div>
        </div>

        {selectedOp?.fields && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700">Operation Details</h3>
            {selectedOp.fields.map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                {field.type === 'select' ? (
                  <Select
                    value={operationData[field.name] || ''}
                    onChange={(e) => setOperationData(prev => ({ ...prev, [field.name]: e.target.value }))}
                  >
                    <SelectItem value="">Select {field.label}</SelectItem>
                    {field.options?.map((option) => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </Select>
                ) : field.type === 'date' ? (
                  <input
                    type="date"
                    value={operationData[field.name] || ''}
                    onChange={(e) => setOperationData(prev => ({ ...prev, [field.name]: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <input
                    type="text"
                    value={operationData[field.name] || ''}
                    onChange={(e) => setOperationData(prev => ({ ...prev, [field.name]: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={`Enter ${field.label}`}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {selectedOperation === 'delete' && (
          <Card className="p-4 border-red-200 bg-red-50">
            <div className="flex items-center space-x-2 text-red-700">
              <AlertTriangle className="w-4 h-4" />
              <span className="font-medium">Warning: This action cannot be undone</span>
            </div>
            <p className="text-sm text-red-600 mt-1">
              This will permanently delete {selectedItems.length} {dataType}. Are you sure?
            </p>
          </Card>
        )}
      </div>

      <div className="flex justify-end space-x-3 p-6 border-t bg-gray-50">
        <Button variant="outline" onClick={onClose} disabled={isExecuting}>
          Cancel
        </Button>
        <Button 
          onClick={handleExecute} 
          disabled={!selectedOperation || isExecuting}
          variant={selectedOperation === 'delete' ? 'destructive' : 'default'}
          className="flex items-center space-x-2"
        >
          {isExecuting && <Clock className="w-4 h-4 animate-spin" />}
          <span>{isExecuting ? 'Processing...' : 'Execute'}</span>
        </Button>
      </div>
    </Modal>
  );
};