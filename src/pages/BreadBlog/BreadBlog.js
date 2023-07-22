import {useIntersection} from "react-use"; // TODO: check this out
import './BreadBlog.css';

export function BreadBlog({ menuIsOpen }) {
  return (
    <article id='bread-blog'>
      <section>
        <title></title>
        <p className='blog-body'></p>
      </section>
    </article>
  );
}