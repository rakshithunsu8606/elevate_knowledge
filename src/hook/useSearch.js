import { useState } from "react";


function useSearch(data, keys) {
    console.log(data, keys);

    const [Search, setSearch] = useState("")

    const handlefilter = () => {
        return data.filter((v) =>
            keys.some((v1)=>
                typeof v[v1] ==='string'?
                v[v1]?.toLowerCase()?.includes(Search.toLowerCase()):
                v[v1]?.toString()?.includes(Search)
            )
        )
    }

    const sData = handlefilter();

    return {
        Search,
        setSearch,
        sData
    }
    
}

export default useSearch