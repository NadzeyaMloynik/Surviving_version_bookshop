import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Pagination} from "react-bootstrap";




const Pages = observer(() => {
    const { book } = useContext(Context);
    const pageCount = Math.ceil(book.totalCount / book.limit);

    const pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }

    const handlePageClick = (page) => {
        book.setPage(page);
    };

    return (
        <Pagination className="mt-5">
            {pages.map((page) =>
                <Pagination.Item
                    key={page}
                    active={book.page === page}
                    onClick={() => handlePageClick(page)}
                >
                    {page}
                </Pagination.Item>
            )}
        </Pagination>
    );
});

export default Pages;

