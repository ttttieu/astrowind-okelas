export const headerData = {
  links: [
    {
      text: 'Why OKELAS',
      links: [
        { text: 'The Problem', href: '/why/van-de', hrefEn: '/en/why/the-problem' },
        { text: 'From Documents to Operations', href: '/why/documents-to-operations' },
        { text: 'Knowledge as Infrastructure', href: '/why/knowledge-as-infrastructure' },
        { text: 'Progressive eQMS', href: '/why/progressive-eqms' },
        { text: 'Why Before ERP', href: '/why/why-before-erp' },
        { text: 'Why Before AI', href: '/why/why-before-ai' },
      ],
    },
    {
      text: 'Solutions',
      links: [
        { text: 'Digitalize Operations', href: '/solutions/digitalize-operations' },
        { text: 'Standardize Processes', href: '/solutions/standardize-processes' },
        { text: 'Progressive eQMS', href: '/solutions/progressive-eqms' },
        { text: 'ERP Readiness', href: '/solutions/erp-readiness' },
        { text: 'AI Readiness', href: '/solutions/ai-readiness' },
        { text: 'Knowledge & Copilot', href: '/solutions/knowledge-copilot' },
        { text: 'Workflow Automation', href: '/solutions/workflow-automation' },
      ],
    },
    {
      text: 'Readiness',
      links: [
        { text: 'ERP Readiness', href: '/readiness/erp' },
        { text: 'Digitalization Readiness', href: '/readiness/digitalization' },
        { text: 'AI Readiness', href: '/readiness/ai' },
        { text: 'Knowledge Readiness', href: '/readiness/knowledge' },
      ],
    },
    {
      text: 'Insights',
      links: [
        { text: 'Business & Operations', href: '/insights/business-operations' },
        { text: 'Knowledge Management', href: '/insights/knowledge-management' },
        { text: 'ERP', href: '/insights/erp' },
        { text: 'AI', href: '/insights/ai' },
        { text: 'Compliance', href: '/insights/compliance' },
      ],
    },
    {
      text: 'About',
      links: [
        { text: 'About OKELAS', href: '/about' },
        { text: 'Our Approach', href: '/about/approach' },
        { text: 'Technology', href: '/about/technology' },
        { text: 'Partners', href: '/about/partners' },
        { text: 'Contact', href: '/contact' },
      ],
    },
  ],
  actions: [{ text: 'Assess Your Business', href: '/readiness' }],
};

// --- Bổ sung đoạn footerData dưới đây ---
export const footerData = {
  links: [
    {
      title: 'Solutions',
      links: [
        { text: 'Digitalize Operations', href: '/solutions/digitalize-operations' },
        { text: 'Standardize Processes', href: '/solutions/standardize-processes' },
        { text: 'Progressive eQMS', href: '/solutions/progressive-eqms' },
        { text: 'ERP Readiness', href: '/solutions/erp-readiness' },
      ],
    },
    {
      title: 'Readiness',
      links: [
        { text: 'ERP Readiness Assessment', href: '/readiness/erp' },
        { text: 'Digitalization Assessment', href: '/readiness/digitalization' },
        { text: 'AI Readiness Assessment', href: '/readiness/ai' },
      ],
    },
    {
      title: 'Insights',
      links: [
        { text: 'Business & Operations', href: '/insights/business-operations' },
        { text: 'Knowledge Management', href: '/insights/knowledge-management' },
        { text: 'ERP', href: '/insights/erp' },
        { text: 'AI', href: '/insights/ai' },
        { text: 'Compliance', href: '/insights/compliance' },
      ],
    },
    {
      title: 'Company',
      links: [
        { text: 'About OKELAS', href: '/about' },
        { text: 'Our Approach', href: '/about/approach' },
        { text: 'Contact Advisory', href: '/contact' },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Terms', href: '/terms' },
    { text: 'Privacy Policy', href: '/privacy' },
  ],
  socialLinks: [
    { ariaLabel: 'LinkedIn', icon: 'tabler:brand-linkedin', href: '#' },
  ],
  footNote: `
    © ${new Date().getFullYear()} OKELAS · Organizational Knowledge Operating System.
  `,
};
