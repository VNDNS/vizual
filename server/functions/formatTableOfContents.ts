export function formatTableOfContents(data: any) {
  const toc = data;

  // Sort to ensure correct order
  toc.sort((a: any, b: any) => {
    if (a.section !== b.section) return a.section - b.section;
    if (a.subSection !== b.subSection) return a.subSection - b.subSection;
    return a.subSubSection - b.subSubSection;
  });

  let result = "";
  let currentSection: number | null = null;
  let currentSubSection: number | null = null;

  toc.forEach((item: any) => {
    const { section, subSection, subSubSection, title } = item;

    // New section
    if (section !== currentSection) {
      result += `\n${section}. ${title}\n`;
      currentSection = section;
      currentSubSection = null;
    }
    // New subsection
    else if (subSection !== currentSubSection && subSection !== 0) {
      result += `  ${section}.${subSection} ${title}\n`;
      currentSubSection = subSection;
    }
    // Sub-subsection
    else if (subSubSection !== 0) {
      result += `    ${section}.${subSection}.${subSubSection} ${title}\n`;
    }
    // If it's a subsection 0 but not a new section (rare case)
    else if (subSection === 0 && subSubSection === 0) {
      result += `\n${section}. ${title}\n`;
    }
  });

  return result.trim();
}