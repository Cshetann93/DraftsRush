<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title>XML Sitemap | DraftsRush</title>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
            background-color: #E2E4E9;
            color: #111317;
            margin: 0;
            padding: 24px;
          }
          .container {
            max-width: 1024px;
            margin: 0 auto;
          }
          .header-box {
            background-color: #F8D000;
            border: 4px solid #000000;
            box-shadow: 6px 6px 0px #000000;
            padding: 24px;
            margin-bottom: 24px;
          }
          .badge {
            background-color: #000000;
            color: #FFFFFF;
            padding: 4px 8px;
            font-size: 11px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 1px;
            display: inline-block;
          }
          h1 {
            font-size: 28px;
            font-weight: 900;
            margin: 12px 0 6px 0;
          }
          p {
            font-size: 13px;
            font-weight: 500;
            margin: 0;
            color: #222222;
          }
          .table-box {
            background-color: #FFFFFF;
            border: 4px solid #000000;
            box-shadow: 6px 6px 0px #000000;
            overflow-x: auto;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
          }
          th {
            background-color: #000000;
            color: #FFFFFF;
            text-align: left;
            padding: 12px 16px;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          tr {
            border-bottom: 1px solid #E2E4E9;
          }
          tr:hover {
            background-color: #FFF6CF;
          }
          td {
            padding: 12px 16px;
          }
          a {
            color: #0F172A;
            text-decoration: none;
            font-weight: 600;
          }
          a:hover {
            text-decoration: underline;
            color: #000000;
          }
          .priority-pill {
            background-color: #E2E4E9;
            border: 1px solid #000000;
            padding: 2px 6px;
            font-size: 11px;
            font-weight: 700;
            font-family: monospace;
          }
        </style>
      <!-- Studio Core Classes & Sitewide Styles -->
  <style>
    :root {
      --bg-base: #E2E4E9;
      --ink: #111317;
      --brand-yellow: #F8D000;
      --cta-yellow: #FFE600;
      --surface-light: #F0F2F5;
      --surface-blue: #D6E4EE;
      --surface-cream: #FFF6CF;
      --surface-mint: #E1F5E3;
      --section-slate: #D4D7E1;
      --section-steel: #CCD0DC;
    }
    .brand-font { font-family: 'Space Grotesk', sans-serif; letter-spacing: -0.028em; }
    .studio-header {
      background-color: rgba(248, 208, 0, 0.94);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border-bottom: 1px solid #111317;
      box-shadow: 0 4px 20px -4px rgba(17, 19, 23, 0.06);
    }
    .nav-pill {
      background-color: #F0F2F5;
      color: #111317;
      border: 1.5px solid rgba(17, 19, 23, 0.85);
      border-radius: 10px;
      padding: 0.45rem 0.9rem;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.04em;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: 0 2px 4px rgba(17, 19, 23, 0.06);
    }
    .nav-pill:hover {
      background-color: #111317 !important;
      color: #F0F2F5 !important;
      transform: translateY(-1px);
      box-shadow: 0 6px 12px rgba(17, 19, 23, 0.14);
    }
    .nav-pill:hover .status-dot { background-color: #F8D000; }
    .studio-btn {
      border: 1.5px solid #111317;
      border-radius: 12px;
      font-weight: 700;
      transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: 0 4px 10px -2px rgba(17, 19, 23, 0.1);
    }
    .studio-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 22px -6px rgba(17, 19, 23, 0.22);
    }
    .studio-btn:active { transform: translateY(0); }
    .bg-surface-light { background-color: #F0F2F5 !important; }
    .bg-surface-blue { background-color: #D6E4EE !important; }
    .bg-brand-yellow { background-color: #F8D000 !important; }
    .bg-cta-yellow { background-color: #FFE600 !important; }
    .bg-ink { background-color: #111317 !important; }
  </style>
  <link rel="stylesheet" href="/assets/draftsrush-sitewide.css" />
</head>
      <body>
        <div class="container">
          <div class="header-box">
            <span class="badge">Machine Search Index</span>
            <h1>DraftsRush XML Sitemap</h1>
            <p>
              This is a stylized XML index readable by both search engines and humans. 
              Total indexed URLs in this feed: <strong><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></strong>
            </p>
          </div>

          <div class="table-box">
            <table>
              <thead>
                <tr>
                  <th style="width: 55%;">URL Location</th>
                  <th style="width: 25%;">Last Modified</th>
                  <th style="width: 20%;">Priority</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                  <tr>
                    <td>
                      <xsl:variable name="itemURL">
                        <xsl:value-of select="sitemap:loc"/>
                      </xsl:variable>
                      <a href="{$itemURL}">
                        <xsl:value-of select="sitemap:loc"/>
                      </a>
                    </td>
                    <td>
                      <xsl:value-of select="substring(sitemap:lastmod, 0, 11)"/>
                    </td>
                    <td>
                      <span class="priority-pill">
                        <xsl:value-of select="sitemap:priority"/>
                      </span>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
