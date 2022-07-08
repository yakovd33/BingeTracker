import * as React from "react";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import ApiHelper from "../../helpers/ApiHelper";
import ShowItem from "../../components/ShowItem";
import Link from "next/link";
import SearchResult from "../../components/SearchResult";
import { resultInterface } from "../../global/interfaces";

const Keywords = () => {
	const router = useRouter();
	const { keywords } = router.query;
    const [ results, setResults ] =  useState<resultInterface[]>();

    useEffect(() => {
        if (keywords != undefined) {
            ApiHelper.get(`search/${ keywords }`, (res : any) => {
                setResults(res)
            });
        }
    }, [ keywords ]);

	return <div className="container">
		<h2 id="search-res-msg">Showing search results for: '{ keywords }'</h2>

        <div id="results-list">
            { results && results.map((res) => (
                <SearchResult result={ res } />
            )) }
        </div>
	</div>;
};

export default Keywords;
