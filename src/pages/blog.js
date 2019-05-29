import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'

import Layout from '../components/layout'
import Head from '../components/head'

import blogStyles from './blog.module.scss'

const BlogPage = () => {
  // allMarkdownRemark {
  //   edges {
  //     node {
  //       id
  //       frontmatter {
  //         title
  //         date
  //       }
  //       fields {
  //         slug
  //       }
  //     }
  //   }
  // }
  const data = useStaticQuery(graphql`
    query {
      allContentfulBlogPost (
        sort: {
          fields: publishedDate,
          order: DESC
        }
      ) {
        edges {
          node {
            title
            slug
            publishedDate(formatString: "MMMM Do, YYYY")
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <Head title="Blog" />
      <h1>Blog</h1>
      {
        // <ol className={blogStyles.posts}>
        //   {
        //     data.allMarkdownRemark.edges.map(({ node }) => (
        //       <li className={blogStyles.post} key={node.id}>
        //         <h2><Link to={`/blog/${node.fields.slug}`}>{node.frontmatter.title}</Link></h2>
        //         <p>{node.frontmatter.date}</p>
        //       </li>
        //     ))
        //   }
        // </ol>
      }
      <ol className={blogStyles.posts}>
        {
          data.allContentfulBlogPost.edges.map(({ node }) => (
            <li className={blogStyles.post} key={node.slug}>
              <h2><Link to={`/blog/${node.slug}`}>{node.title}</Link></h2>
              <p>{node.publishedDate}</p>
            </li>
          ))
        }
      </ol>
    </Layout>
  )
}

export default BlogPage
