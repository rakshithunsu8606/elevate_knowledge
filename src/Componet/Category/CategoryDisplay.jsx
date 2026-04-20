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
import WithReduxfetch from '../../Hoc/WithReduxfetch';
import useSearch from '../../hook/UseSearch';
import { NavLink, useParams } from 'react-router';

function CategoryDisplay({ category }) {

    const { id } = useParams()

    console.log(id);


    console.log(category);

    // const [Search, setSearch] = useState("")



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

    const { Search, setSearch, sData } = useSearch(category, ["name", "description"])

    console.log("sData", sData);



    const handleClick = (id) => {
        console.log(id);

        const selectedCategory = sData.filter((v) => v.parent_category_id === id)

        console.log(selectedCategory);
    }

    let mainCategory;

    if (!id) {
        mainCategory = sData.filter((v) => v.parent_category_id === null)

        // console.log(mainCategory);
    } else {
        mainCategory = sData.filter((v) => v.parent_category_id === id)
    }

    const handelCourse = (id) => {
        return sData.some((v) => v.parent_category_id === id)
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div className="nav my-3 my-xl-0 px-4 flex-nowrap align-items-center">
                <div className="nav-item w-100">
                    <form className="position-relative">
                        <input className="form-control pe-5 bg-transparent" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setSearch(e.target.value)} />
                        <button className="btn bg-transparent px-2 py-0 position-absolute top-50 end-0 translate-middle-y" type="submit"><i className="fas fa-search fs-6 " /></button>
                    </form>
                </div>
            </div>
            {
                mainCategory?.map((v) => (
                    <NavLink
                        to={handelCourse(v._id) ? `/display/${v._id}` : `/Course_grid/${v._id}`}
                    >
                        <Card sx={{ maxWidth: 345 }} onClick={() => handleClick(v._id)}>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                {v.category_img.map((v) => (
                                    <img
                                        src={v?.url}
                                        alt="course"
                                        style={{
                                            height: '140px',
                                            width: '100%',
                                            objectFit: 'cover',
                                            borderRadius: '6px'
                                        }}
                                    />
                                ))}
                            </div>

                            <CardContent>
                                <Typography gutterBottom variant="h5" style={{ color: 'black' }}>
                                    {v.name}
                                </Typography>

                                <Typography variant="body2">
                                    {v.description}
                                </Typography>
                            </CardContent>

                            <CardActions>
                                <Button size="small">Share</Button>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                    </NavLink>
                ))
            }

        </div>

    );
}

export default WithReduxfetch(CategoryDisplay, getAllCategory, (state) => state.Category);