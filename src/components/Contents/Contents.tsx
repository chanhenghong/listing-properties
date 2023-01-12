import React from 'react';
import {Stack, Grid, Typography, Divider} from '@mui/material';
import RenderCard from '../Home/components';
import useSWR from 'swr';
import Link from 'next/link';
import {useRouter} from 'next/router';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const fetcher = (...args: any) => fetch(args).then((res) => res.json());

const Contents = () => {
  const sale = 'Sale';
  const rent = 'Rent';
  const router = useRouter();

  const {id} = router.query;
  console.log('id:::', id);

  const URL = `http://127.0.0.1:8181/api/v1/getPropertiesRecommend/${id}`;
  const {data: card, error: cardError} = useSWR(URL, fetcher);
  if (cardError) return <div>Failed to load</div>;
  console.log('cardError:::', cardError);

  const cardUrl = `http://127.0.0.1:8181/api/v1/display/${id}`;
  const {data: info, error: infoError} = useSWR(cardUrl, fetcher);
  console.log('infoError:::', info);
  // let itemData = {}
  // const a = info.image;
  // console.log("Heng", a)

  return (
    <div>
      <Stack direction="column" justifyContent="center">
        <Grid container justifyContent="center">
          <Stack sx={{width: 600}}>
            <ImageGallery showThumbnails={true} items={itemData} />
          </Stack>
        </Grid>
        <Stack sx={{ml: 13}} spacing={1}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{fontSize: 16}}>
            {info?.is_rent ? rent : sale}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            sx={{fontSize: '20px', m: 0, color: '#00a6c0'}}>
            {info?.current_use}
          </Typography>
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={6}>
            {infoError && <Typography>Failed to load</Typography>}
            <Stack direction="column">
              <Typography sx={{fontSize: '13px'}} color="text.secondary">
                ID
              </Typography>
              <Typography sx={{fontSize: '16px'}}>{console.log(info)}
                {info?.id}
              </Typography>
            </Stack>
            {/* <Stack direction= "column">
              <Typography sx={{fontSize: '13px'}} color="text.secondary">
                  Price
                </Typography>
              <Typography sx={{fontSize: '16px'}}>
                  {info?.sale_list_price}
                </Typography>
            </Stack> */}
            <Divider
              orientation="vertical"
              variant="middle"
              sx={{height: 30}}
            />
            <Stack direction="column">
              <Typography sx={{fontSize: '13px'}} color="text.secondary">
                Type
              </Typography>
              <Typography sx={{fontSize: '16px'}}>{info?.type}</Typography>
            </Stack>
            <Divider
              orientation="vertical"
              variant="middle"
              sx={{height: 30}}
            />
            <Stack direction="column">
              <Typography sx={{fontSize: '13px'}} color="text.secondary">
                Shape
              </Typography>
              <Typography sx={{fontSize: '16px'}}>
                {info?.land_shape_type}
              </Typography>
            </Stack>
            <Divider
              orientation="vertical"
              variant="middle"
              sx={{height: 30}}
            />
            <Stack direction="column">
              <Typography sx={{fontSize: '13px'}} color="text.secondary">
                Land Width 
              </Typography>
              <Typography sx={{fontSize: '16px'}}>
                {info?.land_width}
              </Typography>
            </Stack>
            <Divider
              orientation="vertical"
              variant="middle"
              sx={{height: 30}}
            />
            <Stack direction="column">
              <Typography sx={{fontSize: '13px'}} color="text.secondary">
                Land Length
              </Typography>
              <Typography sx={{fontSize: '16px'}}>
                {info?.land_length}
              </Typography>
            </Stack>
            <Divider
              orientation="vertical"
              variant="middle"
              sx={{height: 30}}
            />
            <Stack direction="column">
              <Typography sx={{fontSize: '13px'}} color="text.secondary">
                Land Area 
              </Typography>
              <Typography sx={{fontSize: '16px'}}>
                {info?.land_area}
              </Typography>
            </Stack>
            <Divider
              orientation="vertical"
              variant="middle"
              sx={{height: 30}}
            />
            <Stack direction="column">
              <Typography sx={{fontSize: '13px'}} color="text.secondary">
                Full Address
              </Typography>
              <Typography sx={{fontSize: '16px'}}>
                {info?.full_address}
              </Typography>
            </Stack>
          </Stack>
          <Stack sx={{mt: '20px !important'}}>
            <Typography sx={{fontWeight: 1, fontSize: 18}}>
              You may be interested in
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="center" alignItems="center">
            {!card && (
              <Typography variant="caption" fontSize={15}>
                Loading...
              </Typography>
            )}

            {cardError && <Typography>Failed to load</Typography>}
          </Stack>
          <Stack direction="row" sx={{overflow: 'auto'}}>
            {card?.map((data: any) => {
              // const sale = 'Sale';
              // const rent = 'Rent';
              const length = data.land_length;
              const width = data.land_width;
              const emty = 'N/A';
              return (
                <div key={data.id}>
                  <Grid item sx={{mb: 2}}>
                    <Link
                      href={{
                        pathname: `/home/[id]`,
                        query: {id: data.id},
                      }}>
                      <div>
                        <RenderCard
                          image= {`https://z1-prod-s3.s3.ap-southeast-1.amazonaws.com/${data.image}`}
                          sale_type={data.is_sale ? sale : rent}
                          sale_list_price={data.sale_list_price}
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
          </Stack>
        </Stack>
      </Stack>
    </div>
  );
};

export default Contents;


const itemData = [
  {
    original: 'https://z1-prod-s3.s3.ap-southeast-1.amazonaws.com/z1_production/uploads/images/202205/671c54876577c43eb1f79fe50ca8f1a601f7daf79c16c05452cff7f547ea6619.png',
    thumbnail: 'https://z1-prod-s3.s3.ap-southeast-1.amazonaws.com/z1_production/uploads/images/202205/671c54876577c43eb1f79fe50ca8f1a601f7daf79c16c05452cff7f547ea6619.png',
    title: 'Breakfast',
  },
  {
    original: 'https://z1-prod-s3.s3.ap-southeast-1.amazonaws.com/z1_production/uploads/images/202205/4104a971fecb3cce2eef40a80db4359fdb55230a6caa4fd6c353fa344175b4dd.png',
    thumbnail: 'https://z1-prod-s3.s3.ap-southeast-1.amazonaws.com/z1_production/uploads/images/202205/4104a971fecb3cce2eef40a80db4359fdb55230a6caa4fd6c353fa344175b4dd.png',
    title: 'Burger',
  },
  {
    original: 'https://z1-prod-s3.s3.ap-southeast-1.amazonaws.com/z1_production/uploads/images/202205/9423a3aeed2a5ecc7c24d01d9f7794305808f999183fc69138070499652ef1cb.png',
    thumbnail: 'https://z1-prod-s3.s3.ap-southeast-1.amazonaws.com/z1_production/uploads/images/202205/9423a3aeed2a5ecc7c24d01d9f7794305808f999183fc69138070499652ef1cb.png',
    title: 'Camera',
  },
  {
    original: 'https://z1-prod-s3.s3.ap-southeast-1.amazonaws.com/z1_production/uploads/images/202205/a6c294f44a0d7440b8b86227c64344061e0b53aff3e5b4c2df13f5415603a14d.png',
    thumbnail: 'https://z1-prod-s3.s3.ap-southeast-1.amazonaws.com/z1_production/uploads/images/202205/a6c294f44a0d7440b8b86227c64344061e0b53aff3e5b4c2df13f5415603a14d.png',
    title: 'Coffee',
  },
  // {
  //   original: '../../../Image/Home5.jpeg',
  //   thumbnail: '../../../Image/Home5.jpeg',
  //   title: 'Hats',
  // },
  // {
  //   original: '../../../Image/Home6.jpeg',
  //   thumbnail: '../../../Image/Home6.jpeg',
  //   title: 'Honey',
  // },
  // {
  //   original: '../../../Image/Home7.jpeg',
  //   thumbnail: '../../../Image/Home7.jpeg',
  //   title: 'Basketball',
  // },
  // {
  //   original: '../../../Image/Home8.jpeg',
  //   thumbnail: '../../../Image/Home8.jpeg',
  //   title: 'Fern',
  // },
];
