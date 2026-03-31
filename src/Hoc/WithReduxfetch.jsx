import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MagnifyingGlass, ThreeDots } from 'react-loader-spinner';

function WithReduxfetch(WrappedComponent, action, selector) {
    return function ReduxfetchComponent(props) {
        const dispatch = useDispatch()

        useEffect(() => {
            dispatch(action())
        }, [])

        const { isLoading, error, ...data } = useSelector(selector)

        console.log(data);

        if (isLoading) {
            return (
                <div style={{display:'flex',justifyContent:'center'}}>
                    <MagnifyingGlass
                        visible={isLoading}
                        height="80"
                        width="80"
                        ariaLabel="magnifying-glass-loading"
                        wrapperStyle={{}}
                        wrapperClass="magnifying-glass-wrapper"
                        glassColor="#c0efff"
                        color="#e15b64"
                    />
                </div>
                // <p>Loading...</p>

            )
        }

        if (error) {
            return (
                <p>{error}</p>
            )
        }

        // <h2>{error}</h2>

        return (<WrappedComponent {...props} {...data} />)
    }
}

export default WithReduxfetch;