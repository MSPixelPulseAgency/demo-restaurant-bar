import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Clock3, PlayCircle } from 'lucide-react'
import { blogCategories, blogPosts } from './blogData'

const videos = [
  { id: 'DoUbnSAbX1c', title: 'Cocktail craft and bar inspiration' },
  { id: 'F-1eUjZVvb4', title: 'Hospitality and dining inspiration' },
  { id: 'mxgetx4EliM', title: 'Food, plating and restaurant atmosphere' },
]

export function BlogPage() {
  const [category, setCategory] = useState('All')
  const visible = useMemo(() => category === 'All' ? blogPosts : blogPosts.filter((post) => post.category === category), [category])
  const featured = blogPosts[0]

  return (
    <>
      <section className="blog-hero">
        <div className="blog-hero-shade" />
        <div className="shell blog-hero-inner">
          <p className="eyebrow light">Aurelia Journal</p>
          <h1>Stories from the table, bar and kitchen.</h1>
          <p>Forty-eight demo articles on dining, cocktails, wine, hospitality, private events and the atmosphere around them.</p>
        </div>
      </section>

      <section className="blog-featured shell">
        <img src={featured.image} alt={featured.title} />
        <div className="blog-featured-copy">
          <span className="blog-category">{featured.category}</span>
          <h2>{featured.title}</h2>
          <p>{featured.excerpt}</p>
          <div className="blog-meta"><Clock3 size={15}/>{featured.readTime}</div>
          <Link to={`/blog/${featured.slug}`} className="text-link large">Read the story <ArrowRight size={18}/></Link>
        </div>
      </section>

      <section className="blog-video-section">
        <div className="shell">
          <div className="premium-heading-row">
            <div className="premium-section-title is-light"><p className="eyebrow">Watch & linger</p><h2>Bar, kitchen and hospitality films.</h2><p>Public YouTube videos embedded as editorial inspiration for the demo.</p></div>
          </div>
          <div className="blog-video-grid">
            {videos.map((video) => (
              <article key={video.id} className="blog-video-card">
                <div className="video-frame"><iframe src={`https://www.youtube-nocookie.com/embed/${video.id}`} title={video.title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div>
                <div><PlayCircle size={18}/><span>{video.title}</span></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="blog-index-section shell">
        <div className="blog-index-heading">
          <div><p className="eyebrow">From the journal</p><h2>Read by mood.</h2></div>
          <div className="blog-filters" aria-label="Blog categories">{blogCategories.map((item) => <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>)}</div>
        </div>
        <div className="blog-grid">
          {visible.map((post) => (
            <article className="blog-card" key={post.id}>
              <Link to={`/blog/${post.slug}`} className="blog-card-image"><img src={post.image} alt={post.title} loading="lazy" /></Link>
              <div className="blog-card-copy"><span className="blog-category">{post.category}</span><h3><Link to={`/blog/${post.slug}`}>{post.title}</Link></h3><p>{post.excerpt}</p><div className="blog-card-bottom"><span>{post.readTime}</span><Link to={`/blog/${post.slug}`} aria-label={`Read ${post.title}`}><ArrowRight size={18}/></Link></div></div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

export function BlogPostPage() {
  const { slug } = useParams()
  const post = blogPosts.find((item) => item.slug === slug)
  if (!post) return <section className="blog-not-found shell"><h1>Story not found.</h1><Link to="/blog">Back to the journal</Link></section>
  const related = blogPosts.filter((item) => item.category === post.category && item.slug !== post.slug).slice(0, 3)

  return (
    <article className="blog-article">
      <header className="blog-article-hero">
        <img src={post.image} alt={post.title} />
        <div className="blog-article-overlay" />
        <div className="shell blog-article-head"><Link to="/blog" className="blog-back"><ArrowLeft size={17}/> Journal</Link><span className="blog-category">{post.category}</span><h1>{post.title}</h1><p>{post.excerpt}</p><div className="blog-meta"><Clock3 size={15}/>{post.readTime}</div></div>
      </header>
      <div className="blog-article-body shell">
        <aside><div className="blog-article-sketch"/><p className="eyebrow">Aurelia notes</p><p>Demo editorial content created to establish the restaurant’s future journal structure.</p></aside>
        <div className="blog-prose">{post.body.map((paragraph, index) => <p key={index}>{paragraph}</p>)}<blockquote>“The best hospitality leaves enough room for the evening to become its own story.”</blockquote><p>As Aurelia’s final identity, menu and location are confirmed, these demo articles can be replaced, expanded or connected to a CMS without changing the visual system.</p></div>
      </div>
      <section className="blog-related shell"><p className="eyebrow">Keep reading</p><h2>More from {post.category}.</h2><div className="blog-related-grid">{related.map((item) => <Link key={item.slug} to={`/blog/${item.slug}`}><img src={item.image} alt=""/><span>{item.title}</span></Link>)}</div></section>
    </article>
  )
}
