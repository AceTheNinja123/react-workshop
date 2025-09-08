import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import { JSX } from 'react';

type Props = {
  title: string;
  children: JSX.Element | JSX.Element[];
  elevation?: number;
  variant?: 'outlined' | 'elevation' | undefined;
};

const BaseCard = ({ title, children, elevation, variant }: Props) => {

  return (
    <Card
      sx={{ padding: 0 }}
      elevation={elevation}
      variant={variant}
    >
      <CardHeader title={title} />
      <Divider />
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default BaseCard;
