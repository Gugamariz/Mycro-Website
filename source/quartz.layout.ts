import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      "Meu Linkedin": "https://linkedin.com/in/gustavo-mariz-b-de-sousa",
      "Meu Github": "https://github.com/Gugamariz"
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    // Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.MobileOnly(Component.Spacer()),
    Component.Darkmode(),
  ],
  right: [
    Component.DesktopOnly(Component.TableOfContents()),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [],
}
