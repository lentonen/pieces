import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  Chip, 
  Divider,
  Rating,
  Button,
  Tabs,
  Tab,
  Paper,
  InputBase,
  IconButton
} from '@mui/material';
import { 
  School as SchoolIcon,
  Article as ArticleIcon,
  PlayCircle as PlayCircleIcon,
  Groups as GroupsIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Sort as SortIcon
} from '@mui/icons-material';

// Mock data for learning resources
const learningResources = [
  {
    id: 1,
    title: "Frontend Development Best Practices",
    company: "KONE",
    type: "course",
    topics: ["React", "TypeScript", "UI/UX"],
    level: "Intermediate",
    rating: 4.8,
    feedbackCount: 124,
    url: "#",
    date: "2023-05-15"
  },
  {
    id: 2,
    title: "Sustainable Software Development",
    company: "UPM",
    type: "article",
    topics: ["Sustainability", "Green Computing", "Best Practices"],
    level: "Advanced",
    rating: 4.6,
    feedbackCount: 89,
    url: "#",
    date: "2023-05-10"
  },
  {
    id: 3,
    title: "API Design Patterns",
    company: "NORDNET",
    type: "video",
    topics: ["API", "REST", "GraphQL"],
    level: "Intermediate",
    rating: 4.9,
    feedbackCount: 156,
    url: "#",
    date: "2023-05-05"
  },
  {
    id: 4,
    title: "IoT Security Fundamentals",
    company: "KONE",
    type: "workshop",
    topics: ["IoT", "Security", "Edge Computing"],
    level: "Advanced",
    rating: 4.7,
    feedbackCount: 67,
    url: "#",
    date: "2023-04-28"
  },
  {
    id: 5,
    title: "Sustainable Code Review Process",
    company: "UPM",
    type: "article",
    topics: ["Code Review", "Sustainability", "Best Practices"],
    level: "Intermediate",
    rating: 4.5,
    feedbackCount: 92,
    url: "#",
    date: "2023-04-20"
  },
  {
    id: 6,
    title: "FinTech API Design Patterns",
    company: "NORDNET",
    type: "course",
    topics: ["FinTech", "API", "Security"],
    level: "Advanced",
    rating: 4.8,
    feedbackCount: 113,
    url: "#",
    date: "2023-04-15"
  }
];

// Mock data for company ideas
const companyIdeas = [
  {
    id: 1,
    title: "Remote-First Development Practices",
    company: "KONE",
    category: "workplace",
    status: "proposed",
    feedback: {
      positive: 87,
      comments: 24
    },
    date: "2023-05-12"
  },
  {
    id: 2,
    title: "Sustainable Code Review Process",
    company: "UPM",
    category: "technology",
    status: "in-progress",
    feedback: {
      positive: 92,
      comments: 31
    },
    date: "2023-05-08"
  },
  {
    id: 3,
    title: "Career Growth Framework",
    company: "NORDNET",
    category: "career",
    status: "completed",
    feedback: {
      positive: 95,
      comments: 42
    },
    date: "2023-04-25"
  },
  {
    id: 4,
    title: "AI-Assisted Code Review",
    company: "KONE",
    category: "technology",
    status: "proposed",
    feedback: {
      positive: 78,
      comments: 19
    },
    date: "2023-04-18"
  },
  {
    id: 5,
    title: "Green Computing Initiative",
    company: "UPM",
    category: "technology",
    status: "in-progress",
    feedback: {
      positive: 89,
      comments: 27
    },
    date: "2023-04-10"
  },
  {
    id: 6,
    title: "Developer Wellbeing Program",
    company: "NORDNET",
    category: "workplace",
    status: "proposed",
    feedback: {
      positive: 82,
      comments: 22
    },
    date: "2023-04-05"
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
      id={`resource-tabpanel-${index}`}
      aria-labelledby={`resource-tab-${index}`}
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

const CompanyResources: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('rating');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleFilterTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFilterType(event.target.value as string);
  };

  const handleFilterLevelChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFilterLevel(event.target.value as string);
  };

  const handleSortChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSortBy(event.target.value as string);
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'course':
        return <SchoolIcon />;
      case 'article':
        return <ArticleIcon />;
      case 'video':
        return <PlayCircleIcon />;
      case 'workshop':
        return <GroupsIcon />;
      default:
        return <ArticleIcon />;
    }
  };

  const filteredResources = learningResources.filter(resource => {
    if (filterType !== 'all' && resource.type !== filterType) return false;
    if (filterLevel !== 'all' && resource.level !== filterLevel) return false;
    return true;
  });

  const sortedResources = [...filteredResources].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'date') return new Date(b.date).getTime() - new Date(a.date).getTime();
    if (sortBy === 'feedback') return b.feedbackCount - a.feedbackCount;
    return 0;
  });

  return (
    <Box sx={{ width: '100%', mb: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        Company Resources
      </Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          aria-label="resource tabs"
          variant="fullWidth"
        >
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <SchoolIcon sx={{ mr: 1 }} />
                Learning Resources
              </Box>
            } 
          />
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ArticleIcon sx={{ mr: 1 }} />
                Company Ideas
              </Box>
            } 
          />
        </Tabs>
      </Box>
      
      <TabPanel value={tabValue} index={0}>
        <Paper sx={{ p: 2, mb: 3, display: 'flex', alignItems: 'center' }}>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search resources..."
            inputProps={{ 'aria-label': 'search resources' }}
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            <FilterIcon sx={{ mr: 1 }} />
            <select 
              value={filterType} 
              onChange={handleFilterTypeChange}
              style={{ 
                border: 'none', 
                background: 'transparent', 
                padding: '8px',
                outline: 'none'
              }}
            >
              <option value="all">All Types</option>
              <option value="course">Courses</option>
              <option value="article">Articles</option>
              <option value="video">Videos</option>
              <option value="workshop">Workshops</option>
            </select>
          </Box>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            <FilterIcon sx={{ mr: 1 }} />
            <select 
              value={filterLevel} 
              onChange={handleFilterLevelChange}
              style={{ 
                border: 'none', 
                background: 'transparent', 
                padding: '8px',
                outline: 'none'
              }}
            >
              <option value="all">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </Box>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            <SortIcon sx={{ mr: 1 }} />
            <select 
              value={sortBy} 
              onChange={handleSortChange}
              style={{ 
                border: 'none', 
                background: 'transparent', 
                padding: '8px',
                outline: 'none'
              }}
            >
              <option value="rating">Top Rated</option>
              <option value="date">Most Recent</option>
              <option value="feedback">Most Feedback</option>
            </select>
          </Box>
        </Paper>
        
        <Grid container spacing={3}>
          {sortedResources.map((resource) => (
            <Grid item xs={12} md={6} key={resource.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Chip 
                      icon={getResourceIcon(resource.type)}
                      label={resource.type.charAt(0).toUpperCase() + resource.type.slice(1)} 
                      color="primary" 
                      size="small" 
                    />
                    <Chip 
                      label={resource.level} 
                      color="secondary" 
                      size="small" 
                    />
                  </Box>
                  
                  <Typography variant="h6" component="h3" gutterBottom>
                    {resource.title}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    <strong>Company:</strong> {resource.company}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                    {resource.topics.map((topic, index) => (
                      <Chip 
                        key={index} 
                        label={topic} 
                        size="small" 
                        variant="outlined" 
                      />
                    ))}
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Rating value={resource.rating} precision={0.1} readOnly size="small" />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      ({resource.feedbackCount} reviews)
                    </Typography>
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary">
                    Published: {resource.date}
                  </Typography>
                </CardContent>
                
                <Box sx={{ p: 2, pt: 0 }}>
                  <Button 
                    variant="contained" 
                    fullWidth 
                    href={resource.url}
                  >
                    Access Resource
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>
      
      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={3}>
          {companyIdeas.map((idea) => (
            <Grid item xs={12} md={6} key={idea.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Chip 
                      label={idea.category.charAt(0).toUpperCase() + idea.category.slice(1)} 
                      color="primary" 
                      size="small" 
                    />
                    <Chip 
                      label={idea.status.charAt(0).toUpperCase() + idea.status.slice(1)} 
                      color={
                        idea.status === 'completed' ? 'success' : 
                        idea.status === 'in-progress' ? 'warning' : 'default'
                      } 
                      size="small" 
                    />
                  </Box>
                  
                  <Typography variant="h6" component="h3" gutterBottom>
                    {idea.title}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    <strong>Company:</strong> {idea.company}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Positive Feedback
                      </Typography>
                      <Typography variant="h6">
                        {idea.feedback.positive}%
                      </Typography>
                    </Box>
                    
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Comments
                      </Typography>
                      <Typography variant="h6">
                        {idea.feedback.comments}
                      </Typography>
                    </Box>
                    
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Date
                      </Typography>
                      <Typography variant="body2">
                        {idea.date}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
                
                <Box sx={{ p: 2, pt: 0 }}>
                  <Button 
                    variant="outlined" 
                    fullWidth 
                    sx={{ mr: 1 }}
                  >
                    View Details
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>
    </Box>
  );
};

export default CompanyResources; 