// App.jsx

import "./App.css";
import Axios from "axios";
import { useEffect, useState } from "react";

function App() {
    const [search, setSearch] = useState("");
    const [crypto, setCrypto] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Axios.get(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=100&page=1&sparkline=false"
        )
            .then((res) => {
                setCrypto(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching data:", err);
                setLoading(false);
            });
    }, []);

    const formatNumber = (num) => {
        return new Intl.NumberFormat("en-IN").format(num);
    };

    return (
        <div className="App">
            <h1 style={{ color: "green" }}>All Cryptocurrencies</h1>
            <input
                type="text"
                placeholder="Search..."
                onChange={(e) => setSearch(e.target.value)}
            />

            {loading ? (
                <p>Loading data...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Name</th>
                            <th>Symbol</th>
                            <th>Market Cap</th>
                            <th>Price</th>
                            <th>Available Supply</th>
                            <th>Volume (24h)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {crypto
                            .filter((val) =>
                                val.name.toLowerCase().includes(search.toLowerCase()) ||
                                val.symbol.toLowerCase().includes(search.toLowerCase())
                            )
                            .map((val, index) => (
                                <tr key={index}>
                                    <td>{val.market_cap_rank}</td>
                                    <td className="logo">
                                        <a
                                            href={`https://www.coingecko.com/en/coins/${val.id}`}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <img
                                                src={val.image}
                                                alt={`${val.name} logo`}
                                                width="30px"
                                            />
                                        </a>
                                        <p>{val.name}</p>
                                    </td>
                                    <td>{val.symbol.toUpperCase()}</td>
                                    <td>₹{formatNumber(val.market_cap)}</td>
                                    <td>₹{val.current_price.toFixed(2)}</td>
                                    <td>{formatNumber(val.circulating_supply)}</td>
                                    <td>{formatNumber(val.total_volume)}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default App;
