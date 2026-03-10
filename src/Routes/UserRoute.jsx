import React, { useContext, useEffect } from 'react';
import Header from '../Componet/Header/Header';
import { Route, Routes } from 'react-router';
import Footer from '../Componet/Footer/Footer';
import About from '../Componet/About/About';
import Become_Instructor from '../Componet/Become-Instructor/Become_Instructor';
import Blog_Detail from '../Componet/Blog_Detail/Blog_Detail';
import Blog_Grid from '../Componet/Blog_Grid/Blog_Grid';
import Blog_Masonry from '../Componet/Blog-Masonry/Blog_Masonry';
import Book_Class from '../Componet/Book_Class/Book_Class';
import Cart from '../Componet/Cart/Cart';
import Checkout from '../Componet/Checkout/Checkout';
import Coming_Soon from '../Componet/Coming_Soon/Coming_Soon';
import Contact_us from '../Componet/Contact_us/Contact_us';
import Course_add from '../Componet/Course_add/Course_add';
import Course_details from '../Componet/Course_details/Course_details';
import Course_detail_adv from '../Componet/Course_detail_adv/Course_detail_adv';
import Course_detail_min from '../Componet/Course_detail_min/Course_detail_min';
import Course_grid from '../Componet/Course_grid/Course_grid';
import Course_grid_2 from '../Componet/Course_grid_2/Course_grid_2';
import Course_list from '../Componet/Course_list/Course_list';
import Course_list_2 from '../Componet/Course_list_2/Course_list_2';
import Flag from '../Componet/Flag/Flag';
import Error from '../Componet/Error 404/Error';
import Empty_cart from '../Componet/Empty cart/Empty_cart';
import Course_video_player from '../Componet/Course video player/Course_video_player';
import Forgot from '../Componet/Forgot/Forgot';
import Instructor_create_Course from '../Componet/Instructor_create_Course/Instructor_create_Course';
import Instructor_dashBorad from '../Componet/Instructor_dashBorad/Instructor_dashBorad';
import Instructor_earning from '../Componet/Instructor_earning/Instructor_earning';
import Instructor_list from '../Componet/Instructor_list/Instructor_list';
import Instructor_manage_course from '../Componet/Instructor_manage_course/Instructor_manage_course';
import Instructor_order from '../Componet/Instructor_order/Instructor_order';
import Instructor_payout from '../Componet/Instructor_payout/Instructor_payout';
import Instructor_review from '../Componet/Instructor_review/Instructor_review';
import Instructor_single from '../Componet/Instructor_single/Instructor_single';
import Instructor_studentlist from '../Componet/Instructor_studentlist/Instructor_studentlist';
import Pricing from '../Componet/Pricing/Pricing';
import Request_acess from '../Componet/Request_acess/Request_acess';
import Request_demo from '../Componet/Request_demo/Request_demo';
// import Auth from '../Componet/Auth/Auth';
import Student_list_course from '../Componet/Student_list_course/Student_list_course';
import Student_deshborad from '../Componet/Student_deshborad/Student_deshborad';
import Student_payment from '../Componet/Student_payment/Student_payment';
import Student_subscription from '../Componet/Student_subscription/Student_subscription';
import University from '../Componet/University-admission-form/University';
import Wishlist from '../Componet/Wishlist/Wishlist';
import Home from '../Container/Home/Home';
import Catogary from '../admin/container/Category/Category';
import CategoryDisplay from '../Componet/Category/CategoryDisplay';
import Chat from '../Container/Chat';
import Auth from '../Componet/Auth/Auth';
import HomeLanding from '../Componet/Alert/Alert';
import { useDispatch } from 'react-redux';
import { CheakAuthUser } from '../Redux/Slice/auth';
import { ThemeContext } from '../Context/ThemeContext';

function UserRoute(props) {
    const ThemeData = useContext(ThemeContext)


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(CheakAuthUser())

    }, [])
    return (
        <div className={ThemeData.theme === 'light' ? 'dark' : 'light'}>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/chat' element={<Chat />} />
                <Route path='/about/:id' element={<About />} />
                <Route path='/Become_Insdtructor' element={<Become_Instructor />} />
                <Route path='/Blog_Detail' element={<Blog_Detail />} />
                <Route path='/Blog_Grid' element={<Blog_Grid />} />
                <Route path='/Blog_Masonry' element={<Blog_Masonry />} />
                <Route path='/Book_Class' element={<Book_Class />} />
                <Route path='/Cart' element={<Cart />} />
                <Route path='/Checkout' element={<Checkout />} />
                <Route path='/Coming_Soon' element={<Coming_Soon />} />
                <Route path='/Contact_us' element={<Contact_us />} />
                <Route path='/Course_add' element={<Course_add />} />
                <Route path='/Course_details' element={<Course_details />} />
                <Route path='/Course_detail_adv' element={<Course_detail_adv />} />
                <Route path='/Course_detail_min' element={<Course_detail_min />} />
                <Route path='/Course_grid' element={<Course_grid />} />
                <Route path='/Course_grid_2' element={<Course_grid_2 />} />
                <Route path='/Course_list' element={<Course_list />} />
                <Route path='/Course_list_2' element={<Course_list_2 />} />
                <Route path='/Course_video_palyer' element={<Course_video_player />} />
                <Route path='/Empty_cart' element={<Empty_cart />} />
                <Route path='*' element={<Error />} />
                <Route path='/Falg' element={<Flag />} />
                <Route path='/Forgot' element={<Forgot />} />
                <Route path='/Instructor_create_Course' element={<Instructor_create_Course />} />
                <Route path='/Instructor_dashBorad' element={<Instructor_dashBorad />} />
                <Route path='/Instructor_earning' element={<Instructor_earning />} />
                <Route path='/Instructor_list' element={<Instructor_list />} />
                <Route path='/Instructor_manage_course' element={<Instructor_manage_course />} />
                <Route path='/Instructor_order' element={<Instructor_order />} />
                <Route path='/Instructor_payout' element={<Instructor_payout />} />
                <Route path='/Instructor_review' element={<Instructor_review />} />
                <Route path='/Instructor_single' element={<Instructor_single />} />
                <Route path='/Instructor_studentlist' element={<Instructor_studentlist />} />
                <Route path='/Pricing' element={<Pricing />} />
                <Route path='/Request_acess' element={<Request_acess />} />
                <Route path='/Request_demo' element={<Request_demo />} />
                <Route path='/auth' element={<Auth />} />
                <Route path='/Student_list_course' element={<Student_list_course />} />
                <Route path='/Student_deshborad' element={<Student_deshborad />} />
                <Route path='/Student_payment' element={<Student_payment />} />
                <Route path='/Student_subscription' element={<Student_subscription />} />
                <Route path='/University' element={<University />} />
                <Route path='/Wishlist' element={<Wishlist />} />
                <Route path='/Catogary' element={<Catogary />} />
                <Route path='/display' element={<CategoryDisplay />} />
                <Route path='/Auth/:usertype' element={<Auth />} />
                <Route path='/HomeLanding' element={<HomeLanding />} />






            </Routes>
            <Footer />
        </div>
    );
}

export default UserRoute;