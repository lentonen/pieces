import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Divider,
  useTheme,
  styled
} from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import GroupIcon from '@mui/icons-material/Group';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import PsychologyIcon from '@mui/icons-material/Psychology';

const HeroSection = styled('div')(({ theme }) => ({
  padding: theme.spacing(8, 0, 4),
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(4, 0, 2),
  },
}));

const ContentSection = styled('div')(({ theme }) => ({
  padding: theme.spacing(4, 0),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2, 0),
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

const IconBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  '& svg': {
    fontSize: 60,
    color: theme.palette.primary.main,
  },
}));

const Philosophy: React.FC = () => {
  const theme = useTheme();

  return (
    <Box>
      <HeroSection>
        <Container maxWidth="md">
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontWeight: 700,
              color: 'primary.main',
              [theme.breakpoints.down('sm')]: {
                fontSize: '2rem',
              },
            }}
          >
            The Pieces Philosophy
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.9)',
              mb: 4,
              [theme.breakpoints.down('sm')]: {
                fontSize: '1.2rem',
              },
            }}
          >
            Building a community where early-career developers can grow together
          </Typography>
        </Container>
      </HeroSection>

      <ContentSection>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <PhilosophyCard>
                <CardContent>
                  <IconBox>
                    <CodeIcon />
                  </IconBox>
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    Real Projects, Real Experience
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ color: 'rgba(255, 255, 255, 0.9)' }}
                  >
                    At Pieces, we believe in learning by doing. Instead of theoretical exercises, 
                    you'll work on real-world projects that solve actual problems. This approach 
                    helps you build a portfolio that demonstrates your practical skills to potential 
                    employers. Early-career developers often struggle to find opportunities to work 
                    on meaningful projects - Pieces bridges this gap by connecting you with projects 
                    that matter.
                  </Typography>
                </CardContent>
              </PhilosophyCard>
            </Grid>
            <Grid item xs={12} md={6}>
              <PhilosophyCard>
                <CardContent>
                  <IconBox>
                    <GroupIcon />
                  </IconBox>
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    The Power of Community
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ color: 'rgba(255, 255, 255, 0.9)' }}
                  >
                    There's strength in numbers. As an early-career developer, facing challenges alone 
                    can be overwhelming. The Pieces community provides support, feedback, and collaboration 
                    that accelerates your learning. By working with peers who share your interests and goals, 
                    you'll overcome obstacles faster and develop skills more effectively than you would on your own.
                  </Typography>
                </CardContent>
              </PhilosophyCard>
            </Grid>
            <Grid item xs={12} md={6}>
              <PhilosophyCard>
                <CardContent>
                  <IconBox>
                    <SchoolIcon />
                  </IconBox>
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    Continuous Learning
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ color: 'rgba(255, 255, 255, 0.9)' }}
                  >
                    The tech industry evolves rapidly, and staying current is a challenge for developers at all levels. 
                    Pieces fosters an environment of continuous learning where you can explore new technologies, 
                    methodologies, and best practices. Through project work and community discussions, you'll 
                    constantly expand your knowledge and adapt to industry changes.
                  </Typography>
                </CardContent>
              </PhilosophyCard>
            </Grid>
            <Grid item xs={12} md={6}>
              <PhilosophyCard>
                <CardContent>
                  <IconBox>
                    <WorkIcon />
                  </IconBox>
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    Career Development
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ color: 'rgba(255, 255, 255, 0.9)' }}
                  >
                    Breaking into the tech industry can be challenging for newcomers. Pieces connects you with 
                    industry professionals who can provide guidance, mentorship, and potential job opportunities. 
                    By building relationships within the community, you'll gain insights into career paths, 
                    interview preparation, and professional development strategies that aren't typically 
                    accessible to early-career developers.
                  </Typography>
                </CardContent>
              </PhilosophyCard>
            </Grid>
            <Grid item xs={12} md={6}>
              <PhilosophyCard>
                <CardContent>
                  <IconBox>
                    <PsychologyIcon />
                  </IconBox>
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    Problem-Solving Mindset
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ color: 'rgba(255, 255, 255, 0.9)' }}
                  >
                    Great developers aren't just coders - they're problem solvers. Pieces emphasizes developing 
                    this critical mindset by working on projects that address real challenges. Early-career 
                    developers often focus too much on syntax and frameworks without developing the analytical 
                    skills needed to break down complex problems. Our community approach helps you build these 
                    essential skills through collaborative problem-solving.
                  </Typography>
                </CardContent>
              </PhilosophyCard>
            </Grid>
            <Grid item xs={12} md={6}>
              <PhilosophyCard>
                <CardContent>
                  <IconBox>
                    <RocketLaunchIcon />
                  </IconBox>
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    Innovation Through Collaboration
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ color: 'rgba(255, 255, 255, 0.9)' }}
                  >
                    The most innovative solutions often emerge from diverse perspectives working together. 
                    Pieces brings together developers with different backgrounds, experiences, and approaches 
                    to problem-solving. This diversity of thought creates an environment where creative 
                    solutions flourish, helping you develop the innovative thinking that sets exceptional 
                    developers apart.
                  </Typography>
                </CardContent>
              </PhilosophyCard>
            </Grid>
          </Grid>

          <Box sx={{ mt: 8, textAlign: 'center' }}>
            <Typography 
              variant="h4" 
              gutterBottom
              sx={{ 
                color: 'primary.main',
                fontWeight: 600,
                mb: 3,
              }}
            >
              Join the Pieces Community
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.9)',
                maxWidth: '800px',
                mx: 'auto',
                mb: 4,
              }}
            >
              Whether you're just starting your development journey or looking to accelerate your growth, 
              the Pieces community offers the support, resources, and opportunities you need to succeed. 
              Together, we're building more than just projects - we're building careers and a supportive 
              ecosystem for developers at all stages.
            </Typography>
            <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.7)',
                fontStyle: 'italic',
              }}
            >
              "Alone we can do so little; together we can do so much." - Helen Keller
            </Typography>
          </Box>
        </Container>
      </ContentSection>
    </Box>
  );
};

export default Philosophy; 