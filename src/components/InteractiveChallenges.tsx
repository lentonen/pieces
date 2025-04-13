import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  CardActions, 
  Button, 
  Grid, 
  Chip, 
  Avatar, 
  Divider,
  Tabs,
  Tab,
  Badge,
  IconButton,
  Tooltip
} from '@mui/material';
import { 
  EmojiEvents as TrophyIcon,
  Group as TeamIcon,
  Lightbulb as IdeaIcon,
  AccessTime as TimeIcon,
  Star as StarIcon,
  TrendingUp as TrendingIcon
} from '@mui/icons-material';

// Mock data for challenges
const weeklyChallenges = [
  {
    id: 1,
    title: "Review AI-Based Code Analysis Tool",
    company: "TechCorp Ltd",
    description: "Provide feedback on this innovative tool that helps developers identify potential bugs before they occur.",
    deadline: "2023-06-15",
    participants: 24,
    points: 100,
    status: "active"
  },
  {
    id: 2,
    title: "Evaluate Community Learning Platform",
    company: "EduTech Solutions",
    description: "Share your thoughts on this platform designed to connect learners with industry experts.",
    deadline: "2023-06-18",
    participants: 18,
    points: 100,
    status: "active"
  },
  {
    id: 3,
    title: "Assess Industrial IoT Solution",
    company: "SmartFactory Inc",
    description: "Review this IoT solution for manufacturing efficiency and provide your expert feedback.",
    deadline: "2023-06-20",
    participants: 12,
    points: 100,
    status: "active"
  }
];

const problemSolvingMissions = [
  {
    id: 1,
    title: "Optimize Supply Chain Tracking",
    company: "LogiTech Solutions",
    description: "Help improve the efficiency of our blockchain-based supply chain tracking system.",
    deadline: "2023-06-25",
    teams: 5,
    points: 250,
    status: "active"
  },
  {
    id: 2,
    title: "Enhance User Experience for FinTech App",
    company: "FinTech Innovations",
    description: "Collaborate to improve the user experience of our financial management application.",
    deadline: "2023-06-28",
    teams: 3,
    points: 250,
    status: "active"
  }
];

const ideaEnhancementContests = [
  {
    id: 1,
    title: "Improve Sustainable Manufacturing Analytics",
    company: "GreenTech Industries",
    description: "Enhance this analytics platform for sustainable manufacturing processes.",
    deadline: "2023-07-05",
    participants: 15,
    points: 300,
    status: "active"
  },
  {
    id: 2,
    title: "Refine Bio-based Materials Tracking",
    company: "BioMaterials Co",
    description: "Help improve this tracking system for bio-based materials in the supply chain.",
    deadline: "2023-07-10",
    participants: 10,
    points: 300,
    status: "active"
  }
];

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
      id={`challenge-tabpanel-${index}`}
      aria-labelledby={`challenge-tab-${index}`}
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

const InteractiveChallenges: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', mb: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        Interactive Challenges
      </Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          aria-label="challenge tabs"
          variant="fullWidth"
        >
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TimeIcon sx={{ mr: 1 }} />
                Weekly Reviews
              </Box>
            } 
          />
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TeamIcon sx={{ mr: 1 }} />
                Problem Solving
              </Box>
            } 
          />
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IdeaIcon sx={{ mr: 1 }} />
                Idea Enhancement
              </Box>
            } 
          />
        </Tabs>
      </Box>
      
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          {weeklyChallenges.map((challenge) => (
            <Grid item xs={12} md={6} lg={4} key={challenge.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Chip 
                      label={challenge.status} 
                      color="primary" 
                      size="small" 
                    />
                    <Chip 
                      icon={<StarIcon />} 
                      label={`${challenge.points} pts`} 
                      color="secondary" 
                      size="small" 
                    />
                  </Box>
                  
                  <Typography variant="h6" component="h3" gutterBottom>
                    {challenge.title}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    <strong>Company:</strong> {challenge.company}
                  </Typography>
                  
                  <Typography variant="body2" paragraph>
                    {challenge.description}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <TimeIcon fontSize="small" sx={{ mr: 1 }} />
                    <Typography variant="body2">
                      Deadline: {challenge.deadline}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TeamIcon fontSize="small" sx={{ mr: 1 }} />
                    <Typography variant="body2">
                      {challenge.participants} participants
                    </Typography>
                  </Box>
                </CardContent>
                
                <CardActions>
                  <Button size="small" color="primary">
                    View Details
                  </Button>
                  <Button size="small" color="primary" variant="contained">
                    Participate
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>
      
      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={3}>
          {problemSolvingMissions.map((mission) => (
            <Grid item xs={12} md={6} key={mission.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Chip 
                      label={mission.status} 
                      color="primary" 
                      size="small" 
                    />
                    <Chip 
                      icon={<StarIcon />} 
                      label={`${mission.points} pts`} 
                      color="secondary" 
                      size="small" 
                    />
                  </Box>
                  
                  <Typography variant="h6" component="h3" gutterBottom>
                    {mission.title}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    <strong>Company:</strong> {mission.company}
                  </Typography>
                  
                  <Typography variant="body2" paragraph>
                    {mission.description}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <TimeIcon fontSize="small" sx={{ mr: 1 }} />
                    <Typography variant="body2">
                      Deadline: {mission.deadline}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TeamIcon fontSize="small" sx={{ mr: 1 }} />
                    <Typography variant="body2">
                      {mission.teams} teams participating
                    </Typography>
                  </Box>
                </CardContent>
                
                <CardActions>
                  <Button size="small" color="primary">
                    View Details
                  </Button>
                  <Button size="small" color="primary" variant="contained">
                    Join Team
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>
      
      <TabPanel value={tabValue} index={2}>
        <Grid container spacing={3}>
          {ideaEnhancementContests.map((contest) => (
            <Grid item xs={12} md={6} key={contest.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Chip 
                      label={contest.status} 
                      color="primary" 
                      size="small" 
                    />
                    <Chip 
                      icon={<StarIcon />} 
                      label={`${contest.points} pts`} 
                      color="secondary" 
                      size="small" 
                    />
                  </Box>
                  
                  <Typography variant="h6" component="h3" gutterBottom>
                    {contest.title}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    <strong>Company:</strong> {contest.company}
                  </Typography>
                  
                  <Typography variant="body2" paragraph>
                    {contest.description}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <TimeIcon fontSize="small" sx={{ mr: 1 }} />
                    <Typography variant="body2">
                      Deadline: {contest.deadline}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TeamIcon fontSize="small" sx={{ mr: 1 }} />
                    <Typography variant="body2">
                      {contest.participants} participants
                    </Typography>
                  </Box>
                </CardContent>
                
                <CardActions>
                  <Button size="small" color="primary">
                    View Details
                  </Button>
                  <Button size="small" color="primary" variant="contained">
                    Submit Enhancement
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>
    </Box>
  );
};

export default InteractiveChallenges; 