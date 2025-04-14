import React, { useState, useEffect } from 'react';
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
import { Search as SearchIcon, Add as AddIcon, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, Group as GroupIcon } from '@mui/icons-material';

// Mock data for events
const mockEvents = [
  {
    id: 1,
    title: 'Junior Developer Meetup',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 15),
    type: 'Meetup',
    category: 'Networking',
    location: 'Tech Hub, Helsinki',
    description: 'Join fellow junior developers for networking, knowledge sharing, and career advice. Perfect for those starting their tech journey!',
    organizer: {
      name: 'Junior Dev Community',
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    participants: [
      { id: 1, name: 'Matti Virtanen', avatar: 'https://i.pravatar.cc/150?img=2' },
      { id: 2, name: 'Liisa Korhonen', avatar: 'https://i.pravatar.cc/150?img=3' }
    ],
    maxParticipants: 30,
    skills: ['Networking', 'Career Development', 'Junior Level'],
    mentors: [
      { id: 1, name: 'Sanna Mäkelä', expertise: 'Senior React Developer', avatar: 'https://i.pravatar.cc/150?img=4' }
    ]
  },
  {
    id: 2,
    title: 'First Steps in Tech: Career Workshop',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 20),
    type: 'Workshop',
    category: 'Education',
    location: 'Online',
    description: 'A comprehensive workshop for junior developers and tech enthusiasts. Learn about career paths, essential skills, and how to land your first tech job.',
    organizer: {
      name: 'Tech Career Academy',
      avatar: 'https://i.pravatar.cc/150?img=5'
    },
    participants: [
      { id: 3, name: 'Mikko Järvinen', avatar: 'https://i.pravatar.cc/150?img=6' },
      { id: 4, name: 'Emma Laine', avatar: 'https://i.pravatar.cc/150?img=7' }
    ],
    maxParticipants: 50,
    skills: ['Career Planning', 'Job Search', 'Tech Skills'],
    mentors: [
      { id: 2, name: 'Timo Heikkinen', expertise: 'Tech Career Coach', avatar: 'https://i.pravatar.cc/150?img=10' }
    ]
  },
  {
    id: 3,
    title: 'Junior Hackathon: Build Your First App',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 25),
    type: 'Hackathon',
    category: 'Innovation',
    location: 'Innovation Center, Espoo',
    description: 'A beginner-friendly hackathon designed for junior developers. Build your first real-world application with guidance from experienced mentors.',
    organizer: {
      name: 'Junior Dev Network',
      avatar: 'https://i.pravatar.cc/150?img=8'
    },
    participants: [
      { id: 5, name: 'Aleksi Nieminen', avatar: 'https://i.pravatar.cc/150?img=9' }
    ],
    maxParticipants: 40,
    skills: ['Web Development', 'Team Collaboration', 'Problem Solving'],
    mentors: [
      { id: 3, name: 'Laura Koskinen', expertise: 'Senior Developer', avatar: 'https://i.pravatar.cc/150?img=11' }
    ]
  },
  {
    id: 4,
    title: 'Code Review for Juniors',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 28),
    type: 'Workshop',
    category: 'Education',
    location: 'Online',
    description: 'Learn best practices for code review and get feedback on your code from experienced developers. Perfect for junior developers looking to improve their skills.',
    organizer: {
      name: 'Code Review Academy',
      avatar: 'https://i.pravatar.cc/150?img=12'
    },
    participants: [],
    maxParticipants: 20,
    skills: ['Code Review', 'Best Practices', 'Clean Code'],
    mentors: [
      { id: 4, name: 'Jari Mäkinen', expertise: 'Senior Developer', avatar: 'https://i.pravatar.cc/150?img=13' }
    ]
  },
  {
    id: 5,
    title: 'Junior Tech Talk: My First Year in Tech',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 5),
    type: 'Talk',
    category: 'Education',
    location: 'Tech Hub, Helsinki',
    description: 'Hear from junior developers who recently started their tech careers. Learn about their experiences, challenges, and tips for success.',
    organizer: {
      name: 'Tech Stories',
      avatar: 'https://i.pravatar.cc/150?img=14'
    },
    participants: [],
    maxParticipants: 50,
    skills: ['Career Stories', 'Tech Journey', 'Learning'],
    speakers: [
      { id: 5, name: 'Anna Lehtinen', role: 'Junior Frontend Developer', avatar: 'https://i.pravatar.cc/150?img=15' }
    ]
  },
  {
    id: 6,
    title: 'Junior Dev Summer Party',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 30),
    type: 'Party',
    category: 'Networking',
    location: 'Beach Club, Helsinki',
    description: 'Join us for the biggest junior developer party of the summer! Network with fellow developers, enjoy live music, and participate in fun tech-themed activities. Food and drinks provided!',
    organizer: {
      name: 'Junior Dev Community',
      avatar: 'https://i.pravatar.cc/150?img=16'
    },
    participants: [
      { id: 6, name: 'Joonas Kivi', avatar: 'https://i.pravatar.cc/150?img=17' },
      { id: 7, name: 'Minna Saari', avatar: 'https://i.pravatar.cc/150?img=18' },
      { id: 8, name: 'Ville Mäkinen', avatar: 'https://i.pravatar.cc/150?img=19' }
    ],
    maxParticipants: 100,
    skills: ['Networking', 'Socializing', 'Fun'],
    activities: ['Live Music', 'Tech Trivia', 'Beach Games', 'Networking Bingo'],
    sponsors: ['TechCorp', 'Dev Academy', 'StartupHub']
  },
  {
    id: 7,
    title: 'Junior Devs Code Together',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 12),
    type: 'Coding Session',
    category: 'Collaboration',
    location: 'Café Code, Helsinki',
    description: 'A casual coding session organized by junior developers for junior developers. Work on your projects, share ideas, and learn from peers. No senior mentors - just peers helping each other!',
    organizer: {
      name: 'Junior Devs Collective',
      avatar: 'https://i.pravatar.cc/150?img=20'
    },
    participants: [
      { id: 9, name: 'Ella Mäki', avatar: 'https://i.pravatar.cc/150?img=21' },
      { id: 10, name: 'Olli Rantanen', avatar: 'https://i.pravatar.cc/150?img=22' }
    ],
    maxParticipants: 25,
    skills: ['Peer Learning', 'Collaboration', 'Coding'],
    format: 'Bring your laptop and work on your projects while chatting with others'
  },
  {
    id: 8,
    title: 'Junior Devs Game Night',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 18),
    type: 'Social',
    category: 'Networking',
    location: 'Game Hub, Espoo',
    description: 'Join us for a fun game night organized by junior developers! Play video games, board games, and participate in coding challenges. A great way to meet other junior devs in a relaxed setting.',
    organizer: {
      name: 'Junior Devs Gaming Club',
      avatar: 'https://i.pravatar.cc/150?img=23'
    },
    participants: [
      { id: 11, name: 'Sofia Niemi', avatar: 'https://i.pravatar.cc/150?img=24' },
      { id: 12, name: 'Lauri Kivi', avatar: 'https://i.pravatar.cc/150?img=25' }
    ],
    maxParticipants: 30,
    skills: ['Gaming', 'Networking', 'Fun'],
    activities: ['Video Games', 'Board Games', 'Coding Challenges', 'Pizza Night']
  },
  {
    id: 9,
    title: 'Junior Devs Project Showcase',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 22),
    type: 'Showcase',
    category: 'Innovation',
    location: 'Innovation Space, Helsinki',
    description: 'A showcase of projects created by junior developers. Present your work, get feedback from peers, and find potential collaborators for future projects. Organized by junior developers for junior developers.',
    organizer: {
      name: 'Junior Devs Project Group',
      avatar: 'https://i.pravatar.cc/150?img=26'
    },
    participants: [
      { id: 13, name: 'Aino Lehto', avatar: 'https://i.pravatar.cc/150?img=27' },
      { id: 14, name: 'Matti Koskinen', avatar: 'https://i.pravatar.cc/150?img=28' }
    ],
    maxParticipants: 40,
    skills: ['Project Presentation', 'Feedback', 'Networking'],
    format: '5-minute project presentations followed by networking and collaboration opportunities'
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

  const hasEvent = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return mockEvents.some(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };
  
  const renderCalendarDays = () => {
    const days = [];
    const totalDays = firstDayOfMonth + daysInMonth;
    const rows = Math.ceil(totalDays / 7);
    
    for (let i = 0; i < rows * 7; i++) {
      const dayNumber = i - firstDayOfMonth + 1;
      const isCurrentMonth = i >= firstDayOfMonth && dayNumber <= daysInMonth;
      const hasEventOnDay = isCurrentMonth && hasEvent(dayNumber);
      
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
                            isToday(dayNumber) ? 'rgba(0, 180, 216, 0.2)' : 
                            hasEventOnDay ? 'rgba(255, 105, 180, 0.3)' : 'transparent',
            borderRadius: '50%',
            position: 'relative',
            border: hasEventOnDay ? '2px solid #ff69b4' : 'none',
            boxShadow: hasEventOnDay ? '0 0 8px rgba(255, 105, 180, 0.5)' : 'none',
            '&:hover': isCurrentMonth ? {
              backgroundColor: isSelected(dayNumber) ? '#00b4d8' : 
                             hasEventOnDay ? 'rgba(255, 105, 180, 0.5)' : 
                             'rgba(255, 255, 255, 0.1)',
              transform: hasEventOnDay ? 'scale(1.1)' : 'none',
              transition: 'all 0.2s ease-in-out',
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
  const [currentMonthEvents, setCurrentMonthEvents] = useState<typeof mockEvents>([]);

  const categories = ['Education', 'Innovation', 'Collaboration', 'Support', 'Networking'];

  // Filter events for the current month
  useEffect(() => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    // For testing purposes, let's make sure we have events for the current month
    // by using the mock events directly
    setCurrentMonthEvents(mockEvents);
  }, []);

  // Filter events based on search and category
  const filteredEvents = currentMonthEvents.filter(event => {
    const isMatchingSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const isMatchingCategory = selectedCategory === 'all' || event.category === selectedCategory;
    
    return isMatchingSearch && isMatchingCategory;
  });

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
            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ color: 'white', mb: 2 }}>
                Events for {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}
              </Typography>
              <TextField
                fullWidth
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', borderRadius: 1 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: 'white' }} />
                    </InputAdornment>
                  ),
                  sx: { color: 'white' }
                }}
              />
            </Box>

            {filteredEvents.length === 0 ? (
              <Paper sx={{ p: 3, bgcolor: 'rgba(255, 255, 255, 0.05)', textAlign: 'center' }}>
                <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
                  No events found for this month
                </Typography>
                <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Try adjusting your filters or check back later
                </Typography>
              </Paper>
            ) : (
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
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Events; 