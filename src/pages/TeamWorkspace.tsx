import React, { useState } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Tabs, 
  Tab, 
  Card, 
  CardContent, 
  Chip, 
  Button, 
  Avatar, 
  TextField, 
  IconButton, 
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Badge
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import CommentIcon from '@mui/icons-material/Comment';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ChatIcon from '@mui/icons-material/Chat';
import DescriptionIcon from '@mui/icons-material/Description';
import CodeIcon from '@mui/icons-material/Code';

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
}));

const TicketCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius * 1.5,
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}));

const CommentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius * 2,
  marginTop: theme.spacing(2),
}));

// Mock data for tickets
const mockTickets = [
  {
    id: 'TICKET-1',
    title: 'Implement user authentication',
    description: 'Add JWT-based authentication system with refresh tokens',
    status: 'In Progress',
    priority: 'High',
    assignee: 'Alex Johnson',
    comments: 5,
    attachments: 2,
  },
  {
    id: 'TICKET-2',
    title: 'Design database schema',
    description: 'Create ERD for the main entities and their relationships',
    status: 'To Do',
    priority: 'Medium',
    assignee: 'Sarah Chen',
    comments: 3,
    attachments: 1,
  },
  {
    id: 'TICKET-3',
    title: 'Set up CI/CD pipeline',
    description: 'Configure GitHub Actions for automated testing and deployment',
    status: 'Done',
    priority: 'High',
    assignee: 'Mike Brown',
    comments: 8,
    attachments: 4,
  },
  {
    id: 'TICKET-4',
    title: 'Create API documentation',
    description: 'Document all endpoints using Swagger/OpenAPI',
    status: 'To Do',
    priority: 'Medium',
    assignee: 'Emily Davis',
    comments: 2,
    attachments: 0,
  },
];

// Mock data for discussions
const mockDiscussions = [
  {
    id: 1,
    title: 'Architecture decision: Microservices vs Monolith',
    author: 'Alex Johnson',
    date: '2023-06-15',
    replies: 12,
    lastActivity: '2 hours ago',
  },
  {
    id: 2,
    title: 'Tech stack selection for frontend',
    author: 'Sarah Chen',
    date: '2023-06-14',
    replies: 8,
    lastActivity: '5 hours ago',
  },
  {
    id: 3,
    title: 'Sprint planning for next week',
    author: 'Mike Brown',
    date: '2023-06-13',
    replies: 15,
    lastActivity: '1 day ago',
  },
  {
    id: 4,
    title: 'Code review guidelines',
    author: 'Emily Davis',
    date: '2023-06-12',
    replies: 6,
    lastActivity: '2 days ago',
  },
];

// Mock data for comments
const mockComments = [
  {
    id: 1,
    author: 'Alex Johnson',
    content: 'I think we should use JWT for authentication. It\'s stateless and works well with our microservices architecture.',
    date: '2023-06-15 10:30',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: 2,
    author: 'Sarah Chen',
    content: 'Agreed. We should also implement refresh tokens for better security. I can help with the implementation.',
    date: '2023-06-15 11:45',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: 3,
    author: 'Mike Brown',
    content: 'Don\'t forget to add rate limiting to prevent brute force attacks.',
    date: '2023-06-15 13:20',
    avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
  },
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
      id={`workspace-tabpanel-${index}`}
      aria-labelledby={`workspace-tab-${index}`}
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

const TeamWorkspace: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [newComment, setNewComment] = useState('');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(event.target.value);
  };

  const handleSendComment = () => {
    if (newComment.trim()) {
      // In a real app, this would send the comment to the backend
      console.log('Sending comment:', newComment);
      setNewComment('');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'To Do':
        return 'default';
      case 'In Progress':
        return 'primary';
      case 'Done':
        return 'success';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'error';
      case 'Medium':
        return 'warning';
      case 'Low':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
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
          Team Workspace
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Collaborate with your team, track tasks, and discuss project details
        </Typography>
      </Box>

      <Paper sx={{ width: '100%', mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab icon={<AssignmentIcon />} label="Tickets" />
          <Tab icon={<ChatIcon />} label="Discussions" />
          <Tab icon={<DescriptionIcon />} label="Documentation" />
          <Tab icon={<CodeIcon />} label="Code" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              Project Tickets
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />}
              sx={{ 
                borderRadius: 2,
                textTransform: 'none',
                px: 3,
                py: 1,
                background: 'linear-gradient(90deg, #00b4d8 0%, #0096c7 100%)',
                boxShadow: '0 4px 10px rgba(0, 180, 216, 0.3)',
              }}
            >
              Create Ticket
            </Button>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  All Tickets
                </Typography>
                {mockTickets.map((ticket) => (
                  <TicketCard key={ticket.id}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                          {ticket.id}: {ticket.title}
                        </Typography>
                        <Box>
                          <Chip 
                            label={ticket.status} 
                            size="small" 
                            color={getStatusColor(ticket.status) as any} 
                            sx={{ mr: 1 }} 
                          />
                          <Chip 
                            label={ticket.priority} 
                            size="small" 
                            color={getPriorityColor(ticket.priority) as any} 
                          />
                        </Box>
                      </Box>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {ticket.description}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ width: 24, height: 24, mr: 1 }}>
                            <PersonIcon fontSize="small" />
                          </Avatar>
                          <Typography variant="body2">
                            {ticket.assignee}
                          </Typography>
                        </Box>
                        <Box>
                          <IconButton size="small" sx={{ mr: 1 }}>
                            <Badge badgeContent={ticket.comments} color="primary">
                              <CommentIcon fontSize="small" />
                            </Badge>
                          </IconButton>
                          <IconButton size="small">
                            <Badge badgeContent={ticket.attachments} color="primary">
                              <AttachFileIcon fontSize="small" />
                            </Badge>
                          </IconButton>
                        </Box>
                      </Box>
                    </CardContent>
                  </TicketCard>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <StyledPaper>
                <Typography variant="h6" gutterBottom>
                  Ticket Comments
                </Typography>
                <List sx={{ flexGrow: 1, overflow: 'auto' }}>
                  {mockComments.map((comment) => (
                    <ListItem key={comment.id} alignItems="flex-start" sx={{ px: 0 }}>
                      <ListItemAvatar>
                        <Avatar alt={comment.author} src={comment.avatar} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography component="span" variant="subtitle2">
                              {comment.author}
                            </Typography>
                            <Typography component="span" variant="caption" color="text.secondary">
                              {comment.date}
                            </Typography>
                          </Box>
                        }
                        secondary={comment.content}
                      />
                    </ListItem>
                  ))}
                </List>
                <Divider sx={{ my: 2 }} />
                <CommentBox>
                  <TextField
                    fullWidth
                    placeholder="Add a comment..."
                    variant="outlined"
                    size="small"
                    value={newComment}
                    onChange={handleCommentChange}
                    sx={{ mr: 1 }}
                  />
                  <IconButton 
                    color="primary" 
                    onClick={handleSendComment}
                    disabled={!newComment.trim()}
                  >
                    <SendIcon />
                  </IconButton>
                </CommentBox>
              </StyledPaper>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              Team Discussions
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />}
              sx={{ 
                borderRadius: 2,
                textTransform: 'none',
                px: 3,
                py: 1,
                background: 'linear-gradient(90deg, #00b4d8 0%, #0096c7 100%)',
                boxShadow: '0 4px 10px rgba(0, 180, 216, 0.3)',
              }}
            >
              New Discussion
            </Button>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <StyledPaper>
                <List>
                  {mockDiscussions.map((discussion) => (
                    <React.Fragment key={discussion.id}>
                      <ListItem alignItems="flex-start" sx={{ py: 2 }}>
                        <ListItemAvatar>
                          <Avatar alt={discussion.author}>
                            {discussion.author.charAt(0)}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                              {discussion.title}
                            </Typography>
                          }
                          secondary={
                            <Box>
                              <Typography variant="body2" color="text.secondary">
                                Started by {discussion.author} on {discussion.date}
                              </Typography>
                              <Box sx={{ display: 'flex', mt: 1 }}>
                                <Chip 
                                  icon={<CommentIcon fontSize="small" />} 
                                  label={`${discussion.replies} replies`} 
                                  size="small" 
                                  sx={{ mr: 1 }} 
                                />
                                <Chip 
                                  label={`Last activity: ${discussion.lastActivity}`} 
                                  size="small" 
                                  variant="outlined" 
                                />
                              </Box>
                            </Box>
                          }
                        />
                        <Button 
                          variant="outlined" 
                          size="small"
                          sx={{ 
                            borderRadius: 2,
                            textTransform: 'none',
                          }}
                        >
                          View
                        </Button>
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </React.Fragment>
                  ))}
                </List>
              </StyledPaper>
            </Grid>
            <Grid item xs={12} md={4}>
              <StyledPaper>
                <Typography variant="h6" gutterBottom>
                  Recent Activity
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="New comment on 'Architecture decision'"
                      secondary="2 hours ago"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Ticket 'Implement user authentication' updated"
                      secondary="3 hours ago"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="New discussion 'Tech stack selection' created"
                      secondary="5 hours ago"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Documentation updated for API endpoints"
                      secondary="1 day ago"
                    />
                  </ListItem>
                </List>
              </StyledPaper>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
            Project Documentation
          </Typography>
          <Typography variant="body1" paragraph>
            Documentation section will be implemented in the next phase.
          </Typography>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
            Code Repository
          </Typography>
          <Typography variant="body1" paragraph>
            Code repository integration will be implemented in the next phase.
          </Typography>
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default TeamWorkspace; 