import React from 'react';
import CardActions from '@material-ui/core/CardActions';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { Project as ProjectType } from 'types/models';
import Link from 'src/Link';
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
                <Link key={link.name} href={link.url} component={Button}>
                  {link.name}
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
