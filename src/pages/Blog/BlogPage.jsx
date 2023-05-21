import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import strings from 'src/common/strings';
import { LinkStyling } from 'src/common/globalStyles';
import { routes } from 'src/routes';
import { useCommonGlobals } from 'src/common/hooks';
import { getData } from 'src/common/utils';
import { LoadingSpinner } from 'src/components/LoadingSpinner/LoadingSpinner';
import './BlogPage.css';

export function BlogPage(){
    const [ language ] = useCommonGlobals(routes.blog);
    const [ blogData, setBlogData ] = useState(null);
    const [ isError, setIsError ] = useState(null);

    const sortNewestToOldest = (data) => data.sort((a, b) => a.creationTimeStamp > b.creationTimeStamp ? -1 : 1);

    const updateWithFetchedBlogs = (data) => {
        try {
            const sortedData = sortNewestToOldest(data);
            setBlogData(sortedData);
            setIsError(null);
        } catch (e) {
            setIsError(e)
        }
    };

    const asDateString = (article) => new Date(article.creationTimeStamp).toISOString().slice(0,10);

    useEffect(() => {
        getData(process.env.REACT_APP_GET_BLOG_ENTRIES)
            .then(updateWithFetchedBlogs);
    }, []);

    const BlogContent = () => (
        <>
            {blogData
                ? blogData.map((article, key) => (
                    <article className='article' key={key}>
                        <header className='blog-title'>{article.title}</header>
                        <h2 className='publication-date'>{asDateString(article)}</h2>
                        <img
                            className='blog-image'
                            src={article.imageUrl}
                            aria-label={`Image for blog titled ${article.title}`}
                            loading={key === 0 ? 'eager' : 'lazy'}
                        />
                        <p className='blog-body'>{article.theme}</p>
                    </article>
                ))
                : <LoadingSpinner language={language} />
            }
        </>
    );

    const ErrorMessage = () => <div>Blogs are undergoing maintenance at this time. Perhaps try the crossword while you wait.</div>

    return (
        <main role='main' className='blog-page-content'>
            <nav className='back-to-home'>
                <Link style={LinkStyling} to={routes.index}>
                    {strings.homePage[language]}
                </Link>
            </nav>
            <section>{isError ? <ErrorMessage /> : <BlogContent />}</section>
        </main>
    );
}