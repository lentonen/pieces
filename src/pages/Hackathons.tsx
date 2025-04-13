import React, { useState } from 'react';
import { Container, Box, Typography, Grid, Card, CardContent, CardMedia, Button, Chip, Avatar, Tabs, Tab, Divider, Paper, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { styled } from '@mui/material/styles';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupIcon from '@mui/icons-material/Group';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';
import TimelineIcon from '@mui/icons-material/Timeline';
import { Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent } from '@mui/lab';

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[10],
  },
}));

const StyledCardMedia = styled(CardMedia)({
  height: 200,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
});

const StyledChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  borderRadius: '16px',
  fontWeight: 600,
}));

// Update interfaces to match the new data structure
interface Sponsor {
  name: string;
  logo: string;
  tier: string;
}

interface Mentor {
  name: string;
  role: string;
  expertise: string;
}

interface Prize {
  place: string;
  amount: string;
  description: string;
}

interface ScheduleDay {
  day: string;
  events: string[];
}

interface Hackathon {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  theme: string;
  prizes: Prize[];
  sponsors: Sponsor[];
  mentors: Mentor[];
  schedule: ScheduleDay[];
  registrationDeadline: string;
  maxParticipants: number;
  currentParticipants: number;
  techStack: string[];
  requirements: string[];
  nextHackathonDate: string;
  hackathonCycle: string;
  status: 'upcoming' | 'past';
  image: string;
  organizer: string;
  organizerLogo: string;
  tags: string[];
}

// Update mock data type
const mockHackathons: Hackathon[] = [
  {
    id: 1,
    title: "Nokia Future Connectivity Hackathon",
    date: "2024-06-15",
    location: "Espoo, Finland",
    description: "Join us for an exciting hackathon focused on the future of connectivity. Build innovative solutions using Nokia's latest 5G and 6G technologies. This hackathon brings together the brightest minds to solve real-world connectivity challenges.",
    theme: "Future of Connectivity",
    prizes: [
      {
        place: '1st Place',
        amount: '€10,000',
        description: 'Cash prize + mentorship opportunities'
      },
      {
        place: '2nd Place',
        amount: '€5,000',
        description: 'Cash prize + development resources'
      },
      {
        place: '3rd Place',
        amount: '€2,500',
        description: 'Cash prize + tech gadgets'
      }
    ],
    sponsors: [
      { 
        name: "Nokia", 
        logo: "https://upload.wikimedia.org/wikipedia/commons/0/02/Nokia_wordmark.svg", 
        tier: "platinum" 
      },
      { 
        name: "KONE", 
        logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/KONE_logo.svg", 
        tier: "gold" 
      },
      { 
        name: "Wärtsilä", 
        logo: "https://upload.wikimedia.org/wikipedia/commons/9/9e/W%C3%A4rtsil%C3%A4_logo_2017.svg", 
        tier: "silver" 
      }
    ],
    mentors: [
      { name: "Pekka Lundmark", role: "President and CEO at Nokia", expertise: "Business Strategy & 5G" },
      { name: "Henrik Ehrnrooth", role: "CEO at KONE", expertise: "Smart Buildings & IoT" },
      { name: "Håkan Agnevall", role: "CEO at Wärtsilä", expertise: "Industrial IoT & Sustainability" }
    ],
    schedule: [
      { day: "Day 1", events: ["Opening Ceremony by Nokia Leadership", "5G/6G Workshop", "Team Formation"] },
      { day: "Day 2", events: ["Hacking", "Nokia Bell Labs Tech Talks", "Mentor Sessions"] },
      { day: "Day 3", events: ["Project Finalization", "Pitches to Nokia Executives", "Awards Ceremony"] }
    ],
    registrationDeadline: "April 30, 2024",
    maxParticipants: 150,
    currentParticipants: 85,
    techStack: ["5G", "6G", "IoT", "Cloud Computing", "Edge Computing", "AI/ML"],
    requirements: ["Strong programming skills", "Interest in telecommunications", "Team collaboration"],
    nextHackathonDate: "August 15-17, 2024",
    hackathonCycle: "Quarterly (Every 3 months)",
    status: "upcoming",
    image: "https://images.pexels.com/photos/2422294/pexels-photo-2422294.jpeg",
    organizer: "Nokia",
    organizerLogo: "https://upload.wikimedia.org/wikipedia/commons/0/02/Nokia_wordmark.svg",
    tags: ["5G", "6G", "IoT", "Innovation", "Telecommunications"]
  },
  {
    id: 2,
    title: "Nokia Connected World Hackathon",
    date: "February 15-17, 2024",
    location: "Nokia HQ, Espoo + Virtual",
    description: "Our winter hackathon focused on creating innovative solutions for connected devices and smart cities using Nokia's cutting-edge network technologies.",
    theme: "Smart Cities & Connected Devices",
    prizes: [
      {
        place: '1st Place',
        amount: '€10,000',
        description: 'Cash prize + mentorship opportunities'
      },
      {
        place: '2nd Place',
        amount: '€5,000',
        description: 'Cash prize + development resources'
      },
      {
        place: '3rd Place',
        amount: '€2,500',
        description: 'Cash prize + tech gadgets'
      }
    ],
    sponsors: [
      { 
        name: "Nokia", 
        logo: "https://upload.wikimedia.org/wikipedia/commons/0/02/Nokia_wordmark.svg", 
        tier: "platinum" 
      },
      { 
        name: "KONE", 
        logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/KONE_logo.svg", 
        tier: "gold" 
      },
      { 
        name: "Wärtsilä", 
        logo: "https://upload.wikimedia.org/wikipedia/commons/9/9e/W%C3%A4rtsil%C3%A4_logo_2017.svg", 
        tier: "silver" 
      }
    ],
    mentors: [
      { name: "Pekka Lundmark", role: "President and CEO at Nokia", expertise: "Business Strategy & 5G" },
      { name: "Henrik Ehrnrooth", role: "CEO at KONE", expertise: "Smart Buildings & IoT" },
      { name: "Håkan Agnevall", role: "CEO at Wärtsilä", expertise: "Industrial IoT & Sustainability" }
    ],
    schedule: [
      { day: "Day 1", events: ["Opening Ceremony", "Smart City Workshop", "Team Formation"] },
      { day: "Day 2", events: ["Hacking", "Industry Expert Talks", "Mentor Sessions"] },
      { day: "Day 3", events: ["Final Presentations", "Judging", "Awards Ceremony"] }
    ],
    registrationDeadline: "January 30, 2024",
    maxParticipants: 150,
    currentParticipants: 150,
    techStack: ["5G", "IoT", "Cloud Computing", "Edge Computing", "AI/ML"],
    requirements: ["Strong programming skills", "Interest in telecommunications", "Team collaboration"],
    nextHackathonDate: "May 15-17, 2024",
    hackathonCycle: "Quarterly (Every 3 months)",
    status: "past",
    image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg",
    organizer: "Nokia",
    organizerLogo: "https://upload.wikimedia.org/wikipedia/commons/0/02/Nokia_wordmark.svg",
    tags: ["5G", "IoT", "Smart Cities", "Innovation"]
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
      id={`hackathon-tabpanel-${index}`}
      aria-labelledby={`hackathon-tab-${index}`}
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

const Hackathons: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const upcomingHackathons = [
    {
      id: 1,
      title: "Nokia Future Connectivity Hackathon",
      date: "May 15-17, 2024",
      location: "Nokia HQ, Espoo + Virtual",
      description: "Join Nokia's quarterly hackathon focused on next-generation connectivity solutions. This spring edition brings together developers, designers, and innovators to create solutions leveraging 5G, 6G research, and IoT technologies for a connected future.",
      theme: "Future of Connectivity & IoT",
      prizes: [
        {
          place: '1st Place',
          amount: '€10,000',
          description: 'Cash prize + mentorship opportunities'
        },
        {
          place: '2nd Place',
          amount: '€5,000',
          description: 'Cash prize + development resources'
        },
        {
          place: '3rd Place',
          amount: '€2,500',
          description: 'Cash prize + tech gadgets'
        }
      ],
      sponsors: [
        { 
          name: "Nokia", 
          logo: "https://upload.wikimedia.org/wikipedia/commons/0/02/Nokia_wordmark.svg", 
          tier: "platinum" 
        },
        { 
          name: "Supercell", 
          logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Supercell_logo_20211112.svg/1280px-Supercell_logo_20211112.svg.png", 
          tier: "gold" 
        },
        { 
          name: "Rovio", 
          logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Rovio_Entertainment_Logo_2020.png/1280px-Rovio_Entertainment_Logo_2020.png", 
          tier: "silver" 
        }
      ],
      mentors: [
        { name: "Pekka Lundmark", role: "President and CEO at Nokia", expertise: "Business Strategy & 5G" },
        { name: "Ilkka Paananen", role: "CEO at Supercell", expertise: "Gaming & Mobile Technologies" },
        { name: "Mikko Helander", role: "CEO at Rovio", expertise: "Mobile Gaming & Entertainment" }
      ],
      schedule: [
        { day: "Day 1", events: ["Opening Ceremony by Nokia Leadership", "5G/6G Workshop", "Team Formation"] },
        { day: "Day 2", events: ["Hacking", "Nokia Bell Labs Tech Talks", "Mentor Sessions"] },
        { day: "Day 3", events: ["Project Finalization", "Pitches to Nokia Executives", "Awards Ceremony"] }
      ],
      registrationDeadline: "April 30, 2024",
      maxParticipants: 150,
      currentParticipants: 85,
      techStack: ["5G", "6G", "IoT", "Cloud Computing", "Edge Computing", "AI/ML"],
      requirements: ["Strong programming skills", "Interest in telecommunications", "Team collaboration"],
      nextHackathonDate: "August 15-17, 2024",
      hackathonCycle: "Quarterly (Every 3 months)",
      status: "upcoming",
      image: "https://images.pexels.com/photos/2422294/pexels-photo-2422294.jpeg",
      organizer: "Nokia",
      organizerLogo: "https://upload.wikimedia.org/wikipedia/commons/0/02/Nokia_wordmark.svg",
      tags: ["5G", "6G", "IoT", "Innovation", "Telecommunications"]
    }
  ];
  const pastHackathons = mockHackathons.filter(h => h.status === 'past');

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
          Hackathons
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Join exciting hackathons, collaborate with other developers, and win amazing prizes!
        </Typography>
      </Box>

      <Paper sx={{ width: '100%', mb: 4 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Upcoming Hackathons" />
          <Tab label="Past Hackathons" />
        </Tabs>

        <TabPanel value={value} index={0}>
          <Box sx={{ mb: 8 }}>
            <Typography variant="h4" gutterBottom sx={{ 
              color: '#00b4d8',
              fontWeight: 700,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              fontFamily: '"Roboto Mono", monospace',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              Next Hackathon
            </Typography>
            <Typography variant="subtitle1" gutterBottom sx={{ mb: 3, color: 'text.secondary' }}>
              Our hackathons are held quarterly, every 3 months. Join our next event and collaborate with industry experts!
            </Typography>
            {upcomingHackathons.map((hackathon) => (
              <Card key={hackathon.id} sx={{ mb: 4 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box>
                      <Typography variant="h5" gutterBottom>
                        {hackathon.title}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                        {hackathon.date} • {hackathon.location}
                      </Typography>
                    </Box>
                    <Chip 
                      label={`Next: ${hackathon.nextHackathonDate}`}
                      color="primary"
                      sx={{ fontWeight: 'bold' }}
                    />
                  </Box>
                  <Typography variant="body1" paragraph>
                    {hackathon.description}
                  </Typography>
                  
                  {hackathon.title === "Nokia Future Connectivity Hackathon" && (
                    <Box sx={{ mb: 3, borderRadius: 2, overflow: 'hidden', boxShadow: 3 }}>
                      <img 
                        src="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg" 
                        alt="Nokia Future Connectivity Hackathon" 
                        style={{ 
                          width: '100%', 
                          height: 'auto',
                          maxHeight: '400px',
                          objectFit: 'cover',
                          display: 'block'
                        }} 
                      />
                      <Box sx={{ p: 2, bgcolor: 'rgba(0, 180, 216, 0.05)', borderTop: '1px solid rgba(0, 180, 216, 0.2)' }}>
                        <Typography variant="caption" color="text.secondary">
                          Nokia's cutting-edge 5G and 6G technologies will be showcased at the hackathon
                        </Typography>
                      </Box>
                    </Box>
                  )}
                  
                  <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                    Theme: {hackathon.theme}
                  </Typography>
                  
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Industry Partners & Sponsors
                    </Typography>
                    <Grid container spacing={2} sx={{ mb: 3 }}>
                      {hackathon.sponsors.map((sponsor, index) => (
                        <Grid item xs={12} sm={4} key={index}>
                          <Box sx={{ 
                            p: 2, 
                            border: '1px solid', 
                            borderColor: 'divider',
                            borderRadius: 1,
                            textAlign: 'center',
                            bgcolor: sponsor.tier === 'platinum' ? 'rgba(0, 180, 216, 0.05)' : 'transparent'
                          }}>
                            <img 
                              src={sponsor.logo} 
                              alt={sponsor.name} 
                              style={{ 
                                width: '100%', 
                                maxWidth: '150px',
                                height: 'auto',
                                marginBottom: '8px'
                              }} 
                            />
                            <Typography variant="subtitle2" sx={{ 
                              fontWeight: 'bold',
                              color: sponsor.tier === 'platinum' ? '#00b4d8' : 'text.primary'
                            }}>
                              {sponsor.name}
                            </Typography>
                            <Chip 
                              label={sponsor.tier.charAt(0).toUpperCase() + sponsor.tier.slice(1)} 
                              size="small"
                              color={sponsor.tier === 'platinum' ? 'primary' : 'default'}
                              sx={{ mt: 1 }}
                            />
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>

                  <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Industry Mentors
                    </Typography>
                    <Grid container spacing={2}>
                      {hackathon.mentors.map((mentor, index) => (
                        <Grid item xs={12} sm={4} key={index}>
                          <Card variant="outlined">
                            <CardContent>
                              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                {mentor.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {mentor.role}
                              </Typography>
                              <Chip 
                                label={mentor.expertise} 
                                size="small" 
                                sx={{ mt: 1 }}
                              />
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>

                  <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" gutterBottom>
                      Prizes
                    </Typography>
                    <Grid container spacing={2}>
                      {hackathon.prizes.map((prize, index) => (
                        <Grid item xs={12} sm={4} key={index}>
                          <Card sx={{ 
                            bgcolor: index === 0 ? 'rgba(0, 180, 216, 0.05)' : 'background.paper',
                            border: index === 0 ? '1px solid #00b4d8' : '1px solid',
                            borderColor: 'divider'
                          }}>
                            <CardContent>
                              <Typography variant="h6" sx={{ 
                                color: index === 0 ? '#00b4d8' : 'text.primary',
                                fontWeight: 'bold'
                              }}>
                                {prize.place}
                              </Typography>
                              <Typography variant="body1">
                                {prize.amount}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {prize.description}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>

                  <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" gutterBottom>
                      Schedule
                    </Typography>
                    <Timeline>
                      {hackathon.schedule.map((day, index) => (
                        <TimelineItem key={index}>
                          <TimelineSeparator>
                            <TimelineDot color="primary" />
                            <TimelineConnector />
                          </TimelineSeparator>
                          <TimelineContent>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                              {day.day}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {day.events.join(' • ')}
                            </Typography>
                          </TimelineContent>
                        </TimelineItem>
                      ))}
                    </Timeline>
                  </Box>

                  <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Registration Deadline: {hackathon.registrationDeadline}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {hackathon.currentParticipants} / {hackathon.maxParticipants} participants registered
                      </Typography>
                    </Box>
                    <Button 
                      variant="contained" 
                      color="primary"
                      size="large"
                      sx={{ 
                        px: 4,
                        py: 1.5,
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 'bold'
                      }}
                    >
                      Register Now
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Box sx={{ mb: 8 }}>
            <Typography variant="h4" gutterBottom sx={{ 
              color: '#00b4d8',
              fontWeight: 700,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              fontFamily: '"Roboto Mono", monospace',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              Past Hackathons
            </Typography>
            <Grid container spacing={4}>
              {pastHackathons.map((hackathon) => (
                <Grid item key={hackathon.id} xs={12} sm={6} md={6}>
                  <StyledCard>
                    <StyledCardMedia
                      image={hackathon.image}
                      title={hackathon.title}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar 
                          src={hackathon.organizerLogo} 
                          alt={hackathon.organizer}
                          sx={{ mr: 1, width: 32, height: 32 }}
                        />
                        <Typography variant="subtitle2" color="text.secondary">
                          {hackathon.organizer}
                        </Typography>
                      </Box>
                      
                      <Typography variant="h5" component="h2" gutterBottom>
                        {hackathon.title}
                      </Typography>
                      
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {hackathon.description}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 2 }}>
                        {hackathon.tags.map((tag) => (
                          <StyledChip 
                            key={tag} 
                            label={tag} 
                            size="small" 
                            color="primary" 
                            variant="outlined" 
                          />
                        ))}
                      </Box>
                      
                      <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid item xs={6}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <CalendarTodayIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                            <Typography variant="body2">{hackathon.date}</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <LocationOnIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                            <Typography variant="body2">{hackathon.location}</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <GroupIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                            <Typography variant="body2">{hackathon.currentParticipants} participants</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <EmojiEventsIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                            <Typography variant="body2">Prize: {hackathon.prizes[0].amount}</Typography>
                          </Box>
                        </Grid>
                      </Grid>
                      
                      <Button 
                        variant="contained" 
                        color="primary"
                        fullWidth
                        sx={{ 
                          mt: 1,
                          background: '#00b4d8',
                          color: 'primary',
                          '&:hover': {
                            background: '#0096c7',
                          },
                        }}
                      >
                        View Results
                      </Button>
                    </CardContent>
                  </StyledCard>
                </Grid>
              ))}
            </Grid>
          </Box>
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default Hackathons; 