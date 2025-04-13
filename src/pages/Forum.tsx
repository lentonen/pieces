import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Stack,
  TextField,
  InputAdornment,
  Avatar,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Breadcrumbs,
  Link,
} from '@mui/material';
import { 
  Search as SearchIcon, 
  Add as AddIcon, 
  MoreVert as MoreVertIcon,
  Forum as ForumIcon,
  Code as CodeIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  Lightbulb as LightbulbIcon,
  QuestionAnswer as QuestionAnswerIcon,
  TrendingUp as TrendingUpIcon,
  AccessTime as AccessTimeIcon,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

// Mock data for forum categories
const categories = [
  {
    id: 1,
    name: 'Learning Hub',
    icon: <SchoolIcon />,
    description: 'Educational resources, learning paths, and skill development',
    subcategories: ['Tutorials', 'Learning Paths', 'Code Challenges', 'Study Groups'],
    threadCount: 243,
    lastActivity: '5 hours ago',
    type: 'Education'
  },
  {
    id: 2,
    name: 'Innovation & Projects',
    icon: <LightbulbIcon />,
    description: 'Share project ideas, find collaborators, and showcase innovations',
    subcategories: ['Project Ideas', 'Hackathons', 'Innovation Challenges', 'Show & Tell'],
    threadCount: 156,
    lastActivity: '2 hours ago',
    type: 'Innovation'
  },
  {
    id: 3,
    name: 'Technical Discussion',
    icon: <CodeIcon />,
    description: 'Discuss technologies, code reviews, and technical challenges',
    subcategories: ['Frontend', 'Backend', 'DevOps', 'Architecture'],
    threadCount: 178,
    lastActivity: '30 minutes ago',
    type: 'Support'
  },
  {
    id: 4,
    name: 'Career & Growth',
    icon: <WorkIcon />,
    description: 'Career development, job opportunities, and professional growth',
    subcategories: ['Job Board', 'Career Advice', 'Interview Prep', 'Networking'],
    threadCount: 89,
    lastActivity: '1 day ago',
    type: 'Ecosystem'
  },
  {
    id: 5,
    name: 'Collaboration Corner',
    icon: <QuestionAnswerIcon />,
    description: 'Find team members, join projects, and collaborate',
    subcategories: ['Team Formation', 'Project Matching', 'Pair Programming', 'Code Reviews'],
    threadCount: 112,
    lastActivity: '3 hours ago',
    type: 'Collaboration'
  },
  {
    id: 6,
    name: 'Community Support',
    icon: <ForumIcon />,
    description: 'Get help, mentoring, and support from the community',
    subcategories: ['Mentoring', 'Technical Help', 'Career Support', 'General Discussion'],
    threadCount: 134,
    lastActivity: '1 hour ago',
    type: 'Support'
  }
];

// Mock data for recent discussions
const recentDiscussions = [
  {
    id: 1,
    title: 'React-kehityksen oppimispolku: Aloittelijasta ammattilaiseksi',
    author: {
      name: 'Juha Lehtonen',
      avatar: 'https://i.pravatar.cc/150?img=1',
      role: 'Senior Developer',
      expertise: ['React', 'TypeScript', 'Frontend'],
      helpfulCount: 156
    },
    category: 'Learning Hub',
    type: 'Education',
    replies: 24,
    views: 156,
    lastActivity: '2 hours ago',
    tags: ['React', 'Learning Path', 'Tutorial'],
    resources: ['Video Tutorial', 'Code Examples', 'Practice Exercises'],
    participants: [
      { id: 1, name: 'Pekka Niemi', avatar: 'https://i.pravatar.cc/150?img=4' },
      { id: 2, name: 'Kaisa Saarinen', avatar: 'https://i.pravatar.cc/150?img=5' }
    ]
  },
  {
    id: 2,
    title: 'Haetaan tiimin jäseniä: Tekoälypohjainen oppimisalusta',
    author: {
      name: 'Sofia Rantanen',
      avatar: 'https://i.pravatar.cc/150?img=2',
      role: 'Project Lead',
      expertise: ['AI', 'Education', 'Project Management'],
      helpfulCount: 89
    },
    category: 'Innovation & Projects',
    type: 'Innovation',
    replies: 18,
    views: 142,
    lastActivity: '5 hours ago',
    tags: ['Project', 'AI', 'Education', 'Team Formation'],
    projectDetails: {
      status: 'Recruiting',
      neededRoles: ['Frontend Developer', 'AI Engineer', 'UI Designer'],
      timeline: '3 months',
      techStack: ['React', 'Python', 'TensorFlow']
    }
  },
  {
    id: 3,
    title: 'Koodikatselmointi: React-sovelluksen suorituskyvyn optimointi',
    author: {
      name: 'Markus Salonen',
      avatar: 'https://i.pravatar.cc/150?img=3',
      role: 'Developer',
      expertise: ['React', 'Performance'],
      helpfulCount: 45
    },
    category: 'Technical Discussion',
    type: 'Support',
    replies: 12,
    views: 89,
    lastActivity: '1 day ago',
    tags: ['Code Review', 'React', 'Performance'],
    codeSnippet: {
      language: 'typescript',
      url: 'https://github.com/example/code-review-1'
    },
    reviewers: [
      { id: 1, name: 'Ville Hakala', status: 'Reviewing' },
      { id: 2, name: 'Eeva Laitinen', status: 'Completed' }
    ]
  },
  {
    id: 4,
    title: 'Kuukausittainen mentorointisessio: Urakehitys teknologia-alalla',
    author: {
      name: 'Riikka Jokinen',
      avatar: 'https://i.pravatar.cc/150?img=6',
      role: 'Senior Tech Lead',
      expertise: ['Career Development', 'Leadership', 'Mentoring'],
      helpfulCount: 234
    },
    category: 'Community Support',
    type: 'Support',
    replies: 45,
    views: 289,
    lastActivity: '3 hours ago',
    tags: ['Mentoring', 'Career Growth', 'Leadership'],
    session: {
      date: new Date(2024, 3, 15),
      time: '18:00 UTC',
      topics: ['Career Planning', 'Technical Leadership', 'Soft Skills'],
      maxParticipants: 20
    }
  }
];

const Forum: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedThread, setSelectedThread] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, threadId: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedThread(threadId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedThread(null);
  };

  const filteredDiscussions = recentDiscussions.filter(discussion =>
    (discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    discussion.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    discussion.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))) &&
    (selectedCategory === 'all' || discussion.type === selectedCategory)
  );

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0a1929 0%, #132f4c 100%)',
      pt: 8,
      pb: 12
    }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 6 }}>
          <Typography variant="h3" component="h1" sx={{ 
            fontWeight: 'bold',
            color: '#00b4d8',
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
            fontFamily: "'Roboto Mono', monospace",
            textShadow: '0 2px 10px rgba(0, 180, 216, 0.3)',
            mb: 2
          }}>
            Community Forum
          </Typography>
          <Typography variant="h6" sx={{ color: 'grey.400' }}>
            Connect, Learn, and Grow Together
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Categories Section */}
          <Grid item xs={12} md={4}>
            <Card sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', mb: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                  PIECES Categories
                </Typography>
                <Stack spacing={1}>
                  <Chip
                    label="All Categories"
                    onClick={() => setSelectedCategory('all')}
                    sx={{
                      bgcolor: selectedCategory === 'all' ? 'primary.main' : 'transparent',
                      color: 'white',
                      '&:hover': { bgcolor: 'primary.dark' }
                    }}
                  />
                  {['Education', 'Innovation', 'Collaboration', 'Support', 'Ecosystem'].map(type => (
                    <Chip
                      key={type}
                      label={type}
                      onClick={() => setSelectedCategory(type)}
                      sx={{
                        bgcolor: selectedCategory === type ? 'primary.main' : 'transparent',
                        color: 'white',
                        '&:hover': { bgcolor: 'primary.dark' }
                      }}
                    />
                  ))}
                </Stack>
              </CardContent>
            </Card>

            <Button
              fullWidth
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ 
                mb: 3,
                background: '#00b4d8',
                '&:hover': {
                  background: '#0096c7',
                }
              }}
            >
              Start New Discussion
            </Button>

            {/* Forum Stats */}
            <Card sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)' }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                  Forum Statistics
                </Typography>
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', color: 'grey.400' }}>
                    <Typography>Total Discussions</Typography>
                    <Typography>{categories.reduce((acc, cat) => acc + cat.threadCount, 0)}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', color: 'grey.400' }}>
                    <Typography>Active Categories</Typography>
                    <Typography>{categories.length}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', color: 'grey.400' }}>
                    <Typography>Latest Activity</Typography>
                    <Typography>Just now</Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Discussions Section */}
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              placeholder="Search discussions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ mb: 3, bgcolor: 'rgba(255, 255, 255, 0.05)', borderRadius: 1 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'white' }} />
                  </InputAdornment>
                ),
                sx: { color: 'white' }
              }}
            />

            <Stack spacing={3}>
              {filteredDiscussions.map((discussion) => (
                <Card key={discussion.id} sx={{ 
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                  color: 'white',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6
                  }
                }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          {discussion.title}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                          <Chip 
                            label={discussion.category}
                            size="small"
                            sx={{ bgcolor: 'primary.main' }}
                          />
                          <Chip 
                            label={discussion.type}
                            size="small"
                            sx={{ bgcolor: 'secondary.main' }}
                          />
                          {discussion.tags.map((tag) => (
                            <Chip
                              key={tag}
                              label={tag}
                              size="small"
                              sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }}
                            />
                          ))}
                        </Box>
                      </Box>
                      <Typography variant="body2" sx={{ color: 'grey.400' }}>
                        {discussion.lastActivity}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar
                        src={discussion.author.avatar}
                        alt={discussion.author.name}
                        sx={{ width: 32, height: 32, mr: 1 }}
                      />
                      <Box>
                        <Typography variant="subtitle2">
                          {discussion.author.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'grey.400' }}>
                          {discussion.author.role} • {discussion.author.helpfulCount} helpful posts
                        </Typography>
                      </Box>
                    </Box>

                    {discussion.projectDetails && (
                      <Box sx={{ mb: 2, p: 2, bgcolor: 'rgba(255, 255, 255, 0.03)', borderRadius: 1 }}>
                        <Typography variant="subtitle2" gutterBottom>
                          Project Details:
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="grey.400">Status:</Typography>
                            <Typography variant="body2">{discussion.projectDetails.status}</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="grey.400">Timeline:</Typography>
                            <Typography variant="body2">{discussion.projectDetails.timeline}</Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography variant="body2" color="grey.400">Needed Roles:</Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                              {discussion.projectDetails.neededRoles.map((role) => (
                                <Chip
                                  key={role}
                                  label={role}
                                  size="small"
                                  sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }}
                                />
                              ))}
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    )}

                    {discussion.session && (
                      <Box sx={{ mb: 2, p: 2, bgcolor: 'rgba(255, 255, 255, 0.03)', borderRadius: 1 }}>
                        <Typography variant="subtitle2" gutterBottom>
                          Session Details:
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="grey.400">Date:</Typography>
                            <Typography variant="body2">{discussion.session.date.toLocaleDateString()}</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="grey.400">Time:</Typography>
                            <Typography variant="body2">{discussion.session.time}</Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography variant="body2" color="grey.400">Topics:</Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                              {discussion.session.topics.map((topic) => (
                                <Chip
                                  key={topic}
                                  label={topic}
                                  size="small"
                                  sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }}
                                />
                              ))}
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    )}

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <QuestionAnswerIcon fontSize="small" />
                          {discussion.replies} replies
                        </Typography>
                        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <TrendingUpIcon fontSize="small" />
                          {discussion.views} views
                        </Typography>
                      </Box>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{ 
                          background: '#00b4d8',
                          '&:hover': {
                            background: '#0096c7',
                          }
                        }}
                      >
                        Join Discussion
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Forum; 