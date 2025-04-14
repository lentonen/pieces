import React, { useState } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Divider, 
  Tabs, 
  Tab, 
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  useTheme,
  useMediaQuery
} from '@mui/material';
import InteractiveChallenges from '../components/InteractiveChallenges';
import CompanyAchievements from '../components/CompanyAchievements';
import CompanyResources from '../components/CompanyResources';
import JobListings from '../components/JobListings';
import { 
  EmojiEvents as TrophyIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  Business as BusinessIcon
} from '@mui/icons-material';

// Main component
const Business = () => {
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Summary data for the overview tab
  const challengesSummary = [
    { id: 1, title: "Review AI-Based Code Analysis Tool", company: "TechCorp Ltd", deadline: "2023-06-15", points: 100 },
    { id: 2, title: "Evaluate Community Learning Platform", company: "EduTech Solutions", deadline: "2023-06-18", points: 100 }
  ];

  const resourcesSummary = [
    { id: 1, title: "Frontend Development Best Practices", company: "KONE", type: "course", rating: 4.8 },
    { id: 2, title: "Sustainable Software Development", company: "UPM", type: "article", rating: 4.6 }
  ];

  const jobsSummary = [
    { id: 1, title: "Senior Frontend Developer", company: "KONE", location: "Helsinki, Finland", type: "Full-time" },
    { id: 2, title: "Backend Developer", company: "UPM", location: "Tampere, Finland", type: "Full-time" }
  ];

  const achievementsSummary = [
    { id: 1, name: "Innovation Leader", description: "Awarded for highly impactful ideas", companies: ["TechCorp Ltd", "EduTech Solutions"] },
    { id: 2, name: "Community Favorite", description: "Ideas receiving the most positive feedback", companies: ["LogiTech Solutions", "FinTech Innovations"] }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
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
          Business Portal
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Engage with the community through interactive challenges and track company achievements.
        </Typography>
        <Divider sx={{ my: 3 }} />
      </Box>
      
      <Paper sx={{ width: '100%', mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant={isMobile ? "scrollable" : "fullWidth"}
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <BusinessIcon sx={{ mr: 1 }} />
                Overview
              </Box>
            } 
          />
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TrophyIcon sx={{ mr: 1 }} />
                Challenges
              </Box>
            } 
          />
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <SchoolIcon sx={{ mr: 1 }} />
                Resources
              </Box>
            } 
          />
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <WorkIcon sx={{ mr: 1 }} />
                Jobs
              </Box>
            } 
          />
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TrophyIcon sx={{ mr: 1 }} />
                Achievements
              </Box>
            } 
          />
        </Tabs>
        
        {/* Overview Tab */}
        {tabValue === 0 && (
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
              Business Portal Overview
            </Typography>
            
            <Grid container spacing={3}>
              {/* Challenges Summary */}
              <Grid item xs={12} md={6}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <TrophyIcon sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="h6">Active Challenges</Typography>
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    {challengesSummary.map((challenge) => (
                      <Box key={challenge.id} sx={{ mb: 2 }}>
                        <Typography variant="subtitle1" fontWeight="bold">{challenge.title}</Typography>
                        <Typography variant="body2" color="text.secondary">{challenge.company}</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                          <Chip label={`Deadline: ${challenge.deadline}`} size="small" />
                          <Chip label={`${challenge.points} pts`} size="small" color="secondary" />
                        </Box>
                      </Box>
                    ))}
                  </CardContent>
                  <CardActions>
                    <Button 
                      size="small" 
                      color="primary"
                      onClick={() => setTabValue(1)}
                    >
                      View All Challenges
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              
              {/* Resources Summary */}
              <Grid item xs={12} md={6}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <SchoolIcon sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="h6">Learning Resources</Typography>
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    {resourcesSummary.map((resource) => (
                      <Box key={resource.id} sx={{ mb: 2 }}>
                        <Typography variant="subtitle1" fontWeight="bold">{resource.title}</Typography>
                        <Typography variant="body2" color="text.secondary">{resource.company}</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                          <Chip label={resource.type} size="small" />
                          <Chip label={`Rating: ${resource.rating}`} size="small" color="secondary" />
                        </Box>
                      </Box>
                    ))}
                  </CardContent>
                  <CardActions>
                    <Button 
                      size="small" 
                      color="primary"
                      onClick={() => setTabValue(2)}
                    >
                      View All Resources
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              
              {/* Jobs Summary */}
              <Grid item xs={12} md={6}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <WorkIcon sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="h6">Job Listings</Typography>
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    {jobsSummary.map((job) => (
                      <Box key={job.id} sx={{ mb: 2 }}>
                        <Typography variant="subtitle1" fontWeight="bold">{job.title}</Typography>
                        <Typography variant="body2" color="text.secondary">{job.company}</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                          <Chip label={job.location} size="small" />
                          <Chip label={job.type} size="small" color="secondary" />
                        </Box>
                      </Box>
                    ))}
                  </CardContent>
                  <CardActions>
                    <Button 
                      size="small" 
                      color="primary"
                      onClick={() => setTabValue(3)}
                    >
                      View All Jobs
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              
              {/* Achievements Summary */}
              <Grid item xs={12} md={6}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <TrophyIcon sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="h6">Company Achievements</Typography>
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    {achievementsSummary.map((achievement) => (
                      <Box key={achievement.id} sx={{ mb: 2 }}>
                        <Typography variant="subtitle1" fontWeight="bold">{achievement.name}</Typography>
                        <Typography variant="body2" color="text.secondary">{achievement.description}</Typography>
                        <Box sx={{ mt: 1 }}>
                          {achievement.companies.map((company, index) => (
                            <Chip 
                              key={index} 
                              label={company} 
                              size="small" 
                              sx={{ mr: 1, mb: 1 }} 
                            />
                          ))}
                        </Box>
                      </Box>
                    ))}
                  </CardContent>
                  <CardActions>
                    <Button 
                      size="small" 
                      color="primary"
                      onClick={() => setTabValue(4)}
                    >
                      View All Achievements
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Box>
        )}
        
        {/* Challenges Tab */}
        {tabValue === 1 && (
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 2, color: 'primary.main' }}>
              Interactive Challenges
            </Typography>
            <Typography variant="body1" paragraph sx={{ mb: 4, color: 'text.secondary' }}>
              Engage with real-world coding challenges from leading companies. Test your skills, earn points, and get recognized for your solutions. These challenges help you demonstrate your expertise while solving actual business problems.
            </Typography>
            <InteractiveChallenges />
          </Box>
        )}
        
        {/* Resources Tab */}
        {tabValue === 2 && (
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 2, color: 'primary.main' }}>
              Learning Resources
            </Typography>
            <Typography variant="body1" paragraph sx={{ mb: 4, color: 'text.secondary' }}>
              Access high-quality learning materials from industry experts. From technical tutorials to best practices guides, these resources help you stay updated with the latest technologies and methodologies in software development.
            </Typography>
            <CompanyResources />
          </Box>
        )}
        
        {/* Jobs Tab */}
        {tabValue === 3 && (
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 2, color: 'primary.main' }}>
              Career Opportunities
            </Typography>
            <Typography variant="body1" paragraph sx={{ mb: 4, color: 'text.secondary' }}>
              Discover exciting job opportunities from companies actively seeking talent. Browse through detailed job listings, filter by your preferences, and apply directly through our platform. Your next career move starts here.
            </Typography>
            <JobListings />
          </Box>
        )}
        
        {/* Achievements Tab */}
        {tabValue === 4 && (
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 2, color: 'primary.main' }}>
              Company Achievements
            </Typography>
            <Typography variant="body1" paragraph sx={{ mb: 4, color: 'text.secondary' }}>
              Celebrate the success of companies making an impact in our community. View achievements, awards, and recognition earned through contributions to open source, community engagement, and innovative solutions.
            </Typography>
            <CompanyAchievements />
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Business; 