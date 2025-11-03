import React, { useState } from 'react';
import { Search, Filter, X, Plus, Minus, Calendar, SortAsc, SortDesc, RefreshCw } from 'lucide-react';
import { Modal } from '../Modal';
import { Button } from '../Button';
import { Input } from '../Input';
import { Select, SelectItem } from '../Select';
import { Card } from '../Card';
import { Badge } from '../Badge';

// Advanced Search Modal
interface SearchCriteria {
  field: string;
  operator: 'equals' | 'contains' | 'starts_with' | 'ends_with' | 'greater_than' | 'less_than' | 'between' | 'in';
  value: string;
  value2?: string; // For 'between' operator
}

interface AdvancedSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (criteria: SearchCriteria[], searchText: string) => void;
  searchFields: { field: string; label: string; type: 'text' | 'number' | 'date' | 'select'; options?: string[] }[];
  initialCriteria?: SearchCriteria[];
  initialSearchText?: string;
}

export const AdvancedSearchModal: React.FC<AdvancedSearchModalProps> = ({
  isOpen,
  onClose,
  onSearch,
  searchFields,
  initialCriteria = [],
  initialSearchText = ''
}) => {
  const [searchText, setSearchText] = useState(initialSearchText);
  const [criteria, setCriteria] = useState<SearchCriteria[]>(
    initialCriteria.length > 0 ? initialCriteria : [{ field: '', operator: 'contains', value: '' }]
  );

  const operatorOptions = [
    { value: 'equals', label: 'Equals', types: ['text', 'number', 'date', 'select'] },
    { value: 'contains', label: 'Contains', types: ['text'] },
    { value: 'starts_with', label: 'Starts with', types: ['text'] },
    { value: 'ends_with', label: 'Ends with', types: ['text'] },
    { value: 'greater_than', label: 'Greater than', types: ['number', 'date'] },
    { value: 'less_than', label: 'Less than', types: ['number', 'date'] },
    { value: 'between', label: 'Between', types: ['number', 'date'] },
    { value: 'in', label: 'In list', types: ['text', 'select'] }
  ];

  const getAvailableOperators = (fieldType: string) => {
    return operatorOptions.filter(op => op.types.includes(fieldType));
  };

  const addCriteria = () => {
    setCriteria([...criteria, { field: '', operator: 'contains', value: '' }]);
  };

  const removeCriteria = (index: number) => {
    setCriteria(criteria.filter((_, i) => i !== index));
  };

  const updateCriteria = (index: number, updates: Partial<SearchCriteria>) => {
    setCriteria(criteria.map((criterion, i) => 
      i === index ? { ...criterion, ...updates } : criterion
    ));
  };

  const handleSearch = () => {
    const validCriteria = criteria.filter(c => c.field && c.value);
    onSearch(validCriteria, searchText);
    onClose();
  };

  const resetSearch = () => {
    setSearchText('');
    setCriteria([{ field: '', operator: 'contains', value: '' }]);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="flex items-center justify-between p-6 border-b">
        <div className="flex items-center space-x-2">
          <Search className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Advanced Search</h2>
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
          <label className="block text-sm font-medium text-gray-700 mb-2">General Search</label>
          <Input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search across all fields..."
            className="w-full"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-medium text-gray-700">Advanced Criteria</label>
            <Button variant="outline" size="sm" onClick={addCriteria}>
              <Plus className="w-4 h-4 mr-1" />
              Add Criteria
            </Button>
          </div>

          <div className="space-y-3">
            {criteria.map((criterion, index) => {
              const selectedField = searchFields.find(f => f.field === criterion.field);
              const availableOperators = selectedField ? getAvailableOperators(selectedField.type) : [];

              return (
                <Card key={index} className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 grid grid-cols-12 gap-3">
                      <div className="col-span-3">
                        <Select
                          value={criterion.field}
                          onChange={(e) => updateCriteria(index, { 
                            field: e.target.value, 
                            operator: 'contains',
                            value: '',
                            value2: undefined 
                          })}
                        >
                          <SelectItem value="">Select field</SelectItem>
                          {searchFields.map((field) => (
                            <SelectItem key={field.field} value={field.field}>
                              {field.label}
                            </SelectItem>
                          ))}
                        </Select>
                      </div>

                      <div className="col-span-3">
                        <Select
                          value={criterion.operator}
                          onChange={(e) => updateCriteria(index, { 
                            operator: e.target.value as any,
                            value: '',
                            value2: undefined
                          })}
                          disabled={!criterion.field}
                        >
                          {availableOperators.map((op) => (
                            <SelectItem key={op.value} value={op.value}>
                              {op.label}
                            </SelectItem>
                          ))}
                        </Select>
                      </div>

                      <div className={criterion.operator === 'between' ? 'col-span-3' : 'col-span-6'}>
                        {selectedField?.type === 'select' ? (
                          <Select
                            value={criterion.value}
                            onChange={(e) => updateCriteria(index, { value: e.target.value })}
                          >
                            <SelectItem value="">Select value</SelectItem>
                            {selectedField.options?.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </Select>
                        ) : (
                          <Input
                            type={selectedField?.type === 'date' ? 'date' : selectedField?.type === 'number' ? 'number' : 'text'}
                            value={criterion.value}
                            onChange={(e) => updateCriteria(index, { value: e.target.value })}
                            placeholder="Enter value"
                          />
                        )}
                      </div>

                      {criterion.operator === 'between' && (
                        <div className="col-span-3">
                          <Input
                            type={selectedField?.type === 'date' ? 'date' : selectedField?.type === 'number' ? 'number' : 'text'}
                            value={criterion.value2 || ''}
                            onChange={(e) => updateCriteria(index, { value2: e.target.value })}
                            placeholder="To value"
                          />
                        </div>
                      )}
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCriteria(index)}
                      disabled={criteria.length === 1}
                      className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center p-6 border-t bg-gray-50">
        <Button variant="outline" onClick={resetSearch} className="flex items-center space-x-2">
          <RefreshCw className="w-4 h-4" />
          <span>Reset</span>
        </Button>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSearch} className="flex items-center space-x-2">
            <Search className="w-4 h-4" />
            <span>Search</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
};

// Filter Modal
interface FilterOption {
  field: string;
  label: string;
  type: 'checkbox' | 'select' | 'range' | 'date_range';
  options?: string[];
  min?: number;
  max?: number;
}

interface FilterValues {
  [key: string]: any;
}

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterValues) => void;
  onClearFilters: () => void;
  filterOptions: FilterOption[];
  currentFilters: FilterValues;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  onApplyFilters,
  onClearFilters,
  filterOptions,
  currentFilters
}) => {
  const [filters, setFilters] = useState<FilterValues>(currentFilters);

  const updateFilter = (field: string, value: any) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleClear = () => {
    setFilters({});
    onClearFilters();
  };

  const renderFilterControl = (option: FilterOption) => {
    const value = filters[option.field];

    switch (option.type) {
      case 'checkbox':
        return (
          <div className="space-y-2">
            {option.options?.map((optionValue) => (
              <label key={optionValue} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={value?.includes(optionValue) || false}
                  onChange={(e) => {
                    const currentValues = value || [];
                    if (e.target.checked) {
                      updateFilter(option.field, [...currentValues, optionValue]);
                    } else {
                      updateFilter(option.field, currentValues.filter((v: string) => v !== optionValue));
                    }
                  }}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm">{optionValue}</span>
              </label>
            ))}
          </div>
        );

      case 'select':
        return (
          <Select
            value={value || ''}
            onChange={(e) => updateFilter(option.field, e.target.value)}
          >
            <SelectItem value="">All</SelectItem>
            {option.options?.map((optionValue) => (
              <SelectItem key={optionValue} value={optionValue}>
                {optionValue}
              </SelectItem>
            ))}
          </Select>
        );

      case 'range':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Min</label>
              <Input
                type="number"
                value={value?.min || ''}
                onChange={(e) => updateFilter(option.field, { ...value, min: e.target.value })}
                placeholder={`Min (${option.min})`}
                min={option.min}
                max={option.max}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Max</label>
              <Input
                type="number"
                value={value?.max || ''}
                onChange={(e) => updateFilter(option.field, { ...value, max: e.target.value })}
                placeholder={`Max (${option.max})`}
                min={option.min}
                max={option.max}
              />
            </div>
          </div>
        );

      case 'date_range':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">From</label>
              <Input
                type="date"
                value={value?.from || ''}
                onChange={(e) => updateFilter(option.field, { ...value, from: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">To</label>
              <Input
                type="date"
                value={value?.to || ''}
                onChange={(e) => updateFilter(option.field, { ...value, to: e.target.value })}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const activeFilterCount = Object.keys(filters).filter(key => {
    const value = filters[key];
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'object' && value !== null) {
      return Object.values(value).some(v => v !== '' && v !== null && v !== undefined);
    }
    return value !== '' && value !== null && value !== undefined;
  }).length;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <div className="flex items-center justify-between p-6 border-b">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
          {activeFilterCount > 0 && (
            <Badge variant="default">{activeFilterCount} active</Badge>
          )}
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

      <div className="p-6 space-y-6 max-h-96 overflow-y-auto">
        {filterOptions.map((option) => (
          <div key={option.field}>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {option.label}
            </label>
            {renderFilterControl(option)}
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center p-6 border-t bg-gray-50">
        <Button variant="outline" onClick={handleClear} className="flex items-center space-x-2">
          <RefreshCw className="w-4 h-4" />
          <span>Clear All</span>
        </Button>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleApply} className="flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Apply Filters</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
};

// Sort Modal
interface SortOption {
  field: string;
  label: string;
}

interface SortConfig {
  field: string;
  direction: 'asc' | 'desc';
}

interface SortModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplySort: (sortConfig: SortConfig[]) => void;
  sortOptions: SortOption[];
  currentSort: SortConfig[];
}

export const SortModal: React.FC<SortModalProps> = ({
  isOpen,
  onClose,
  onApplySort,
  sortOptions,
  currentSort
}) => {
  const [sortConfig, setSortConfig] = useState<SortConfig[]>(
    currentSort.length > 0 ? currentSort : [{ field: '', direction: 'asc' }]
  );

  const addSortLevel = () => {
    setSortConfig([...sortConfig, { field: '', direction: 'asc' }]);
  };

  const removeSortLevel = (index: number) => {
    setSortConfig(sortConfig.filter((_, i) => i !== index));
  };

  const updateSortLevel = (index: number, updates: Partial<SortConfig>) => {
    setSortConfig(sortConfig.map((config, i) => 
      i === index ? { ...config, ...updates } : config
    ));
  };

  const handleApply = () => {
    const validSort = sortConfig.filter(s => s.field);
    onApplySort(validSort);
    onClose();
  };

  const resetSort = () => {
    setSortConfig([{ field: '', direction: 'asc' }]);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <div className="flex items-center justify-between p-6 border-b">
        <div className="flex items-center space-x-2">
          <SortAsc className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Sort Options</h2>
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
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">Sort Order</label>
          <Button variant="outline" size="sm" onClick={addSortLevel}>
            <Plus className="w-4 h-4 mr-1" />
            Add Level
          </Button>
        </div>

        <div className="space-y-3">
          {sortConfig.map((config, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>{index + 1}.</span>
                </div>
                
                <div className="flex-1">
                  <Select
                    value={config.field}
                    onChange={(e) => updateSortLevel(index, { field: e.target.value })}
                  >
                    <SelectItem value="">Select field</SelectItem>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.field} value={option.field}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </Select>
                </div>

                <div className="flex border border-gray-300 rounded-md">
                  <button
                    onClick={() => updateSortLevel(index, { direction: 'asc' })}
                    className={`px-3 py-2 text-sm flex items-center space-x-1 ${
                      config.direction === 'asc'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <SortAsc className="w-4 h-4" />
                    <span>Asc</span>
                  </button>
                  <button
                    onClick={() => updateSortLevel(index, { direction: 'desc' })}
                    className={`px-3 py-2 text-sm flex items-center space-x-1 border-l border-gray-300 ${
                      config.direction === 'desc'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <SortDesc className="w-4 h-4" />
                    <span>Desc</span>
                  </button>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSortLevel(index)}
                  disabled={sortConfig.length === 1}
                  className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Minus className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {sortConfig.length > 1 && (
          <div className="text-xs text-gray-500 mt-2">
            Items will be sorted by the first criteria, then by the second criteria for matching items, and so on.
          </div>
        )}
      </div>

      <div className="flex justify-between items-center p-6 border-t bg-gray-50">
        <Button variant="outline" onClick={resetSort} className="flex items-center space-x-2">
          <RefreshCw className="w-4 h-4" />
          <span>Reset</span>
        </Button>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleApply} className="flex items-center space-x-2">
            <SortAsc className="w-4 h-4" />
            <span>Apply Sort</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
};

// Combined Search and Filter Modal
interface SearchAndFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (searchText: string, criteria: SearchCriteria[], filters: FilterValues, sort: SortConfig[]) => void;
  searchFields: { field: string; label: string; type: 'text' | 'number' | 'date' | 'select'; options?: string[] }[];
  filterOptions: FilterOption[];
  sortOptions: SortOption[];
  currentState: {
    searchText: string;
    criteria: SearchCriteria[];
    filters: FilterValues;
    sort: SortConfig[];
  };
}

export const SearchAndFilterModal: React.FC<SearchAndFilterModalProps> = ({
  isOpen,
  onClose,
  onApply,
  searchFields,
  filterOptions,
  sortOptions,
  currentState
}) => {
  const [activeTab, setActiveTab] = useState<'search' | 'filter' | 'sort'>('search');
  const [searchText, setSearchText] = useState(currentState.searchText);
  const [criteria, setCriteria] = useState<SearchCriteria[]>(currentState.criteria);
  const [filters, setFilters] = useState<FilterValues>(currentState.filters);
  const [sortConfig, setSortConfig] = useState<SortConfig[]>(currentState.sort);

  const handleApply = () => {
    onApply(searchText, criteria, filters, sortConfig);
    onClose();
  };

  const resetAll = () => {
    setSearchText('');
    setCriteria([{ field: '', operator: 'contains', value: '' }]);
    setFilters({});
    setSortConfig([{ field: '', direction: 'asc' }]);
  };

  const tabs = [
    { id: 'search' as const, label: 'Search', icon: Search },
    { id: 'filter' as const, label: 'Filter', icon: Filter },
    { id: 'sort' as const, label: 'Sort', icon: SortAsc }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <div className="flex items-center justify-between p-6 border-b">
        <div className="flex items-center space-x-2">
          <Search className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Search, Filter & Sort</h2>
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

      <div className="flex">
        <div className="w-1/4 border-r bg-gray-50 p-4">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="flex-1 p-6 min-h-96">
          {activeTab === 'search' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">General Search</label>
                <Input
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Search across all fields..."
                  className="w-full"
                />
              </div>
              {/* Add advanced search criteria UI here */}
            </div>
          )}

          {activeTab === 'filter' && (
            <div className="space-y-6">
              {filterOptions.map((option) => (
                <div key={option.field}>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    {option.label}
                  </label>
                  {/* Add filter control UI here */}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'sort' && (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">Sort Order</label>
              {/* Add sort configuration UI here */}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center p-6 border-t bg-gray-50">
        <Button variant="outline" onClick={resetAll} className="flex items-center space-x-2">
          <RefreshCw className="w-4 h-4" />
          <span>Reset All</span>
        </Button>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleApply} className="flex items-center space-x-2">
            <Search className="w-4 h-4" />
            <span>Apply</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
};