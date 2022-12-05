import React from 'react';
import { Project as ProjectType } from 'types/models';
import { StyledProjects } from './Projects.styles';
import Project from './Project';
import Grid from '@mui/material/Grid';

type Props = {
  projects: ProjectType[];
};

const Projects: React.FC<Props> = ({ projects }) => {
  return (
    <StyledProjects>
      <Grid container direction="row" alignItems="stretch" spacing={3}>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} key={`project-${project.name}`}>
            <Project project={project} />
          </Grid>
        ))}
      </Grid>
    </StyledProjects>
  );
};

export default Projects;
