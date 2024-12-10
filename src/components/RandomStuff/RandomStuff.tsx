import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import React from 'react';
import dynamic from 'next/dynamic';
import { StyledRandomStuff } from './RandomStuff.styles';

const Battery = dynamic(() => import('./Battery'), {
  ssr: false,
});
const Motion = dynamic(() => import('./Motion'), {
  ssr: false,
});
const Orientation = dynamic(() => import('./Orientation'), {
  ssr: false,
});
const WindowSize = dynamic(() => import('./WindowSize'), {
  ssr: false,
});
const SpeechRecognition = dynamic(() => import('./SpeechRecognition'), {
  ssr: false,
});
const SpeechSynthesis = dynamic(() => import('./SpeechSynthesis'), {
  ssr: false,
});

const stuff = [
  SpeechRecognition,
  SpeechSynthesis,
  Battery,
  Motion,
  Orientation,
  WindowSize,
];

const RandomStuff = () => {
  return (
    <StyledRandomStuff>
      <Grid container spacing={3}>
        {stuff.map((Component, i) => {
          return (
            <Grid key={`component-${i}`} size={{ xs: 12, sm: 6 }}>
              <Card>
                <CardContent></CardContent>
                <Component />
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </StyledRandomStuff>
  );
};

export default RandomStuff;
