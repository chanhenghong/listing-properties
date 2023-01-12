import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Stack, Divider} from '@mui/material';

const RenderCard = ({
  image,
  image_left_side,
  image_right_side,
  sale_type,
  sale_list_price,
  land_shape_type,
  full_address,
  land_width,
  land_length,
  land_area,
  type,
  current_use,
  property_id,
}: any) => {
  return (
    <Card sx={{width: 270, mt: 0.5, mr: 1, ml: 0.5}}>
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt="property image"
      />
      <CardContent sx={{p: 1.2, mb: 0, height: 98}}>
        <Stack justifyContent="flex-start" spacing={0.1}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{fontSize: 13}}>
            {sale_type}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{fontSize: '16.5px', m: 0, color: '#00a6c0'}}>
            {sale_list_price}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{fontSize: 13}}>
            {full_address}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{fontSize: 13}}>
            {land_width}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{fontSize: 13}}>
            {land_area}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{fontSize: 13}}>
            {land_length}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            sx={{fontSize: '16.5px', m: 0, color: '#00a6c0'}}>
            {land_shape_type}
          </Typography>
          <Typography variant="body2" sx={{fontSize: '16.5px'}}>
            {type}
          </Typography>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Typography sx={{fontSize: '14px'}} color="text.secondary">
                {current_use}
              </Typography>
            </Stack>
            <Divider
              orientation="vertical"
              variant="middle"
              sx={{height: 17}} 
            />
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Typography sx={{fontSize: '14px'}} color="text.secondary">
                {property_id}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};
export default RenderCard;
