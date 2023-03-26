import { useRouter } from 'next/router';

import { Box, Container, NavigationButtons, NavigationLink } from '@styles/Footer.style';

export const Footer = () => {
  const router = useRouter();

  const handleRedirect = async (path: string) => {
    await router.push(`/${path}`);
  };

  return (
    <Container>
      <Box>
        <NavigationButtons>
          <NavigationLink onClick={() => handleRedirect('')}>
            Home
          </NavigationLink>
          <NavigationLink onClick={() => handleRedirect('posts')}>
            Posts
          </NavigationLink>
          <NavigationLink onClick={() => handleRedirect('market')}>
            Market
          </NavigationLink>
        </NavigationButtons>
        <NavigationLink>
          Copyright &copy; 2023 Mikhail Bahdashych
        </NavigationLink>
      </Box>
    </Container>
  );
};
