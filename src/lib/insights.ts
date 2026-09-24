import { getCollection } from 'astro:content';

export async function getArticlesByCategory(lang: 'vi' | 'en') {
  const articles = await getCollection('insights', ({ data }) => !data.draft && data.lang === lang);

  const categories = {
    'business-operations': 'Business & Operations',
    'knowledge-management': 'Knowledge Management',
    erp: 'ERP',
    ai: 'AI',
    compliance: 'Compliance',
  };

  const funnelStageOrder = { Awareness: 0, Understanding: 1, Consideration: 2 };

  const grouped = articles.reduce(
    (acc, article) => {
      const cat = article.data.category;
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(article);
      return acc;
    },
    {} as Record<string, typeof articles>
  );

  // Sort each category's articles: Pillar first, then by funnelStage, then by title
  Object.keys(grouped).forEach((cat) => {
    grouped[cat].sort((a, b) => {
      // Pillar articles first
      if (a.data.contentType === 'Pillar' && b.data.contentType !== 'Pillar') return -1;
      if (a.data.contentType !== 'Pillar' && b.data.contentType === 'Pillar') return 1;

      // Then by funnelStage
      const aStage = a.data.funnelStage?.[0] || 'Consideration';
      const bStage = b.data.funnelStage?.[0] || 'Consideration';
      const stageOrder = funnelStageOrder[aStage as keyof typeof funnelStageOrder] ?? 2;
      const bStageOrder = funnelStageOrder[bStage as keyof typeof funnelStageOrder] ?? 2;

      if (stageOrder !== bStageOrder) return stageOrder - bStageOrder;

      // Then by title
      return a.data.title.localeCompare(b.data.title);
    });
  });

  return {
    categories,
    grouped,
  };
}
