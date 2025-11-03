'use client';

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Tabs, 
  Tab, 
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  LinearProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';
import {
  Download,
  TrendingUp,
  TrendingDown,
  School,
  Person,
  Book,
  DirectionsBus,
  AccountBalance,
  Assessment,
  CalendarToday,
  Schedule,
  PrintOutlined,
  FilterList,
  Refresh
} from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1', '#d084d0'];

export default function ReportsAnalytics() {
  const [tabValue, setTabValue] = useState(0);
  const [timeRange, setTimeRange] = useState('month');
  const [reportType, setReportType] = useState('summary');
  const [loading, setLoading] = useState(false);
  const [exportDialog, setExportDialog] = useState(false);
  const [customReportDialog, setCustomReportDialog] = useState(false);

  // Mock data for analytics
  const overviewStats = {
    totalStudents: 1250,
    totalTeachers: 85,
    totalClasses: 42,
    totalRevenue: 15750000,
    attendanceRate: 94.2,
    passRate: 87.5,
    libraryUtilization: 76.8,
    transportUtilization: 82.3
  };

  const studentTrends = [
    { month: 'Jan', enrolled: 1180, active: 1165, dropouts: 15 },
    { month: 'Feb', enrolled: 1195, active: 1175, dropouts: 20 },
    { month: 'Mar', enrolled: 1210, active: 1190, dropouts: 20 },
    { month: 'Apr', enrolled: 1225, active: 1205, dropouts: 20 },
    { month: 'May', enrolled: 1240, active: 1220, dropouts: 20 },
    { month: 'Jun', enrolled: 1250, active: 1230, dropouts: 20 }
  ];

  const attendanceData = [
    { day: 'Mon', rate: 96.2 },
    { day: 'Tue', rate: 94.8 },
    { day: 'Wed', rate: 93.5 },
    { day: 'Thu', rate: 95.1 },
    { day: 'Fri', rate: 92.3 },
    { day: 'Sat', rate: 88.7 }
  ];

  const performanceData = [
    { subject: 'Mathematics', average: 78.5, passRate: 85 },
    { subject: 'Science', average: 82.1, passRate: 88 },
    { subject: 'English', average: 75.3, passRate: 82 },
    { subject: 'Social Studies', average: 80.7, passRate: 87 },
    { subject: 'Hindi', average: 77.9, passRate: 84 }
  ];

  const revenueData = [
    { month: 'Jan', tuition: 2500000, transport: 350000, hostel: 400000, other: 150000 },
    { month: 'Feb', tuition: 2600000, transport: 360000, hostel: 420000, other: 160000 },
    { month: 'Mar', tuition: 2550000, transport: 355000, hostel: 410000, other: 155000 },
    { month: 'Apr', tuition: 2650000, transport: 365000, hostel: 430000, other: 165000 },
    { month: 'May', tuition: 2700000, transport: 370000, hostel: 440000, other: 170000 },
    { month: 'Jun', tuition: 2750000, transport: 375000, hostel: 450000, other: 175000 }
  ];

  const classDistribution = [
    { class: '6th Grade', students: 105 },
    { class: '7th Grade', students: 110 },
    { class: '8th Grade', students: 115 },
    { class: '9th Grade', students: 120 },
    { class: '10th Grade', students: 125 },
    { class: '11th Grade', students: 130 },
    { class: '12th Grade', students: 135 }
  ];

  const departmentPerformance = [
    { department: 'Mathematics', teachers: 12, satisfaction: 4.2, performance: 85 },
    { department: 'Science', teachers: 15, satisfaction: 4.5, performance: 88 },
    { department: 'English', teachers: 10, satisfaction: 4.1, performance: 82 },
    { department: 'Social Studies', teachers: 8, satisfaction: 4.3, performance: 86 },
    { department: 'Physical Education', teachers: 6, satisfaction: 4.6, performance: 92 }
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleExport = (format: string) => {
    setLoading(true);
    // Simulate export process
    setTimeout(() => {
      setLoading(false);
      setExportDialog(false);
      alert(`Report exported as ${format.toUpperCase()}`);
    }, 2000);
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  const StatCard = ({ title, value, trend, icon, color }: any) => (
    <Card sx={{ height: '100%', background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="h6" color="primary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              {value}
            </Typography>
            <Box display="flex" alignItems="center" mt={1}>
              {trend > 0 ? (
                <TrendingUp color="success" fontSize="small" />
              ) : (
                <TrendingDown color="error" fontSize="small" />
              )}
              <Typography 
                variant="body2" 
                color={trend > 0 ? 'success.main' : 'error.main'}
                ml={0.5}
              >
                {Math.abs(trend)}%
              </Typography>
            </Box>
          </Box>
          <Box sx={{ color: color, opacity: 0.7, fontSize: 40 }}>
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ p: 3, minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold" color="white">
          📊 Reports & Analytics
        </Typography>
        <Box display="flex" gap={2}>
          <FormControl variant="outlined" size="small" sx={{ minWidth: 120, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 1 }}>
            <InputLabel sx={{ color: 'white' }}>Time Range</InputLabel>
            <Select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              label="Time Range"
              sx={{ color: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' } }}
            >
              <MenuItem value="week">This Week</MenuItem>
              <MenuItem value="month">This Month</MenuItem>
              <MenuItem value="quarter">This Quarter</MenuItem>
              <MenuItem value="year">This Year</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            startIcon={<Refresh />}
            onClick={handleRefresh}
            disabled={loading}
            sx={{ bgcolor: 'rgba(255,255,255,0.2)', '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }}
          >
            Refresh
          </Button>
          <Button
            variant="contained"
            startIcon={<Download />}
            onClick={() => setExportDialog(true)}
            sx={{ bgcolor: 'rgba(255,255,255,0.2)', '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }}
          >
            Export
          </Button>
        </Box>
      </Box>

      {loading && <LinearProgress sx={{ mb: 2, borderRadius: 1 }} />}

      {/* Overview Stats */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Students"
            value={overviewStats.totalStudents.toLocaleString()}
            trend={5.2}
            icon={<School />}
            color="#4CAF50"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Teachers"
            value={overviewStats.totalTeachers}
            trend={2.1}
            icon={<Person />}
            color="#2196F3"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Attendance Rate"
            value={`${overviewStats.attendanceRate}%`}
            trend={1.8}
            icon={<Schedule />}
            color="#FF9800"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Revenue"
            value={`₹${(overviewStats.totalRevenue / 1000000).toFixed(1)}M`}
            trend={8.5}
            icon={<AccountBalance />}
            color="#9C27B0"
          />
        </Grid>
      </Grid>

      <Box sx={{ borderBottom: 1, borderColor: 'rgba(255,255,255,0.2)', mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          textColor="inherit"
          TabIndicatorProps={{ style: { backgroundColor: 'white' } }}
          sx={{ '& .MuiTab-root': { color: 'rgba(255,255,255,0.7)', '&.Mui-selected': { color: 'white' } } }}
        >
          <Tab label="Academic Performance" />
          <Tab label="Financial Reports" />
          <Tab label="Attendance Analysis" />
          <Tab label="Resource Utilization" />
          <Tab label="Predictive Analytics" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  Subject-wise Performance
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="average" fill="#8884d8" name="Average Score" />
                    <Bar dataKey="passRate" fill="#82ca9d" name="Pass Rate %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card sx={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  Student Enrollment Trends
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={studentTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="enrolled" stroke="#8884d8" name="Enrolled" />
                    <Line type="monotone" dataKey="active" stroke="#82ca9d" name="Active" />
                    <Line type="monotone" dataKey="dropouts" stroke="#ff7300" name="Dropouts" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card sx={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  Department Performance Overview
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell><strong>Department</strong></TableCell>
                        <TableCell><strong>Teachers</strong></TableCell>
                        <TableCell><strong>Satisfaction</strong></TableCell>
                        <TableCell><strong>Performance</strong></TableCell>
                        <TableCell><strong>Status</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {departmentPerformance.map((dept, index) => (
                        <TableRow key={index}>
                          <TableCell>{dept.department}</TableCell>
                          <TableCell>{dept.teachers}</TableCell>
                          <TableCell>
                            <Box display="flex" alignItems="center">
                              <Typography variant="body2" mr={1}>
                                {dept.satisfaction}/5.0
                              </Typography>
                              <LinearProgress
                                variant="determinate"
                                value={(dept.satisfaction / 5) * 100}
                                sx={{ width: 60, height: 8, borderRadius: 4 }}
                              />
                            </Box>
                          </TableCell>
                          <TableCell>{dept.performance}%</TableCell>
                          <TableCell>
                            <Chip
                              label={dept.performance >= 85 ? 'Excellent' : dept.performance >= 80 ? 'Good' : 'Needs Improvement'}
                              color={dept.performance >= 85 ? 'success' : dept.performance >= 80 ? 'primary' : 'warning'}
                              size="small"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  Monthly Revenue Breakdown
                </Typography>
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value: any) => `₹${(value / 100000).toFixed(1)}L`} />
                    <Legend />
                    <Area type="monotone" dataKey="tuition" stackId="1" stroke="#8884d8" fill="#8884d8" name="Tuition Fees" />
                    <Area type="monotone" dataKey="transport" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Transport" />
                    <Area type="monotone" dataKey="hostel" stackId="1" stroke="#ffc658" fill="#ffc658" name="Hostel" />
                    <Area type="monotone" dataKey="other" stackId="1" stroke="#ff7300" fill="#ff7300" name="Other" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)', mb: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  Revenue Distribution
                </Typography>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Tuition', value: 85, color: '#8884d8' },
                        { name: 'Transport', value: 8, color: '#82ca9d' },
                        { name: 'Hostel', value: 5, color: '#ffc658' },
                        { name: 'Other', value: 2, color: '#ff7300' }
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                    >
                      {[
                        { name: 'Tuition', value: 85, color: '#8884d8' },
                        { name: 'Transport', value: 8, color: '#82ca9d' },
                        { name: 'Hostel', value: 5, color: '#ffc658' },
                        { name: 'Other', value: 2, color: '#ff7300' }
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: any) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Alert severity="info" sx={{ mb: 2 }}>
              <Typography variant="body2">
                <strong>Insight:</strong> Tuition fees contribute 85% of total revenue. 
                Consider optimizing other revenue streams.
              </Typography>
            </Alert>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  Daily Attendance Rates
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis domain={[80, 100]} />
                    <Tooltip formatter={(value: any) => `${value}%`} />
                    <Bar dataKey="rate" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card sx={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  Class Distribution
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={classDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="students"
                      label={({ class: className, students }) => `${className}: ${students}`}
                    >
                      {classDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom color="white" textAlign="center">
              🚧 Resource Utilization Analytics Coming Soon
            </Typography>
            <Card sx={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)', textAlign: 'center', py: 8 }}>
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  Advanced Resource Analytics
                </Typography>
                <Typography variant="body1" color="text.secondary" mb={3}>
                  Track library usage, transport efficiency, hostel occupancy, and more
                </Typography>
                <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap">
                  <Chip icon={<Book />} label="Library: 76.8%" color="primary" />
                  <Chip icon={<DirectionsBus />} label="Transport: 82.3%" color="success" />
                  <Chip icon={<School />} label="Classrooms: 94.5%" color="warning" />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={4}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom color="white" textAlign="center">
              🔮 Predictive Analytics Dashboard
            </Typography>
            <Card sx={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)', textAlign: 'center', py: 8 }}>
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  AI-Powered Insights Coming Soon
                </Typography>
                <Typography variant="body1" color="text.secondary" mb={3}>
                  Predict enrollment trends, identify at-risk students, optimize resource allocation
                </Typography>
                <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap">
                  <Chip icon={<TrendingUp />} label="Enrollment Forecast" color="primary" />
                  <Chip icon={<Assessment />} label="Performance Prediction" color="success" />
                  <Chip icon={<CalendarToday />} label="Seasonal Trends" color="warning" />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Export Dialog */}
      <Dialog open={exportDialog} onClose={() => setExportDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Export Report</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Choose the format for your report export:
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => handleExport('pdf')}
                disabled={loading}
                startIcon={<PrintOutlined />}
              >
                PDF Report
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => handleExport('excel')}
                disabled={loading}
                startIcon={<Download />}
              >
                Excel Spreadsheet
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => handleExport('csv')}
                disabled={loading}
                startIcon={<Download />}
              >
                CSV Data
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => handleExport('json')}
                disabled={loading}
                startIcon={<Download />}
              >
                JSON Data
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setExportDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}