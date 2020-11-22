import React from 'react';
import { StyledPersonalLinks } from './PersonalLinks.styles';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import IconButton from '@material-ui/core/IconButton';
import Link from 'src/Link';

const PersonalLinks: React.FC = () => {
  return (
    <StyledPersonalLinks>
      <IconButton>
        <Link href="https://www.linkedin.com/in/saadtazi">
          <LinkedInIcon fontSize="inherit" />
        </Link>
      </IconButton>
      <IconButton>
        <Link href="https://github.com/saadtazi">
          <GitHubIcon fontSize="inherit" />
        </Link>
      </IconButton>
    </StyledPersonalLinks>
  );
};

export default PersonalLinks;
