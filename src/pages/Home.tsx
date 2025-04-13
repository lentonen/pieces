import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  CardActionArea,
  Avatar,
  AvatarGroup,
  Chip,
  Divider,
  styled,
  useTheme,
  CardActions
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import CodeIcon from '@mui/icons-material/Code';
import GroupIcon from '@mui/icons-material/Group';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import EventIcon from '@mui/icons-material/Event';
import logo3 from '../images/logo3.png';

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out',
  background: 'rgba(19, 47, 76, 0.5)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[10],
  },
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  borderRadius: '16px',
  fontWeight: 600,
}));

const HeroSection = styled('div')(({ theme }) => ({
  minHeight: '60vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  padding: theme.spacing(4),
  position: 'relative',
  overflow: 'hidden',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const MainHeading = styled(Typography)(({ theme }) => ({
  fontSize: '4rem',
  fontWeight: 700,
  marginBottom: theme.spacing(2),
  background: 'linear-gradient(45deg, #00b4d8 30%, #90e0ef 90%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  [theme.breakpoints.down('sm')]: {
    fontSize: '2.5rem',
  },
}));

const SubHeading = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  marginBottom: theme.spacing(4),
  color: 'rgba(255, 255, 255, 0.9)',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.2rem',
    marginBottom: theme.spacing(3),
  },
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    width: '100%',
    '& > button': {
      width: '100%',
    },
  },
}));

const FeaturedSection = styled('div')(({ theme }) => ({
  padding: theme.spacing(8, 0),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(4, 0),
  },
}));

const ProjectGrid = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    marginTop: theme.spacing(2),
  },
}));

const ProjectCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  background: 'rgba(19, 47, 76, 0.5)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(2),
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
  },
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(2),
  },
}));

const Logo = styled('img')({
  width: '400px',
  height: 'auto',
  marginBottom: '2rem',
  '@media (max-width: 600px)': {
    width: '250px',
  },
});

const PhilosophySection = styled('div')(({ theme }) => ({
  padding: theme.spacing(8, 0),
  background: 'rgba(19, 47, 76, 0.3)',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(4, 0),
  },
}));

const PhilosophyCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  background: 'rgba(19, 47, 76, 0.5)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(2),
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
  },
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(2),
  },
}));

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  teamSize: number;
  currentMembers: number;
  members: {
    id: number;
    name: string;
    avatar: string;
  }[];
  lookingFor: string[];
  status: string;
  difficulty: string;
}

// Featured projects data
const featuredProjects: Project[] = [
  {
    id: 1,
    title: 'AI Image Recognition',
    description: 'Join our team building an AI-powered image recognition system. Looking for ML engineers and UI developers!',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
    techStack: ['Python', 'TensorFlow', 'React', 'OpenCV'],
    teamSize: 4,
    currentMembers: 2,
    members: [
      { id: 1, name: 'Anna Lee', avatar: 'https://i.pravatar.cc/150?img=1' },
      { id: 2, name: 'Chris Martin', avatar: 'https://i.pravatar.cc/150?img=2' },
    ],
    lookingFor: ['ML Engineer', 'UI Developer'],
    status: 'In Progress',
    difficulty: 'Advanced',
  },
  {
    id: 2,
    title: 'Social Media Analytics',
    description: 'Create a powerful analytics dashboard for social media. Need data scientists and frontend developers!',
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg',
    techStack: ['React', 'Python', 'D3.js', 'Firebase'],
    teamSize: 4,
    currentMembers: 2,
    members: [
      { id: 3, name: 'Robert Wilson', avatar: 'https://i.pravatar.cc/150?img=3' },
      { id: 4, name: 'Lisa Anderson', avatar: 'https://i.pravatar.cc/150?img=4' },
    ],
    lookingFor: ['Data Scientist', 'Frontend Developer'],
    status: 'Planning',
    difficulty: 'Intermediate',
  },
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box>
      <HeroSection>
        <Logo src={logo3} alt="Pieces Logo" />
        <MainHeading variant="h1">
          Find Your Missing Piece
        </MainHeading>
        <SubHeading variant="h2">
          Build real projects. Together.
        </SubHeading>
        <ButtonContainer>
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={RouterLink}
            to="/projects"
            startIcon={<CodeIcon />}
          >
            Explore Projects
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            component={RouterLink}
            to="/events"
            startIcon={<EventIcon />}
          >
            View Events
          </Button>
        </ButtonContainer>
      </HeroSection>

      <PhilosophySection>
        <Container maxWidth="lg">
          <Typography 
            variant="h3" 
            align="center" 
            gutterBottom
            sx={{ 
              color: 'primary.main',
              fontWeight: 600,
              mb: 4,
              [theme.breakpoints.down('sm')]: {
                fontSize: '1.8rem',
                mb: 3,
              },
            }}
          >
            Our Philosophy
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <PhilosophyCard>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    <CodeIcon sx={{ fontSize: 60, color: 'primary.main' }} />
                  </Box>
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    align="center" 
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    Real Projects
                  </Typography>
                  <Typography 
                    variant="body1" 
                    align="center"
                    sx={{ color: 'rgba(255, 255, 255, 0.9)' }}
                  >
                    Work on meaningful projects that solve real-world problems and build your portfolio.
                  </Typography>
                </CardContent>
              </PhilosophyCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <PhilosophyCard>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    <GroupIcon sx={{ fontSize: 60, color: 'primary.main' }} />
                  </Box>
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    align="center" 
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    Collaborative Learning
                  </Typography>
                  <Typography 
                    variant="body1" 
                    align="center"
                    sx={{ color: 'rgba(255, 255, 255, 0.9)' }}
                  >
                    Learn by doing. Work on real projects with peers who share your interests and goals.
                  </Typography>
                </CardContent>
              </PhilosophyCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <PhilosophyCard>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    <WorkIcon sx={{ fontSize: 60, color: 'primary.main' }} />
                  </Box>
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    align="center" 
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    Career Growth
                  </Typography>
                  <Typography 
                    variant="body1" 
                    align="center"
                    sx={{ color: 'rgba(255, 255, 255, 0.9)' }}
                  >
                    Connect with industry professionals. Find opportunities that match your skills and interests.
                  </Typography>
                </CardContent>
              </PhilosophyCard>
            </Grid>
          </Grid>
        </Container>
      </PhilosophySection>
    </Box>
  );
};

export default Home; 