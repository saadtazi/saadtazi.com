import React from 'react';
import CardActions from '@mui/material/CardActions';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon/ListItemIcon';
import ListItemText from '@mui/material/ListItemText/ListItemText';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { Project as ProjectType } from 'types/models';
import Link from 'Link';
import { StyledProject } from './Projects.styles';

type Props = {
  project: ProjectType;
};

const Project: React.FC<Props> = ({ project }) => {
  return (
    <StyledProject>
      <Card>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            {project.name}
          </Typography>
          <Typography variant="h5" component="h2">
            {project.lead}
          </Typography>
          <List>
            {project.features &&
              project.features.map((feature, i) => {
                return (
                  <ListItem key={i}>
                    <ListItemIcon>
                      <CheckCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary={feature} />
                  </ListItem>
                );
              })}
          </List>
          <div className="tags">
            {project.tags.map((tag) => {
              return <Chip key={tag} label={tag} color="primary" />;
            })}
          </div>
        </CardContent>
        <CardActions>
          <div className="links">
            {project.links.map((link) => {
              return (
                <Link key={link.name} href={link.url}>
                  <Button>{link.name}</Button>
                </Link>
              );
            })}
          </div>
        </CardActions>
      </Card>
    </StyledProject>
  );
};

export default Project;
