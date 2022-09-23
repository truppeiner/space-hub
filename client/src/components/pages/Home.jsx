import React from 'react';
import Header from "../layout/Header";
import WebbList from "../layout/WebbList/WebbList";
import { useQuery } from "@apollo/client";
import { QUERY_WEBB } from "../../utils/queries";

function Landing(){
    const { data } = useQuery(QUERY_WEBB);
    const webbs = data?.allWebb || [];

    return(
        <>
        <div className="main">
            <Header/>
            <WebbList
                allWebb = {webbs}
            />
        </div>
        </>
    )
};


export default Landing;