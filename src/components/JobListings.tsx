import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Tooltip,
  Avatar,
  Rating,
  SelectChangeEvent
} from '@mui/material';
import {
  Search as SearchIcon,
  LocationOn as LocationIcon,
  Work as WorkIcon,
  Business as BusinessIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Share as ShareIcon,
  FilterList as FilterIcon
} from '@mui/icons-material';

// Mock data for job listings
const jobListings = [
  {
    id: 1,
    title: 'Junior Frontend Developer',
    company: 'KONE',
    location: 'Helsinki, Finland',
    type: 'Full-time',
    level: 'Junior',
    postedDate: '2023-05-15',
    description: 'We are looking for a Junior Frontend Developer to join our team. You will be responsible for developing and maintaining our web applications using React and TypeScript. This is a great opportunity for recent graduates or developers with 1-2 years of experience.',
    requirements: [
      '1-2 years of experience in frontend development',
      'Knowledge of React, TypeScript, and modern JavaScript',
      'Understanding of web accessibility standards',
      'Basic knowledge of state management',
      'Eager to learn and grow'
    ],
    benefits: [
      'Competitive salary',
      'Flexible working hours',
      'Remote work options',
      'Health insurance',
      'Professional development opportunities'
    ],
    tags: ['React', 'TypeScript', 'JavaScript', 'CSS', 'HTML'],
    salary: '€3000 - €4000',
    rating: 4.5,
    reviewCount: 128,
    logo: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg'
  },
  {
    id: 2,
    title: 'Software Development Intern',
    company: 'UPM',
    location: 'Tampere, Finland',
    type: 'Internship',
    level: 'Intern',
    postedDate: '2023-05-10',
    description: 'Join our development team as a Software Development Intern. You will work on real projects, learn from experienced developers, and gain hands-on experience with modern technologies. This is a paid internship position for 3-6 months.',
    requirements: [
      'Currently pursuing a degree in Computer Science or related field',
      'Basic knowledge of programming concepts',
      'Familiarity with web technologies',
      'Strong problem-solving skills',
      'Good communication skills'
    ],
    benefits: [
      'Paid internship',
      'Mentorship program',
      'Flexible working hours',
      'Learning opportunities',
      'Potential for full-time position'
    ],
    tags: ['Internship', 'Web Development', 'Learning', 'Mentorship'],
    salary: '€2000 - €2500',
    rating: 4.3,
    reviewCount: 95,
    logo: 'https://images.pexels.com/photos/7654118/pexels-photo-7654118.jpeg'
  },
  {
    id: 3,
    title: 'Junior Full Stack Developer',
    company: 'NORDNET',
    location: 'Stockholm, Sweden',
    type: 'Full-time',
    level: 'Junior',
    postedDate: '2023-05-05',
    description: 'We are seeking a Junior Full Stack Developer to join our team. You will work on both frontend and backend development, creating end-to-end solutions for our financial services platform. Perfect for developers with 1-2 years of experience.',
    requirements: [
      '1-2 years of experience in full stack development',
      'Knowledge of React, Node.js, and TypeScript',
      'Basic understanding of databases',
      'Eager to learn and grow',
      'Team player mindset'
    ],
    benefits: [
      'Competitive salary',
      'Flexible working hours',
      'Remote work options',
      'Health insurance',
      'Professional development opportunities'
    ],
    tags: ['React', 'Node.js', 'TypeScript', 'JavaScript', 'Full Stack'],
    salary: '€3500 - €4500',
    rating: 4.7,
    reviewCount: 112,
    logo: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg'
  }
];

const JobListings: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [savedJobs, setSavedJobs] = useState<number[]>([]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleLocationFilterChange = (event: SelectChangeEvent) => {
    setLocationFilter(event.target.value);
  };

  const handleTypeFilterChange = (event: SelectChangeEvent) => {
    setTypeFilter(event.target.value);
  };

  const handleLevelFilterChange = (event: SelectChangeEvent) => {
    setLevelFilter(event.target.value);
  };

  const toggleSaveJob = (jobId: number) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter(id => id !== jobId));
    } else {
      setSavedJobs([...savedJobs, jobId]);
    }
  };

  const filteredJobs = jobListings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = locationFilter === 'all' || job.location.includes(locationFilter);
    const matchesType = typeFilter === 'all' || job.type === typeFilter;
    const matchesLevel = levelFilter === 'all' || job.level === levelFilter;
    
    return matchesSearch && matchesLocation && matchesType && matchesLevel;
  });

  const locations = Array.from(new Set(jobListings.map(job => job.location.split(',')[0])));

  return (
    <Box sx={{ width: '100%', mb: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        Job Listings
      </Typography>
      
      <Card sx={{ mb: 4, p: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Location</InputLabel>
              <Select
                value={locationFilter}
                onChange={handleLocationFilterChange}
                label="Location"
              >
                <MenuItem value="all">All Locations</MenuItem>
                {locations.map((location, index) => (
                  <MenuItem key={index} value={location}>{location}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Job Type</InputLabel>
              <Select
                value={typeFilter}
                onChange={handleTypeFilterChange}
                label="Job Type"
              >
                <MenuItem value="all">All Types</MenuItem>
                <MenuItem value="Full-time">Full-time</MenuItem>
                <MenuItem value="Part-time">Part-time</MenuItem>
                <MenuItem value="Contract">Contract</MenuItem>
                <MenuItem value="Internship">Internship</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Level</InputLabel>
              <Select
                value={levelFilter}
                onChange={handleLevelFilterChange}
                label="Level"
              >
                <MenuItem value="all">All Levels</MenuItem>
                <MenuItem value="Junior">Junior</MenuItem>
                <MenuItem value="Mid-level">Mid-level</MenuItem>
                <MenuItem value="Senior">Senior</MenuItem>
                <MenuItem value="Lead">Lead</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              variant="contained"
              fullWidth
              startIcon={<FilterIcon />}
              onClick={() => {
                setSearchTerm('');
                setLocationFilter('all');
                setTypeFilter('all');
                setLevelFilter('all');
              }}
            >
              Reset Filters
            </Button>
          </Grid>
        </Grid>
      </Card>
      
      <Grid container spacing={3}>
        {filteredJobs.map((job) => (
          <Grid item xs={12} key={job.id}>
            <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
              <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: { md: 120 } }}>
                <Avatar
                  src={job.logo}
                  alt={job.company}
                  sx={{ width: 80, height: 80, mb: 1 }}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Rating value={job.rating} precision={0.1} readOnly size="small" />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    ({job.reviewCount})
                  </Typography>
                </Box>
              </Box>
              
              <CardContent sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Box>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {job.title}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                      {job.company}
                    </Typography>
                  </Box>
                  <Box>
                    <Tooltip title={savedJobs.includes(job.id) ? "Remove from saved" : "Save job"}>
                      <IconButton onClick={() => toggleSaveJob(job.id)}>
                        {savedJobs.includes(job.id) ? <BookmarkIcon color="primary" /> : <BookmarkBorderIcon />}
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Share job">
                      <IconButton>
                        <ShareIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  <Chip icon={<LocationIcon />} label={job.location} size="small" />
                  <Chip icon={<WorkIcon />} label={job.type} size="small" />
                  <Chip icon={<BusinessIcon />} label={job.level} size="small" />
                  <Chip label={job.salary} size="small" color="primary" />
                </Box>
                
                <Typography variant="body2" paragraph>
                  {job.description.substring(0, 200)}...
                </Typography>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                  {job.tags.map((tag, index) => (
                    <Chip key={index} label={tag} size="small" variant="outlined" />
                  ))}
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Posted: {job.postedDate}
                  </Typography>
                  <Button variant="contained" color="primary">
                    Apply Now
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      {filteredJobs.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No job listings found matching your criteria.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default JobListings; 