import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function useAxios(props) {
    const navigate = useNavigate();
    const [data, setData] = useState({ data: null, loading: true });
    const md5 = require("blueimp-md5");
    const publicKey = "3259461401d9167609d907ea0174e849";
    const privateKey = "cb8f948f06755387b107f7fddeb62d27902efe81";
    const ts = new Date().getTime();
    const stringToHash = ts + privateKey + publicKey;
    const hash = md5(stringToHash);
    const baseUrl = props;
    const url = baseUrl + "ts=" + ts + "&apikey=" + publicKey + "&hash=" + hash;

    useEffect(() => {
        async function getData() {
            try {
                setData({ data: await axios.get(url), loading: false });
            } catch (e) {
                navigate("/404");
            }
        }
        getData();
    }, [props]);
    return data;
}

export default useAxios;
