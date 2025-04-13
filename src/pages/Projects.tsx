import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  LinearProgress,
  Grid,
  CardMedia,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  AvatarGroup,
  Divider,
  Paper,
  SelectChangeEvent,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import GroupIcon from '@mui/icons-material/Group';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CodeIcon from '@mui/icons-material/Code';
import StarIcon from '@mui/icons-material/Star';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[10],
  },
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  borderRadius: '16px',
  fontWeight: 600,
}));

// Temporary mock data
const mockProjects = [
  {
    id: 1,
    name: 'Task Management App',
    description: 'A collaborative task management application built with React and Node.js. Looking for frontend and backend developers to join our team.',
    githubUrl: 'https://github.com/example/task-manager',
    teamSize: 4,
    currentMembers: 2,
    techStack: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg',
    members: [
      { id: 1, name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=1' },
      { id: 2, name: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?img=2' },
    ],
    difficulty: 'Intermediate',
    status: 'In Progress',
    lookingFor: ['Frontend Developer', 'Backend Developer'],
  },
  {
    id: 2,
    name: 'Weather Dashboard',
    description: 'Real-time weather dashboard with multiple API integrations. Need a UI/UX designer and a Python developer to enhance the visualization.',
    githubUrl: 'https://github.com/example/weather-dashboard',
    teamSize: 3,
    currentMembers: 1,
    techStack: ['React', 'Python', 'API', 'D3.js'],
    image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg',
    members: [
      { id: 3, name: 'Mike Johnson', avatar: 'https://i.pravatar.cc/150?img=3' },
    ],
    difficulty: 'Beginner',
    status: 'Planning',
    lookingFor: ['UI/UX Designer', 'Python Developer'],
  },
  {
    id: 3,
    name: 'E-commerce Platform',
    description: 'Building a full-stack e-commerce platform with modern technologies. Seeking developers with experience in payment integration and inventory management.',
    githubUrl: 'https://github.com/example/ecommerce',
    teamSize: 5,
    currentMembers: 3,
    techStack: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Stripe'],
    image: 'https://images.pexels.com/photos/34577/pexels-photo.jpg',
    members: [
      { id: 4, name: 'Sarah Williams', avatar: 'https://i.pravatar.cc/150?img=4' },
      { id: 5, name: 'David Brown', avatar: 'https://i.pravatar.cc/150?img=5' },
      { id: 6, name: 'Emily Davis', avatar: 'https://i.pravatar.cc/150?img=6' },
    ],
    difficulty: 'Advanced',
    status: 'In Progress',
    lookingFor: ['Backend Developer', 'DevOps Engineer'],
  },
  {
    id: 4,
    name: 'Social Media Analytics',
    description: 'Create a social media analytics tool that helps businesses track their performance. Looking for data scientists and frontend developers.',
    githubUrl: 'https://github.com/example/social-analytics',
    teamSize: 4,
    currentMembers: 2,
    techStack: ['React', 'Python', 'TensorFlow', 'D3.js', 'Firebase'],
    image: 'https://images.pexels.com/photos/7654118/pexels-photo-7654118.jpeg',
    members: [
      { id: 7, name: 'Robert Wilson', avatar: 'https://i.pravatar.cc/150?img=7' },
      { id: 8, name: 'Lisa Anderson', avatar: 'https://i.pravatar.cc/150?img=8' },
    ],
    difficulty: 'Advanced',
    status: 'Planning',
    lookingFor: ['Data Scientist', 'Frontend Developer'],
  },
  {
    id: 5,
    name: 'Fitness Tracking App',
    description: 'Develop a mobile app for tracking workouts and nutrition. Need mobile developers and a backend specialist to join our team.',
    githubUrl: 'https://github.com/example/fitness-tracker',
    teamSize: 3,
    currentMembers: 1,
    techStack: ['React Native', 'Node.js', 'MongoDB', 'Firebase'],
    image: 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg',
    members: [
      { id: 9, name: 'Tom Harris', avatar: 'https://i.pravatar.cc/150?img=9' },
    ],
    difficulty: 'Intermediate',
    status: 'In Progress',
    lookingFor: ['Mobile Developer', 'Backend Developer'],
  },
  {
    id: 6,
    name: 'AI Image Recognition',
    description: 'Build an AI-powered image recognition system for educational purposes. Seeking machine learning experts and UI developers.',
    githubUrl: 'https://github.com/example/ai-image-recognition',
    teamSize: 4,
    currentMembers: 2,
    techStack: ['Python', 'TensorFlow', 'React', 'Flask', 'OpenCV'],
    image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg',
    members: [
      { id: 10, name: 'Anna Lee', avatar: 'https://i.pravatar.cc/150?img=10' },
      { id: 11, name: 'Chris Martin', avatar: 'https://i.pravatar.cc/150?img=11' },
    ],
    difficulty: 'Advanced',
    status: 'Planning',
    lookingFor: ['Machine Learning Engineer', 'UI Developer'],
  },
];

const Projects = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleDifficultyChange = (event: SelectChangeEvent) => {
    setFilterDifficulty(event.target.value);
  };

  const handleStatusChange = (event: SelectChangeEvent) => {
    setFilterStatus(event.target.value);
  };

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.techStack.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesDifficulty = filterDifficulty === 'all' || project.difficulty === filterDifficulty;
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
    
    return matchesSearch && matchesDifficulty && matchesStatus;
  });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold',
            color: '#00b4d8',
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
            fontFamily: "'Roboto Mono', monospace",
            textShadow: '0 2px 10px rgba(0, 180, 216, 0.3)',
          }}
        >
          Find Your Project Team
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph sx={{ maxWidth: '800px', mx: 'auto', mb: 4 }}>
          Connect with developers who share your interests and build amazing projects together. 
          Join existing teams or create your own project and invite others to collaborate.
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
          <Button 
            variant="contained" 
            size="large"
            startIcon={<PersonAddIcon />}
            onClick={() => navigate('/project-submission')}
            sx={{ 
              background: '#00b4d8',
              '&:hover': {
                background: '#0096c7',
              }
            }}
          >
            Create New Project
          </Button>
        </Box>
      </Box>

      {/* Search and Filter Section */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search projects by name, technology, or description"
              value={searchQuery}
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
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Difficulty</InputLabel>
              <Select
                value={filterDifficulty}
                onChange={handleDifficultyChange}
                label="Difficulty"
              >
                <MenuItem value="all">All Difficulties</MenuItem>
                <MenuItem value="Beginner">Beginner</MenuItem>
                <MenuItem value="Intermediate">Intermediate</MenuItem>
                <MenuItem value="Advanced">Advanced</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={filterStatus}
                onChange={handleStatusChange}
                label="Status"
              >
                <MenuItem value="all">All Statuses</MenuItem>
                <MenuItem value="Planning">Planning</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Projects Grid */}
      <Grid container spacing={4}>
        {filteredProjects.map((project) => (
          <Grid item xs={12} md={6} key={project.id}>
            <StyledCard>
              <CardMedia
                component="img"
                height="200"
                image={project.image}
                alt={project.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {project.name}
                  </Typography>
                  <Chip 
                    label={project.status} 
                    color={project.status === 'In Progress' ? 'primary' : project.status === 'Completed' ? 'success' : 'default'} 
                    size="small" 
                  />
                </Box>
                
                <Typography color="text.secondary" paragraph>
                  {project.description}
                </Typography>
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Looking for:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    {project.lookingFor.map((role) => (
                      <Chip
                        key={role}
                        label={role}
                        size="small"
                        color="secondary"
                        sx={{ mr: 1, mb: 1 }}
                      />
                    ))}
                  </Box>
                </Box>
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Tech Stack:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    {project.techStack.map((tech) => (
                      <StyledChip
                        key={tech}
                        label={tech}
                        size="small"
                        icon={<CodeIcon fontSize="small" />}
                      />
                    ))}
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <GroupIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="body2">
                    {project.currentMembers} / {project.teamSize} members
                  </Typography>
                  <Chip 
                    label={project.difficulty} 
                    size="small" 
                    sx={{ ml: 2 }}
                    color={
                      project.difficulty === 'Beginner' ? 'success' : 
                      project.difficulty === 'Intermediate' ? 'primary' : 'error'
                    }
                  />
                </Box>
                
                <LinearProgress
                  variant="determinate"
                  value={(project.currentMembers / project.teamSize) * 100}
                  sx={{ mb: 2, height: 8, borderRadius: 4 }}
                />
                
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <AvatarGroup max={4}>
                    {project.members.map((member) => (
                      <Avatar 
                        key={member.id} 
                        alt={member.name} 
                        src={member.avatar} 
                        sx={{ width: 32, height: 32 }}
                      />
                    ))}
                  </AvatarGroup>
                </Box>
              </CardContent>
              <Divider />
              <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
                <Button
                  startIcon={<GitHubIcon />}
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Repository
                </Button>
                <Box>
                  <Button 
                    variant="outlined" 
                    color="primary"
                    sx={{ mr: 1 }}
                    onClick={() => navigate('/team-workspace')}
                  >
                    Explore Team Space
                  </Button>
                  <Button 
                    variant="contained" 
                    color="primary"
                    startIcon={<PersonAddIcon />}
                    sx={{ 
                      background: '#00b4d8',
                      '&:hover': {
                        background: '#0096c7',
                      }
                    }}
                  >
                    Join Project
                  </Button>
                </Box>
              </CardActions>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Projects; 