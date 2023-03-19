
import { useRouter } from 'next/router';

import { FooterProps } from '@components/Footer/Footer.interface';
import { Box, Container, Text } from '@styles/Footer.style';

export const Footer = ({ locale, translation }: FooterProps) => {
  const router = useRouter();

  return (
    <Container>
      <Box>
        <Text>{translation('components:footer.rights')} &copy; 2023</Text>
      </Box>
    </Container>
  );
};
