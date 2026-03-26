import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { getUser } from '../../Redux/Slice/CategorySlice';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
// import { FavoritesIcon } from '../../Redux/Slice/CategoryDisplaySlice';
import { getAllCategory } from '../../Redux/Slice/CategorySlice';
import { IMAGE_URL } from '../../../utility/url';

function CategoryDisplay(props) {


    const dispatch = useDispatch()

    const getData = () => {

    }

    useEffect(() => {
        dispatch(getAllCategory())
    }, [])

    const Category = useSelector(state => state.Category)

    console.log(Category.category);


    // const FavIcon = useSelector(state => state.CategoryDisplay)

    // console.log(FavIcon.favorites);

    // const handleFav = (data) => {
    //     console.log(data);

    //     console.log("lll");

    //     dispatch(FavoritesIcon(data))

    // }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            {
                Category.category?.map((v) => (
                    <Card sx={{ maxWidth: 345 }} >
                        <FavoriteIcon
                            onClick={() => handleFav(v)}
                        />
                        <CardMedia
                            sx={{ height: 140, objectFit: 'cover' }}
                            image={v.category_img?.url}
                            title="green iguana"
                        />

                        <CardContent>     <Typography gutterBottom variant="h5" component="div">
                            {v.name}
                        </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {v.description}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Share</Button>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                ))


            }

        </div>

    );
}

export default CategoryDisplay;