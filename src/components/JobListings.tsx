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
  Divider,
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
    title: 'Senior Frontend Developer',
    company: 'KONE',
    location: 'Helsinki, Finland',
    type: 'Full-time',
    level: 'Senior',
    postedDate: '2023-05-15',
    description: 'We are looking for a Senior Frontend Developer to join our team. You will be responsible for developing and maintaining our web applications using React and TypeScript.',
    requirements: [
      '5+ years of experience in frontend development',
      'Strong knowledge of React, TypeScript, and modern JavaScript',
      'Experience with state management libraries (Redux, MobX)',
      'Understanding of web accessibility standards',
      'Experience with CI/CD pipelines'
    ],
    benefits: [
      'Competitive salary',
      'Flexible working hours',
      'Remote work options',
      'Health insurance',
      'Professional development opportunities'
    ],
    tags: ['React', 'TypeScript', 'Redux', 'CSS', 'HTML'],
    salary: '€5000 - €7000',
    rating: 4.5,
    reviewCount: 128,
    logo: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg'
  },
  {
    id: 2,
    title: 'Backend Developer',
    company: 'UPM',
    location: 'Tampere, Finland',
    type: 'Full-time',
    level: 'Mid-level',
    postedDate: '2023-05-10',
    description: 'Join our backend team to develop scalable and efficient server-side applications. You will work with modern technologies and contribute to our sustainable development initiatives.',
    requirements: [
      '3+ years of experience in backend development',
      'Strong knowledge of Node.js and Express',
      'Experience with databases (MongoDB, PostgreSQL)',
      'Understanding of RESTful API design',
      'Knowledge of cloud platforms (AWS, Azure)'
    ],
    benefits: [
      'Competitive salary',
      'Flexible working hours',
      'Remote work options',
      'Health insurance',
      'Professional development opportunities'
    ],
    tags: ['Node.js', 'Express', 'MongoDB', 'AWS', 'REST API'],
    salary: '€4000 - €5500',
    rating: 4.3,
    reviewCount: 95,
    logo: 'https://images.pexels.com/photos/7654118/pexels-photo-7654118.jpeg'
  },
  {
    id: 3,
    title: 'Full Stack Developer',
    company: 'NORDNET',
    location: 'Stockholm, Sweden',
    type: 'Full-time',
    level: 'Mid-level',
    postedDate: '2023-05-05',
    description: 'We are seeking a Full Stack Developer to join our team. You will work on both frontend and backend development, creating end-to-end solutions for our financial services platform.',
    requirements: [
      '3+ years of experience in full stack development',
      'Knowledge of React, Node.js, and TypeScript',
      'Experience with databases and ORM',
      'Understanding of microservices architecture',
      'Knowledge of financial services is a plus'
    ],
    benefits: [
      'Competitive salary',
      'Flexible working hours',
      'Remote work options',
      'Health insurance',
      'Professional development opportunities'
    ],
    tags: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker'],
    salary: '€4500 - €6000',
    rating: 4.7,
    reviewCount: 112,
    logo: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg'
  },
  {
    id: 4,
    title: 'UI/UX Designer',
    company: 'KONE',
    location: 'Helsinki, Finland',
    type: 'Full-time',
    level: 'Senior',
    postedDate: '2023-04-28',
    description: 'Join our design team to create beautiful and intuitive user interfaces. You will work closely with developers to implement your designs and ensure a great user experience.',
    requirements: [
      '5+ years of experience in UI/UX design',
      'Strong portfolio showcasing your work',
      'Proficiency in design tools (Figma, Sketch)',
      'Understanding of user-centered design principles',
      'Experience with design systems'
    ],
    benefits: [
      'Competitive salary',
      'Flexible working hours',
      'Remote work options',
      'Health insurance',
      'Professional development opportunities'
    ],
    tags: ['UI/UX', 'Figma', 'Design Systems', 'Prototyping', 'User Research'],
    salary: '€4500 - €6500',
    rating: 4.4,
    reviewCount: 87,
    logo: 'https://images.pexels.com/photos/7654118/pexels-photo-7654118.jpeg'
  },
  {
    id: 5,
    title: 'DevOps Engineer',
    company: 'UPM',
    location: 'Espoo, Finland',
    type: 'Full-time',
    level: 'Senior',
    postedDate: '2023-04-20',
    description: 'We are looking for a DevOps Engineer to join our team. You will be responsible for setting up and maintaining our CI/CD pipelines, infrastructure, and monitoring systems.',
    requirements: [
      '5+ years of experience in DevOps',
      'Strong knowledge of cloud platforms (AWS, Azure)',
      'Experience with containerization (Docker, Kubernetes)',
      'Knowledge of CI/CD tools (Jenkins, GitHub Actions)',
      'Understanding of infrastructure as code (Terraform, CloudFormation)'
    ],
    benefits: [
      'Competitive salary',
      'Flexible working hours',
      'Remote work options',
      'Health insurance',
      'Professional development opportunities'
    ],
    tags: ['DevOps', 'AWS', 'Docker', 'Kubernetes', 'Terraform'],
    salary: '€5500 - €7500',
    rating: 4.6,
    reviewCount: 76,
    logo: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg'
  },
  {
    id: 6,
    title: 'Data Scientist',
    company: 'NORDNET',
    location: 'Copenhagen, Denmark',
    type: 'Full-time',
    level: 'Senior',
    postedDate: '2023-04-15',
    description: 'Join our data science team to develop and implement machine learning models for our financial services platform. You will work with large datasets and contribute to our data-driven decision making.',
    requirements: [
      '5+ years of experience in data science',
      'Strong knowledge of Python and data science libraries',
      'Experience with machine learning algorithms',
      'Knowledge of SQL and databases',
      'Understanding of financial data is a plus'
    ],
    benefits: [
      'Competitive salary',
      'Flexible working hours',
      'Remote work options',
      'Health insurance',
      'Professional development opportunities'
    ],
    tags: ['Python', 'Machine Learning', 'SQL', 'Data Analysis', 'Statistics'],
    salary: '€5000 - €7000',
    rating: 4.8,
    reviewCount: 64,
    logo: 'https://images.pexels.com/photos/7654118/pexels-photo-7654118.jpeg'
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