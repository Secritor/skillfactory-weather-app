
class OpenWeather {

    api_key = '3ebf25ecb2b9c7060185d3004a74c1e5';

    getResourse = async (url) => {
        let res = await fetch(url);
        if(!res.ok) {
            throw new Error (`Could not fetch ${url}, status ${res.status}`)
        }
        return await res.json();
    }


}