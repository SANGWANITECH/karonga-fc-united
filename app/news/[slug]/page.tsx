import type { Metadata } from 'next'
import { createClient } from '@supabase/supabase-js'
import ArticleContent from './ArticleContent'

const SITE_URL = 'https://www.karongaunitedfc.online'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params

  try {
    const supabase = createClient(supabaseUrl, supabaseKey)
    const { data } = await supabase
      .from('news')
      .select('title, excerpt, image_url')
      .eq('slug', slug)
      .single()

    if (!data) {
      return {
        title: 'News',
        description: 'Latest news from Karonga United FC.',
      }
    }

    const title = data.title
    const description = data.excerpt || 'Latest news from Karonga United FC — The Crocodiles of Karonga.'
    const image = data.image_url || `${SITE_URL}/images/logo.avif`

    return {
      title,
      description,
      alternates: {
        canonical: `${SITE_URL}/news/${slug}`,
      },
      openGraph: {
        type: 'article',
        url: `${SITE_URL}/news/${slug}`,
        title,
        description,
        siteName: 'Karonga United FC',
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [image],
      },
    }
  } catch {
    return {
      title: 'News',
      description: 'Latest news from Karonga United FC.',
    }
  }
}

export default function ArticlePage() {
  return <ArticleContent />
}
