import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { endpoint } from "../common/constants/endpoint";
import Cards from "./Cards";

const limit = 20;
const Dashboard = () => {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    setLoading(true);
    const params = { ...axios.defaults.params, offset: (page - 1) * limit };

    return await axios
      .get(`${endpoint}comics?format=comic&formatType=comic&title=Captain%20Marvel&orderBy=onsaleDate`, { params })
      .then((result) => {
        const res = result.data;
        if (res.code === 200) {
          setList(list.concat(res.data.results));
          setTotal(res.data.total);
          setPage(page + 1);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  return (
    <div className="dashboard">
      <Cards list={list} total={total} loading={loading} hasMore={hasMore} setHasMore={setHasMore} getList={getList} />
    </div>
  );
};

export default withRouter(Dashboard);
