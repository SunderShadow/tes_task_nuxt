import {$fetch} from "ofetch/node";
import {xml2js} from "xml-js"

export type News = {
  title: string,
  published_at: string
  anons: string
  author: string
  origin: string,
  images?: Array<string>
}

export type NewsResponse = {
  last_page: number,
  data: Array<News>
}

export default defineEventHandler(e => {
  const query = getQuery(e)

  const ITEMS_PER_PAGE = 5
  const page = query.page ? Number(query.page) : 1
  const search  = query.search ? String(query.search) : false

  const xml = $fetch("http://static.feed.rbc.ru/rbc/logical/footer/news.rss")
  return xml.then(res => {
    const data = xml2js(res, { compact: true })
    let items = data.rss.channel.item
    items = items.filter(item => search && search.length ? item.title._cdata.includes(search) : true)

    const totalItems = items.length

    items = items
        .slice(ITEMS_PER_PAGE * (page - 1), ITEMS_PER_PAGE * page)
        .map(item => {
          const data: News = {
            title: item.title._cdata,
            published_at: item.pubDate._text,
            anons: item['rbc_news:anons']._cdata,
            author: item?.author?._text ?? false,
            origin: item.link._text
          }

          let images = item['rbc_news:image']
          if (images) {
            if (!(images instanceof Array)) {
              images = [images]
            }

            for (let key in images) {
              images[key] = images[key]['rbc_news:url']._text
            }
          }

          data.images = images
          return data
        })

    let response: NewsResponse = {
      last_page: Math.ceil(totalItems / ITEMS_PER_PAGE),
      data: items
    }

    return JSON.stringify(response)
  })
})