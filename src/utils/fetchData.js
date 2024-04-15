export const exerciseOptions = {
    method: 'GET',
    params: { limit: '9999 ' },
    headers: {
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    }
};

export const youtubeOptions = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
        'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
    }
}

export const fetchData = async (url, options) => {
    const response = await fetch(url, options);
    const data = await response.json(); //extract my data from response

    return data;
}