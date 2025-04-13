import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  InputAdornment,
  IconButton,
  Divider,
  Alert,
  SelectChangeEvent,
  Avatar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CodeIcon from '@mui/icons-material/Code';
import GroupIcon from '@mui/icons-material/Group';
import GitHubIcon from '@mui/icons-material/GitHub';
import { styled } from '@mui/material/styles';

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: theme.spacing(2),
  background: 'rgba(19, 47, 76, 0.5)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  borderRadius: '16px',
  fontWeight: 600,
}));

const ProjectSubmission = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [projectData, setProjectData] = useState({
    name: '',
    description: '',
    githubUrl: '',
    teamSize: 4,
    techStack: [] as string[],
    difficulty: 'Intermediate',
    status: 'Planning',
    lookingFor: [] as string[],
    image: '',
    newTech: '',
    newRole: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProjectData({
      ...projectData,
      [name]: value,
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setProjectData({
      ...projectData,
      [name]: value,
    });
  };

  const handleAddTech = () => {
    if (projectData.newTech.trim() && !projectData.techStack.includes(projectData.newTech.trim())) {
      setProjectData({
        ...projectData,
        techStack: [...projectData.techStack, projectData.newTech.trim()],
        newTech: '',
      });
    }
  };

  const handleRemoveTech = (tech: string) => {
    setProjectData({
      ...projectData,
      techStack: projectData.techStack.filter(t => t !== tech),
    });
  };

  const handleAddRole = () => {
    if (projectData.newRole.trim() && !projectData.lookingFor.includes(projectData.newRole.trim())) {
      setProjectData({
        ...projectData,
        lookingFor: [...projectData.lookingFor, projectData.newRole.trim()],
        newRole: '',
      });
    }
  };

  const handleRemoveRole = (role: string) => {
    setProjectData({
      ...projectData,
      lookingFor: projectData.lookingFor.filter(r => r !== role),
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!projectData.name.trim()) {
      newErrors.name = 'Project name is required';
    }
    
    if (!projectData.description.trim()) {
      newErrors.description = 'Project description is required';
    }
    
    if (projectData.techStack.length === 0) {
      newErrors.techStack = 'At least one technology is required';
    }
    
    if (projectData.lookingFor.length === 0) {
      newErrors.lookingFor = 'At least one role is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // In a real application, you would send this data to your backend
      console.log('Project data submitted:', projectData);
      
      // Simulate successful submission
      setSuccess(true);
      
      // Redirect to projects page after a delay
      setTimeout(() => {
        navigate('/projects');
      }, 2000);
    }
  };

  const steps = [
    {
      label: 'Basic Information',
      content: (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Project Name"
              name="name"
              value={projectData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Project Description"
              name="description"
              value={projectData.description}
              onChange={handleChange}
              error={!!errors.description}
              helperText={errors.description}
              multiline
              rows={4}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="GitHub Repository URL"
              name="githubUrl"
              value={projectData.githubUrl}
              onChange={handleChange}
              placeholder="https://github.com/username/repository"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Difficulty Level</InputLabel>
              <Select
                name="difficulty"
                value={projectData.difficulty}
                onChange={handleSelectChange}
                label="Difficulty Level"
              >
                <MenuItem value="Beginner">Beginner</MenuItem>
                <MenuItem value="Intermediate">Intermediate</MenuItem>
                <MenuItem value="Advanced">Advanced</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Project Status</InputLabel>
              <Select
                name="status"
                value={projectData.status}
                onChange={handleSelectChange}
                label="Project Status"
              >
                <MenuItem value="Planning">Planning</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Team Size</InputLabel>
              <Select
                name="teamSize"
                value={projectData.teamSize.toString()}
                onChange={handleSelectChange}
                label="Team Size"
              >
                <MenuItem value={2}>2 members</MenuItem>
                <MenuItem value={3}>3 members</MenuItem>
                <MenuItem value={4}>4 members</MenuItem>
                <MenuItem value={5}>5 members</MenuItem>
                <MenuItem value={6}>6 members</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      ),
    },
    {
      label: 'Technical Details',
      content: (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Tech Stack
            </Typography>
            <Box sx={{ mb: 2 }}>
              {projectData.techStack.map((tech) => (
                <StyledChip
                  key={tech}
                  label={tech}
                  onDelete={() => handleRemoveTech(tech)}
                  deleteIcon={<DeleteIcon />}
                  icon={<CodeIcon />}
                />
              ))}
            </Box>
            <Box sx={{ display: 'flex', mb: 2 }}>
              <TextField
                fullWidth
                label="Add Technology"
                value={projectData.newTech}
                onChange={(e) => setProjectData({ ...projectData, newTech: e.target.value })}
                error={!!errors.techStack}
                helperText={errors.techStack}
                sx={{ mr: 1 }}
              />
              <Button
                variant="contained"
                onClick={handleAddTech}
                sx={{ 
                  minWidth: '100px',
                  background: '#00b4d8',
                  '&:hover': {
                    background: '#0096c7',
                  }
                }}
              >
                Add
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Project Image
            </Typography>
            <Box sx={{ 
              border: '1px dashed rgba(255, 255, 255, 0.3)', 
              borderRadius: 1, 
              p: 3, 
              textAlign: 'center',
              mb: 2
            }}>
              <CloudUploadIcon sx={{ fontSize: 40, color: 'rgba(255, 255, 255, 0.5)', mb: 1 }} />
              <Typography variant="body1" sx={{ mb: 2 }}>
                Drag and drop an image here, or click to select
              </Typography>
              <Button
                variant="outlined"
                component="label"
                sx={{ 
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  color: 'white',
                  '&:hover': {
                    borderColor: 'white',
                  }
                }}
              >
                Upload Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    // In a real app, you would handle file upload here
                    // For now, we'll just use a placeholder
                    setProjectData({
                      ...projectData,
                      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
                    });
                  }}
                />
              </Button>
            </Box>
            {projectData.image && (
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <img 
                  src={projectData.image} 
                  alt="Project preview" 
                  style={{ 
                    maxWidth: '100%', 
                    maxHeight: '200px', 
                    borderRadius: '8px' 
                  }} 
                />
              </Box>
            )}
          </Grid>
        </Grid>
      ),
    },
    {
      label: 'Team Requirements',
      content: (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Roles You're Looking For
            </Typography>
            <Box sx={{ mb: 2 }}>
              {projectData.lookingFor.map((role) => (
                <StyledChip
                  key={role}
                  label={role}
                  onDelete={() => handleRemoveRole(role)}
                  deleteIcon={<DeleteIcon />}
                  icon={<GroupIcon />}
                />
              ))}
            </Box>
            <Box sx={{ display: 'flex', mb: 2 }}>
              <TextField
                fullWidth
                label="Add Role"
                value={projectData.newRole}
                onChange={(e) => setProjectData({ ...projectData, newRole: e.target.value })}
                error={!!errors.lookingFor}
                helperText={errors.lookingFor}
                sx={{ mr: 1 }}
              />
              <Button
                variant="contained"
                onClick={handleAddRole}
                sx={{ 
                  minWidth: '100px',
                  background: '#00b4d8',
                  '&:hover': {
                    background: '#0096c7',
                  }
                }}
              >
                Add
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Preview
            </Typography>
            <Paper sx={{ p: 2, background: 'rgba(19, 47, 76, 0.5)', backdropFilter: 'blur(10px)' }}>
              <Typography variant="h5" gutterBottom>
                {projectData.name || 'Project Name'}
              </Typography>
              <Typography variant="body2" paragraph>
                {projectData.description || 'Project description will appear here.'}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 2 }}>
                {projectData.techStack.map((tech) => (
                  <Chip
                    key={tech}
                    label={tech}
                    size="small"
                    sx={{ mr: 1, mb: 1, background: 'rgba(0, 180, 216, 0.1)', color: '#00b4d8' }}
                  />
                ))}
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 2 }}>
                {projectData.lookingFor.map((role) => (
                  <Chip
                    key={role}
                    label={role}
                    size="small"
                    sx={{ mr: 1, mb: 1, background: 'rgba(114, 9, 183, 0.1)', color: '#7209b7' }}
                  />
                ))}
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <GroupIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="body2">
                    1 / {projectData.teamSize} members
                  </Typography>
                  <Chip 
                    label={projectData.difficulty} 
                    size="small" 
                    sx={{ ml: 2 }}
                    color={
                      projectData.difficulty === 'Beginner' ? 'success' : 
                      projectData.difficulty === 'Intermediate' ? 'primary' : 'error'
                    }
                  />
                </Box>
                <Avatar sx={{ width: 32, height: 32 }} />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      ),
    },
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0a1929 0%, #132f4c 100%)',
      pt: 8,
      pb: 12
    }}>
      <Container maxWidth="md">
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
            textAlign: 'center',
            mb: 4
          }}
        >
          Create New Project
        </Typography>
        
        {success ? (
          <Alert severity="success" sx={{ mb: 3 }}>
            Your project has been created successfully! Redirecting to projects page...
          </Alert>
        ) : (
          <>
            <Box sx={{ mb: 4 }}>
              {steps.map((step, index) => (
                <Button
                  key={step.label}
                  variant={activeStep === index ? 'contained' : 'outlined'}
                  sx={{ 
                    mr: 1, 
                    mb: 1,
                    background: activeStep === index ? '#00b4d8' : 'transparent',
                    borderColor: activeStep === index ? '#00b4d8' : 'rgba(255, 255, 255, 0.3)',
                    color: 'white',
                    '&:hover': {
                      background: activeStep === index ? '#0096c7' : 'rgba(255, 255, 255, 0.1)',
                      borderColor: activeStep === index ? '#0096c7' : 'white',
                    }
                  }}
                  onClick={() => setActiveStep(index)}
                >
                  {step.label}
                </Button>
              ))}
            </Box>
            
            <StyledPaper>
              {steps[activeStep].content}
            </StyledPaper>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button
                variant="outlined"
                onClick={handleBack}
                disabled={activeStep === 0}
                sx={{ 
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  color: 'white',
                  '&:hover': {
                    borderColor: 'white',
                  }
                }}
              >
                Back
              </Button>
              <Button
                variant="contained"
                onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                sx={{ 
                  background: '#00b4d8',
                  '&:hover': {
                    background: '#0096c7',
                  }
                }}
              >
                {activeStep === steps.length - 1 ? 'Create Project' : 'Next'}
              </Button>
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
};

export default ProjectSubmission; 