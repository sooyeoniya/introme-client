/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useEffect, useCallback } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import CompanyCard from "../../components/company/CompanyCard";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import CompanyHeader from "../../components/company/CompanyHeader";
import Loader from "../../components/Loader";
import { CompanyCardProps } from "../../types/company";
import Loading from "../../components/Loading";

export default function CompanyList() {
    const ref = useRef<HTMLDivElement | null>(null);
    const pageEndRef = useIntersectionObserver(ref, {});
    const isPageEnd = !!pageEndRef?.isIntersecting;

    const fetchCompanies = async (pageParam = 1) => {
        const response = await fetch(`http://localhost:4000/company?_page=${pageParam}&_limit=12`);
        if (!response.ok) {
            throw new Error("에러");
        }
        const data = await response.json();

        const totalCountHeader = response.headers.get("X-Total-Count");
        const totalCount = totalCountHeader ? parseInt(totalCountHeader, 10) : 0;
        // 총 페이지 수
        const totalPages = Math.ceil(totalCount / 12);

        return { data, totalPages, page: pageParam };
    };

    // pageInfo
    const fetchPageInfo = async () => {
        const response = await fetch(`http://localhost:4000/pageInfo`);
        if (!response.ok) {
            throw new Error("에러");
        }
        const totalElements = await response.json();

        return { totalElements };
    };

    const { data: pageInfo } = useQuery({
        queryKey: ["pageInfo"],
        queryFn: fetchPageInfo
    });

    const {
        data: companies,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        isLoading
    } = useInfiniteQuery({
        queryKey: ["companies"],
        queryFn: ({ pageParam = 1 }) => fetchCompanies(pageParam),
        initialPageParam: 1,
        refetchOnWindowFocus: true,
        getNextPageParam: (lastPage: any) =>
            lastPage.data?.length > 0 ? lastPage.page + 1 : undefined
    });

    const fetchNext = useCallback(async () => {
        const res = await fetchNextPage();
        if (res.isError) {
            console.log(res.error);
        }
    }, [fetchNextPage]);

    useEffect(() => {
        let timerId: number;

        if (isPageEnd && hasNextPage) {
            timerId = setTimeout(() => {
                fetchNext();
            }, 500);
        }

        return () => clearTimeout(timerId);
    }, [fetchNext, isPageEnd, hasNextPage]);

    if (error) return <div>Error: {error.message}</div>;
    if (isLoading) return <Loading />;

    return (
        <div className="pt-[86px] px-20">
            <CompanyHeader totalElements={pageInfo?.totalElements.totalElements} />
            <div className="pt-11">
                <div className="grid grid-cols-3 gap-x-8 gap-y-5">
                    {companies?.pages.map((page, index) => (
                        <React.Fragment key={index}>
                            {page.data.map((company: CompanyCardProps) => (
                                <CompanyCard
                                    key={company.id}
                                    id={company.id}
                                    image={company.image}
                                    name={company.name}
                                    talents={company.talents}
                                    location={company.location}
                                    url={company.url}
                                />
                            ))}
                        </React.Fragment>
                    ))}
                </div>
                {(isFetching || hasNextPage || isFetchingNextPage) && <Loader />}
                <div className="w-full touch-none h-10 mb-10" ref={ref} />
            </div>
        </div>
    );
}
