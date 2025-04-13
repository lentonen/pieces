import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Paper,
  Avatar,
  Chip,
  Button,
  Divider,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Tooltip,
  LinearProgress,
  Badge,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  Code as CodeIcon,
  Star as StarIcon,
  Favorite as FavoriteIcon,
  EmojiEvents as EmojiEventsIcon,
  Timeline as TimelineIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  Build as BuildIcon,
  Language as LanguageIcon,
  Edit as EditIcon,
  Settings as SettingsIcon,
  Share as ShareIcon,
  MoreVert as MoreVertIcon,
  CheckCircle as CheckCircleIcon,
  LocalFireDepartment as LocalFireDepartmentIcon,
  Psychology as PsychologyIcon,
  Terminal as TerminalIcon,
  IntegrationInstructions as IntegrationInstructionsIcon,
  Cloud as CloudIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  AutoAwesome as AutoAwesomeIcon,
  Comment as CommentIcon
} from '@mui/icons-material';

// Mock data for the profile
const mockProfile = {
  name: 'Antti Koivisto',
  username: 'anttikoivisto',
  avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
  bio: 'Full-stack developer passionate about AI, cloud architecture, and open source. Building the future of web development.',
  location: 'Helsinki, Finland',
  joinDate: 'January 2023',
  github: 'https://github.com/anttikoivisto',
  linkedin: 'https://linkedin.com/in/anttikoivisto',
  twitter: 'https://twitter.com/anttikoivisto',
  website: 'https://anttikoivisto.dev',
  techStack: [
    { name: 'React', level: 95, icon: <CodeIcon /> },
    { name: 'TypeScript', level: 90, icon: <CodeIcon /> },
    { name: 'Node.js', level: 85, icon: <TerminalIcon /> },
    { name: 'Python', level: 80, icon: <TerminalIcon /> },
    { name: 'AWS', level: 75, icon: <CloudIcon /> },
    { name: 'Docker', level: 70, icon: <IntegrationInstructionsIcon /> },
    { name: 'GraphQL', level: 65, icon: <IntegrationInstructionsIcon /> },
    { name: 'TensorFlow', level: 60, icon: <PsychologyIcon /> }
  ],
  interests: [
    'Artificial Intelligence',
    'Cloud Architecture',
    'Open Source',
    'Web Performance',
    'Security',
    'DevOps',
    'UI/UX Design',
    'Blockchain'
  ],
  achievements: [
    { name: 'Top Contributor', icon: <StarIcon />, date: 'March 2023' },
    { name: 'Hackathon Winner', icon: <EmojiEventsIcon />, date: 'February 2023' },
    { name: 'Code Quality Expert', icon: <CheckCircleIcon />, date: 'January 2023' },
    { name: 'Community Mentor', icon: <FavoriteIcon />, date: 'December 2022' }
  ],
  stats: {
    projects: 12,
    contributions: 342,
    followers: 128,
    following: 56,
    streak: 45
  },
  recentProjects: [
    {
      id: 1,
      name: 'AI Image Recognition',
      description: 'Machine learning model for real-time image recognition',
      image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg',
      tech: ['Python', 'TensorFlow', 'React'],
      stars: 24,
      forks: 8
    },
    {
      id: 2,
      name: 'Cloud Deployment Tool',
      description: 'Automated deployment pipeline for cloud services',
      image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg',
      tech: ['AWS', 'Docker', 'Node.js'],
      stars: 18,
      forks: 5
    },
    {
      id: 3,
      name: 'Developer Portfolio',
      description: 'Personal portfolio website with 3D elements',
      image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg',
      tech: ['React', 'Three.js', 'TypeScript'],
      stars: 32,
      forks: 12
    }
  ],
  activity: [
    { type: 'commit', project: 'AI Image Recognition', date: '2 hours ago' },
    { type: 'pull_request', project: 'Cloud Deployment Tool', date: '1 day ago' },
    { type: 'issue', project: 'Developer Portfolio', date: '3 days ago' },
    { type: 'comment', project: 'AI Image Recognition', date: '1 week ago' }
  ],
  badges: [
    { name: 'Early Adopter', icon: <LocalFireDepartmentIcon />, color: '#FF5722' },
    { name: 'Problem Solver', icon: <PsychologyIcon />, color: '#2196F3' },
    { name: 'Code Quality', icon: <CheckCircleIcon />, color: '#4CAF50' },
    { name: 'Innovation', icon: <AutoAwesomeIcon />, color: '#9C27B0' },
    { name: 'Security', icon: <SecurityIcon />, color: '#F44336' },
    { name: 'Performance', icon: <SpeedIcon />, color: '#FFC107' }
  ]
};

// TabPanel component for the profile tabs
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Profile: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Profile Header */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 4, 
          mb: 4, 
          borderRadius: 2,
          background: 'linear-gradient(135deg, #0a1929 0%, #132f4c 100%)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box 
          sx={{ 
            position: 'absolute', 
            top: 0, 
            right: 0, 
            width: '30%', 
            height: '100%', 
            opacity: 0.1,
            background: 'url(https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0
          }} 
        />
        <Grid container spacing={3} sx={{ position: 'relative', zIndex: 1 }}>
          <Grid item xs={12} md={3} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar
              src={mockProfile.avatar}
              sx={{ 
                width: 150, 
                height: 150, 
                border: '4px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
              }}
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <Box>
                <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {mockProfile.name}
                </Typography>
                <Typography variant="h6" gutterBottom sx={{ opacity: 0.8 }}>
                  @{mockProfile.username}
                </Typography>
                <Typography variant="body1" paragraph sx={{ maxWidth: '80%', opacity: 0.9 }}>
                  {mockProfile.bio}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Tooltip title="GitHub">
                    <IconButton 
                      component="a" 
                      href={mockProfile.github} 
                      target="_blank" 
                      sx={{ color: 'white', '&:hover': { color: 'primary.main' } }}
                    >
                      <GitHubIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="LinkedIn">
                    <IconButton 
                      component="a" 
                      href={mockProfile.linkedin} 
                      target="_blank" 
                      sx={{ color: 'white', '&:hover': { color: 'primary.main' } }}
                    >
                      <LinkedInIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Twitter">
                    <IconButton 
                      component="a" 
                      href={mockProfile.twitter} 
                      target="_blank" 
                      sx={{ color: 'white', '&:hover': { color: 'primary.main' } }}
                    >
                      <TwitterIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Website">
                    <IconButton 
                      component="a" 
                      href={mockProfile.website} 
                      target="_blank" 
                      sx={{ color: 'white', '&:hover': { color: 'primary.main' } }}
                    >
                      <LanguageIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 2,
                    background: '#00b4d8',
                    '&:hover': {
                      background: '#0096c7'
                    }
                  }}
                >
                  Edit Profile
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 2,
                    background: '#00b4d8',
                    '&:hover': {
                      background: '#0096c7'
                    }
                  }}
                >
                  Add Project
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 2,
                    background: '#00b4d8',
                    '&:hover': {
                      background: '#0096c7'
                    }
                  }}
                >
                  Add Experience
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 2,
                    background: '#00b4d8',
                    '&:hover': {
                      background: '#0096c7'
                    }
                  }}
                >
                  Add Education
                </Button>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <WorkIcon sx={{ mr: 1, opacity: 0.7 }} />
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  {mockProfile.location}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TimelineIcon sx={{ mr: 1, opacity: 0.7 }} />
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  Joined {mockProfile.joinDate}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocalFireDepartmentIcon sx={{ mr: 1, color: '#FF5722' }} />
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  {mockProfile.stats.streak} day streak
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={6} sm={3}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 2, 
              textAlign: 'center', 
              borderRadius: 2,
              background: 'linear-gradient(135deg, #1a237e 0%, #283593 100%)',
              color: 'white'
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              {mockProfile.stats.projects}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Projects
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 2, 
              textAlign: 'center', 
              borderRadius: 2,
              background: 'linear-gradient(135deg, #0d47a1 0%, #1565c0 100%)',
              color: 'white'
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              {mockProfile.stats.contributions}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Contributions
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 2, 
              textAlign: 'center', 
              borderRadius: 2,
              background: 'linear-gradient(135deg, #006064 0%, #00838f 100%)',
              color: 'white'
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              {mockProfile.stats.followers}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Followers
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 2, 
              textAlign: 'center', 
              borderRadius: 2,
              background: 'linear-gradient(135deg, #004d40 0%, #00695c 100%)',
              color: 'white'
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              {mockProfile.stats.following}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Following
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Paper sx={{ width: '100%', mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant={isMobile ? "scrollable" : "standard"}
          scrollButtons="auto"
          aria-label="profile tabs"
        >
          <Tab label="Overview" />
          <Tab label="Projects" />
          <Tab label="Tech Stack" />
          <Tab label="Activity" />
          <Tab label="Achievements" />
        </Tabs>

        {/* Overview Tab */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  About Me
                </Typography>
                <Typography variant="body1" paragraph>
                  I'm a full-stack developer with a passion for creating elegant solutions to complex problems. 
                  My journey in tech started with a curiosity about how things work on the internet, which led me 
                  to learn web development. Now, I'm exploring the frontiers of AI and cloud architecture.
                </Typography>
                <Typography variant="body1" paragraph>
                  When I'm not coding, you can find me contributing to open-source projects, writing technical blog posts, 
                  or exploring new technologies. I believe in the power of community and knowledge sharing.
                </Typography>
                <Typography variant="body1">
                  Currently working on building scalable applications and exploring the intersection of AI and web development.
                </Typography>
              </Paper>

              <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Recent Projects
                </Typography>
                <Grid container spacing={2}>
                  {mockProfile.recentProjects.map((project) => (
                    <Grid item xs={12} sm={6} key={project.id}>
                      <Card sx={{ height: '100%', borderRadius: 2 }}>
                        <CardMedia
                          component="img"
                          height="140"
                          image={project.image}
                          alt={project.name}
                        />
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            {project.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" paragraph>
                            {project.description}
                          </Typography>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                            {project.tech.map((tech) => (
                              <Chip 
                                key={tech} 
                                label={tech} 
                                size="small" 
                                sx={{ 
                                  backgroundColor: 'rgba(25, 118, 210, 0.1)',
                                  color: 'primary.main'
                                }}
                              />
                            ))}
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <StarIcon sx={{ fontSize: 16, color: 'warning.main', mr: 0.5 }} />
                              <Typography variant="body2">{project.stars}</Typography>
                              <Typography variant="body2" sx={{ mx: 1 }}>•</Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <CodeIcon sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
                                <Typography variant="body2">{project.forks}</Typography>
                              </Box>
                            </Box>
                            <Button 
                              size="small" 
                              variant="outlined"
                              sx={{ borderRadius: 5 }}
                            >
                              View
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Interests
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {mockProfile.interests.map((interest) => (
                    <Chip 
                      key={interest} 
                      label={interest} 
                      sx={{ 
                        backgroundColor: 'rgba(25, 118, 210, 0.1)',
                        color: 'primary.main'
                      }}
                    />
                  ))}
                </Box>
              </Paper>

              <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Badges
                </Typography>
                <Grid container spacing={2}>
                  {mockProfile.badges.map((badge) => (
                    <Grid item xs={6} key={badge.name}>
                      <Box 
                        sx={{ 
                          display: 'flex', 
                          flexDirection: 'column', 
                          alignItems: 'center',
                          p: 1,
                          borderRadius: 1,
                          '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.04)'
                          }
                        }}
                      >
                        <Avatar 
                          sx={{ 
                            width: 50, 
                            height: 50, 
                            backgroundColor: badge.color,
                            mb: 1
                          }}
                        >
                          {badge.icon}
                        </Avatar>
                        <Typography variant="body2" align="center">
                          {badge.name}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Paper>

              <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Achievements
                </Typography>
                <List>
                  {mockProfile.achievements.map((achievement) => (
                    <ListItem key={achievement.name} sx={{ px: 0 }}>
                      <ListItemIcon>
                        <Avatar 
                          sx={{ 
                            width: 40, 
                            height: 40, 
                            backgroundColor: 'primary.main'
                          }}
                        >
                          {achievement.icon}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText 
                        primary={achievement.name} 
                        secondary={achievement.date}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Projects Tab */}
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            {mockProfile.recentProjects.map((project) => (
              <Grid item xs={12} sm={6} md={4} key={project.id}>
                <Card sx={{ height: '100%', borderRadius: 2 }}>
                  <CardMedia
                    component="img"
                    height="180"
                    image={project.image}
                    alt={project.name}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {project.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {project.description}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      {project.tech.map((tech) => (
                        <Chip 
                          key={tech} 
                          label={tech} 
                          size="small" 
                          sx={{ 
                            backgroundColor: 'rgba(25, 118, 210, 0.1)',
                            color: 'primary.main'
                          }}
                        />
                      ))}
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <StarIcon sx={{ fontSize: 16, color: 'warning.main', mr: 0.5 }} />
                        <Typography variant="body2">{project.stars}</Typography>
                        <Typography variant="body2" sx={{ mx: 1 }}>•</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <CodeIcon sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
                          <Typography variant="body2">{project.forks}</Typography>
                        </Box>
                      </Box>
                      <Button 
                        size="small" 
                        variant="contained"
                        sx={{ borderRadius: 5 }}
                      >
                        View Project
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        {/* Tech Stack Tab */}
        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            {mockProfile.techStack.map((tech) => (
              <Grid item xs={12} sm={6} md={4} key={tech.name}>
                <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar 
                      sx={{ 
                        width: 40, 
                        height: 40, 
                        backgroundColor: 'primary.main',
                        mr: 2
                      }}
                    >
                      {tech.icon}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6">
                        {tech.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {tech.level}% Proficiency
                      </Typography>
                    </Box>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={tech.level} 
                    sx={{ 
                      height: 8, 
                      borderRadius: 4,
                      backgroundColor: 'rgba(25, 118, 210, 0.1)',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 4,
                      }
                    }}
                  />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        {/* Activity Tab */}
        <TabPanel value={tabValue} index={3}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Recent Activity
            </Typography>
            <List>
              {mockProfile.activity.map((item, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemIcon>
                      <Avatar 
                        sx={{ 
                          width: 40, 
                          height: 40, 
                          backgroundColor: 
                            item.type === 'commit' ? 'success.main' : 
                            item.type === 'pull_request' ? 'info.main' : 
                            item.type === 'issue' ? 'warning.main' : 'primary.main'
                        }}
                      >
                        {item.type === 'commit' ? <CodeIcon /> : 
                         item.type === 'pull_request' ? <IntegrationInstructionsIcon /> : 
                         item.type === 'issue' ? <BuildIcon /> : <CommentIcon />}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText 
                      primary={
                        <Typography variant="body1">
                          {item.type === 'commit' ? 'Committed to' : 
                           item.type === 'pull_request' ? 'Created pull request for' : 
                           item.type === 'issue' ? 'Opened issue in' : 'Commented on'} 
                          <Typography component="span" sx={{ fontWeight: 'bold', ml: 0.5 }}>
                            {item.project}
                          </Typography>
                        </Typography>
                      } 
                      secondary={item.date}
                    />
                  </ListItem>
                  {index < mockProfile.activity.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </TabPanel>

        {/* Achievements Tab */}
        <TabPanel value={tabValue} index={4}>
          <Grid container spacing={3}>
            {mockProfile.achievements.map((achievement, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 3, 
                    borderRadius: 2,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center'
                  }}
                >
                  <Avatar 
                    sx={{ 
                      width: 80, 
                      height: 80, 
                      backgroundColor: 'primary.main',
                      mb: 2
                    }}
                  >
                    {achievement.icon}
                  </Avatar>
                  <Typography variant="h6" gutterBottom>
                    {achievement.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Earned on {achievement.date}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default Profile; 