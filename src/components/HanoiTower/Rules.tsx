import { Card, CardContent, Paper } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { useRouter } from 'next/router';

export const HanoiTowerRules = () => {
  const { locale } = useRouter();

  return (
    <Grid container>
      <Grid xs={12}>
        <Card>
          <CardContent>
            {locale === 'fr' ? (
              <ul>
                <li>Un seul disque peut être déplacé à la fois.</li>
                <li>
                  Seul le disque supérieur d&apos;une pile peut être transféré
                  vers le haut d&apos;une autre pile ou sur une tige vide.
                </li>
                <li>
                  Les disques plus grands ne peuvent pas être empilés sur des
                  disques plus petits.
                </li>
              </ul>
            ) : (
              <ul>
                <li>Only one disc can be moved at a time.</li>
                <li>
                  Only the top disc of one stack can be transferred to the top
                  of another stack or an empty rod.
                </li>
                <li>Larger discs cannot be stacked over smaller ones.</li>
              </ul>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  if (locale === 'fr') {
    return <div>coucou</div>;
  }
  return <div>coucou en</div>;
};
