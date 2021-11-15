const fetchItem = async(url) => {
    try{
        const res = await fetch(url);
        if (!res.ok){
            throw new Error ('not found')
        }
        const obj = await res.json();
        const entries = Object.entries(obj); 
        console.log(entries)
        return entries.slice(0,5)
    } catch (e) {
        throw e;
    }
};

export default fetchItem;