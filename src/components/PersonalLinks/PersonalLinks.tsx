import React from "react";
import { StyledPersonalLinks } from "./PersonalLinks.styles";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import IconButton from "@mui/material/IconButton";
import Link from "Link";

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
