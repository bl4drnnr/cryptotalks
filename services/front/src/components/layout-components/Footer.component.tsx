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
          <NavigationLink onClick={() => handleRedirect('/')}>
          </NavigationLink>
          <NavigationLink onClick={() => handleRedirect('/about')}>
          </NavigationLink>
          <NavigationLink onClick={() => handleRedirect('/terms-and-conditions')}>
          </NavigationLink>
        </NavigationButtons>
        <NavigationLink>
        </NavigationLink>
      </Box>
    </Container>
  );
};
