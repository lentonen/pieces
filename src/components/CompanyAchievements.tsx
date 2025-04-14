import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  Avatar, 
  Chip, 
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { 
  EmojiEvents as TrophyIcon,
  Star as StarIcon,
  Favorite as FavoriteIcon,
  CheckCircle as CheckCircleIcon,
  Message as MessageIcon,
  ArrowUpward as ArrowUpwardIcon
} from '@mui/icons-material';

// Mock data for company badges
const companyBadges = [
  {
    id: 1,
    name: "Innovation Leader",
    description: "Awarded for highly impactful ideas",
    icon: <TrophyIcon sx={{ color: '#FFD700' }} />,
    companies: [
      { id: 1, name: "TechCorp Ltd", logo: "TC" },
      { id: 2, name: "EduTech Solutions", logo: "ES" },
      { id: 3, name: "SmartFactory Inc", logo: "SF" }
    ]
  },
  {
    id: 2,
    name: "Community Favorite",
    description: "Ideas receiving the most positive feedback",
    icon: <FavoriteIcon sx={{ color: '#FF69B4' }} />,
    companies: [
      { id: 4, name: "LogiTech Solutions", logo: "LS" },
      { id: 5, name: "FinTech Innovations", logo: "FI" },
      { id: 6, name: "GreenTech Industries", logo: "GI" }
    ]
  },
  {
    id: 3,
    name: "Project Champion",
    description: "Successfully completed projects",
    icon: <CheckCircleIcon sx={{ color: '#4CAF50' }} />,
    companies: [
      { id: 7, name: "BioMaterials Co", logo: "BC" },
      { id: 8, name: "AI Solutions", logo: "AI" },
      { id: 9, name: "Cloud Systems", logo: "CS" }
    ]
  },
  {
    id: 4,
    name: "Engagement Master",
    description: "Actively responding to community feedback",
    icon: <MessageIcon sx={{ color: '#2196F3' }} />,
    companies: [
      { id: 10, name: "Data Analytics Inc", logo: "DA" },
      { id: 11, name: "Security Solutions", logo: "SS" },
      { id: 12, name: "Mobile Apps Co", logo: "MA" }
    ]
  }
];

// Mock data for company leaderboard
const companyLeaderboard = [
  { id: 1, name: "TechCorp Ltd", engagement: 95, projectSuccess: 88, innovationScore: 92, totalScore: 91.7 },
  { id: 2, name: "EduTech Solutions", engagement: 87, projectSuccess: 90, innovationScore: 85, totalScore: 87.3 },
  { id: 3, name: "SmartFactory Inc", engagement: 82, projectSuccess: 85, innovationScore: 88, totalScore: 85.0 },
  { id: 4, name: "LogiTech Solutions", engagement: 90, projectSuccess: 78, innovationScore: 82, totalScore: 83.3 },
  { id: 5, name: "FinTech Innovations", engagement: 75, projectSuccess: 92, innovationScore: 80, totalScore: 82.3 },
  { id: 6, name: "GreenTech Industries", engagement: 88, projectSuccess: 80, innovationScore: 75, totalScore: 81.0 },
  { id: 7, name: "BioMaterials Co", engagement: 70, projectSuccess: 85, innovationScore: 90, totalScore: 81.7 },
  { id: 8, name: "AI Solutions", engagement: 95, projectSuccess: 70, innovationScore: 95, totalScore: 86.7 },
  { id: 9, name: "Cloud Systems", engagement: 65, projectSuccess: 88, innovationScore: 85, totalScore: 79.3 },
  { id: 10, name: "Data Analytics Inc", engagement: 80, projectSuccess: 75, innovationScore: 78, totalScore: 77.7 }
];

// Mock data for trending ideas
const trendingIdeas = [
  {
    id: 1,
    title: "AI-Powered Code Review System",
    company: "TechCorp Ltd",
    category: "Technology",
    engagement: 245,
    growth: 32,
    status: "In Development"
  },
  {
    id: 2,
    title: "Sustainable Supply Chain Platform",
    company: "GreenTech Industries",
    category: "Sustainability",
    engagement: 198,
    growth: 28,
    status: "Planning"
  },
  {
    id: 3,
    title: "Financial Literacy App for Students",
    company: "EduTech Solutions",
    category: "Education",
    engagement: 176,
    growth: 25,
    status: "In Development"
  },
  {
    id: 4,
    title: "IoT-Based Energy Management",
    company: "SmartFactory Inc",
    category: "Energy",
    engagement: 165,
    growth: 22,
    status: "Planning"
  },
  {
    id: 5,
    title: "Blockchain Identity Verification",
    company: "FinTech Innovations",
    category: "Security",
    engagement: 154,
    growth: 20,
    status: "Research"
  }
];

const CompanyAchievements: React.FC = () => {
  const [selectedBadge, setSelectedBadge] = useState<number | null>(null);

  return (
    <Box sx={{ width: '100%', mb: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        Company Achievements
      </Typography>
      
      {/* Achievement Badges */}
      <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 4, mb: 2 }}>
        Achievement Badges
      </Typography>
      
      <Grid container spacing={3}>
        {companyBadges.map((badge) => (
          <Grid item xs={12} md={6} lg={3} key={badge.id}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                cursor: 'pointer',
                border: selectedBadge === badge.id ? '2px solid #1976d2' : 'none',
                '&:hover': {
                  boxShadow: 6
                }
              }}
              onClick={() => setSelectedBadge(badge.id)}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ mr: 2 }}>
                    {badge.icon}
                  </Box>
                  <Typography variant="h6" component="h4">
                    {badge.name}
                  </Typography>
                </Box>
                
                <Typography variant="body2" color="text.secondary" paragraph>
                  {badge.description}
                </Typography>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="subtitle2" gutterBottom>
                  Awarded to:
                </Typography>
                
                <List dense>
                  {badge.companies.map((company) => (
                    <ListItem key={company.id}>
                      <ListItemAvatar>
                        <Avatar>{company.logo}</Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={company.name} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      {/* Company Leaderboard */}
      <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 4, mb: 2 }}>
        Company Leaderboard
      </Typography>
      
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Company</TableCell>
              <TableCell align="right">Engagement</TableCell>
              <TableCell align="right">Project Success</TableCell>
              <TableCell align="right">Innovation Score</TableCell>
              <TableCell align="right">Total Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companyLeaderboard.map((company, index) => (
              <TableRow 
                key={company.id}
                sx={{ 
                  backgroundColor: index < 3 ? 'rgba(25, 118, 210, 0.08)' : 'inherit',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)'
                  }
                }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                  {index < 3 && (
                    <Tooltip title="Top Performer">
                      <StarIcon sx={{ color: '#FFD700', ml: 1, fontSize: '1rem' }} />
                    </Tooltip>
                  )}
                </TableCell>
                <TableCell>{company.name}</TableCell>
                <TableCell align="right">{company.engagement}%</TableCell>
                <TableCell align="right">{company.projectSuccess}%</TableCell>
                <TableCell align="right">{company.innovationScore}%</TableCell>
                <TableCell align="right">
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    {company.totalScore}%
                    {index < companyLeaderboard.length - 1 && company.totalScore > companyLeaderboard[index + 1].totalScore && (
                      <ArrowUpwardIcon sx={{ color: '#4CAF50', ml: 1, fontSize: '1rem' }} />
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      {/* Trending Ideas */}
      <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 4, mb: 2 }}>
        Trending Ideas
      </Typography>
      
      <Grid container spacing={3}>
        {trendingIdeas.map((idea) => (
          <Grid item xs={12} md={6} lg={4} key={idea.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Chip 
                    label={idea.category} 
                    color="primary" 
                    size="small" 
                  />
                  <Chip 
                    label={idea.status} 
                    color="secondary" 
                    size="small" 
                  />
                </Box>
                
                <Typography variant="h6" component="h4" gutterBottom>
                  {idea.title}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  <strong>Company:</strong> {idea.company}
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Engagement
                    </Typography>
                    <Typography variant="h6">
                      {idea.engagement}
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Growth
                    </Typography>
                    <Typography variant="h6" sx={{ color: '#4CAF50' }}>
                      +{idea.growth}%
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CompanyAchievements; 