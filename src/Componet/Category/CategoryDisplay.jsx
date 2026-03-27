import React, { useEffect, useState } from 'react';
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
    const [Search, setSearch] = useState("")

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

    // const handleSearch = (e) => {
    //     console.log(e.target.value);

    //     setSearch(e.target.value)

    //     // console.log(Search);

    // }

    let search = []

    search = Category.category?.filter((v) => (
        v.name.toLowerCase().includes(Search.toLowerCase()) ||
        v.description.toLowerCase().includes(Search.toLowerCase())
    ))

    console.log("Search:", search);


    return (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div className="nav my-3 my-xl-0 px-4 flex-nowrap align-items-center">
                <div className="nav-item w-100">
                    <form className="position-relative">
                        <input className="form-control pe-5 bg-transparent" type="search" placeholder="Search" aria-label="Search" onChange={(e) => { setSearch(e.target.value) }} />
                        <button className="btn bg-transparent px-2 py-0 position-absolute top-50 end-0 translate-middle-y" type="submit"><i className="fas fa-search fs-6 " /></button>
                    </form>
                </div>
            </div>
            {
                search?.map((v) => (
                    <Card sx={{ maxWidth: 345 }} >
                        <FavoriteIcon />
                        <CardMedia
                            sx={{
                                height: 140,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                            image={v.category_img?.url}
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