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
  Paper,
  Avatar,
  AvatarGroup,
} from '@mui/material';
import { Search as SearchIcon, Add as AddIcon, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from '@mui/icons-material';

// Mock data for events
const mockEvents = [
  {
    id: 1,
    title: 'React Workshop for Beginners',
    date: new Date(2024, 3, 15),
    type: 'Workshop',
    category: 'Education',
    location: 'Online',
    description: 'Learn the basics of React.js in this hands-on workshop.',
    organizer: {
      name: 'Tech Academy',
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    participants: [
      { id: 1, name: 'Matti Virtanen', avatar: 'https://i.pravatar.cc/150?img=2' },
      { id: 2, name: 'Liisa Korhonen', avatar: 'https://i.pravatar.cc/150?img=3' }
    ],
    maxParticipants: 20,
    skills: ['React', 'JavaScript', 'Web Development'],
    mentors: [
      { id: 1, name: 'Sanna Mäkelä', expertise: 'Senior React Developer', avatar: 'https://i.pravatar.cc/150?img=4' }
    ]
  },
  {
    id: 2,
    title: 'Innovation Hackathon: AI Solutions',
    date: new Date(2024, 3, 20),
    type: 'Hackathon',
    category: 'Innovation',
    location: 'Tech Hub, Helsinki',
    description: 'Join us for a weekend of innovation! Build AI-powered solutions for real-world problems.',
    organizer: {
      name: 'Innovation Lab',
      avatar: 'https://i.pravatar.cc/150?img=5'
    },
    participants: [
      { id: 3, name: 'Mikko Järvinen', avatar: 'https://i.pravatar.cc/150?img=6' },
      { id: 4, name: 'Emma Laine', avatar: 'https://i.pravatar.cc/150?img=7' }
    ],
    maxParticipants: 50,
    skills: ['AI', 'Machine Learning', 'Problem Solving'],
    prizes: [
      { place: 1, reward: '5000€' },
      { place: 2, reward: '3000€' },
      { place: 3, reward: '1000€' }
    ],
    partners: ['TechCorp', 'AI Solutions Ltd', 'StartupHub']
  },
  {
    id: 3,
    title: 'Code Review & Mentoring Session',
    date: new Date(2024, 3, 25),
    type: 'Mentoring',
    category: 'Support',
    location: 'Online',
    description: 'Get personalized feedback on your code and career guidance from experienced developers.',
    organizer: {
      name: 'Dev Mentors Network',
      avatar: 'https://i.pravatar.cc/150?img=8'
    },
    participants: [
      { id: 5, name: 'Aleksi Nieminen', avatar: 'https://i.pravatar.cc/150?img=9' }
    ],
    maxParticipants: 10,
    skills: ['Code Review', 'Best Practices', 'Career Development'],
    mentors: [
      { id: 2, name: 'Timo Heikkinen', expertise: 'Senior Software Architect', avatar: 'https://i.pravatar.cc/150?img=10' },
      { id: 3, name: 'Laura Koskinen', expertise: 'Tech Lead', avatar: 'https://i.pravatar.cc/150?img=11' }
    ]
  },
  {
    id: 4,
    title: 'Project Team Formation Workshop',
    date: new Date(2024, 3, 28),
    type: 'Workshop',
    category: 'Collaboration',
    location: 'Innovation Center, Espoo',
    description: 'Find your perfect project team! Connect with other developers and form teams for upcoming projects.',
    organizer: {
      name: 'Project Catalysts',
      avatar: 'https://i.pravatar.cc/150?img=12'
    },
    participants: [],
    maxParticipants: 30,
    skills: ['Team Building', 'Project Management', 'Communication'],
    relatedProjects: [1, 2, 3], // IDs of projects looking for team members
    networkingActivities: ['Speed Meeting', 'Skills Exchange', 'Project Pitching']
  }
];

// Simple calendar component
const SimpleCalendar = ({ selectedDate, onDateChange }: { selectedDate: Date, onDateChange: (date: Date) => void }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));
  
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  const handleDateClick = (day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    onDateChange(newDate);
  };
  
  const isToday = (day: number) => {
    const today = new Date();
    return day === today.getDate() && 
           currentMonth.getMonth() === today.getMonth() && 
           currentMonth.getFullYear() === today.getFullYear();
  };
  
  const isSelected = (day: number) => {
    return day === selectedDate.getDate() && 
           currentMonth.getMonth() === selectedDate.getMonth() && 
           currentMonth.getFullYear() === selectedDate.getFullYear();
  };
  
  const renderCalendarDays = () => {
    const days = [];
    const totalDays = firstDayOfMonth + daysInMonth;
    const rows = Math.ceil(totalDays / 7);
    
    for (let i = 0; i < rows * 7; i++) {
      const dayNumber = i - firstDayOfMonth + 1;
      const isCurrentMonth = i >= firstDayOfMonth && dayNumber <= daysInMonth;
      
      days.push(
        <Box
          key={i}
          sx={{
            width: '14.28%',
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: isCurrentMonth ? 'pointer' : 'default',
            color: isCurrentMonth ? 'white' : 'rgba(255, 255, 255, 0.3)',
            backgroundColor: isSelected(dayNumber) ? '#00b4d8' : 
                            isToday(dayNumber) ? 'rgba(0, 180, 216, 0.2)' : 'transparent',
            borderRadius: '50%',
            '&:hover': isCurrentMonth ? {
              backgroundColor: isSelected(dayNumber) ? '#00b4d8' : 'rgba(255, 255, 255, 0.1)',
            } : {},
          }}
          onClick={() => isCurrentMonth && handleDateClick(dayNumber)}
        >
          {isCurrentMonth ? dayNumber : ''}
        </Box>
      );
    }
    
    return days;
  };
  
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 2
      }}>
        <Button 
          onClick={handlePrevMonth}
          sx={{ color: 'white', minWidth: 'auto' }}
        >
          <ChevronLeftIcon />
        </Button>
        <Typography variant="h6" sx={{ color: 'white' }}>
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </Typography>
        <Button 
          onClick={handleNextMonth}
          sx={{ color: 'white', minWidth: 'auto' }}
        >
          <ChevronRightIcon />
        </Button>
      </Box>
      
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {weekDays.map(day => (
          <Box 
            key={day} 
            sx={{ 
              width: '14.28%', 
              textAlign: 'center',
              color: 'rgba(255, 255, 255, 0.7)',
              mb: 1
            }}
          >
            {day}
          </Box>
        ))}
        {renderCalendarDays()}
      </Box>
    </Box>
  );
};

const Events: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['Education', 'Innovation', 'Collaboration', 'Support'];

  const filteredEvents = mockEvents.filter(event =>
    (event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedCategory === 'all' || event.category === selectedCategory)
  );

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0a1929 0%, #132f4c 100%)',
      pt: 8,
      pb: 12
    }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h3" component="h1" sx={{ 
            fontWeight: 'bold',
            color: '#00b4d8',
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
            fontFamily: "'Roboto Mono', monospace",
            textShadow: '0 2px 10px rgba(0, 180, 216, 0.3)',
          }}>
            Community Events
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ 
              background: '#00b4d8',
              '&:hover': {
                background: '#0096c7',
              }
            }}
          >
            Create Event
          </Button>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, mb: 3, bgcolor: 'rgba(255, 255, 255, 0.05)' }}>
              <SimpleCalendar selectedDate={selectedDate} onDateChange={setSelectedDate} />
            </Paper>
            
            <Paper sx={{ p: 3, bgcolor: 'rgba(255, 255, 255, 0.05)' }}>
              <Typography variant="h6" sx={{ mb: 2, color: 'white' }}>
                Filter by Category
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
                {categories.map(category => (
                  <Chip
                    key={category}
                    label={category}
                    onClick={() => setSelectedCategory(category)}
                    sx={{
                      bgcolor: selectedCategory === category ? 'primary.main' : 'transparent',
                      color: 'white',
                      '&:hover': { bgcolor: 'primary.dark' }
                    }}
                  />
                ))}
              </Stack>
            </Paper>
          </Grid>

          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              placeholder="Search events..."
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
              {filteredEvents.map((event) => (
                <Card key={event.id} sx={{ 
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
                        <Typography variant="h5" gutterBottom>
                          {event.title}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                          <Chip 
                            label={event.type}
                            size="small"
                            sx={{ bgcolor: 'primary.main' }}
                          />
                          <Chip 
                            label={event.category}
                            size="small"
                            sx={{ bgcolor: 'secondary.main' }}
                          />
                        </Box>
                      </Box>
                      <Typography variant="body2" sx={{ color: 'grey.400' }}>
                        {event.date.toLocaleDateString()}
                      </Typography>
                    </Box>

                    <Typography variant="body1" sx={{ mb: 2 }}>
                      {event.description}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
                        <Typography variant="subtitle2" sx={{ mr: 1 }}>
                          Organizer:
                        </Typography>
                        <Avatar
                          src={event.organizer.avatar}
                          alt={event.organizer.name}
                          sx={{ width: 24, height: 24, mr: 1 }}
                        />
                        <Typography variant="body2">
                          {event.organizer.name}
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ color: 'grey.400' }}>
                        {event.location}
                      </Typography>
                    </Box>

                    {event.skills && (
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" gutterBottom>
                          Skills:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {event.skills.map((skill) => (
                            <Chip
                              key={skill}
                              label={skill}
                              size="small"
                              sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }}
                            />
                          ))}
                        </Box>
                      </Box>
                    )}

                    {event.mentors && (
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" gutterBottom>
                          Mentors:
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          {event.mentors.map((mentor) => (
                            <Box key={mentor.id} sx={{ display: 'flex', alignItems: 'center' }}>
                              <Avatar
                                src={mentor.avatar}
                                alt={mentor.name}
                                sx={{ width: 24, height: 24, mr: 1 }}
                              />
                              <Typography variant="body2">
                                {mentor.name} ({mentor.expertise})
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    )}

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ mr: 1 }}>
                          Participants: {event.participants?.length || 0}/{event.maxParticipants}
                        </Typography>
                        <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 24, height: 24 } }}>
                          {event.participants?.map((participant) => (
                            <Avatar
                              key={participant.id}
                              alt={participant.name}
                              src={participant.avatar}
                            />
                          ))}
                        </AvatarGroup>
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
                        Join Event
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

export default Events; 