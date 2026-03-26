import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { getAllCategory } from '../../Redux/Slice/CategorySlice';

function CategoryDisplay() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCategory());
    }, [dispatch]);

    const Category = useSelector(state => state.Category);

    return (
        <>
            {/* 🔍 Search bar (same as yours) */}
            <div className="nav my-3 px-4">
                <div className="nav-item w-100">
                    <form className="position-relative">
                        <input className="form-control pe-5 bg-transparent" type="search" placeholder="Search" />
                        <button className="btn bg-transparent px-2 py-0 position-absolute top-50 end-0 translate-middle-y" type="submit">
                            <i className="fas fa-search fs-6" />
                        </button>
                    </form>
                </div>
            </div>

            {/* 🧱 Cards layout */}
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '16px',
                padding: '10px'
            }}>
                {
                    Category.category?.map((v) => (
                        <Card key={v._id} sx={{ width: '23%' }}>

                            <FavoriteIcon style={{ margin: '10px', cursor: 'pointer' }} />

                            <CardMedia
                                component="img"
                                sx={{ height: 140, objectFit: 'cover' }}
                                image={v.category_img?.url}
                                alt={v.name}
                            />

                            <CardContent>
                                <Typography gutterBottom variant="h6">
                                    {v.name}
                                </Typography>

                                <Typography variant="body2" color="text.secondary">
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
        </>
    );
}

export default CategoryDisplay;