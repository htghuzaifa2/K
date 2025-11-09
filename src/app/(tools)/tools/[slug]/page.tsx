
import { getToolBySlug, getTools, getDummyToolContent } from '@/lib/tool-data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { APP_NAME } from '@/lib/constants';
import styles from '../../styles/tools.module.css';
import Link from 'next/link';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tool = getToolBySlug(params.slug);

  if (!tool) {
    return {
      title: `Not Found - ${APP_NAME}`,
    };
  }

  return {
    title: `${tool.title} - ${APP_NAME}`,
    description: `Use the ${tool.title} tool.`,
    openGraph: {
        title: tool.title,
        description: `Use the ${tool.title} tool.`,
        type: 'website',
    }
  };
}

export default function ToolPage({ params }: Props) {
  const tool = getToolBySlug(params.slug);

  if (!tool) {
    notFound();
  }

  const toolContent = getDummyToolContent(tool.title);

  return (
    <article className={styles.article}>
      <Link href="/tools" className={styles.backLink}>&larr; Back to Tools</Link>
      <h1 className={styles.articleTitle}>{tool.title}</h1>
      <div 
        className={styles.articleContent}
        dangerouslySetInnerHTML={{ __html: toolContent }} 
      />
      <div className={styles.toolPlaceholder}>
        <p>Tool implementation for &quot;{tool.title}&quot; goes here.</p>
      </div>
    </article>
  );
}

export async function generateStaticParams() {
  const tools = getTools();
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}
