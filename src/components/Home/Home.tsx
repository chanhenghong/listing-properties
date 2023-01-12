import {Grid, Stack, Box} from '@mui/material';
import React from 'react';
import RenderCard from './components';
import useSWR from 'swr';
import CircularProgress from '@mui/material/CircularProgress';
import Link from 'next/link';

const fetcher = (...args: any) => fetch(args).then((res) => res.json());
const URL = 'http://127.0.0.1:8181/api/v1/allProperties?skip=0&limit=100';

const Home = () => {
  const {data, error} = useSWR(URL, fetcher);
  console.log('response ==>', data)
  if(error) return <div>Fail to load</div>

  return (
    <div>
      <Box sx={{flexGrow: 1, mr: 5, ml: 5, mt: 2}}>
        <Stack direction="row" justifyContent="center" alignItems="center">
          {!data && <CircularProgress />}
        </Stack>
        <Stack direction="row" justifyContent="center" alignItems="center">
          <Grid
            container
            spacing={1}
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            sx={{flex: 1}}>
            {data?.map((data: any) => {
              const sale = 'Sale';
              const rent = 'Rent';
              return (
                <div key={data.id}>
                  <Grid item md={6} lg={6}>
                    <Link
                      href={{
                        pathname: `home/[id]`,
                        query: {id: data.id},
                      }}
                      // href={`/home/${data?.property_id}`}
                    >
                      <div>
                        <RenderCard
                          image= {`https://z1-prod-s3.s3.ap-southeast-1.amazonaws.com/${data.image}`}
                          sale_type={data.is_rent ? rent : sale}
                          sale_list_price = {data.sale_list_price}
                          // land_shape_type={data.land_shape_type}
                          type={data.type}
                          current_use={data.current_use}
                          property_id={data.id}
                        />
                      </div>
                    </Link>
                  </Grid>
                </div>
              );
            })}
          </Grid>
        </Stack>
      </Box>
    </div>
  );
};

export default Home;
