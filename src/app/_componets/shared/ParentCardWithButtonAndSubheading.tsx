import { Card, CardHeader, CardContent, Divider, Box } from '@mui/material';
import { JSX } from 'react';
type Props = {
  title: string;
  children: JSX.Element | null;
  elevation?: number;
  variant?: 'outlined' | 'elevation' | undefined;
  buttons?: React.ReactElement | null;
  footer?: string | JSX.Element;
  subHeader?: string | JSX.Element;
};

const BaseCard = ({ title, children, elevation, variant, buttons, footer, subHeader }: Props) => {

  return (
    <Card
      sx={{ padding: 0 }}
      elevation={elevation}
      variant={variant}
    >
      <CardHeader title={title} subheader={subHeader} action={buttons !== null && buttons !== undefined ? buttons : null} />
      <Divider />
      <CardContent>{children}</CardContent>
      {footer ? (
        <>
          <Divider />
          <Box p={3}>{footer}</Box>
        </>
      ) : ( '' )}
    </Card>
  );
};

export default BaseCard;